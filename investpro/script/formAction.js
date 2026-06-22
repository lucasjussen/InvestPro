// ============================================
// InvestPro — formAction.js
// Lê dados enviados via método GET e exibe na página
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);

  /* ---- VERIFICAÇÃO: se nenhum dado chegou ---- */
  const alertBox = document.getElementById('alertBox');
  if (!params.get('nome')) {
    if (alertBox) {
      alertBox.textContent = 'Nenhum dado recebido. Preencha o formulário primeiro.';
      alertBox.classList.add('show', 'alert-box--error');
    }
    const resultSection = document.getElementById('resultSection');
    if (resultSection) resultSection.style.display = 'none';
    return;
  }

  /* ---- MAPEAMENTOS ---- */
  const perfilLabel = {
    conservador: 'Conservador',
    moderado:    'Moderado',
    arrojado:    'Avançado / Agressivo',
  };

  const prazoLabel = {
    '6m':  'Curto prazo (6 meses)',
    '1a':  '1 ano',
    '3a':  '3 anos',
    '5a':  '5 anos',
    '10a': 'Longo prazo (10+ anos)',
  };

  const tipoLabel = {
    renda_fixa:    'Renda Fixa (CDB, Tesouro)',
    acoes:         'Ações / Renda Variável',
    fundos:        'Fundos de Investimento',
    cripto:        'Criptoativos',
    multiestrateg: 'Multi-estratégia',
  };

  /* ---- RETORNO SIMULADO ---- */
  const taxas = {
    renda_fixa:    0.12,
    acoes:         0.18,
    fundos:        0.14,
    cripto:        0.35,
    multiestrateg: 0.16,
  };

  const prazoAnos = { '6m': 0.5, '1a': 1, '3a': 3, '5a': 5, '10a': 10 };

  const valorStr = params.get('valor') || '0';

  const valor = parseFloat(
    valorStr
      .replace(/\./g, '') // remove separador de milhar
      .replace(',', '.')  // troca vírgula decimal por ponto
  );
  const tipo     = params.get('tipo')  || 'renda_fixa';
  const prazo    = params.get('prazo') || '1a';

  const taxa     = taxas[tipo]      || 0.12;
  const anos     = prazoAnos[prazo] || 1;
  const retorno  = valor * Math.pow(1 + taxa, anos);
  const lucro    = retorno - valor;

  /* ---- HELPER FORMATAÇÃO ---- */
  const brl = n => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pct = n => (n * 100).toFixed(1) + '%';

  /* ---- PREENCHER DADOS ---- */
  const fill = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  fill('res-nome',     params.get('nome')     || '—');
  fill('res-email',    params.get('email')    || '—');
  fill('res-cpf',      params.get('cpf')      || '—');
  fill('res-telefone', params.get('telefone') || '—');
  fill('res-valor',    brl(valor));
  fill('res-prazo',    prazoLabel[prazo] || prazo);
  fill('res-tipo',     tipoLabel[tipo]   || tipo);

  // Projeção
  fill('res-taxa',    pct(taxa) + ' a.a. (estimado)');
  fill('res-retorno', brl(retorno));
  fill('res-lucro',   '+ ' + brl(lucro));

  // Badge de perfil colorido, usando as classes .badge--conservador/--moderado/--arrojado do main.css
  const perfilBadge = document.getElementById('res-perfil-badge');
  if (perfilBadge) {
    const pKey = params.get('perfil') || 'moderado';
    perfilBadge.classList.remove('badge--conservador', 'badge--moderado', 'badge--arrojado');
    perfilBadge.classList.add('badge--' + (perfilLabel[pKey] ? pKey : 'moderado'));
    perfilBadge.textContent = perfilLabel[pKey] || pKey;
  }

  // Alerta de sucesso
  if (alertBox) {
    alertBox.textContent = `Solicitação recebida com sucesso! Em breve entraremos em contato pelo e-mail ${params.get('email')}.`;
    alertBox.classList.add('show');
  }

  // Botões de ação
  const btnVoltar = document.getElementById('btnVoltar');
  if (btnVoltar) btnVoltar.addEventListener('click', () => history.back());

  const btnNovo = document.getElementById('btnNovo');
  if (btnNovo) btnNovo.addEventListener('click', () => window.location.href = 'form.html');

});