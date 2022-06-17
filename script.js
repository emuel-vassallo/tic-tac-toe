const Gameboard = (() => {
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  const renderBoard = (gameboardSelector) => {
    document.querySelector(gameboardSelector).innerHTML = '';

    for (let i = 0; i < gameboard.length; i++) {
      const boardMarkElement = document.createElement('button');

      boardMarkElement.classList.add('board-mark-button');
      boardMarkElement.setAttribute('data-board-mark-number', i);
      boardMarkElement.textContent = gameboard[i];

      document.querySelector(gameboardSelector).append(boardMarkElement);
    }
  };

  return { gameboard, renderBoard };
})();

const Player = (mark) => {
  const getMark = () => mark;

  const addMarkToBoard = (symbol, positionNumber) => {
    const isMarkOccupied = Gameboard.gameboard[positionNumber];
    if (positionNumber < 0 || positionNumber > 8 || isMarkOccupied) return;
    Gameboard.gameboard[positionNumber] = symbol;
    Gameboard.renderBoard('.game-board');
  };
  
  return {
    getMark,
    addMarkToBoard,
  };
};

Gameboard.renderBoard('.game-board');

const player1 = Player('X');
const player2 = Player('O');
