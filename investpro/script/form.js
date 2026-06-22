document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('investForm');
    if (!form) return;

    const field = id => document.getElementById(id);

    /* ==========================
    MÁSCARA CPF
    ========================== */
    field('cpf').addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '').slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        this.value = v;
    });

    /* ==========================
    MÁSCARA TELEFONE
    ========================== */
    field('telefone').addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 10) {
            v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (v.length > 6) {
            v = v.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
        } else if (v.length > 2) {
            v = v.replace(/(\d{2})(\d+)/, '($1) $2');
        }
        this.value = v;
    });

    /* ==========================
    MÁSCARA VALOR MONETÁRIO
    ========================== */
    field('valor').addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor === '') {
            e.target.value = '';
            return;
        }
        valor = (Number(valor) / 100).toFixed(2);
        valor = valor.replace('.', ',');
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        e.target.value = valor;
    });

    /* ==========================
    VALIDAÇÃO E ENVIO
    ========================== */
    form.addEventListener('submit', function (e) {
        const nome = field('nome').value.trim();
        const email = field('email').value.trim();
        const cpf = field('cpf').value.replace(/\D/g, '');
        const telefone = field('telefone').value.replace(/\D/g, '');

        // Converte o valor formatado de volta para um número válido (ex: 1500.00)
        const valor = parseFloat(
            field('valor').value
                .replace(/\./g, '')
                .replace(',', '.')
        );

        if (nome.length < 3) {
            alert('Informe um nome válido.');
            e.preventDefault();
            return;
        }

        if (!email.includes('@')) {
            alert('Informe um e-mail válido.');
            e.preventDefault();
            return;
        }

        if (cpf.length !== 11) {
            alert('CPF inválido.');
            e.preventDefault();
            return;
        }

        if (telefone.length < 10) {
            alert('Telefone inválido.');
            e.preventDefault();
            return;
        }

        if (isNaN(valor) || valor < 100) {
            alert('O valor mínimo para investimento é R$ 100,00.');
            e.preventDefault();
            return;
        }
    });

});