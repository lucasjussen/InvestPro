// ============================================
// InvestPro — spotlight.js
// Efeito de iluminação radial que acompanha o mouse.
// Aplica-se a qualquer elemento com a classe ".spotlight"
// (usado no card do formulário e nos cards da página Sobre).
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.spotlight');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(0, 200, 150, 0.07), var(--navy-mid) 100%)`;
    });

    // Quando o mouse sai do card, o fundo volta ao valor definido no CSS
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

});