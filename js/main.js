(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  document.documentElement.classList.remove('no-js');

  /* ---------- Rok v patičce ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Navigace ---------- */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
    navLinks.classList.toggle('is-open', open);
    nav.classList.toggle('menu-open', open);
  };
  navToggle.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Zvýraznění aktuální sekce v menu
  const sectionLinks = $$('a[href^="#"]:not(.btn)', navLinks);
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sectionLinks.forEach(a => {
    const target = $(a.getAttribute('href'));
    if (target) sectionObserver.observe(target);
  });

  /* ---------- Rotující slovo v hero ---------- */
  const rotator = $('#rotator');
  const words = $$('.rotator-word', rotator);
  let wordIndex = 0;

  const fitRotator = () => {
    const active = words[wordIndex];
    rotator.style.width = `calc(${active.scrollWidth}px + .44em)`;
  };

  if (words.length > 1) {
    document.fonts?.ready.then(fitRotator);
    fitRotator();
    window.addEventListener('resize', fitRotator);

    if (!reduceMotion) {
      setInterval(() => {
        const current = words[wordIndex];
        current.classList.remove('is-active');
        current.classList.add('is-leaving');
        setTimeout(() => current.classList.remove('is-leaving'), 500);
        wordIndex = (wordIndex + 1) % words.length;
        words[wordIndex].classList.add('is-active');
        fitRotator();
      }, 2400);
    }
  }

  /* ---------- Server panel ---------- */
  const panel = $('#panel');
  const bars = $('#bars');
  const ping = $('#ping');
  const log = $('#log');

  const BAR_COUNT = 24;
  const barEls = Array.from({ length: BAR_COUNT }, () => {
    const el = document.createElement('span');
    el.style.setProperty('--h', `${20 + Math.random() * 45}%`);
    bars.appendChild(el);
    return el;
  });

  const logLines = [
    '<b>✓</b> nginx: reload OK',
    '<b>✓</b> záloha: web-01 → úložiště (2,1 GB)',
    '<b>✓</b> certbot: certifikát obnoven',
    '<b>✓</b> apt: 12 bezpečnostních aktualizací',
    '<b>✓</b> zabbix: všechny kontroly v pořádku',
    '<b>✓</b> fail2ban: zablokováno 3 IP',
    '<b>✓</b> mysql: optimalizace tabulek hotová',
    '<b>✓</b> deploy: nová verze webu nasazena',
  ];
  let logIndex = 0;
  const logBuffer = [];

  const time = () => new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const pushLog = () => {
    logBuffer.push(`<span>${time()}</span>  ${logLines[logIndex]}`);
    if (logBuffer.length > 4) logBuffer.shift();
    log.innerHTML = logBuffer.join('\n');
    logIndex = (logIndex + 1) % logLines.length;
  };
  for (let i = 0; i < 3; i++) pushLog();

  const tick = () => {
    barEls.forEach((el, i) => {
      const next = i < BAR_COUNT - 1
        ? barEls[i + 1].style.getPropertyValue('--h')
        : `${18 + Math.random() * 55}%`;
      el.style.setProperty('--h', next);
    });
    ping.textContent = 12 + Math.round(Math.random() * 14);
  };

  if (!reduceMotion) {
    let panelVisible = true;
    new IntersectionObserver(([e]) => { panelVisible = e.isIntersecting; }).observe(panel);
    setInterval(() => { if (panelVisible && !document.hidden) tick(); }, 1200);
    setInterval(() => { if (panelVisible && !document.hidden) pushLog(); }, 2600);

    // Jemné natočení panelu podle kurzoru (jen na desktopu)
    const canTilt = window.matchMedia('(hover: hover) and (min-width: 1025px)');
    panel.addEventListener('mousemove', e => {
      if (!canTilt.matches) return;
      const r = panel.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      panel.style.setProperty('--ry', `${x * 10}deg`);
      panel.style.setProperty('--rx', `${-y * 8}deg`);
    });
    panel.addEventListener('mouseleave', () => {
      panel.style.removeProperty('--ry');
      panel.style.removeProperty('--rx');
    });
  }

  /* ---------- Spotlight na kartách služeb ---------- */
  $$('[data-spotlight]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Přepínač měsíčně / ročně ---------- */
  const billingBtns = $$('.billing-btn');
  billingBtns.forEach(btn => btn.addEventListener('click', () => {
    const mode = btn.dataset.billing;
    billingBtns.forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    $$('[data-price-monthly]').forEach(el => {
      el.classList.add('is-swapping');
      setTimeout(() => {
        el.textContent = el.dataset[mode === 'yearly' ? 'priceYearly' : 'priceMonthly'];
        el.classList.remove('is-swapping');
      }, 180);
    });
    $$('[data-note-monthly]').forEach(el => {
      el.textContent = el.dataset[mode === 'yearly' ? 'noteYearly' : 'noteMonthly'];
    });
  }));

  /* ---------- Výběr balíčku předvyplní formulář ---------- */
  const packageToService = { 'Web Start': ['Web'], 'Web + péče': ['Web', 'Hosting'], 'Správa serveru': ['Správa serveru'] };
  $$('[data-package]').forEach(btn => btn.addEventListener('click', () => {
    const pkg = btn.dataset.package;
    $$('input[name="service"]').forEach(cb => { cb.checked = packageToService[pkg]?.includes(cb.value) ?? false; });
    const msg = $('#message');
    if (!msg.value.trim()) msg.value = `Dobrý den, mám zájem o balíček „${pkg}“. `;
  }));

  /* ---------- Animace při scrollu ---------- */
  const reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = $$('.reveal', entry.target.parentElement);
        const delay = Math.max(0, siblings.indexOf(entry.target)) * 70;
        entry.target.style.transitionDelay = `${Math.min(delay, 350)}ms`;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Počítadla ---------- */
  const counters = $$('[data-count]');
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      if (reduceMotion) { el.textContent = target; obs.unobserve(el); return; }
      const start = performance.now();
      const dur = 1200;
      const step = now => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: .6 });
  counters.forEach(c => countObserver.observe(c));

  /* ---------- Kontaktní formulář ---------- */
  // Bez backendu: složí e-mail a otevře poštovního klienta. Později lze napojit např. na Formspree.
  const form = $('#contactForm');
  const status = $('#formStatus');
  const CONTACT_EMAIL = 'sulakhonza@gmail.com';

  form.addEventListener('submit', e => {
    e.preventDefault();
    let firstInvalid = null;
    $$('.field', form).forEach(field => {
      const input = $('input, textarea', field);
      const ok = input.checkValidity() && input.value.trim() !== '';
      field.classList.toggle('has-error', !ok);
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      status.textContent = 'Vyplňte prosím všechna pole (e-mail ve správném tvaru).';
      status.classList.add('is-error');
      firstInvalid.focus();
      return;
    }
    status.classList.remove('is-error');

    const services = $$('input[name="service"]:checked', form).map(cb => cb.value);
    const subject = `Poptávka z webu${services.length ? ': ' + services.join(', ') : ''}`;
    const body = [
      `Jméno: ${form.elements.name.value.trim()}`,
      `E-mail: ${form.elements.email.value.trim()}`,
      services.length ? `Zájem o: ${services.join(', ')}` : null,
      '',
      form.elements.message.value.trim(),
    ].filter(line => line !== null).join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Otevírám váš e-mailový klient… Pokud se nic nestalo, napište mi přímo na ' + CONTACT_EMAIL + '.';
  });

  $$('.field input, .field textarea', form).forEach(input =>
    input.addEventListener('input', () => input.closest('.field').classList.remove('has-error'))
  );
})();
