; (function () {

  function Game(parentElement) {
    this.parentElement = parentElement;
    this.element = document.createElement('div');
    this.element.classList.add('game');
    this.parentElement.appendChild(this.element);

  }

  Game.prototype.startGame = function () {
  }

  new Game(document.getElementById('app'));
})();