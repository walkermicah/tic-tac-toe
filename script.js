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
    updateGameboard();
  };

  return { boardArray, addMarkToBoardArray, resetBoard };
})();

const GameController = (() => {
  const gameBoard = document.querySelector(".gameboard");
  const newGameBtn = document.querySelector(".new-game-btn");

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
        showNewGameBtn();
      }
    });

    if (!winner) switchActivePlayer();
  };

  const checkForTie = () => {
    if (GameBoard.boardArray.every(Boolean)) {
      console.log("TIE");
      showNewGameBtn();
    }
  };

  const showNewGameBtn = () => {
    newGameBtn.classList.remove("hidden");
    gameBoard.classList.add("fade");
    gameBoard.removeEventListener("click", startGame);
  };

  const startGame = (e) => {
    if (!e.target.classList.contains("cell")) return;
    GameBoard.addMarkToBoardArray(e.target.dataset.number, active.mark);
    checkForWinner(active);
    checkForTie();
  };

  const resetGame = () => {
    GameBoard.resetBoard();
    active = p1;
    newGameBtn.classList.add("hidden");
    gameBoard.classList.remove("fade");
    gameBoard.addEventListener("click", startGame);
  };

  newGameBtn.addEventListener("click", resetGame);
  resetGame();
})();

const Player = (name) => {
  //-event listener to get name typed in. when name is submitted, display it in div
  //function to highlight player when it's their turn
  //function to congratulate winner
};

const player1 = Player("Player 1");
const player2 = Player("Player 2");
