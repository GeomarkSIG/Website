/* Geomark SIG Solutions — comportements partagés (nav, i18n, reveal, formulaire) */

document.addEventListener('DOMContentLoaded', () => {

  /* header scroll shadow */
  const hdr = document.getElementById('hdr');
  if (hdr) window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', window.scrollY > 8));

  /* mobile nav */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* "Solutions" dropdown — click toggle (mobile) + close on outside click */
  document.querySelectorAll('.nav-item-drop').forEach(item => {
    const btn = item.querySelector('.nav-drop-btn');
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const willOpen = !item.classList.contains('open');
      document.querySelectorAll('.nav-item-drop.open').forEach(o => o !== item && o.classList.remove('open'));
      item.classList.toggle('open', willOpen);
    });
  });
  document.addEventListener('click', () => document.querySelectorAll('.nav-item-drop.open').forEach(o => o.classList.remove('open')));

  /* scroll reveal */
  const obs = new IntersectionObserver(es => {
    es.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('vis'), (i % 4) * 60); });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* language toggle (FR / EN) — persists across pages via localStorage */
  const langBtns = document.querySelectorAll('.langsw button');
  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const dict = window.I18N && window.I18N[lang];
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key] !== undefined) el.innerHTML = dict[key];
    });
    langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    document.documentElement.lang = lang;
    localStorage.setItem('gm_lang', lang);
  }
  const saved = localStorage.getItem('gm_lang') || 'fr';
  if (window.I18N) applyLang(saved);
  langBtns.forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  /* contact form (static test page, no backend) */
  const ctForm = document.getElementById('ctForm');
  if (ctForm) ctForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('fNote').classList.add('show');
  });

});
