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

  return { getName, getMark, changeName };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

const GameController = (() => {
  const gameBoard = document.querySelector(".gameboard");
  const newGameBtn = document.querySelector(".new-game-btn");
  const playerDisplay = document.querySelector(".player-container");
  const player1Display = document.getElementById("player-1");
  const player1Name = document.getElementById("name-1");
  const player1Form = document.getElementById("form-1");
  const player1Input = document.getElementById("form-input-1");
  const player2Display = document.getElementById("player-2");
  const player2Name = document.getElementById("name-2");
  const player2Form = document.getElementById("form-2");
  const player2Input = document.getElementById("form-input-2");
  const winnerDisplay = document.querySelector(".winner-display");

  const board = GameBoard.getBoard();

  const p1 = {
    mark: player1.getMark(),
  };
  const p2 = {
    mark: player2.getMark(),
  };
  let active = p1;

  const switchActivePlayer = () => {
    active === p1 ? (active = p2) : (active = p1);
  };

  const congratulateWinner = (winner) =>
    (winnerDisplay.textContent = `Winner: ${winner}`);

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
        winner = active;
        active === p1
          ? congratulateWinner(player1.getName())
          : congratulateWinner(player2.getName());
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
    winnerDisplay.textContent = "";
  };

  const submitName = (player, input, playerName, form, display) => {
    if (!input.value) return;
    playerName.textContent = input.value;
    player.changeName(input.value);
    form.classList.add("hidden");
    display.classList.remove("hidden");
  };

  const editName = (display, form) => {
    display.classList.add("hidden");
    form.classList.remove("hidden");
  };

  playerDisplay.addEventListener("click", (e) => {
    if (e.target.id === "edit-icon-1") editName(player1Display, player1Form);
    if (e.target.id === "edit-icon-2") editName(player2Display, player2Form);

    if (e.target.id === "submit-btn-1")
      submitName(
        player1,
        player1Input,
        player1Name,
        player1Form,
        player1Display
      );
    if (e.target.id === "submit-btn-2")
      submitName(
        player2,
        player2Input,
        player2Name,
        player2Form,
        player2Display
      );
  });

  newGameBtn.addEventListener("click", resetGame);

  resetGame();
})();
