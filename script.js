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
          return;
        }

        gameboard[boardMarkNumberClicked] = player2Mark;
        gameboardButton.textContent = player2Mark;
        hasPlayer1Clicked = true;
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
// player2.updateBoardOnClick();
