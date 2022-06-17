const GameBoard = ((doc) => {
  const gameBoard = [
    ['X', 'O', 'O'],
    ['O', 'X', 'O'],
    ['X', 'O', 'X'],
  ];

  const renderBoard = (selector) => {
    for (let i = 0; i < gameBoard[0].length; i++) {
      for (let j = 0; j < gameBoard.length; j++) {
        const symbol = gameBoard[i][j];
        const boardSymbolElement = document.createElement('p');
        boardSymbolElement.textContent = symbol;
        boardSymbolElement.classList.add('board-symbol');
        doc.querySelector(selector).append(boardSymbolElement);
      }
    }
  };

  return {
    renderBoard,
  };
})(document);

GameBoard.renderBoard('.game-board');
