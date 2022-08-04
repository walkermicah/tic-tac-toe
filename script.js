"use strict";

const GameBoard = (() => {
  const boardArray = new Array(9).fill(undefined);

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

  const resetBoard = () => {
    boardArray.fill(undefined);
  };

  return { boardArray, addMarkToBoardArray, resetBoard };
})();

const GameController = (() => {
  const gameBoard = document.querySelector(".gameboard");

  const p1 = {
    mark: "X",
    player: "player1",
  };
  const p2 = {
    mark: "O",
    player: "player2",
  };
  let active = p1;

  const switchActivePlayer = () =>
    active === p1 ? (active = p2) : (active = p1);

  const resetGame = () => {
    GameBoard.resetBoard();
    active = p1;
  };

  const checkForWinner = (active) => {
    let winner;
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
      if (arr.every((cell) => GameBoard.boardArray[cell] === active.mark)) {
        console.log("WIN");
        winner = active.player;
        resetGame(); //show new game button instead
      }
    });

    if (!winner) switchActivePlayer();
  };

  const checkForTie = () => {
    if (GameBoard.boardArray.every(Boolean)) {
      console.log("TIE");
      resetGame(); //show new game button instead
    }
  };

  gameBoard.addEventListener("click", function (e) {
    if (!e.target.classList.contains("cell")) return;
    GameBoard.addMarkToBoardArray(e.target.dataset.number, active.mark);
    checkForWinner(active);
    checkForTie();
  });
})();

const Player = (name) => {};

const player1 = Player("Player 1");
const player2 = Player("Player 2");
