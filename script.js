const Gameboard = (() => {
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  const renderBoard = (gameboardSelector) => {
    for (let i = 0; i < gameboard.length; i++) {
      const boardMarkElement = document.createElement('button');
      boardMarkElement.classList.add('board-mark-button');
      boardMarkElement.setAttribute('data-board-mark-number', i);
      document.querySelector(gameboardSelector).append(boardMarkElement);
    }
  };

  const areArrayElementsEqual = (array) =>
    !!array.reduce((a, b) => (a === b ? a : NaN));

  const isGameOver = () => {
    const isRowWin =
      areArrayElementsEqual(gameboard.slice(0, 3)) ||
      areArrayElementsEqual(gameboard.slice(3, 6)) ||
      areArrayElementsEqual(gameboard.slice(6, 9));

    const isColumnWin =
      areArrayElementsEqual([gameboard[0], gameboard[3], gameboard[6]]) ||
      areArrayElementsEqual([gameboard[1], gameboard[4], gameboard[7]]) ||
      areArrayElementsEqual([gameboard[2], gameboard[5], gameboard[8]]);

    const isDiagonalWin =
      areArrayElementsEqual([gameboard[0], gameboard[4], gameboard[8]]) ||
      areArrayElementsEqual([gameboard[2], gameboard[4], gameboard[6]]);

    const isTie = gameboard.every((e) => e);

    return isRowWin || isColumnWin || isDiagonalWin || isTie;
  };

  return { gameboard, renderBoard, isGameOver };
})();

const Player = (mark) => {
  const getMark = () => mark;
  return {
    getMark,
  };
};

const displayController = (() => {
  const addMarkOnClick = (player1Mark, player2Mark) => {
    let playerMarksIndex = 0;
    let playerMarks = [player1Mark, player2Mark];
    const boardButtons = document.querySelectorAll('.board-mark-button');

    for (const button of boardButtons) {
      button.addEventListener('click', () => {
        const buttonNumClicked = button.dataset.boardMarkNumber;
        if (Gameboard.gameboard[buttonNumClicked]) return;
        Gameboard.gameboard[buttonNumClicked] = playerMarks[playerMarksIndex];
        boardButtons[buttonNumClicked].textContent = playerMarks[0];
        if (Gameboard.isGameOver()) console.log('Game over!');
        playerMarks = playerMarks.reverse();
      });
    }
  };
  return { addMarkOnClick };
})();

const flowController = (() => {
  const main = () => {
    Gameboard.renderBoard('.game-board');
    const player1 = Player('X');
    const player2 = Player('O');
    displayController.addMarkOnClick(player1.getMark(), player2.getMark());
  };
  return { main };
})();

flowController.main();
