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

  /* cookie consent (RGPD) + Google Analytics, chargé uniquement après accord */
  const GA_ID = 'G-1R683QQMPG';
  function loadGA() {
    if (window.gtag) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  const cookieTexts = {
    fr: {
      txt: 'Ce site utilise Google Analytics pour mesurer l\'audience (statistiques de visite). Ces cookies ne sont déposés qu\'avec votre accord. <a href="mentions-legales.html#cookies">En savoir plus</a>.',
      refuse: 'Refuser', accept: 'Accepter'
    },
    en: {
      txt: 'This site uses Google Analytics to measure audience (visit statistics). These cookies are only set with your consent. <a href="mentions-legales.html#cookies">Learn more</a>.',
      refuse: 'Decline', accept: 'Accept'
    }
  };

  window.gmOpenCookieBanner = function () {
    document.getElementById('cookieBanner')?.remove();
    const lang = localStorage.getItem('gm_lang') || 'fr';
    const t = cookieTexts[lang] || cookieTexts.fr;
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.innerHTML =
      '<div class="cookie-banner-in">' +
        '<p class="cookie-banner-txt">' + t.txt + '</p>' +
        '<div class="cookie-banner-btns">' +
          '<button type="button" class="btn btn-outline-l" id="cookieRefuse">' + t.refuse + '</button>' +
          '<button type="button" class="btn btn-orange" id="cookieAccept">' + t.accept + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    document.getElementById('cookieAccept').addEventListener('click', () => {
      localStorage.setItem('gm_cookie_consent', 'accepted');
      banner.remove();
      loadGA();
    });
    document.getElementById('cookieRefuse').addEventListener('click', () => {
      localStorage.setItem('gm_cookie_consent', 'refused');
      banner.remove();
    });
  };

  const consent = localStorage.getItem('gm_cookie_consent');
  if (consent === 'accepted') loadGA();
  else if (consent !== 'refused') window.gmOpenCookieBanner();

});
