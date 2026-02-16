/**
 * scroll-engine.js — Lightweight scroll-driven animation engine.
 *
 * Features:
 *   • Lerp-based smooth scroll state (does NOT hijack native scroll)
 *   • ScrollScene registration system with progress 0→1
 *   • IntersectionObserver for visibility optimisation
 *   • requestAnimationFrame loop reading scroll once per frame
 *   • prefers-reduced-motion support
 *
 * Usage:
 *   const engine = new ScrollEngine();
 *   engine.register({ element, onProgress, onEnter, onLeave });
 *   engine.start();
 */

/* ═══════════════════════════════════════
   Utility helpers
   ═══════════════════════════════════════ */

/** Linear interpolation */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Clamp value between min and max */
function clamp(v, min = 0, max = 1) {
  return Math.min(Math.max(v, min), max);
}

/** Detect prefers-reduced-motion */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ═══════════════════════════════════════
   ScrollScene
   ═══════════════════════════════════════ */

class ScrollScene {
  /**
   * @param {Object} config
   * @param {HTMLElement}  config.element       — DOM element for this scene
   * @param {Function}     [config.onProgress]  — called every frame with (progress 0-1, scrollState)
   * @param {Function}     [config.onEnter]     — called once when scene enters viewport
   * @param {Function}     [config.onLeave]     — called once when scene leaves viewport
   * @param {number}       [config.offset=0]    — extra px offset before scene starts
   * @param {number}       [config.duration]    — override: scroll px the scene spans (default = element height)
   * @param {string}       [config.id]          — optional identifier
   */
  constructor(config) {
    this.element = config.element;
    this.onProgress = config.onProgress || null;
    this.onEnter = config.onEnter || null;
    this.onLeave = config.onLeave || null;
    this.offset = config.offset || 0;
    this._durationOverride = config.duration || null;
    this.id = config.id || '';
    this.isVisible = false;     // tracked by IntersectionObserver
    this.isActive = false;      // currently within start–end
    this.progress = 0;
    this._bounds = { top: 0, height: 0 };
  }

  /** Recalculate position (call on resize) */
  measure(scrollY) {
    const rect = this.element.getBoundingClientRect();
    this._bounds.top = rect.top + scrollY + this.offset;
    this._bounds.height = this._durationOverride || rect.height;
  }

  get start() { return this._bounds.top; }
  get end()   { return this._bounds.top + this._bounds.height; }
  get height(){ return this._bounds.height; }
}

/* ═══════════════════════════════════════
   ScrollEngine
   ═══════════════════════════════════════ */

class ScrollEngine {
  constructor() {
    /* ── Scroll state (read once per frame) ── */
    this.state = {
      currentY: window.scrollY,
      targetY: window.scrollY,
      velocity: 0,
      direction: 0,           // 1 = down, -1 = up
      progress: 0,            // overall page progress 0–1
      windowH: window.innerHeight,
      docH: document.documentElement.scrollHeight,
    };

    /** @type {ScrollScene[]} */
    this.scenes = [];

    /** Smoothing factor — lower = smoother, 1 = instant */
    this._lerpFactor = prefersReducedMotion() ? 1 : 0.1;

    /** Intersection Observer for scenes */
    this._observer = null;

    /** rAF id */
    this._raf = null;

    /** Resize debounce timer */
    this._resizeTimer = null;

    /** Bound handlers */
    this._onScroll = this._handleScroll.bind(this);
    this._onResize = this._handleResize.bind(this);

    /** Callbacks */
    this._frameCallbacks = [];
  }

  /* ── Public API ─────────────────────── */

  /**
   * Register a scene. Accepts a config object (same as ScrollScene constructor).
   * @returns {ScrollScene}
   */
  register(config) {
    const scene = new ScrollScene(config);
    scene.measure(window.scrollY);
    this.scenes.push(scene);
    if (this._observer) this._observer.observe(scene.element);
    return scene;
  }

  /** Add a per-frame callback (receives scrollState) */
  onFrame(fn) {
    this._frameCallbacks.push(fn);
  }

  /** Start the engine loop */
  start() {
    this._setupObserver();
    this._measureAll();
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('resize', this._onResize, { passive: true });
    this._tick();
  }

  /** Stop the engine */
  stop() {
    cancelAnimationFrame(this._raf);
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('resize', this._onResize);
    if (this._observer) this._observer.disconnect();
  }

  /** Force re-measure (e.g. after DOM changes) */
  refresh() {
    this._measureAll();
  }

  /* ── Internal ───────────────────────── */

  _handleScroll() {
    this.state.targetY = window.scrollY;
  }

  _handleResize() {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      this.state.windowH = window.innerHeight;
      this.state.docH = document.documentElement.scrollHeight;
      this._measureAll();
    }, 150);
  }

  _measureAll() {
    const sy = window.scrollY;
    this.scenes.forEach(s => s.measure(sy));
  }

  _setupObserver() {
    if (this._observer) this._observer.disconnect();
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const scene = this.scenes.find(s => s.element === entry.target);
          if (scene) scene.isVisible = entry.isIntersecting;
        });
      },
      { rootMargin: '200px 0px' }
    );
    this.scenes.forEach(s => this._observer.observe(s.element));
  }

  /** Main rAF loop */
  _tick() {
    const s = this.state;
    const prev = s.currentY;

    // Lerp towards target
    s.currentY = lerp(s.currentY, s.targetY, this._lerpFactor);

    // Snap when close enough
    if (Math.abs(s.currentY - s.targetY) < 0.5) {
      s.currentY = s.targetY;
    }

    s.velocity = s.currentY - prev;
    s.direction = s.velocity > 0.5 ? 1 : s.velocity < -0.5 ? -1 : s.direction;
    s.progress = clamp(s.currentY / (s.docH - s.windowH));

    // Update scenes
    this._updateScenes(s);

    // Per-frame callbacks
    this._frameCallbacks.forEach(fn => fn(s));

    this._raf = requestAnimationFrame(() => this._tick());
  }

  _updateScenes(s) {
    const viewStart = s.currentY;
    const viewEnd = s.currentY + s.windowH;

    for (const scene of this.scenes) {
      // Skip scenes not near viewport (IO optimisation) — but always process if active
      if (!scene.isVisible && !scene.isActive) continue;

      // Compute progress: 0 when element top hits viewport bottom → 1 when element bottom exits viewport top
      const sceneStart = scene.start - s.windowH;
      const sceneEnd = scene.end;
      const range = sceneEnd - sceneStart;

      if (range <= 0) continue;

      const raw = (s.currentY - sceneStart) / range;
      scene.progress = clamp(raw);

      const wasActive = scene.isActive;
      scene.isActive = raw >= 0 && raw <= 1;

      if (scene.isActive && !wasActive && scene.onEnter) {
        scene.onEnter(scene, s);
      }
      if (!scene.isActive && wasActive && scene.onLeave) {
        scene.onLeave(scene, s);
      }
      if (scene.isActive && scene.onProgress) {
        scene.onProgress(scene.progress, s, scene);
      }
    }
  }
}

/* ═══════════════════════════════════════
   Exports (global for vanilla usage)
   ═══════════════════════════════════════ */
window.ScrollEngine = ScrollEngine;
window.ScrollScene = ScrollScene;
window.scrollUtils = { lerp, clamp, prefersReducedMotion };
