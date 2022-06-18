const Gameboard = (() => {
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  const renderBoard = (gameboardSelector) => {
    for (let i = 0; i < gameboard.length; i++) {
      const boardMarkElement = document.createElement('button');

      boardMarkElement.classList.add('board-mark-button');
      boardMarkElement.setAttribute('data-board-mark-number', i);
      boardMarkElement.textContent = gameboard[i];

      document.querySelector(gameboardSelector).append(boardMarkElement);
    }
  };

  const checkArrayEqualElements = (array) => {
    if (typeof array !== 'undefined')
      return !!array.reduce((a, b) => (a === b ? a : NaN));
    return 'Array is Undefined';
  };

  const isGameOver = () => {
    const isRowWin =
      checkArrayEqualElements(gameboard.slice(0, 3)) ||
      checkArrayEqualElements(gameboard.slice(3, 6)) ||
      checkArrayEqualElements(gameboard.slice(6, 9));

    const isColumnWin =
      checkArrayEqualElements([gameboard[0], gameboard[3], gameboard[6]]) ||
      checkArrayEqualElements([gameboard[1], gameboard[4], gameboard[7]]) ||
      checkArrayEqualElements([gameboard[2], gameboard[5], gameboard[8]]);

    const isDiagonalWin =
      checkArrayEqualElements([gameboard[0], gameboard[4], gameboard[8]]) ||
      checkArrayEqualElements([gameboard[2], gameboard[4], gameboard[6]]);

    const isTie = gameboard.every((e) => e);

    return isRowWin || isColumnWin || isDiagonalWin || isTie;
  };

  const addMarkOnClick = (player1Mark, player2Mark) => {
    const boardButtons = document.querySelectorAll('.board-mark-button');
    let hasPlayer1Clicked = false;

    for (const button of boardButtons) {
      button.addEventListener('click', () => {
        const boardMarkNumberClicked = button.dataset.boardMarkNumber;
        const isMarkOccupied = Gameboard.gameboard[boardMarkNumberClicked];

        if (
          boardMarkNumberClicked < 0 ||
          boardMarkNumberClicked > 8 ||
          isMarkOccupied
        )
          return;

        const gameboardButton = boardButtons[boardMarkNumberClicked];

        if (hasPlayer1Clicked) {
          gameboard[boardMarkNumberClicked] = player1Mark;
          gameboardButton.textContent = player1Mark;
          hasPlayer1Clicked = false;
          if (isGameOver()) console.log('Game over!');
          return;
        }

        gameboard[boardMarkNumberClicked] = player2Mark;
        gameboardButton.textContent = player2Mark;
        hasPlayer1Clicked = true;
        if (isGameOver()) console.log('Game over!');
      });
    }
  };

  return { gameboard, renderBoard, addMarkOnClick };
})();

const Player = (mark) => {
  const getMark = () => mark;

  return {
    getMark,
  };
};

Gameboard.renderBoard('.game-board');

const player1 = Player('X');
const player2 = Player('O');

Gameboard.addMarkOnClick(player1.getMark(), player2.getMark());
