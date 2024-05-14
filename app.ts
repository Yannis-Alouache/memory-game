import { MemoryGame } from "./MemoryGame";
  
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

  (document.getElementById('mode-toggle') as HTMLInputElement).addEventListener('change', function() {
    document.documentElement.classList.toggle('light', this.checked);
  });

  new MemoryGame(cardData);
};