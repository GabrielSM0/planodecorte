document.querySelectorAll('.btnExcluir').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var linha = this.closest('.linha');
        var tabela = linha.closest('table');
        if (tabela.querySelectorAll('.linha').length > 1) {
            linha.remove();
        } else {
            alert("Pelo menos uma linha deve ser mantida na tabela.");
        }
    });
});

document.querySelectorAll('.ambiente').forEach(function(ambiente) {
    ambiente.addEventListener('input', function(event) {
        if (event.target.tagName.toLowerCase() === 'input') {
            if (event.target.value !== '') {
                var todasLinhasPreenchidas = true;
                ambiente.querySelectorAll('.linha').forEach(function(linha) {
                    linha.querySelectorAll('input').forEach(function(input) {
                        if (input.value === '') {
                            todasLinhasPreenchidas = false;
                        }
                    });
                });
                if (todasLinhasPreenchidas) {
                    adicionarLinha(ambiente.querySelector('table'));
                }
            }
        }
    });
});

document.getElementById("btnIniciarCalculo").addEventListener("click", function() {
    var linhasParaCalculoEstoque = [];
    var linhasParaCalculoPaineis = [];
    var linhasVaziasEstoque = 0;
    var linhasVaziasPaineis = 0;

    document.querySelectorAll('.ambiente').forEach(function(ambiente) {
        var linhasParaCalculo;
        var linhasVazias;
        if (ambiente.id === 'estoque') {
            linhasParaCalculo = linhasParaCalculoEstoque;
            linhasVazias = linhasVaziasEstoque;
        } else if (ambiente.id === 'paineis') {
            linhasParaCalculo = linhasParaCalculoPaineis;
            linhasVazias = linhasVaziasPaineis;
        }

        ambiente.querySelectorAll('.linha').forEach(function(linha) {
            var preenchida = true;
            linha.querySelectorAll('input').forEach(function(input) {
                if (input.value === '') {
                    preenchida = false;
                }
            });
            if (preenchida) {
                linhasParaCalculo.push(linha);
            } else {
                linhasVazias++;
            }
        });
    });

    if (linhasParaCalculoEstoque.length > 0 && linhasParaCalculoPaineis.length > 0) {
        alert("Iniciar o cálculo...");
        //função para iniciar o cálculo
    } else {
        alert("Preencha uma linha em cada ambiente para iniciar o cálculo.");
    }
});

function adicionarLinha(tabela) {
    var novaLinha = tabela.insertRow(-1);
    novaLinha.classList.add("linha");
    for (var i = 0; i < 3; i++) {
        var novaCelula = novaLinha.insertCell(i);
        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("placeholder", "");
        input.setAttribute("min", "0");
        input.setAttribute("step", "0.1");
        input.setAttribute("name", "comprimento");
        novaCelula.appendChild(input);
    }
    var novaCelulaAcao = novaLinha.insertCell(-1);
    var btnExcluir = document.createElement("button");
    btnExcluir.innerText = "Excluir";
    btnExcluir.classList.add("btnExcluir");
    btnExcluir.addEventListener("click", function() {
        var linha = this.closest('.linha');
        var tabela = linha.closest('table');
        if (tabela.querySelectorAll('.linha').length > 1) {
            linha.remove();
        } else {
            alert("Pelo menos uma linha deve ser mantida na tabela.");
        }
    });
    novaCelulaAcao.appendChild(btnExcluir);
}
