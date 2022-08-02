"use strict";

const mark = "X";

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
  const cells = document.querySelectorAll(".cell");
  const boardDisplay = document.querySelector(".gameboard");

  const updateBoardArray = () => {
    cells.forEach((cell) => {
      !boardArray[cell.dataset.number]
        ? (cell.textContent = "")
        : (cell.textContent = `${boardArray[cell.dataset.number]}`);
    });
  };

  const addMarkToBoard = (cell, mark) => {
    if (boardArray[cell]) return;
    boardArray[cell] = mark;
    updateBoardArray();
  };

  const checkForWinner = () => {
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
  };

  boardDisplay.addEventListener("click", function (e) {
    if (!e.target.classList.contains("cell")) return;
    addMarkToBoard(e.target.dataset.number, mark);
    checkForWinner();
    checkForTie();
  });
})();

const DisplayController = (() => {})();

const Player = (name) => {};
