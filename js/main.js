/* ── js/main.js ── shared across all pages ── */

(function () {

  /* ── 1. THEME ── */
  const HTML = document.documentElement;
  const themeBtn = document.getElementById('theme-btn');
  const ICON_DARK = 'fa-moon';
  const ICON_LIGHT = 'fa-sun';

  function getStoredTheme() {
    return localStorage.getItem('pm-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    HTML.setAttribute('data-theme', theme);
    localStorage.setItem('pm-theme', theme);
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (!icon) return;
    icon.className = `fas ${theme === 'dark' ? ICON_DARK : ICON_LIGHT}`;
  }

  // Apply immediately to avoid flash
  applyTheme(getStoredTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = HTML.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }


  /* ── 2. ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-center a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });


  /* ── 3. SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObs.observe(el));


  /* ── 4. BACK TO TOP ── */
  const btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  /* ── 5. TYPING ANIMATION (hero only) ── */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const words = ['AI Engineer', 'ML Researcher', 'LangGraph Builder', 'RAG Architect', 'Problem Solver'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
      const word = words[wi];
      if (!deleting) {
        typingEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typingEl.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 55 : 95);
    }
    setTimeout(type, 800);
  }


  /* ── 6. PROJECT FILTER ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-cat]');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          const match = filter === 'all' || card.dataset.cat === filter;
          card.style.transition = 'opacity 0.3s, transform 0.3s';
          if (match) {
            card.style.display = 'flex';
            requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => { if (!match) card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }


  /* ── 7. CONTACT FORM ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const status = document.getElementById('form-status');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          status.textContent = '✓ Message sent! I\'ll get back to you soon.';
          status.className = 'form-status success';
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        status.textContent = '✗ Something went wrong. Email me directly.';
        status.className = 'form-status error';
      }
      btn.disabled = false;
      btn.textContent = 'Send Message';
    });
  }

})();
