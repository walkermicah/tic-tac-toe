"use strict";

const GameBoard = (() => {
  const board = new Array(9).fill(undefined);

  const getBoard = () => board;

  const updateGameboard = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      !board[cell.dataset.number]
        ? (cell.textContent = "")
        : (cell.textContent = `${board[cell.dataset.number]}`);
    });
  };

  const addMarkToBoardArray = (cell, mark) => {
    if (board[cell]) return;
    board[cell] = mark;
    updateGameboard();
  };

  const resetBoard = () => {
    board.fill(undefined);
    updateGameboard();
  };

  return { getBoard, addMarkToBoardArray, resetBoard };
})();

const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  const changeName = (newName) => {
    name = newName;
  };

  const congratulateWinner = () => {
    console.log(`Winner: ${name}`);
  };

  return { getName, getMark, changeName, congratulateWinner };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

const GameController = (() => {
  const gameBoard = document.querySelector(".gameboard");
  const newGameBtn = document.querySelector(".new-game-btn");

  const board = GameBoard.getBoard();

  const p1 = {
    mark: player1.getMark(),
    player: player1.getName(),
  };
  const p2 = {
    mark: player2.getMark(),
    player: player2.getName(),
  };
  let active = p1;

  const switchActivePlayer = () => {
    active === p1 ? (active = p2) : (active = p1);
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
      if (arr.every((cell) => board[cell] === active.mark)) {
        winner = active.player;
        winner === "player1"
          ? player1.congratulateWinner()
          : player2.congratulateWinner();
        showNewGameBtn();
      }
    });

    if (!winner) switchActivePlayer();
  };

  const checkForTie = () => {
    if (board.every(Boolean)) {
      console.log("TIE");
      showNewGameBtn();
    }
  };

  const showNewGameBtn = () => {
    newGameBtn.classList.remove("hidden");
    gameBoard.classList.add("fade");
    gameBoard.removeEventListener("click", playGame);
  };

  const playGame = (e) => {
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
    gameBoard.addEventListener("click", playGame);
  };

  newGameBtn.addEventListener("click", resetGame);

  resetGame();
})();
