// Selecionar todos os cards
let cards = document.querySelectorAll(".card-destino");

/* Percorrer todos os cards selecionados e para cada um (separadamente)
pegar os botões (botão curiosidade e o botão favoritos) e o paragrafo curiosidade */
cards.forEach(function (card) {
    let botaoCuriosidade = card.querySelector('.botao-curiosidade');
    let botaoFavorito = card.querySelector('.botao-favorito');
    let curiosidade = card.querySelector('.curiosidade');

    botaoCuriosidade.addEventListener("click", function () {
        if (curiosidade.hidden) {
            curiosidade.hidden = false;
            botaoCuriosidade.setAttribute("aria-expanded", "true");
            botaoCuriosidade.textContent = "Ocultar curiosidades";
        } else {
            curiosidade.hidden = true;
            botaoCuriosidade.setAttribute("aria-expanded", "false");
            botaoCuriosidade.textContent = "Ver curiosidades";
        }
    }); // fechamento do código do botaoCuriosidade

    botaoFavorito.addEventListener("click", function () {
        // Aplicar/Remover a classe 'favoritado'
        // Classe foi aplicada? true
        // Classe foi removida? false
        let favoritado = card.classList.toggle('favoritado');

        // Atualizar o estado do botão (aria-pressed)
        botaoFavorito.setAttribute("aria-pressed", favoritado);

        // Atualizar o texto do botão (☆ Favorito ou ★ Favoritado)
        if (favoritado) {
            botaoFavorito.textContent = "★ Favoritado";
        } else {
            botaoFavorito.textContent = "☆ Favorito";
        }

        // Chama a função de atualização
        atualizarContadorFavoritos();

    }); // fechamento do botao favorito
}); // fechamento do forEach


/* V2: programação para o recurso de filtragem de destinos */
// Procurar e selecionar os botões de filtro
const botoesFiltro = document.querySelectorAll("[data-filtro]");

// Percorrer/acessar cada botão dentro do botoesFiltro
botoesFiltro.forEach(function (botaoFiltro) {

    // Quando acontecer o clique no botão...
    botaoFiltro.addEventListener("click", function () {
        // ... acessamos e guardamos o filtro escolhido
        const filtro = botaoFiltro.dataset.filtro;

        // Percorrendo cada card...
        cards.forEach(function (card) {
            // ... e guardando a categoria de cada um
            const categoria = card.dataset.categoria;

            // Se o valor de filtro for "todos" OU se a categoria for igual ao filtro
            if (filtro === "todos" || categoria === filtro) {
                // Então mostramos o card
                card.hidden = false;
            } else {
                // Senão, escondemos o card
                card.hidden = true;
            }

        }); // fechamento do forEach dos cards

        // Para cada botão de filtro...
        botoesFiltro.forEach(function (botaoFiltro) {
            // Verificamos se o botão atual que foi clicado é o mesmo do filtro
            if (botaoFiltro.dataset.filtro == filtro) {
                // Se for, adicinamos a classe nele
                botaoFiltro.classList.add("filtro-ativo");

                // E mudamoso estado para pressinado/ativado  (false)
                botaoFiltro.setAttribute("aria-pressed", "true")
            } else {
                //Senão, retiramos a classe dele
                botaoFiltro.classList.remove("filtro-ativo");

                // E mudamos o estado para não-pressionado/desativado (false)
                botaoFiltro.setAttribute("aria-prossed", "false")
            }
        })

    }); // fechamento event listener

}); // fechamento forEach e dos botões

// versao 3: script para o menu responsivo

// Selecionando os elementos que serão manipulados

// Botão do Menu
const botaoMenu = document.querySelector(".botao-menu");

// Navegação principal
const navegacaoPrincipal = document.querySelector("#navegacao-principal");

// Detectando o acinamento do botão
botaoMenu.addEventListener("click", function () {
    // Aplicar a classe
    // Classe aplicada true
    // Classe removida false
    const menuAberto = navegacaoPrincipal.classList.toggle("menu-aberto")
    // Atualizar o estado do botão usando aria-expanded
    botaoMenu.setAttribute("aria-expanded", menuAberto);

    // Exercicio

    // Se o menu estiver aberto, mostre no botão X Fechar
    // Se o menu estiver fechado, mostre no botão Menu

    if (menuAberto) {
        botaoMenu.textContent = "X fechar"
    } else {
        botaoMenu.textContent = "☰ Menu"
    }


});

// Versão 4: script para contagem de favoritos

// Slecionando o elemento que apresenta a quantidade de favorito
const quantidadeFavorito = document.querySelector("#quantidade-favoritos");

// Função para atualização dos favoritos
function atualizarContadorFavoritos() {
    // Guardar em momeria a contagem, começando em zero
    let quantidade = 0;

    // Percorrer todos os cards, inclusive os ocultos pelos filtros
    cards.forEach(function (card) {
        // Verificar se o card possui a classe favoritado
        if (card.classList.contains("favoritado")) {
            // Se ´possuir; incrementamos a variavel quantidade
            // Incrementar significa adicionar
            quantidade++
        }
    }) // final ForEach

    // apos a contagem, atualiza o número exibido no span HTML
    quantidadeFavorito.textContent = quantidade;

} //fonal da função atualizarContadorFavoritos
