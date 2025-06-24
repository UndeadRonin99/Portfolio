// ======= INITIALIZE YEAR =======
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ======= INIT AOS (Animate on Scroll) =======
AOS.init({
  duration: 800,
  once: true
});

// ======= TYPED EFFECT =======
new Typed('#typed', {
  strings: ['Full‑Stack Developer', 'Software Architect', 'Tech Enthusiast'],
  typeSpeed: 60,
  backSpeed: 30,
  loop: true
});

// ======= LOAD GITHUB REPOSITORIES =======
async function loadRepos() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  try {
    const res = await fetch('https://api.github.com/users/UndeadRonin99/repos?per_page=100');
    const data = await res.json();

    const repos = data
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description provided.'}</p>
        <div class="project-meta">
          <span><i class="fa-solid fa-code"></i> ${repo.language || 'N/A'}</span>
          <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="btn secondary" style="margin-top:1rem;">GitHub ↗</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load GitHub repos:', err);
    container.innerHTML = '<p style="color: var(--muted);">Unable to fetch projects at the moment.</p>';
  }
}

/* === PARTICLE BACKGROUND ==================================== */
particlesJS('particles-js', {
  particles: {
    number:  { value: 80, density: { enable: true, value_area: 800 } },
    color:   { value: '#3fa9f5' },          // match your --primary token
    shape:   { type: 'circle' },
    opacity: { value: 0.35 },
    size:    { value: 3, random: true },
    move:    { enable: true, speed: 1 }
  },
  interactivity: {
        detect_on: "window",          //  ⬅  add this line

    events: { onhover: { enable: true, mode: 'repulse' } },
    modes:  { repulse: { distance: 100 } }
  },
  retina_detect: true
});


/* === keep the canvas riding along with scroll === */
const canvas = document.getElementById('particles-js');

function syncCanvas(){
  canvas.style.transform = `translateY(${window.scrollY}px)`;
}

document.addEventListener('DOMContentLoaded', loadRepos);


