// The legal pages carry both languages; without this script both stay visible, Turkish first.
(() => {
  const key = 'zelparo-lang';
  const hashLanguage = () => {
    const match = /^#(tr|en)(-|$)/.exec(location.hash);
    return match ? match[1] : null;
  };
  const saved = () => {
    try { const value = localStorage.getItem(key); return value === 'tr' || value === 'en' ? value : null; } catch { return null; }
  };
  const browser = () => ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase().startsWith('tr') ? 'tr' : 'en';
  function apply(lang) {
    document.documentElement.lang = lang;
    document.title = lang === 'tr' ? document.body.dataset.titleTr : document.body.dataset.titleEn;
    document.querySelectorAll('[data-lang-section]').forEach(section => { section.hidden = section.dataset.langSection !== lang; });
    document.querySelectorAll('[data-tr]').forEach(element => { element.textContent = element.dataset[lang]; });
    document.querySelectorAll('[data-label-tr]').forEach(element => { element.setAttribute('aria-label', lang === 'tr' ? element.dataset.labelTr : element.dataset.labelEn); });
    document.querySelectorAll('[data-lang]').forEach(link => {
      if (link.dataset.lang === lang) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
    });
  }
  document.querySelectorAll('[data-lang]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const lang = link.dataset.lang;
    try { localStorage.setItem(key, lang); } catch { /* the choice lasts for this page only */ }
    history.replaceState(null, '', '#' + lang);
    apply(lang);
    window.scrollTo(0, 0);
  }));
  apply(hashLanguage() || saved() || browser());
})();
