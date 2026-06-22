// ============================================
// InvestPro — main.js
// Controle de menu, interações e utilitários
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- MENU HAMBURGER ---- */
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks  = document.querySelector('.navbar__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const open = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', open);
    });

    // Fechar ao clicar em link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---- ACTIVE NAV LINK ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- ANIMAÇÃO DE BARRAS (about-visual) ---- */
  const bars = document.querySelectorAll('.bar-fill');
  if (bars.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.dataset.width;
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => {
      bar.dataset.width = bar.style.width;
      bar.style.width = '0';
      observer.observe(bar);
    });
  }

  /* ---- TICKER ANIMADO (hero) ---- */
  const tickerValue = document.getElementById('tickerValue');
  if (tickerValue) {
    let base = 148293.42;
    setInterval(() => {
      const delta = (Math.random() - 0.48) * 25;
      base = Math.max(0, base + delta);
      tickerValue.textContent = 'R$ ' + base.toLocaleString('pt-BR', {
        minimumFractionDigits: 2, maximumFractionDigits: 2
      });
    }, 2000);
  }

  /* ---- POP-UP DE ATIVO (index) ---- */
  const assetCards = document.querySelectorAll('.asset-card');
  const modal      = document.getElementById('assetModal');
  const modalClose = document.getElementById('modalClose');

  if (assetCards.length && modal) {
    assetCards.forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById('modalName').textContent   = card.dataset.name   || '—';
        document.getElementById('modalPrice').textContent  = card.dataset.price  || '—';
        document.getElementById('modalChange').textContent = card.dataset.change || '—';
        document.getElementById('modalType').textContent   = card.dataset.type   || '—';
        modal.classList.add('open');
      });
    });

    modalClose.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
  }

  /* ---- MINI CHART SVG ANIMADO ---- */
  const chartPath = document.getElementById('chartPath');
  if (chartPath) {
    let points = [20,45,38,55,42,35,58,48,62,50,72,40,85,55,100];
    function buildPath(pts) {
      const w = 280, h = 70;
      const max = Math.max(...pts), min = Math.min(...pts);
      const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
      const ys = pts.map(p => h - ((p - min) / (max - min + 1)) * (h - 8) - 4);
      let d = `M ${xs[0]} ${ys[0]}`;
      for (let i = 1; i < xs.length; i++) {
        const mx = (xs[i - 1] + xs[i]) / 2;
        d += ` C ${mx} ${ys[i-1]}, ${mx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
      }
      return d;
    }
    chartPath.setAttribute('d', buildPath(points));

    setInterval(() => {
      points.shift();
      points.push(Math.random() * 60 + 25);
      chartPath.setAttribute('d', buildPath(points));
    }, 1800);
  }

});
