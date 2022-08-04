"use strict";

const GameBoard = (() => {
  const boardArray = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  const updateGameboard = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      !boardArray[cell.dataset.number]
        ? (cell.textContent = "")
        : (cell.textContent = `${boardArray[cell.dataset.number]}`);
    });
  };

  const addMarkToBoardArray = (cell, mark) => {
    if (boardArray[cell]) return;
    boardArray[cell] = mark;
    updateGameboard();
  };

  const checkForWinner = (mark) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombinations.forEach((arr) => {
      if (arr.every((cell) => boardArray[cell] === mark)) console.log("WIN");
    });
  };

  const checkForTie = () => {
    if (boardArray.every(Boolean)) console.log("TIE");
    //instead of cl, display winner & call newGameButton function
  };

  return { addMarkToBoardArray, checkForWinner, checkForTie };
})();

const GameController = (() => {
  const mark = "X";

  const gameBoard = document.querySelector(".gameboard");

  gameBoard.addEventListener("click", function (e) {
    if (!e.target.classList.contains("cell")) return;
    GameBoard.addMarkToBoardArray(e.target.dataset.number, mark);
    GameBoard.checkForWinner(mark);
    GameBoard.checkForTie();
  });
})();

const Player = (name) => {};
