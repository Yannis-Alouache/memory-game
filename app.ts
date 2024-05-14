class Card {
    name: string;
    img: string;
  
    constructor(name: string, img: string) {
      this.name = name;
      this.img = img;
    }
}
  
class MemoryGame {
    cards: Card[];
    cardsChosen: Card[] = [];
    cardsChosenIds: number[] = [];
    cardsWon: Card[][] = [];
    gameBoard: HTMLElement;
    score: number = 0;
    scoreBoard: HTMLElement;
  
    constructor(cardData: { name: string, img: string }[]) {
      this.cards = cardData.map(data => new Card(data.name, data.img));
      this.gameBoard = document.getElementsByClassName('grid')[0] as HTMLElement;
      this.scoreBoard = document.getElementById('score') as HTMLElement;
      this.setupBoard();
      this.createResetButton();
    }

    createResetButton() {
      const resetButton = document.createElement('button');
      resetButton.textContent = 'Rejouer';
      resetButton.setAttribute("class", "reset-button");
      resetButton.addEventListener('click', () => this.resetGame());
      document.body.appendChild(resetButton);
    }
  
    setupBoard() {
      this.cards.sort(() => 0.5 - Math.random());
      this.createBoard();
    }

    resetGame() {
      // Animation
      const cards = document.querySelectorAll('.flip-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.querySelector(".flip-card-inner").classList.remove("flipped");
        }, 500 * index);
      });

      setTimeout(() => {
        this.cardsChosen = [];
        this.cardsChosenIds = [];
        this.cardsWon = [];
        this.score = 0;
        this.scoreBoard.textContent = '0';
        this.gameBoard.innerHTML = '';
        this.setupBoard();
      }, 500 * cards.length);
    }
  
    createBoard() {
      for (let i = 0; i < this.cards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('flip-card');
        card.dataset.id = String(i);
  
        const cardInner = document.createElement('div');
        cardInner.classList.add('flip-card-inner');
  
        const cardFront = document.createElement('div');
        cardFront.classList.add('flip-card-front');
  
        const cardBack = document.createElement('div');
        cardBack.classList.add('flip-card-back');
  
        const image = document.createElement('img');
        image.src = this.cards[i].img;
        cardBack.appendChild(image);
  
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = 'FLIP CARD';
  
        const description = document.createElement('p');
        description.textContent = 'Clique moi';
  
        cardFront.appendChild(title);
        cardFront.appendChild(description);
  
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
  
        card.appendChild(cardInner);
  
        card.addEventListener('click', () => this.flipCard(i));
  
        this.gameBoard.appendChild(card);
      }
    }
  
    flipCard(cardId: number) {
      this.cardsChosen.push(this.cards[cardId]);
      this.cardsChosenIds.push(cardId);
  
      const cards = document.querySelectorAll('.flip-card');
      cards[cardId].querySelector('.flip-card-inner')!.classList.toggle('flipped');
  
      if (this.cardsChosen.length === 2) {
        setTimeout(() => this.checkForMatch(), 500);
      }
    }

    handleScore(value: number, operator: string) {
        if (operator === '+') {
            this.score += value;
        } else {
            this.score -= value;
        }
        this.scoreBoard.textContent = String(this.score);
    }
  
    checkForMatch() {
      const cards = document.querySelectorAll('.flip-card');
      const optionOneId = this.cardsChosenIds[0];
      const optionTwoId = this.cardsChosenIds[1];
  
      if (optionOneId === optionTwoId) {
        this.handleScore(20, "-");
      } else if (this.cardsChosen[0].name === this.cardsChosen[1].name) {
        cards[optionOneId].removeEventListener('click', () => this.flipCard(optionOneId));
        cards[optionTwoId].removeEventListener('click', () => this.flipCard(optionTwoId));
        this.handleScore(10, "+");
        this.cardsWon.push(this.cardsChosen);
      } else {
        this.handleScore(10, "-");
        cards[optionOneId].querySelector('.flip-card-inner')!.classList.toggle('flipped');
        setTimeout(() => {
          cards[optionTwoId].querySelector('.flip-card-inner')!.classList.toggle('flipped');
        }, 400);
      }
  
      this.cardsChosen = [];
      this.cardsChosenIds = [];
    }
}
  
  window.onload = () => {
    const cardData = [
      { name: 'sapin', img: 'images/1.png' },
      { name: 'bohnomme', img: 'images/2.png' },
      { name: 'sucre', img: 'images/3.png' },
      { name: 'treneau', img: 'images/4.png' },
      { name: 'biscuit', img: 'images/5.png' },
      { name: 'sapin', img: 'images/1.png' },
      { name: 'bohnomme', img: 'images/2.png' },
      { name: 'sucre', img: 'images/3.png' },
      { name: 'treneau', img: 'images/4.png' },
      { name: 'biscuit', img: 'images/5.png' },
    ];
  
    new MemoryGame(cardData);
  };