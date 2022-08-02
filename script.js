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
    //012 //345 //678 //036 //147 //258 //048 //246
    //const winningOptions = [{mark1:, mark2: , mark3:}, {mark1:, mark2: , mark3:} etc]
    //winningOptions.forEach(option => { if board[mark1] === board[mark2] === board[mark3], cl("win")})
  };

  boardDisplay.addEventListener("click", function (e) {
    if (!e.target.classList.contains("cell")) return;
    addMarkToBoard(e.target.dataset.number, mark);
    // checkForWinner();
  });
})();

const DisplayController = (() => {})();

const Player = (name) => {};
