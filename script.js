// Array de imagens para o jogo da memória
const cardsArray = [
    { name: 'A', img: 'https://via.placeholder.com/100/FF0000/FFFFFF?text=A' },
    { name: 'B', img: 'https://via.placeholder.com/100/00FF00/FFFFFF?text=B' },
    { name: 'C', img: 'https://via.placeholder.com/100/0000FF/FFFFFF?text=C' },
    { name: 'D', img: 'https://via.placeholder.com/100/FFFF00/FFFFFF?text=D' },
    { name: 'E', img: 'https://via.placeholder.com/100/FF00FF/FFFFFF?text=E' },
    { name: 'F', img: 'https://via.placeholder.com/100/00FFFF/FFFFFF?text=F' },
];

// Duplicar e embaralhar as cartas
const gameGrid = [...cardsArray, ...cardsArray]
    .sort(() => 0.5 - Math.random());

// Seleciona o contêiner do jogo
const game = document.querySelector('.memory-game');

// Variáveis para o estado do jogo
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Função para criar as cartas do jogo
function createBoard() {
    gameGrid.forEach(({ name, img }) => {
        // Cria os elementos das cartas
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = name;

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = img;

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.textContent = '?';

        // Adiciona as faces às cartas e as cartas ao tabuleiro
        card.appendChild(frontFace);
        card.appendChild(backFace);
        game.appendChild(card);

        // Adiciona o evento de clique à carta
        card.addEventListener('click', flipCard);
    });
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Verifica se as cartas são iguais
function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

// Desabilita as cartas iguais
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Desvira as cartas não correspondentes
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

// Reseta o estado do tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    // Verifica se o jogo foi completado
    if (document.querySelectorAll('.memory-card:not(.flip)').length === 0) {
        setTimeout(() => {
            alert('Parabéns! Você completou o jogo!');
            resetGame();
        }, 500);
    }
}

// Reinicia o jogo
function resetGame() {
    // Limpa o tabuleiro e recria as cartas
    game.innerHTML = '';
    createBoard();
}

// Cria o tabuleiro inicialmente
createBoard();
