(() => {
  "use strict";

  const ICONS = {
    home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2Z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9Z"/>',
    inbox: '<path d="M4 4h16v16H4zM4 14h4l1.5 2h5L16 14h4"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 21c.6-4 3.1-6 7.5-6s6.9 2 7.5 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    heart: '<path d="M20.8 8.8c0 5.4-8.8 10-8.8 10s-8.8-4.6-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z"/>',
    comment: '<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3.5-.8L4 20l1.2-3.6A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/>',
    bookmark: '<path d="M6 4h12v17l-6-4-6 4Z"/>',
    share: '<path d="m20 4-7 16-3.5-7L4 9.5Z"/><path d="M9.5 13 20 4"/>',
    music: '<path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/>',
    play: '<path d="m9 6 9 6-9 6Z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    volume: '<path d="M4 10v4h4l5 4V6l-5 4Z"/><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11"/>',
    "volume-off": '<path d="M4 10v4h4l5 4V6l-5 4ZM18 9l-5 6M13 9l5 6"/>',
    more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
    expand: '<path d="M8 4H4v4M16 4h4v4M20 16v4h-4M4 16v4h4"/><path d="M4 4l6 6M20 4l-6 6M20 20l-6-6M4 20l6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    "arrow-left": '<path d="M19 12H5m6 6-6-6 6-6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    send: '<path d="m4 4 17 8-17 8 3-8Z"/><path d="M7 12h14"/>',
    camera: '<path d="M4 7h4l1.5-2h5L16 7h4v12H4Z"/><circle cx="12" cy="13" r="3.5"/>',
    upload: '<path d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.4h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1Z"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.1 2.1c-1 .7-1.6 1.2-1.6 2.4M12 17h.01"/>',
    logout: '<path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"/>',
    trash: '<path d="M5 7h14M10 11v5M14 11v5M7 7l1 13h8l1-13M9 7V4h6v3"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>'
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function iconMarkup(name) {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.more}</svg>`;
  }

  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach((element) => {
      element.innerHTML = iconMarkup(element.dataset.icon);
    });
  }

  function renderChrome() {
    const page = document.body.dataset.page || 'feed';
    const active = (key) => page === key || (page === 'chat' && key === 'messages') || (page === 'reel' && key === 'feed');
    const navItems = [
      ['feed', 'index.html', 'home', 'Para ti'],
      ['explore', 'explore.html', 'compass', 'Explorar'],
      ['messages', 'messages.html', 'inbox', 'Mensajes'],
      ['profile', 'profile.html', 'user', 'Perfil']
    ];
    const sidebar = $('[data-sidebar]');
    if (sidebar) {
      sidebar.innerHTML = `
        <a class="brand" href="index.html"><span class="brand-mark">L</span><span>loop</span></a>
        <nav class="nav-group" aria-label="Navegación principal">
          ${navItems.map(([key, href, icon, label]) => `<a class="nav-link ${active(key) ? 'active' : ''}" href="${href}">${iconMarkup(icon)}<span>${label}</span>${key === 'messages' ? '<span class="nav-badge">3</span>' : ''}</a>`).join('')}
        </nav>
        <div class="sidebar-rule"></div>
        <button class="create-button" type="button" data-toast="La creación de videos estará disponible pronto">${iconMarkup('plus')}Crear</button>
        <nav class="nav-group" aria-label="Navegación secundaria">
          <a class="nav-link ${page === 'trends' ? 'active' : ''}" href="trends.html">${iconMarkup('compass')}Tendencias</a>
          <a class="nav-link ${page === 'sounds' ? 'active' : ''}" href="sounds.html">${iconMarkup('music')}Sounds</a>
          <a class="nav-link ${page === 'settings' ? 'active' : ''}" href="settings.html">${iconMarkup('settings')}Configuración</a>
        </nav>
        <div class="sidebar-bottom"><div class="user-mini"><div class="avatar">JV</div><div><strong>juan.vazquez</strong><span>Cuenta personal</span></div>${iconMarkup('more')}</div></div>`;
    }

    const mobileHeader = $('[data-mobile-header]');
    if (mobileHeader) {
      mobileHeader.innerHTML = `<div class="mobile-brand"><span class="brand-mark">L</span>loop</div><div class="mobile-header-actions"><button class="mobile-icon" type="button" data-toast="Buscar videos">${iconMarkup('search')}</button><button class="mobile-icon" type="button" data-toast="No tienes notificaciones nuevas">${iconMarkup('bell')}</button></div>`;
    }

    const bottom = $('[data-mobile-bottom]');
    if (bottom) {
      const items = [
        ['feed', 'index.html', 'home', 'Inicio'],
        ['explore', 'explore.html', 'compass', 'Explorar'],
        ['create', 'create.html', 'plus', ''],
        ['messages', 'messages.html', 'inbox', 'Mensajes'],
        ['profile', 'profile.html', 'user', 'Perfil']
      ];
      bottom.innerHTML = items.map(([key, href, icon, label]) => key === 'create'
        ? `<a class="create-mobile ${active(key) ? 'active' : ''}" href="${href}" aria-label="Crear">${iconMarkup(icon)}</a>`
        : `<a class="${active(key) ? 'active' : ''}" href="${href}">${iconMarkup(icon)}<span>${label}</span></a>`).join('');
    }
  }

  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function initGenericActions() {
    $$('[data-toast]').forEach((button) => button.addEventListener('click', () => showToast(button.dataset.toast)));
    $$('[data-like]').forEach((button) => button.addEventListener('click', (event) => {
      event.stopPropagation();
      button.classList.toggle('liked');
      showToast(button.classList.contains('liked') ? 'Añadido a tus Me gusta' : 'Quitado de Me gusta');
    }));
    $$('[data-save]').forEach((button) => button.addEventListener('click', (event) => {
      event.stopPropagation();
      button.classList.toggle('saved');
      const label = $('span:last-child', button);
      if (label) label.textContent = button.classList.contains('saved') ? 'Guardado' : 'Guardar';
      showToast(button.classList.contains('saved') ? 'Video guardado' : 'Video quitado de guardados');
    }));
    $$('[data-follow]').forEach((button) => button.addEventListener('click', (event) => {
      event.stopPropagation();
      button.classList.toggle('following');
      button.textContent = button.classList.contains('following') ? 'Siguiendo' : 'Seguir';
      showToast(button.classList.contains('following') ? 'Creator agregado' : 'Creator removido');
    }));
    $$('[data-share]').forEach((button) => button.addEventListener('click', async (event) => {
      event.stopPropagation();
      try {
        await navigator.clipboard.writeText(location.href);
        showToast('Enlace copiado al portapapeles');
      } catch {
        showToast('Enlace listo para compartir');
      }
    }));
    $$('[data-sound-toggle]').forEach((button) => button.addEventListener('click', () => {
      button.classList.toggle('muted');
      button.innerHTML = iconMarkup(button.classList.contains('muted') ? 'volume-off' : 'volume');
      showToast(button.classList.contains('muted') ? 'Sonido silenciado' : 'Sonido activado');
    }));
    $$('[data-fullscreen]').forEach((button) => button.addEventListener('click', async (event) => {
      event.stopPropagation();
      const target = button.closest('.reel') || $('.reel');
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else if (target?.requestFullscreen) await target.requestFullscreen();
        else showToast('Pantalla completa no disponible en este navegador');
      } catch {
        showToast('No se pudo activar la pantalla completa');
      }
    }));
    document.addEventListener('fullscreenchange', () => {
      $$('[data-fullscreen]').forEach((button) => { button.innerHTML = iconMarkup('expand'); });
    });
  }

  function initFullscreenGestures() {
    const toggle = async (target) => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else if (target?.requestFullscreen) {
          await target.requestFullscreen();
        } else if (target?.webkitRequestFullscreen) {
          target.webkitRequestFullscreen();
        } else {
          showToast('Pantalla completa no disponible en este navegador');
        }
      } catch {
        showToast('No se pudo activar la pantalla completa');
      }
    };

    $$('.reel').forEach((reel) => {
      const video = $('.reel-video', reel);
      if (!video) return;
      let lastTap = 0;
      let lastActivation = 0;
      const activate = () => {
        const now = Date.now();
        if (now - lastActivation < 500) return;
        lastActivation = now;
        toggle(reel);
      };
      video.addEventListener('dblclick', (event) => {
        event.preventDefault();
        event.stopPropagation();
        activate();
      });
      video.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTap < 340) {
          event.preventDefault();
          event.stopPropagation();
          activate();
        }
        lastTap = now;
      }, { passive: false });
    });

    $$('[data-fullscreen-volume]').forEach((button) => button.addEventListener('click', (event) => {
      event.stopPropagation();
      const video = $('.reel-video', button.closest('.reel'));
      if (!video) return;
      video.muted = !video.muted;
      if (!video.muted && video.volume === 0) video.volume = 0.75;
      button.innerHTML = iconMarkup(video.muted ? 'volume-off' : 'volume');
    }));
  }

  function initFeed() {
    const feed = $('#reels');
    if (!feed) return;
    const reels = $$('.reel', feed);
    const videos = $$('.reel-video', feed);
    const counter = $('[data-reel-counter]');
    let current = 0;
    let touchStartY = 0;
    let wheelLock = false;

    videos.forEach((video) => {
      const maxSeconds = Number(video.dataset.maxSeconds || 30);
      video.addEventListener('loadedmetadata', () => {
        if (Number.isFinite(video.duration) && video.duration > maxSeconds) video.currentTime = 0;
      });
      video.addEventListener('timeupdate', () => {
        if (video.currentTime >= maxSeconds) video.currentTime = 0;
      });
    });

    const syncVideos = (activeIndex) => {
      videos.forEach((video, index) => {
        if (index === activeIndex) video.play().catch(() => {});
        else video.pause();
      });
    };

    const update = (index) => {
      current = Math.max(0, Math.min(index, reels.length - 1));
      reels.forEach((reel, i) => reel.classList.toggle('is-active', i === current));
      if (counter) counter.textContent = `${current + 1} / ${reels.length}`;
      reels.forEach((reel, i) => $$('.reel-progress span', reel).forEach((node, j) => node.classList.toggle('active', i === current && j === 0)));
      syncVideos(current);
    };
    const goTo = (index) => {
      const next = Math.max(0, Math.min(index, reels.length - 1));
      if (!reels[next]) return;
      reels[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
      update(next);
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) update(reels.indexOf(visible.target));
    }, { root: feed, threshold: [0.55, 0.75] });
    reels.forEach((reel) => observer.observe(reel));
    feed.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      goTo(current + (event.deltaY > 0 ? 1 : -1));
      setTimeout(() => { wheelLock = false; }, 520);
    }, { passive: false });
    feed.addEventListener('touchstart', (event) => { touchStartY = event.changedTouches[0].clientY; }, { passive: true });
    feed.addEventListener('touchend', (event) => {
      const delta = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(delta) > 45) goTo(current + (delta > 0 ? 1 : -1));
    }, { passive: true });
    feed.addEventListener('click', (event) => {
      if (event.target.closest('button, a')) return;
      const reel = event.currentTarget.querySelector('.reel.is-active') || event.currentTarget.querySelector('.reel');
      if (reel) {
        const paused = reel.classList.toggle('paused');
        const video = $('.reel-video', reel);
        if (video) {
          if (paused) video.pause();
          else video.play().catch(() => {});
        }
      }
    });
    $$('[data-reel-prev]').forEach((button) => button.addEventListener('click', () => goTo(current - 1)));
    $$('[data-reel-next]').forEach((button) => button.addEventListener('click', () => goTo(current + 1)));
    document.addEventListener('keydown', (event) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') { event.preventDefault(); goTo(current + 1); }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); goTo(current - 1); }
    });
    update(0);
  }

  function initComments() {
    const backdrop = $('#sheetBackdrop');
    const sheet = $('#commentSheet');
    if (!backdrop || !sheet) return;
    const open = () => { backdrop.classList.add('open'); sheet.classList.add('open'); sheet.setAttribute('aria-hidden', 'false'); $('#commentInput', sheet)?.focus(); };
    const close = () => { backdrop.classList.remove('open'); sheet.classList.remove('open'); sheet.setAttribute('aria-hidden', 'true'); };
    $$('[data-comments-open]').forEach((button) => button.addEventListener('click', open));
    $$('[data-comments-close]').forEach((button) => button.addEventListener('click', close));
    backdrop.addEventListener('click', close);
    $('#commentForm', sheet)?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = $('#commentInput', sheet);
      if (input?.value.trim()) { showToast('Comentario publicado'); input.value = ''; }
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  }

  function initChat() {
    const form = $('[data-chat-form]');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = $('input', form);
      const messages = $('[data-chat-messages]');
      if (!input?.value.trim() || !messages) return;
      const bubble = document.createElement('div');
      bubble.className = 'bubble mine';
      bubble.innerHTML = `${escapeHtml(input.value.trim())}<time>Ahora</time>`;
      messages.appendChild(bubble);
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
    });
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function initSearch() {
    $$('[data-search-input]').forEach((input) => {
      input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        const scope = $(input.dataset.searchTarget || 'body');
        if (!scope) return;
        $$('[data-filter-item]', scope).forEach((item) => {
          item.hidden = query && !item.textContent.toLowerCase().includes(query);
        });
      });
    });
  }

  function initTabs() {
    $$('[data-tab-button]').forEach((button) => button.addEventListener('click', () => {
      const group = button.closest('[data-tab-group]');
      if (!group) return;
      $$('[data-tab-button]', group).forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const target = button.dataset.tabButton;
      $$('[data-tab-panel]', group).forEach((panel) => panel.hidden = panel.dataset.tabPanel !== target);
    }));
  }

  function initCreate() {
    const record = $('[data-record]');
    if (!record) return;
    record.addEventListener('click', () => {
      const active = record.classList.toggle('recording');
      $('.create-label', record.parentElement)?.replaceChildren(document.createTextNode(active ? 'Grabando... tocá para detener' : 'Tocá para grabar'));
      showToast(active ? 'Grabación iniciada' : 'Video guardado en borradores');
    });
  }

  function initToggles() {
    $$('[data-toggle]').forEach((input) => input.addEventListener('change', () => showToast(input.checked ? 'Preferencia activada' : 'Preferencia desactivada')));
  }

  function registerWorker() {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  renderChrome();
  hydrateIcons();
  initGenericActions();
  initFullscreenGestures();
  initFeed();
  initComments();
  initChat();
  initSearch();
  initTabs();
  initCreate();
  initToggles();
  registerWorker();
})();
