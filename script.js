const Gameboard = (() => {
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  const renderBoard = (gameboardSelector) => {
    for (let i = 0; i < gameboard.length; i++) {
      const boardMarkElement = document.createElement('button');

      boardMarkElement.classList.add('board-button');
      boardMarkElement.setAttribute('data-board-mark-number', i);

      document.querySelector(gameboardSelector).append(boardMarkElement);
    }
  };

  const disableGameboard = () => {
    const boardButtons = document.querySelectorAll('.board-button');
    boardButtons.forEach((button) => (button.disabled = true));
  };

  const areArrayElementsEqual = (array) =>
    !!array.reduce((a, b) => (a === b ? a : NaN));

  const isTie = gameboard.every((e) => e);

  const getWinningBoardCells = () => {
    if (areArrayElementsEqual(gameboard.slice(0, 3))) return [0, 1, 2];
    if (areArrayElementsEqual(gameboard.slice(3, 6))) return [3, 4, 5];
    if (areArrayElementsEqual(gameboard.slice(6, 9))) return [6, 7, 8];

    if (areArrayElementsEqual([gameboard[0], gameboard[3], gameboard[6]]))
      return [0, 3, 6];
    if (areArrayElementsEqual([gameboard[1], gameboard[4], gameboard[7]]))
      return [1, 4, 7];
    if (areArrayElementsEqual([gameboard[2], gameboard[5], gameboard[8]]))
      return [2, 5, 8];

    if (areArrayElementsEqual([gameboard[0], gameboard[4], gameboard[8]]))
      return [0, 4, 8];
    if (areArrayElementsEqual([gameboard[2], gameboard[4], gameboard[6]]))
      return [2, 4, 6];

    return [];
  };

  const isGameOver = () => isTie || getWinningBoardCells().length > 0;

  return {
    gameboard,
    renderBoard,
    isGameOver,
    getWinningBoardCells,
    disableGameboard,
  };
})();

const Player = (mark) => {
  const getMark = () => mark;
  return {
    getMark,
  };
};

const displayController = (() => {
  const hideStartPageOnClick = () => {
    const mainElement = document.querySelector('main');
    const startPage = document.querySelector('.start-page');
    const startGameButton = document.querySelector('.start-game-button');
    startGameButton.addEventListener('click', () => {
      startPage.classList.add('hidden');
      mainElement.classList.remove('hidden');
    });
  };

  const addHighlightClass = () => {
    const boardButtons = document.querySelectorAll('.board-button');
    const winningBoardCells = Gameboard.getWinningBoardCells();
    let winningBoardButtons = [];
    for (const cell of winningBoardCells) {
      winningBoardButtons = [...winningBoardButtons, boardButtons[cell]];
    }
    for (button of winningBoardButtons) {
      button.classList.add('win-highlight');
    }
  };

  const addMarkOnClick = (player1Mark, player2Mark) => {
    let playerMarksIndex = 0;
    let playerMarks = [player1Mark, player2Mark];
    const boardButtons = document.querySelectorAll('.board-button');

    for (const button of boardButtons) {
      button.addEventListener('click', () => {
        const buttonNumClicked = button.dataset.boardMarkNumber;
        if (Gameboard.gameboard[buttonNumClicked]) return;
        Gameboard.gameboard[buttonNumClicked] = playerMarks[playerMarksIndex];
        boardButtons[buttonNumClicked].textContent = playerMarks[0];
        if (Gameboard.isGameOver()) {
          addHighlightClass();
          Gameboard.disableGameboard();
        }
        playerMarks = playerMarks.reverse();
      });
    }
  };

  return { hideStartPageOnClick, addMarkOnClick };
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

displayController.hideStartPageOnClick();
flowController.main();
