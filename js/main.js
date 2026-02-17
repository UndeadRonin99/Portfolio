/**
 * main.js — Portfolio application.
 *
 * Responsibilities:
 *   1. Render the DOM from CONTENT (content.js)
 *   2. Register ScrollScenes with the engine
 *   3. Implement 5+ animation patterns
 *   4. Manage sticky UI (progress bar, section dots, nav)
 *   5. Handle intro loader + skip
 *   6. Reduced-motion adjustments
 */

;(function () {
  'use strict';

  const { lerp, clamp, prefersReducedMotion } = window.scrollUtils;
  const C = window.CONTENT;
  const reducedMotion = prefersReducedMotion();

  /* ═══════════════════════════════════════
     DOM references (cached once)
     ═══════════════════════════════════════ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ═══════════════════════════════════════
     1. DOM RENDERING
     ═══════════════════════════════════════ */

  function renderAll() {
    renderHero();
    renderSplitStory();
    renderSkills();
    renderProjects();
    renderProcess();
    renderOfferings();
    renderContact();
    renderStickyUI();
  }

  /* ── Hero ── */
  function renderHero() {
    const section = $('#hero');

    const iatLogoSrc = C.assets?.logos?.iatFusion?.src;
    const devigniteLogoSrc = C.assets?.logos?.devignite?.src;
    const headshotSrc = C.assets?.headshot?.src;

    const iatLogoImg = iatLogoSrc
      ? `<img class="hero__brand" src="${iatLogoSrc}" alt="${C.assets?.logos?.iatFusion?.alt || ''}" loading="eager" decoding="async" />`
      : '';
    const devigniteLogoImg = devigniteLogoSrc
      ? `<img class="hero__brand" src="${devigniteLogoSrc}" alt="${C.assets?.logos?.devignite?.alt || ''}" loading="eager" decoding="async" />`
      : '';

    const brandRow = (iatLogoImg || devigniteLogoImg)
      ? `
          <div class="hero__brand-row" aria-label="Current affiliations">
            ${iatLogoImg}
            ${iatLogoImg && devigniteLogoImg ? '<span class="hero__brand-sep" aria-hidden="true">•</span>' : ''}
            ${devigniteLogoImg}
          </div>
        `
      : '';

    const portrait = headshotSrc
      ? `
        <div class="hero__portrait" aria-label="Portrait">
          <div class="hero__portrait-frame" aria-hidden="true"></div>
          <img
            class="hero__portrait-img"
            src="${headshotSrc}"
            alt="${C.assets?.headshot?.alt || ''}"
            loading="eager"
            decoding="async"
          />
        </div>
      `
      : '';

    const layoutClass = portrait ? 'hero__layout' : 'hero__layout hero__layout--single';

    section.innerHTML = `
      <div class="hero__bg" aria-hidden="true">
        <div class="hero__grid-overlay"></div>
        <div class="hero__gradient"></div>
        <div class="hero__glow"></div>
      </div>
      <div class="${layoutClass}">
        <div class="hero__content">
          <h1 class="hero__name">${C.identity.name}</h1>
          <p class="hero__tagline">${C.identity.tagline}</p>
          <p class="hero__subline">${C.identity.heroSubline}</p>
          ${brandRow}
        </div>

        ${portrait}
      </div>
      <div class="hero__scroll-hint" aria-hidden="true">
        <span class="hero__scroll-text">Scroll</span>
        <span class="hero__scroll-arrow">↓</span>
      </div>
    `;
  }

  /* ── Split Story ── */
  function renderSplitStory() {
    const section = $('#split-story');
    const { iat, devignite } = C.splitStory;

    const iatLogoSrc = C.assets?.logos?.iatFusion?.src;
    const devigniteLogoSrc = C.assets?.logos?.devignite?.src;

    const iatBrand = iatLogoSrc
      ? `
          <div class="split__brand">
            <img class="split__logo" src="${iatLogoSrc}" alt="${C.assets?.logos?.iatFusion?.alt || ''}" loading="lazy" decoding="async" />
          </div>
        `
      : '';

    const devigniteBrand = devigniteLogoSrc
      ? `
          <div class="split__brand">
            <img class="split__logo" src="${devigniteLogoSrc}" alt="${C.assets?.logos?.devignite?.alt || ''}" loading="lazy" decoding="async" />
          </div>
        `
      : '';

    section.innerHTML = `
      <div class="split__container">
        <div class="split__col split__col--iat" data-side="iat">
          ${iatBrand}
          <span class="split__label">${iat.accent}</span>
          <h2 class="split__title"><a href="${iat.link}" target="_blank" rel="dofollow">${iat.title}</a></h2>
          <p class="split__subtitle">${iat.subtitle}</p>
          <ul class="split__points">
            ${iat.points.map(p => `<li>${p}</li>`).join('')}
          </ul>
          <a class="split__link" href="${iat.link}" target="_blank" rel="dofollow">Visit ${iat.title} &rarr;</a>
        </div>
        <div class="split__divider" aria-hidden="true"><div class="split__divider-line"></div></div>
        <div class="split__col split__col--devignite" data-side="devignite">
          ${devigniteBrand}
          <span class="split__label">${devignite.accent}</span>
          <h2 class="split__title"><a href="${devignite.link}" target="_blank" rel="dofollow">${devignite.title}</a></h2>
          <p class="split__subtitle">${devignite.subtitle}</p>
          <ul class="split__points">
            ${devignite.points.map(p => `<li>${p}</li>`).join('')}
          </ul>
          <a class="split__link" href="${devignite.link}" target="_blank" rel="dofollow">Visit ${devignite.title} &rarr;</a>
        </div>
        <div class="split__curtain split__curtain--blue" aria-hidden="true"></div>
        <div class="split__curtain split__curtain--orange" aria-hidden="true"></div>
      </div>
    `;
  }

  /* ── Skills (horizontal scroll layout) ── */
  function renderSkills() {
    const section = $('#skills');
    section.innerHTML = `
      <div class="skills__sticky">
        <div class="skills__header">
          <h2 class="section-heading">Toolbelt</h2>
        </div>
        <div class="skills__track-wrapper">
          <div class="skills__track">
            ${C.skills.map((sk, i) => `
              <div class="skills__pillar" data-index="${i}">
                <span class="skills__number">${String(i + 1).padStart(2, '0')}</span>
                <h3 class="skills__title">${sk.title}</h3>
                <p class="skills__desc">${sk.description}</p>
                <div class="skills__keywords">
                  ${sk.keywords.map(k => `<span class="skills__kw">${k}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="skills__progress-dots" aria-hidden="true">
          ${C.skills.map((_, i) => `<span class="skills__dot" data-index="${i}"></span>`).join('')}
        </div>
      </div>
    `;
  }

  /* ── Projects (split-screen showcase) ── */
  function renderProjects() {
    const section = $('#projects');
    section.innerHTML = `
      <div class="projects__sticky">
        <div class="projects__top-bar">
          <h2 class="section-heading">Featured Projects</h2>
          <div class="projects__nav">
            <span class="projects__current-num">01</span>
            <span>/ ${String(C.projects.length).padStart(2, '0')}</span>
            <div class="projects__nav-dots">
              ${C.projects.map((_, i) => `<span class="projects__nav-dot" data-index="${i}"></span>`).join('')}
            </div>
          </div>
        </div>
        <div class="projects__viewport">
          ${C.projects.map((p, i) => `
            <div class="project-slide" data-index="${i}">
              <span class="project-slide__bg-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
              <div class="project-slide__left">
                <span class="project-slide__num">PROJECT ${String(i + 1).padStart(2, '0')}</span>
                <h3 class="project-slide__title">${p.title}</h3>
                <span class="project-slide__lang">${p.primaryLanguage}</span>
                <p class="project-slide__desc">${p.description}</p>
                <div class="project-slide__links">
                  ${p.links.github ? `<a href="${p.links.github}" target="_blank" rel="noopener" class="btn btn--sm">GitHub →</a>` : ''}
                  ${p.links.live   ? `<a href="${p.links.live}" target="_blank" rel="noopener" class="btn btn--sm btn--accent">Live Site</a>` : ''}
                </div>
              </div>
              <div class="project-slide__right">
                <div class="project-slide__media" aria-hidden="true">
                  <img
                    src="${p.image?.src || ''}"
                    alt="${p.image?.alt || ''}"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="project-slide__detail-group">
                  <div class="project-slide__detail-label">Tech Stack</div>
                  <div class="project-slide__stack-tags">
                    ${p.stack.map(s => `<span class="project-slide__tag">${s}</span>`).join('')}
                  </div>
                </div>
                <div class="project-slide__detail-group">
                  <div class="project-slide__detail-label">Outcomes</div>
                  <ul class="project-slide__outcomes">
                    ${p.outcomes.map(o => `<li>${o}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="projects__progress"><div class="projects__progress-fill"></div></div>
      </div>
    `;
  }

  /* ── Process ── */
  function renderProcess() {
    const section = $('#process');
    section.innerHTML = `
      <div class="process__sticky">
        <div class="process__header">
          <h2 class="section-heading">How I Build</h2>
        </div>
        <div class="process__timeline">
          <div class="process__line" aria-hidden="true"><div class="process__line-fill"></div></div>
          ${C.process.map((p, i) => `
            <div class="process__step" data-index="${i}">
              <span class="process__step-num">${p.step}</span>
              <h3 class="process__step-title">${p.title}</h3>
              <p class="process__step-desc">${p.description}</p>
            </div>
          `).join('')}
        </div>
        <div class="process__progress-dots" aria-hidden="true">
          ${C.process.map((_, i) => `<span class="process__dot" data-index="${i}"></span>`).join('')}
        </div>
      </div>
    `;
  }

  /* ── Offerings ── */
  function renderOfferings() {
    const section = $('#offerings');
    section.innerHTML = `
      <div class="offerings__intro">
        <span class="offerings__badge">DevIgnite</span>
        <h2 class="section-heading">What You Get</h2>
        <p class="offerings__sub">If you're a business, here's what working with us looks like.</p>
      </div>
      <div class="offerings__grid">
        ${C.offerings.map(o => `
          <div class="offering-card">
            <span class="offering-card__icon" aria-hidden="true">${o.icon}</span>
            <h3 class="offering-card__title">${o.title}</h3>
            <p class="offering-card__desc">${o.description}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ── Contact ── */
  function renderContact() {
    const section = $('#contact');
    section.innerHTML = `
      <h2 class="contact__heading">${C.contact.heading}</h2>
      <p class="contact__sub">${C.contact.subheading}</p>
      <div class="contact__links">
        ${C.contact.socials.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener" class="btn btn--lg" aria-label="${s.label}">
            <span class="btn__icon" aria-hidden="true">${s.icon}</span>
            ${s.label}
          </a>
        `).join('')}
      </div>
    `;
  }

  /* ── Sticky UI (progress + dots + nav) ── */
  function renderStickyUI() {
    // Top-left monogram
    const mono = $('#nav-monogram');
    mono.textContent = C.identity.monogram;

    // Progress bar is already in HTML
    // Section dots
    const dotContainer = $('#section-dots');
    const sectionIds = ['hero', 'split-story', 'skills', 'projects', 'process', 'offerings', 'contact'];
    const sectionLabels = ['Hero', 'Story', 'Skills', 'Projects', 'Process', 'Offerings', 'Contact'];
    dotContainer.innerHTML = sectionIds.map((id, i) =>
      `<button class="dot" data-section="${id}" aria-label="Go to ${sectionLabels[i]}"><span class="dot__inner"></span></button>`
    ).join('');

    // Dot click → scroll to section
    $$('.dot', dotContainer).forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.section);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ═══════════════════════════════════════
     2. INTRO LOADER
     ═══════════════════════════════════════ */

  function initLoader() {
    const loader = $('#intro-loader');
    const skipBtn = $('#skip-intro');

    function dismiss() {
      loader.classList.add('loader--done');
      document.body.classList.remove('is-loading');
      setTimeout(() => { loader.style.display = 'none'; }, 900);
    }

    skipBtn.addEventListener('click', dismiss);

    // Auto-dismiss after 2.4 seconds
    setTimeout(dismiss, 2400);
  }

  /* ═══════════════════════════════════════
     3. SCROLL SCENE REGISTRATION
     ═══════════════════════════════════════ */

  /** @type {ScrollEngine} */
  let engine;

  function initScenes() {
    engine = new ScrollEngine();

    registerHeroScene();
    registerSplitStoryScene();
    registerSkillsScene();
    registerProjectsScene();
    registerProcessScene();
    registerOfferingsScene();
    registerContactScene();
    registerStickyUI();

    engine.start();
  }

  /* ── Pattern 1: Hero scale + parallax ── */
  function registerHeroScene() {
    const el = $('#hero');
    const name = $('.hero__name', el);
    const bg = $('.hero__bg', el);
    const hint = $('.hero__scroll-hint', el);
    const content = $('.hero__content', el);

    engine.register({
      element: el,
      id: 'hero',
      onProgress(p) {
        if (reducedMotion) {
          name.style.opacity = '1';
          content.style.opacity = '1';
          hint.style.opacity = '1';
          return;
        }

        // Delay fades so the hero is fully readable on entry.
        // p is section progress (0 → 1). We only start fading after ~25%.
        const fadeP = clamp((p - 0.25) / 0.55, 0, 1);

        // Name shrinks as camera "pulls back"
        const scale = 1 - p * 0.3;
        const yShift = p * -60;
        name.style.transform = `translate3d(0, ${yShift}px, 0) scale(${scale})`;
        name.style.opacity = String(clamp(1 - fadeP * 0.25, 0.75, 1));

        // Background parallax
        bg.style.transform = `translate3d(0, ${p * 120}px, 0)`;

        // Content fade
        content.style.opacity = String(clamp(1 - fadeP * 0.12, 0.88, 1));

        // Scroll hint fades quickly
        hint.style.opacity = String(Math.max(0, 1 - p * 4));
      },
    });
  }

  /* ── Pattern 2: Split story — two-curtain reveal ── */
  function registerSplitStoryScene() {
    const el = $('#split-story');
    const iatCol = $('.split__col--iat', el);
    const devCol = $('.split__col--devignite', el);
    const blueCurtain = $('.split__curtain--blue', el);
    const orangeCurtain = $('.split__curtain--orange', el);
    const divider = $('.split__divider', el);

    const isMobile = () => window.innerWidth <= 768;

    engine.register({
      element: el,
      id: 'split-story',
      onEnter() {
        el.classList.add('is-active');
      },
      onProgress(p) {
        if (reducedMotion) {
          blueCurtain.style.opacity = '0';
          orangeCurtain.style.opacity = '0';
          devCol.style.opacity = '1';
          iatCol.style.opacity = '1';
          return;
        }

        const mobile = isMobile();
        // On mobile: curtains scale on Y axis (vertical stacking)
        // On desktop: curtains scale on X axis (side-by-side)
        const scaleProp = mobile ? 'scaleY' : 'scaleX';
        const slideProp = mobile ? 1 : 0; // 0 = X axis, 1 = Y axis

        /* ── Phase 1 (p 0→0.5): Blue curtain shrinks toward center ── */
        const phase1 = clamp(p / 0.5, 0, 1);
        const blueScale = 1 - phase1;
        blueCurtain.style.transform = `${scaleProp}(${blueScale})`;
        blueCurtain.style.opacity = blueScale > 0.01 ? '1' : '0';

        /* DevIgnite column fades in as blue curtain clears */
        devCol.style.opacity = String(clamp(phase1, 0, 1));
        if (mobile) {
          devCol.style.transform = `translate3d(0, ${(1 - phase1) * 15}px, 0)`;
        } else {
          devCol.style.transform = `translate3d(${(1 - phase1) * 20}px, 0, 0)`;
        }

        /* Divider fades in (desktop only) */
        if (divider) {
          divider.style.opacity = mobile ? '0' : String(clamp(phase1 * 1.4 - 0.3, 0, 1));
        }

        /* ── Phase 2 (p 0.5→1.0): Orange curtain expands to cover IAT side ── */
        const phase2 = clamp((p - 0.5) / 0.5, 0, 1);
        const orangeScale = phase2;
        orangeCurtain.style.transform = `${scaleProp}(${orangeScale})`;
        orangeCurtain.style.opacity = orangeScale > 0.01 ? '1' : '0';

        /* IAT column fades out under the orange curtain */
        iatCol.style.opacity = String(clamp(1 - phase2 * 1.2, 0, 1));
        if (mobile) {
          iatCol.style.transform = `translate3d(0, ${phase2 * -8}px, 0)`;
        } else {
          iatCol.style.transform = `translate3d(${phase2 * -12}px, 0, 0)`;
        }

        /* Divider fades back out during phase 2 (desktop only) */
        if (divider && phase2 > 0 && !mobile) {
          divider.style.opacity = String(clamp(1 - phase2 * 1.8, 0, 1));
        }
      },
    });
  }

  /* ── Pattern 3: Skills horizontal carousel ── */
  /* Vertical scroll drives horizontal card translation while section is sticky-pinned */
  function registerSkillsScene() {
    const el = $('#skills');
    const track = $('.skills__track', el);
    const wrapper = $('.skills__track-wrapper', el);
    const pillars = $$('.skills__pillar', el);
    const dots = $$('.skills__dot', el);
    const count = pillars.length;

    engine.register({
      element: el,
      id: 'skills',
      onEnter() { el.classList.add('is-active'); },
      onProgress(p) {
        // The section is 300vh tall. Progress 0→1 spans from when the
        // section top enters the viewport bottom to when it fully exits.
        // Sticky kicks in roughly when section top reaches viewport top,
        // which is ~0.20 of the total range, and un-sticks near ~0.90.
        // Remap that "pinned window" to 0→1 for the horizontal scroll.
        const pinStart = 0.18;
        const pinEnd   = 0.90;
        const pinProgress = clamp((p - pinStart) / (pinEnd - pinStart));

        // Calculate max horizontal travel
        const trackWidth = track.scrollWidth;
        const viewWidth  = wrapper.offsetWidth;
        const maxScroll  = Math.max(0, trackWidth - viewWidth);

        // Move the track
        const translateX = -pinProgress * maxScroll;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;

        // Determine which pillar is centred
        const activeIndex = Math.min(Math.floor(pinProgress * count), count - 1);

        pillars.forEach((pil, i) => {
          const isActive = i === activeIndex;
          pil.classList.toggle('is-current', isActive);

          if (reducedMotion) {
            pil.style.opacity = isActive ? '1' : '0.4';
            return;
          }

          // Continuous opacity falloff based on distance from "cursor"
          const cursor = pinProgress * (count - 1);
          const dist = Math.abs(i - cursor);
          const opacity = clamp(1 - dist * 0.35, 0.2, 1);
          pil.style.opacity = opacity;
        });

        dots.forEach((d, i) => d.classList.toggle('is-active', i === activeIndex));
      },
    });
  }

  /* ── Pattern 4: Project split-screen showcase ── */
  function registerProjectsScene() {
    const el = $('#projects');
    const slides = $$('.project-slide', el);
    const counterNum = $('.projects__current-num', el);
    const progressFill = $('.projects__progress-fill', el);
    const dots = $$('.projects__nav-dot', el);
    const count = slides.length;

    // Pin window — same sticky-pinned approach
    const pinStart = 0.15;
    const pinEnd   = 0.90;

    engine.register({
      element: el,
      id: 'projects',
      onEnter() { el.classList.add('is-active'); },
      onProgress(p) {
        const pp = clamp((p - pinStart) / (pinEnd - pinStart));
        progressFill.style.transform = `scaleX(${pp})`;

        const segment = 1 / count;
        const activeIndex = Math.min(Math.floor(pp / segment), count - 1);
        const localP = clamp((pp - activeIndex * segment) / segment);

        counterNum.textContent = String(activeIndex + 1).padStart(2, '0');
        dots.forEach((d, i) => d.classList.toggle('is-active', i === activeIndex));

        slides.forEach((slide, i) => {
          const left = slide.querySelector('.project-slide__left');
          const right = slide.querySelector('.project-slide__right');
          const bgNum = slide.querySelector('.project-slide__bg-num');

          if (i < activeIndex) {
            // Already passed — hidden
            slide.classList.remove('is-active');
            slide.style.opacity = '0';
            if (!reducedMotion) {
              left.style.transform = 'translate3d(-60px, 0, 0)';
              right.style.transform = 'translate3d(60px, 0, 0)';
            }
          } else if (i === activeIndex) {
            slide.classList.add('is-active');

            if (!reducedMotion) {
              // Enter phase: slide in from sides
              const enterP = clamp(localP * 5);
              slide.style.opacity = String(enterP);

              const leftX = (1 - enterP) * -60;
              const rightX = (1 - enterP) * 60;
              left.style.transform = `translate3d(${leftX}px, 0, 0)`;
              left.style.opacity = String(enterP);
              right.style.transform = `translate3d(${rightX}px, 0, 0)`;
              right.style.opacity = String(clamp((localP - 0.1) * 4));

              // BG number subtle parallax
              const bgScale = 1 + localP * 0.05;
              bgNum.style.transform = `translate(-50%, -50%) scale(${bgScale})`;
              bgNum.style.opacity = String(clamp(enterP * 0.6, 0, 0.5));

              // Exit phase near end of segment
              if (localP > 0.8 && i < count - 1) {
                const exitP = (localP - 0.8) / 0.2;
                slide.style.opacity = String(1 - exitP * 0.7);
                left.style.transform = `translate3d(${-exitP * 40}px, 0, 0)`;
                right.style.transform = `translate3d(${exitP * 40}px, 0, 0)`;
              }
            } else {
              slide.style.opacity = '1';
              left.style.opacity = '1';
              right.style.opacity = '1';
              left.style.transform = '';
              right.style.transform = '';
            }
          } else {
            // Upcoming — hidden
            slide.classList.remove('is-active');
            slide.style.opacity = '0';
            if (!reducedMotion) {
              left.style.transform = 'translate3d(-60px, 0, 0)';
              left.style.opacity = '0';
              right.style.transform = 'translate3d(60px, 0, 0)';
              right.style.opacity = '0';
            }
          }
        });
      },
    });
  }

  /* ── Pattern 5: Timeline draw + reveal (sticky-pinned) ── */
  function registerProcessScene() {
    const el = $('#process');
    const lineFill = $('.process__line-fill', el);
    const steps = $$('.process__step', el);
    const dots = $$('.process__dot', el);
    const count = steps.length;

    engine.register({
      element: el,
      id: 'process',
      onEnter() { el.classList.add('is-active'); },
      onProgress(p) {
        // Remap to pinned window (same approach as skills)
        const pinStart = 0.25;
        const pinEnd   = 0.85;
        const pp = clamp((p - pinStart) / (pinEnd - pinStart));

        // Draw the timeline line proportionally
        lineFill.style.transform = `scaleY(${pp})`;

        // Each step reveals sequentially within the pinned progress
        const segment = 1 / count;
        const activeIndex = Math.min(Math.floor(pp / segment), count - 1);

        steps.forEach((step, i) => {
          const stepStart = i * segment;
          const stepP = clamp((pp - stepStart) / segment);
          const visible = stepP > 0.1;

          step.classList.toggle('is-visible', visible);

          if (reducedMotion) {
            step.style.opacity = visible ? '1' : '0';
            return;
          }

          step.style.opacity = String(clamp(stepP * 2.5));
          step.style.transform = `translate3d(${(1 - clamp(stepP * 2.5)) * 30}px, 0, 0)`;
        });

        dots.forEach((d, i) => d.classList.toggle('is-active', i <= activeIndex && pp > 0));
      },
    });
  }

  /* ── Offerings (accent shift) ── */
  function registerOfferingsScene() {
    const el = $('#offerings');
    const cards = $$('.offering-card', el);

    engine.register({
      element: el,
      id: 'offerings',
      onEnter() {
        el.classList.add('is-active');
        document.body.classList.add('offerings-active');
      },
      onLeave() {
        document.body.classList.remove('offerings-active');
      },
      onProgress(p) {
        cards.forEach((card, i) => {
          const delay = i * 0.15;
          const cardP = clamp((p - delay) / (1 - delay));
          if (reducedMotion) {
            card.style.opacity = cardP > 0.2 ? '1' : '0';
            return;
          }
          card.style.opacity = clamp(cardP * 2);
          card.style.transform = `translate3d(0, ${(1 - clamp(cardP * 1.5)) * 50}px, 0)`;
        });
      },
    });
  }

  /* ── Contact (slow fade) ── */
  function registerContactScene() {
    const el = $('#contact');

    engine.register({
      element: el,
      id: 'contact',
      onEnter() { el.classList.add('is-active'); },
      onProgress(p) {
        if (reducedMotion) return;
        const heading = $('.contact__heading', el);
        const sub = $('.contact__sub', el);
        const links = $('.contact__links', el);

        heading.style.opacity = clamp(p * 3);
        heading.style.transform = `translate3d(0, ${(1 - clamp(p * 3)) * 30}px, 0)`;

        sub.style.opacity = clamp((p - 0.15) * 3);
        links.style.opacity = clamp((p - 0.3) * 2.5);
        links.style.transform = `translate3d(0, ${(1 - clamp((p - 0.3) * 2)) * 20}px, 0)`;
      },
    });
  }

  /* ── Sticky UI updates (progress bar + dots) ── */
  function registerStickyUI() {
    const progressBar = $('#progress-fill');
    const dots = $$('.dot');
    const sectionIds = ['hero', 'split-story', 'skills', 'projects', 'process', 'offerings', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const nav = $('#sticky-nav');

    engine.onFrame((s) => {
      // Progress bar
      progressBar.style.transform = `scaleY(${s.progress})`;

      // Active section dot
      let activeSec = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= s.windowH * 0.5) {
          activeSec = i;
          break;
        }
      }
      dots.forEach((d, i) => d.classList.toggle('is-active', i === activeSec));

      // Hide nav at very top
      if (s.currentY > 100) {
        nav.classList.add('is-visible');
      } else {
        nav.classList.remove('is-visible');
      }
    });
  }

  /* ═══════════════════════════════════════
     4. INIT
     ═══════════════════════════════════════ */

  function init() {
    document.body.classList.add('is-loading');
    if (reducedMotion) document.body.classList.add('reduced-motion');

    renderAll();
    initLoader();

    // Wait one frame so DOM is painted before measuring
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initScenes();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
