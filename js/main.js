/* js/main.js — v4.0 */
(function () {

  /* ── CURSOR ── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();
  }

  /* ── SCROLL PROGRESS ── */
  const prog = document.getElementById('scroll-progress');
  if (prog) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      prog.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── THEME ── */
  const HTML = document.documentElement;
  const themeBtn = document.getElementById('theme-btn');

  function applyTheme(t) {
    HTML.setAttribute('data-theme', t);
    localStorage.setItem('pm-theme', t);
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (icon) icon.className = `fas ${t === 'dark' ? 'fa-moon' : 'fa-sun'}`;
  }

  applyTheme(localStorage.getItem('pm-theme') ||
    (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'));

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(HTML.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── ACTIVE NAV ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-center a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── SCROLL REVEAL ── */
  const ro = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => ro.observe(el));

  /* ── BACK TO TOP ── */
  const btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('show', scrollY > 400), { passive: true });
    btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── TOKEN STREAM ── */
  const tokenEl = document.getElementById('token-stream');
  if (tokenEl) {
    const seqs = [
      'AI Engineer · LLM Builder',
      'Multi-Agent Architect',
      'RAG Pipeline Designer',
      'LangGraph Orchestrator',
      'ML Researcher @ VIIT',
      'Problem Solver · 700+ LC',
    ];
    let si = 0, ci = 0, del = false;
    function tick() {
      const s = seqs[si];
      del ? (tokenEl.textContent = s.slice(0, --ci)) : (tokenEl.textContent = s.slice(0, ++ci));
      if (!del && ci === s.length) { del = true; return setTimeout(tick, 2200); }
      if (del && ci === 0) { del = false; si = (si + 1) % seqs.length; }
      setTimeout(tick, del ? 38 : 72);
    }
    setTimeout(tick, 900);
  }

  /* ── PROJECT FILTER ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('[data-cat]').forEach(card => {
        const show = f === 'all' || card.dataset.cat === f;
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        if (show) {
          card.style.display = 'flex';
          card.style.flexDirection = 'column';
          requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; });
        } else {
          card.style.opacity = '0'; card.style.transform = 'scale(0.97)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const status = document.getElementById('form-status');
      btn.disabled = true; btn.textContent = 'Sending...';
      try {
        const res = await fetch(form.action, { method:'POST', body: new FormData(form), headers:{'Accept':'application/json'} });
        if (res.ok) {
          status.textContent = '✓ Sent! I\'ll get back to you soon.';
          status.className = 'form-status success';
          form.reset();
        } else throw new Error();
      } catch {
        status.textContent = '✗ Something went wrong. Email me directly.';
        status.className = 'form-status error';
      }
      btn.disabled = false; btn.textContent = 'Send Message';
    });
  }

})();
