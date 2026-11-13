(() => {
  const STORE_KEY = 'zilan_professional_portfolio_v4_certificates';
  const LANG_KEY = 'zilan_professional_lang';
  const THEME_KEY = 'zilan_professional_theme';
  const AUTH_KEY = 'zilan_professional_auth';
  const ADMIN_EMAIL = 'admin@zilan.dev';
  const ADMIN_PASSWORD = 'zilan123';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const pathName = location.pathname.split('/').pop() || 'index.html';
  const isAdminLoginPage = pathName === 'admin-login.html';
  const isAdminDashboardPage = pathName === 'admin.html';
  const isAdminPage = isAdminLoginPage || isAdminDashboardPage;
  const on = (s, event, handler) => { const el = $(s); if (el) el.addEventListener(event, handler); };
  const setText = (s, value) => { const el = $(s); if (el) el.textContent = value; };
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () => `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const esc = (value = '') => String(value).replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const pick = (obj, base) => lang === 'en' && obj[`${base}En`] ? obj[`${base}En`] : obj[base];
  const norm = (value = '') => String(value).toLowerCase().replace(/\s+/g, ' ').trim();

  let data = loadData();
  let lang = localStorage.getItem(LANG_KEY) || data.settings.defaultLanguage || 'id';
  let theme = localStorage.getItem(THEME_KEY) || 'dark';
  let currentFilter = 'All';
  let currentCertFilter = 'All';
  let activeAdminTab = 'overview';
  let editing = null;

  function loadData() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : clone(window.PORTFOLIO_DATA);
    } catch {
      return clone(window.PORTFOLIO_DATA);
    }
  }
  function saveData() { localStorage.setItem(STORE_KEY, JSON.stringify(data)); }
  function t(key) { return (window.I18N[lang] && window.I18N[lang][key]) || window.I18N.id[key] || key; }
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function setTheme(next) {
    theme = next;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
    const icon = theme === 'dark' ? '☾' : '☀';
    ['#themeBtn', '#adminThemeBtn'].forEach((s) => { const b = $(s); if (b) b.textContent = icon; });
  }
  function setLang(next) {
    lang = next;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    setText('#langBtn', lang.toUpperCase());
    translateStatic();
    renderAll();
  }
  function translateStatic() {
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  }

  function init() {
    setTheme(theme);
    setLang(lang);
    bindEvents();
    route();
    setText('#year', new Date().getFullYear());
    setTimeout(() => $('#loader')?.classList.add('hide'), 650);
  }

  function bindEvents() {
    let scrollFrame = 0;
    window.addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; onScroll(); });
    }, { passive: true });
    window.addEventListener('hashchange', route);

    on('#themeBtn', 'click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
    on('#langBtn', 'click', () => setLang(lang === 'id' ? 'en' : 'id'));
    on('#menuBtn', 'click', () => $('#mobileDrawer')?.classList.toggle('show'));
    $$('#mobileDrawer a').forEach((a) => a.addEventListener('click', () => $('#mobileDrawer')?.classList.remove('show')));
    on('#projectSearch', 'input', renderProjects);
    on('#certificateSearch', 'input', renderCertificates);
    const certificateTabs = $('#certificateTabs');
    if (certificateTabs) {
      certificateTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cert-filter]');
        if (!btn) return;
        currentCertFilter = btn.dataset.certFilter || 'All';
        renderCertificateFilters();
        renderCertificates();
      });
    }
    on('#contactForm', 'submit', handleContact);
    on('#lockHero', 'click', () => {
      $('#profileLock')?.classList.toggle('locked');
      setText('#lockHero', $('#profileLock')?.classList.contains('locked') ? 'locked' : 'tap to lock');
    });

    on('#quickSearchBtn', 'click', openQuickSearch);
    on('#quickInput', 'input', renderQuickSearch);
    $$('[data-close-search]').forEach((el) => el.addEventListener('click', closeQuickSearch));
    $$('[data-close-modal]').forEach((el) => el.addEventListener('click', closeProjectModal));
    $$('[data-close-certificate]').forEach((el) => el.addEventListener('click', closeCertificateModal));
    $$('[data-close-admin]').forEach((el) => el.addEventListener('click', closeAdminModal));
    on('#loginForm', 'submit', handleLogin);
    on('#logoutBtn', 'click', () => { localStorage.removeItem(AUTH_KEY); toast('Logged out'); location.href = 'admin-login.html'; });
    on('#adminThemeBtn', 'click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
    $$('.admin-sidebar [data-admin-tab]').forEach((btn) => btn.addEventListener('click', () => { activeAdminTab = btn.dataset.adminTab; renderAdmin(); }));
    on('#adminEditForm', 'submit', saveAdminEdit);

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openQuickSearch(); }
      if (e.key === 'Escape') { closeProjectModal(); closeCertificateModal(); closeQuickSearch(); closeAdminModal(); }
    });
    const canUsePointerEffects = matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches && !isAdminPage;
    let pointerFrame = 0;
    let lastPointerEvent = null;
    document.addEventListener('mousemove', (e) => {
      if (!canUsePointerEffects) return;
      lastPointerEvent = e;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        const event = lastPointerEvent;
        const cursor = $('.cursor');
        if (cursor) { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; }
        updateSpotlight(event);
        updateTilt(event);
      });
    }, { passive: true });
  }

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = $('#scrollProgress');
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, (scrollY / max) * 100))}%`;
    $('#topbar')?.classList.toggle('scrolled', scrollY > 28);
    updateActiveNav();
  }
  function updateActiveNav() {
    const ids = ['home', 'about', 'projects', 'stack', 'certificates', 'journey', 'blog', 'contact'];
    let current = 'home';
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 170) current = id;
    });
    $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  }
  function updateSpotlight(e) {
    const card = e.target.closest('.focus-card, .stack-card, .blog-card, .project-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  }
  function updateTilt(e) {
    const card = e.target.closest('[data-tilt]');
    if (!card || matchMedia('(max-width: 900px)').matches || $('#profileLock')?.classList.contains('locked')) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(1100px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    if (!card._tiltBound) {
      card._tiltBound = true;
      card.addEventListener('mouseleave', () => { card.style.transform = ''; card._tiltBound = false; }, { once: true });
    }
  }
  function observeReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    $$('.reveal, .focus-card, .project-card, .stack-card, .journey-item, .blog-card, .cert-card').forEach((el) => io.observe(el));
  }

  function renderAll() {
    translateStatic();
    if ($('#publicApp')) {
      if ($('#focusGrid')) renderFocus();
      if ($('#filterTabs')) renderFilters();
      if ($('#projectGrid') && $('#projectSearch')) renderProjects();
      if ($('#hallRail')) renderHall();
      if ($('#stackGrid')) renderStack();
      if ($('#certificateGrid')) { renderCertificateFilters(); renderCertificates(); }
      if ($('#journeyRoad')) renderJourney();
      if ($('#blogGrid')) renderBlog();
      setTimeout(observeReveal, 30);
    }
    if ($('#quickResults')) renderQuickSearch();
    if ($('#adminApp') && !$('#adminApp').hidden) renderAdmin();
  }

  function renderFocus() {
    $('#focusGrid').innerHTML = data.focus.map((f, i) => `
      <article class="focus-card reveal" style="transition-delay:${i * 45}ms">
        <div class="icon">${esc(f.icon)}</div>
        <div><h3>${esc(f.title)}</h3><p>${esc(pick(f, 'desc'))}</p></div>
      </article>
    `).join('');
  }
  function categories() {
    return ['All', ...Array.from(new Set(data.projects.map((p) => p.category)))];
  }
  function renderFilters() {
    $('#filterTabs').innerHTML = categories().map((cat) => `<button class="${cat === currentFilter ? 'active' : ''}" data-filter="${esc(cat)}">${esc(cat)}</button>`).join('');
    $$('#filterTabs button').forEach((btn) => btn.addEventListener('click', () => { currentFilter = btn.dataset.filter; renderFilters(); renderProjects(); }));
  }
  function projectMatches(p, q) {
    const text = [p.title, p.category, pick(p, 'short'), ...p.tech].join(' ').toLowerCase();
    return (!q || text.includes(q)) && (currentFilter === 'All' || p.category === currentFilter);
  }
  function renderProjects() {
    const q = $('#projectSearch').value.trim().toLowerCase();
    const featured = data.projects.find((p) => p.featured) || data.projects[0];
    renderFeatured(featured);
    const items = data.projects.filter((p) => p.id !== featured.id && projectMatches(p, q));
    $('#projectGrid').innerHTML = items.map((p, i) => projectCard(p, i)).join('') || emptyState('No project found', 'Try another keyword or filter.');
    $$('.project-card [data-project]').forEach((btn) => btn.addEventListener('click', () => openProject(btn.dataset.project)));
    $('#featuredSystem [data-project]')?.addEventListener('click', (e) => openProject(e.currentTarget.dataset.project));
  }
  function renderFeatured(p) {
    $('#featuredSystem').innerHTML = `
      <div class="feature-media"><img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" decoding="async"></div>
      <div class="feature-copy">
        <span class="project-label">Featured / ${esc(p.category)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(pick(p, 'short'))}</p>
        <div class="tech-list">${p.tech.slice(0, 9).map((x) => `<span>${esc(x)}</span>`).join('')}</div>
        <div class="project-actions">
          <button class="primary-link" data-project="${esc(p.id)}">Open Case Study</button>
          <a class="primary-link" href="${esc(p.live)}" target="_blank" rel="noreferrer">Live</a>
          <a class="primary-link" href="${esc(p.github)}" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>`;
  }
  function projectCard(p, i) {
    return `<article class="project-card reveal" style="transition-delay:${i * 55}ms">
      <img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" decoding="async">
      <div class="project-card-body">
        <span class="project-label">${esc(p.category)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(pick(p, 'short'))}</p>
        <div class="tech-list">${p.tech.slice(0, 6).map((x) => `<span>${esc(x)}</span>`).join('')}</div>
        <div class="project-actions" style="margin-top:16px">
          <button class="primary-link" data-project="${esc(p.id)}">Detail</button>
          <a class="primary-link" href="${esc(p.github)}" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </article>`;
  }
  function openProject(id) {
    if (!$('#projectModal') || !$('#modalContent')) return;
    const p = data.projects.find((x) => x.id === id);
    if (!p) return;
    $('#modalContent').innerHTML = `
      <div class="case-hero">
        <img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" decoding="async">
        <div class="case-copy">
          <span class="project-label">${esc(p.category)}</span>
          <h2>${esc(p.title)}</h2>
          <p>${esc(pick(p, 'long'))}</p>
          <div class="tech-list">${p.tech.map((x) => `<span>${esc(x)}</span>`).join('')}</div>
          <div class="project-actions" style="margin-top:18px">
            <a class="primary-link" href="${esc(p.live)}" target="_blank" rel="noreferrer">Live Demo</a>
            <a class="primary-link" href="${esc(p.github)}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
      <div class="case-grid">
        ${caseBox('Problem', pick(p, 'problem'))}
        ${caseBox('Solution', pick(p, 'solution'))}
        ${caseBox('My Role', pick(p, 'role'))}
        ${caseBox('Architecture', p.architecture)}
        ${caseBox('Challenges', p.challenges)}
        ${caseBox('Result', p.result)}
      </div>`;
    $('#projectModal').hidden = false;
    document.body.classList.add('modal-open');
  }
  function caseBox(title, text) { return `<article class="case-box"><b>${esc(title)}</b><p>${esc(text)}</p></article>`; }
  function closeProjectModal() { if ($('#projectModal')) $('#projectModal').hidden = true; document.body.classList.remove('modal-open'); }

  function renderHall() {
    $('#hallRail').innerHTML = data.projects.map((p, i) => `
      <article class="hall-item reveal" style="transition-delay:${i * 65}ms">
        <img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" decoding="async"><span>${String(i + 1).padStart(2, '0')} / ${esc(p.title.split('—')[0].trim())}</span>
      </article>
    `).join('');
  }
  function renderStack() {
    const entries = Object.entries(data.skills);
    $('#stackGrid').innerHTML = entries.map(([group, items], i) => `
      <article class="stack-card reveal" style="transition-delay:${i * 60}ms">
        <h3>${esc(group)}</h3>
        <div class="stack-meter"><span style="width:${78 + (i % 3) * 7}%"></span></div>
        <div class="stack-tags">${items.map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div>
      </article>
    `).join('');
  }
  function renderJourney() {
    $('#journeyRoad').innerHTML = data.experiences.map((x, i) => `
      <article class="journey-item reveal" style="transition-delay:${i * 60}ms">
        <small>${esc(x.period)}</small><h3>${esc(x.title)}</h3><p>${esc(pick(x, 'desc'))}</p>
        <div class="tech-list">${x.tags.map((tag) => `<span>${esc(tag)}</span>`).join('')}</div>
      </article>
    `).join('');
  }
  function renderBlog() {
    $('#blogGrid').innerHTML = data.blog.map((b, i) => `
      <article class="blog-card reveal" style="transition-delay:${i * 70}ms">
        <div><small>${esc(b.category)} • ${esc(b.date)}</small><h3>${esc(pick(b, 'title'))}</h3><p>${esc(pick(b, 'excerpt'))}</p></div>
        <a href="#blog" class="primary-link">Read notes</a>
      </article>
    `).join('');
  }

  function certificateCategories() {
    return ['All', ...Array.from(new Set((data.certificates || []).map((c) => c.category)))];
  }
  function renderCertificateFilters() {
    const tabs = $('#certificateTabs');
    if (!tabs) return;
    if (!certificateCategories().includes(currentCertFilter)) currentCertFilter = 'All';
    tabs.innerHTML = certificateCategories().map((cat) => `<button type="button" class="${cat === currentCertFilter ? 'active' : ''}" data-cert-filter="${esc(cat)}" aria-pressed="${cat === currentCertFilter}">${esc(cat)}</button>`).join('');
  }
  function certificateMatches(c, q) {
    const text = norm([c.title, c.issuer, c.category, c.year, pick(c, 'desc')].join(' '));
    const activeCategory = currentCertFilter === 'All' || norm(c.category) === norm(currentCertFilter);
    return (!q || text.includes(q)) && activeCategory;
  }
  function renderCertificates() {
    const list = data.certificates || [];
    const q = norm($('#certificateSearch')?.value || '');
    const isFiltered = currentCertFilter !== 'All' || Boolean(q);
    const items = list.filter((c) => certificateMatches(c, q));

    setText('#certTotal', list.length);
    setText('#certFeatured', list.filter((c) => c.featured).length);
    setText('#certCategoryTotal', certificateCategories().length - 1);
    setText('#certShowing', items.length);
    setText('#certFilterLabel', currentCertFilter === 'All' ? 'All categories' : currentCertFilter);

    const featured = list.filter((c) => c.featured).slice(0, 3);
    const featuredIds = new Set(featured.map((c) => c.id));

    const featuredWrap = $('#certificateFeatured');
    if (featuredWrap) {
      if (isFiltered) {
        featuredWrap.hidden = true;
        featuredWrap.innerHTML = '';
      } else {
        featuredWrap.hidden = false;
        featuredWrap.innerHTML = featured.map((c, i) => certificateCard(c, i, true)).join('');
      }
    }

    const gridItems = isFiltered ? items : items.filter((c) => !featuredIds.has(c.id));
    if ($('#certificateGrid')) $('#certificateGrid').innerHTML = gridItems.map((c, i) => certificateCard(c, i)).join('') || emptyState('No certificate found', 'Try another keyword or category.');
    // Re-rendering certificates after filter/search creates new cards.
    // Mark them visible immediately so filtered results never look empty.
    $$('.cert-card').forEach((card) => card.classList.add('show'));
    $$('.cert-card [data-certificate]').forEach((btn) => btn.addEventListener('click', () => openCertificate(btn.dataset.certificate)));
  }
  function certificateCard(c, i, compact = false) {
    return `<article class="cert-card reveal show ${compact ? 'cert-card-featured' : ''}" style="transition-delay:${i * 55}ms">
      <div class="cert-media"><img src="${esc(c.thumbnail)}" alt="${esc(c.title)} certificate preview" loading="lazy" decoding="async"><span>${esc(c.fileType || 'PDF')}</span></div>
      <div class="cert-body">
        <small>${esc(c.category)} • ${esc(c.year)}</small>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.issuer)}</p>
        <div class="project-actions">
          <button class="primary-link" data-certificate="${esc(c.id)}">View Certificate</button>
          <a class="primary-link" href="${esc(c.file)}" target="_blank" rel="noreferrer">Open PDF</a>
        </div>
      </div>
    </article>`;
  }
  function openCertificate(id) {
    if (!$('#certificateModal') || !$('#certificateModalContent')) return;
    const c = (data.certificates || []).find((x) => x.id === id);
    if (!c) return;
    $('#certificateModalContent').innerHTML = `<div class="case-hero certificate-detail">
      <img src="${esc(c.thumbnail)}" alt="${esc(c.title)} preview" loading="lazy" decoding="async">
      <div class="case-copy">
        <span class="project-label">${esc(c.category)} / ${esc(c.fileType || 'PDF')}</span>
        <h2>${esc(c.title)}</h2>
        <p>${esc(pick(c, 'desc'))}</p>
        <div class="case-grid certificate-meta">
          ${caseBox('Issuer', c.issuer)}
          ${caseBox('Year', c.year)}
          ${caseBox('Credential Type', c.category)}
          ${caseBox('File', c.fileType || 'PDF')}
        </div>
        <div class="project-actions" style="margin-top:18px">
          <a class="primary-link" href="${esc(c.file)}" target="_blank" rel="noreferrer">Open Full PDF</a>
          <a class="primary-link" href="${esc(c.file)}" download>Download Proof</a>
        </div>
      </div>
    </div>`;
    $('#certificateModal').hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeCertificateModal() { if ($('#certificateModal')) $('#certificateModal').hidden = true; document.body.classList.remove('modal-open'); }

  function handleContact(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    data.messages.unshift({ id: uid(), name: form.get('name'), email: form.get('email'), subject: form.get('subject'), message: form.get('message'), read: false, date: new Date().toISOString().slice(0,10) });
    saveData();
    e.currentTarget.reset();
    toast(lang === 'id' ? 'Pesan berhasil disimpan di admin panel.' : 'Message saved in admin panel.');
  }

  function openQuickSearch() { if (!$('#quickSearch') || !$('#quickInput')) return; $('#quickSearch').hidden = false; $('#quickInput').focus(); renderQuickSearch(); document.body.classList.add('modal-open'); }
  function closeQuickSearch() { if ($('#quickSearch')) $('#quickSearch').hidden = true; document.body.classList.remove('modal-open'); }
  function renderQuickSearch() {
    const q = ($('#quickInput')?.value || '').toLowerCase();
    const pages = [
      { title: 'Home', href: 'index.html#home', meta: 'Page' }, { title: 'About', href: 'index.html#about', meta: 'Page' }, { title: 'Projects', href: 'index.html#projects', meta: 'Page' }, { title: 'Stack', href: 'index.html#stack', meta: 'Page' }, { title: 'Admin', href: 'admin-login.html', meta: 'CMS' },
      ...data.projects.map((p) => ({ title: p.title, href: '#projects', meta: p.category, project: p.id })),
      ...(data.certificates || []).map((c) => ({ title: c.title, href: '#certificates', meta: c.category, certificate: c.id })),
      ...Object.entries(data.skills).flatMap(([group, items]) => items.map((title) => ({ title, href: '#stack', meta: group })))
    ].filter((x) => `${x.title} ${x.meta}`.toLowerCase().includes(q)).slice(0, 12);
    if (!$('#quickResults')) return;
    $('#quickResults').innerHTML = pages.map((x) => `<div class="quick-item" data-href="${esc(x.href)}" data-project="${esc(x.project || '')}" data-certificate="${esc(x.certificate || '')}"><strong>${esc(x.title)}</strong><small>${esc(x.meta)}</small></div>`).join('') || emptyState('No result', 'Try project or skill name.');
    $$('#quickResults .quick-item').forEach((item) => item.addEventListener('click', () => {
      closeQuickSearch();
      if (item.dataset.href.includes('.html')) location.href = item.dataset.href;
      else location.hash = item.dataset.href;
      if (item.dataset.project) setTimeout(() => openProject(item.dataset.project), 250);
      if (item.dataset.certificate) setTimeout(() => openCertificate(item.dataset.certificate), 250);
    }));
  }

  function route() {
    const publicApp = $('#publicApp');
    const footer = $('.footer');
    const adminApp = $('#adminApp');
    if (!isAdminPage && (location.hash === '#admin-login' || location.hash === '#admin')) {
      location.href = 'admin-login.html';
      return;
    }
    if (isAdminPage) {
      if (publicApp) publicApp.hidden = true;
      if (footer) footer.hidden = true;
      if (adminApp) adminApp.hidden = false;
      renderAdminShell();
      return;
    }
    if (publicApp) publicApp.hidden = false;
    if (footer) footer.hidden = false;
    if (adminApp) adminApp.hidden = true;
    setTimeout(observeReveal, 40);
  }
  function renderAdminShell() {
    if (!$('#adminApp')) return;
    const auth = localStorage.getItem(AUTH_KEY) === '1';
    if (isAdminLoginPage && auth) { location.href = 'admin.html'; return; }
    if (isAdminDashboardPage && !auth) { location.href = 'admin-login.html'; return; }
    if ($('#adminLogin')) $('#adminLogin').hidden = !isAdminLoginPage;
    if ($('#adminDashboard')) $('#adminDashboard').hidden = !isAdminDashboardPage || !auth;
    if (auth && isAdminDashboardPage) renderAdmin();
  }
  function handleLogin(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('email') === ADMIN_EMAIL && fd.get('password') === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, '1');
      toast('Welcome, Admin');
      setTimeout(() => { location.href = 'admin.html'; }, 250);
    } else toast('Email atau password salah.');
  }
  function renderAdmin() {
    if (!$('#adminApp') || !$('#adminDashboard') || $('#adminApp').hidden || $('#adminDashboard').hidden) return;
    $$('.admin-sidebar [data-admin-tab]').forEach((b) => b.classList.toggle('active', b.dataset.adminTab === activeAdminTab));
    $('#adminTitle').textContent = activeAdminTab.charAt(0).toUpperCase() + activeAdminTab.slice(1);
    const map = { overview: renderOverview, profile: renderProfile, projects: renderAdminProjects, certificates: renderCertificatesAdmin, education: renderEducationAdmin, skills: renderSkillsAdmin, experience: renderExperienceAdmin, blog: renderBlogAdmin, messages: renderMessagesAdmin, settings: renderSettingsAdmin };
    $('#adminContent').innerHTML = (map[activeAdminTab] || renderOverview)();
    bindAdminContent();
  }
  function renderOverview() {
    return `<div class="admin-cards">
      ${adminCard('Projects', data.projects.length)}${adminCard('Certificates', (data.certificates || []).length)}${adminCard('Skills', Object.values(data.skills).flat().length)}${adminCard('Messages', data.messages.length)}
      ${adminCard('Languages', 'ID/EN')}${adminCard('Status', data.settings.maintenance ? 'Maintenance' : 'Live')}${adminCard('Featured', data.projects.find(p => p.featured)?.title.split('—')[0] || 'None')}${adminCard('Theme', data.settings.themeColor)}
    </div>`;
  }
  function adminCard(label, value) { return `<article class="admin-card"><small>${esc(label)}</small><b>${esc(value)}</b></article>`; }
  function renderProfile() {
    return `<div class="admin-toolbar"><h3>Manage Profile</h3><button class="btn-primary" data-edit="profile">Edit Profile</button></div>
      <div class="admin-cards">${adminCard('Name', data.profile.name)}${adminCard('Email', data.profile.email)}${adminCard('Location', data.profile.location)}${adminCard('Website', data.profile.website)}</div>`;
  }
  function renderAdminProjects() {
    return `<div class="admin-toolbar"><h3>Manage Projects</h3><button class="btn-primary" data-add="projects">Add Project</button></div>${adminTable(['Title','Category','Tech','Actions'], data.projects.map((p) => [`<strong>${esc(p.title)}</strong>`, esc(p.category), p.tech.slice(0,4).join(', '), rowActions('projects', p.id)]))}`;
  }
  function renderCertificatesAdmin() {
    const list = data.certificates || [];
    return `<div class="admin-toolbar"><h3>Manage Certificates</h3><button class="btn-primary" data-add="certificates">Add Certificate</button></div>${adminTable(['Title','Issuer','Category','Year','Actions'], list.map((c, i) => [`<strong>${esc(c.title)}</strong>`, esc(c.issuer), esc(c.category), esc(c.year), rowActions('certificates', i)]))}`;
  }
  function renderEducationAdmin() {
    return `<div class="admin-toolbar"><h3>Manage Education</h3><button class="btn-primary" data-add="education">Add Education</button></div>${adminTable(['Period','Title','Subtitle','Actions'], data.education.map((x, i) => [esc(x.period), `<strong>${esc(x.title)}</strong>`, esc(x.subtitle), rowActions('education', i)]))}`;
  }
  function renderSkillsAdmin() {
    const rows = Object.entries(data.skills).map(([group, items]) => [esc(group), esc(items.join(', ')), rowActions('skills', group)]);
    return `<div class="admin-toolbar"><h3>Manage Skills</h3><button class="btn-primary" data-add="skills">Add Group</button></div>${adminTable(['Category','Skills','Actions'], rows)}`;
  }
  function renderExperienceAdmin() {
    return `<div class="admin-toolbar"><h3>Manage Experience</h3><button class="btn-primary" data-add="experience">Add Experience</button></div>${adminTable(['Period','Title','Tags','Actions'], data.experiences.map((x, i) => [esc(x.period), `<strong>${esc(x.title)}</strong>`, esc(x.tags.join(', ')), rowActions('experience', i)]))}`;
  }
  function renderBlogAdmin() {
    return `<div class="admin-toolbar"><h3>Manage Blog</h3><button class="btn-primary" data-add="blog">Add Blog</button></div>${adminTable(['Title','Category','Date','Actions'], data.blog.map((x, i) => [`<strong>${esc(x.title)}</strong>`, esc(x.category), esc(x.date), rowActions('blog', i)]))}`;
  }
  function renderMessagesAdmin() {
    return `<div class="admin-toolbar"><h3>Contact Messages</h3><button class="btn-line" data-clear-messages>Clear Read</button></div>${adminTable(['Name','Email','Subject','Status','Actions'], data.messages.map((m) => [`<strong>${esc(m.name)}</strong>`, esc(m.email), esc(m.subject), m.read ? 'Read' : 'Unread', `<button class="mini-btn" data-read-message="${esc(m.id)}">Read</button><button class="mini-btn danger" data-delete-message="${esc(m.id)}">Delete</button>`]))}`;
  }
  function renderSettingsAdmin() {
    return `<div class="admin-toolbar"><h3>Website Settings</h3><button class="btn-primary" data-edit="settings">Edit Settings</button></div>
      <div class="admin-cards">${adminCard('Site Title', data.settings.siteTitle)}${adminCard('SEO Title', data.settings.seoTitle)}${adminCard('Default Language', data.settings.defaultLanguage.toUpperCase())}${adminCard('Maintenance', data.settings.maintenance ? 'On' : 'Off')}</div>`;
  }
  function adminTable(headers, rows) {
    return `<div class="admin-table-wrap"><table class="admin-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${headers.length}">${emptyState('No data', 'Add new content from admin panel.')}</td></tr>`}</tbody></table></div>`;
  }
  function rowActions(type, id) { return `<div class="table-actions"><button class="mini-btn" data-edit-type="${esc(type)}" data-edit-id="${esc(id)}">Edit</button><button class="mini-btn danger" data-delete-type="${esc(type)}" data-delete-id="${esc(id)}">Delete</button></div>`; }

  function bindAdminContent() {
    $$('[data-edit="profile"]').forEach((b) => b.addEventListener('click', () => openAdminModal('profile')));
    $$('[data-edit="settings"]').forEach((b) => b.addEventListener('click', () => openAdminModal('settings')));
    $$('[data-add]').forEach((b) => b.addEventListener('click', () => openAdminModal(b.dataset.add, null, true)));
    $$('[data-edit-type]').forEach((b) => b.addEventListener('click', () => openAdminModal(b.dataset.editType, b.dataset.editId)));
    $$('[data-delete-type]').forEach((b) => b.addEventListener('click', () => deleteAdminItem(b.dataset.deleteType, b.dataset.deleteId)));
    $$('[data-read-message]').forEach((b) => b.addEventListener('click', () => readMessage(b.dataset.readMessage)));
    $$('[data-delete-message]').forEach((b) => b.addEventListener('click', () => { data.messages = data.messages.filter(m => m.id !== b.dataset.deleteMessage); saveData(); renderAdmin(); renderAll(); toast('Message deleted'); }));
    $('[data-clear-messages]')?.addEventListener('click', () => { data.messages = data.messages.filter(m => !m.read); saveData(); renderAdmin(); toast('Read messages cleared'); });
  }
  function openAdminModal(type, id = null, isAdd = false) {
    editing = { type, id, isAdd };
    $('#editModalTitle').textContent = `${isAdd ? 'Add' : 'Edit'} ${type}`;
    $('#editModalFields').innerHTML = fieldsFor(type, id, isAdd);
    if ($('#adminModal')) $('#adminModal').hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeAdminModal() { if ($('#adminModal')) $('#adminModal').hidden = true; document.body.classList.remove('modal-open'); editing = null; }
  function input(name, label, value = '', textarea = false) {
    return `<label>${esc(label)}${textarea ? `<textarea name="${esc(name)}">${esc(value)}</textarea>` : `<input name="${esc(name)}" value="${esc(value)}">`}</label>`;
  }
  function fieldsFor(type, id, isAdd) {
    if (type === 'profile') return `<div class="admin-form-grid">${input('name','Name',data.profile.name)}${input('email','Email',data.profile.email)}${input('headline','Headline',data.profile.headline)}${input('website','Website',data.profile.website)}${input('github','GitHub',data.profile.github)}${input('linkedin','LinkedIn',data.profile.linkedin)}${input('cv','CV URL',data.profile.cv)}${input('location','Location',data.profile.location)}</div>`;
    if (type === 'settings') return `<div class="admin-form-grid">${input('siteTitle','Site Title',data.settings.siteTitle)}${input('seoTitle','SEO Title',data.settings.seoTitle)}${input('seoDescription','SEO Description',data.settings.seoDescription)}${input('themeColor','Theme Color',data.settings.themeColor)}<label>Default Language<select name="defaultLanguage"><option value="id" ${data.settings.defaultLanguage==='id'?'selected':''}>ID</option><option value="en" ${data.settings.defaultLanguage==='en'?'selected':''}>EN</option></select></label><label>Maintenance<select name="maintenance"><option value="false" ${!data.settings.maintenance?'selected':''}>Off</option><option value="true" ${data.settings.maintenance?'selected':''}>On</option></select></label></div>`;
    if (type === 'projects') {
      const p = isAdd ? { title:'New Project', category:'Academic Project', image:'assets/project-astraea.png', short:'Short description', long:'Long description', tech:['Next.js'], live:'#', github:'#', featured:false } : data.projects.find(x => x.id === id);
      return `${input('title','Title',p.title)}${input('category','Category',p.category)}${input('image','Image Path',p.image)}${input('short','Short Description',p.short,true)}${input('long','Long Description',p.long,true)}${input('tech','Tech Stack (comma separated)',(p.tech||[]).join(', '))}${input('live','Live URL',p.live)}${input('github','GitHub URL',p.github)}<label>Featured<select name="featured"><option value="false" ${!p.featured?'selected':''}>No</option><option value="true" ${p.featured?'selected':''}>Yes</option></select></label>`;
    }
    if (type === 'certificates') { const x = isAdd ? {title:'New Certificate', issuer:'Issuer', year:new Date().getFullYear(), category:'Technical Skills', file:'assets/certificates/files/laravel-php-development.pdf', thumbnail:'assets/certificates/thumbs/laravel-php-development.webp', fileType:'PDF', desc:'Short description', featured:false} : data.certificates[Number(id)]; return `${input('title','Certificate Title',x.title)}${input('issuer','Issuer',x.issuer)}${input('year','Year',x.year)}${input('category','Category',x.category)}${input('file','File URL',x.file)}${input('thumbnail','Thumbnail URL',x.thumbnail)}${input('fileType','File Type',x.fileType || 'PDF')}<label>Featured<select name="featured"><option value="false" ${!x.featured?'selected':''}>No</option><option value="true" ${x.featured?'selected':''}>Yes</option></select></label>${input('desc','Description',x.desc,true)}`; }
    if (type === 'education') { const x = isAdd ? {period:'2026', title:'New Education', subtitle:'Major', desc:'Description', tags:['Tag']} : data.education[Number(id)]; return `${input('period','Period',x.period)}${input('title','Title',x.title)}${input('subtitle','Subtitle',x.subtitle)}${input('desc','Description',x.desc,true)}${input('tags','Tags',x.tags.join(', '))}`; }
    if (type === 'skills') { const group = isAdd ? 'New Group' : id; return `${input('group','Category',group)}${input('items','Skills (comma separated)',isAdd ? 'Skill 1, Skill 2' : data.skills[group].join(', '),true)}`; }
    if (type === 'experience') { const x = isAdd ? {period:'Period', title:'New Experience', desc:'Description', tags:['Tag']} : data.experiences[Number(id)]; return `${input('period','Period',x.period)}${input('title','Title',x.title)}${input('desc','Description',x.desc,true)}${input('tags','Tags',x.tags.join(', '))}`; }
    if (type === 'blog') { const x = isAdd ? {title:'New Blog', category:'Learning Notes', date:new Date().toISOString().slice(0,10), excerpt:'Excerpt'} : data.blog[Number(id)]; return `${input('title','Title',x.title)}${input('category','Category',x.category)}${input('date','Date',x.date)}${input('excerpt','Excerpt',x.excerpt,true)}`; }
    return '';
  }
  function saveAdminEdit(e) {
    e.preventDefault();
    if (!editing) return;
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
    const arr = (v) => String(v || '').split(',').map(s => s.trim()).filter(Boolean);
    const { type, id, isAdd } = editing;
    if (type === 'profile') Object.assign(data.profile, fd);
    if (type === 'settings') Object.assign(data.settings, { ...fd, maintenance: fd.maintenance === 'true' });
    if (type === 'projects') {
      const item = { id: isAdd ? uid() : id, title: fd.title, category: fd.category, image: fd.image, short: fd.short, long: fd.long, tech: arr(fd.tech), live: fd.live, github: fd.github, featured: fd.featured === 'true', problem: 'Define the problem.', solution: 'Define the solution.', role: 'Define your role.', architecture: 'Define architecture.', challenges: 'Define challenges.', result: 'Define result.' };
      if (item.featured) data.projects.forEach(p => p.featured = false);
      if (isAdd) data.projects.unshift(item); else Object.assign(data.projects.find(p => p.id === id), item);
    }
    if (type === 'certificates') { const item = { id: isAdd ? uid() : (data.certificates[Number(id)]?.id || uid()), title: fd.title, issuer: fd.issuer, year: fd.year, category: fd.category, file: fd.file, thumbnail: fd.thumbnail, fileType: fd.fileType || 'PDF', desc: fd.desc, featured: fd.featured === 'true' }; if (!data.certificates) data.certificates = []; isAdd ? data.certificates.unshift(item) : Object.assign(data.certificates[Number(id)], item); }
    if (type === 'education') { const item = { period: fd.period, title: fd.title, subtitle: fd.subtitle, desc: fd.desc, tags: arr(fd.tags) }; isAdd ? data.education.push(item) : Object.assign(data.education[Number(id)], item); }
    if (type === 'skills') { if (!isAdd && id !== fd.group) delete data.skills[id]; data.skills[fd.group] = arr(fd.items); }
    if (type === 'experience') { const item = { period: fd.period, title: fd.title, desc: fd.desc, tags: arr(fd.tags) }; isAdd ? data.experiences.push(item) : Object.assign(data.experiences[Number(id)], item); }
    if (type === 'blog') { const item = { title: fd.title, category: fd.category, date: fd.date, excerpt: fd.excerpt }; isAdd ? data.blog.unshift(item) : Object.assign(data.blog[Number(id)], item); }
    saveData(); closeAdminModal(); renderAll(); renderAdmin(); toast('Saved successfully');
  }
  function deleteAdminItem(type, id) {
    if (!confirm('Delete this item?')) return;
    if (type === 'projects') data.projects = data.projects.filter(p => p.id !== id);
    if (type === 'certificates') data.certificates.splice(Number(id), 1);
    if (type === 'education') data.education.splice(Number(id), 1);
    if (type === 'skills') delete data.skills[id];
    if (type === 'experience') data.experiences.splice(Number(id), 1);
    if (type === 'blog') data.blog.splice(Number(id), 1);
    saveData(); renderAll(); renderAdmin(); toast('Deleted');
  }
  function readMessage(id) {
    const m = data.messages.find(x => x.id === id);
    if (!m) return;
    m.read = true; saveData();
    alert(`${m.name} <${m.email}>\n${m.subject}\n\n${m.message}`);
    renderAdmin();
  }
  function emptyState(title, desc) { return `<div style="padding:28px;border:1px dashed var(--line);border-radius:22px;color:var(--muted)"><strong style="color:var(--text)">${esc(title)}</strong><p>${esc(desc)}</p></div>`; }

  init();
})();
