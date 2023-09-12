"use strict";

const allBoxes = document.querySelectorAll(".item");
const container = document.querySelector(".container");
const resetButton = document.querySelector(".reset");
const winnerDiv = document.querySelector(".winner");
let players = ["X", "O"];
let playerX = [];
let playerO = [];
let winningCombinations = [
  ["one", "two", "three"],
  ["four", "five", "six"],
  ["seven", "eight", "nine"],
  ["one", "four", "seven"],
  ["two", "five", "eight"],
  ["three", "six", "nine"],
  ["one", "five", "nine"],
  ["three", "five", "seven"],
];
let hasAllElems;
let gameActive = 0;

// Function to check if a player has won
const CheckWin = function (curPlayer) {
  winningCombinations.forEach(function (curCombo, i, arr) {
    if (hasAllElems === true) return;
    hasAllElems = curCombo.flat().every(function (cur1, i, arr) {
      return curPlayer.includes(cur1);
    });
  });
};

// Main Event Handler for click inside game area
container.addEventListener("click", function (cur, i, arr) {
  if (!cur.target.classList.contains("item")) return;
  if (gameActive === 0) return;
  if (cur.target.textContent === "O" || cur.target.textContent === "X") return;
  cur.target.textContent = players[0];
  if (players[0] === "X") {
    playerX.push(cur.target.classList[1]);
    CheckWin(playerX);
  } else if (players[0] === "O") {
    playerO.push(cur.target.classList[1]);
    CheckWin(playerO);
  }
  players.reverse();
  if (hasAllElems === true || playerX.length === 5 || playerO.length === 5) {
    gameActive = 0;
    displayWinnerDraw(`${players[1]}`);
    return;
  }
});

// Event Listener for Button
resetButton.addEventListener("click", function () {
  resetGame();
});

// Function to display winner or draw
const displayWinnerDraw = function (player) {
  winnerDiv.classList.remove("hidden");
  hasAllElems === false ? (winnerDiv.textContent = "The game is a draw") : (winnerDiv.textContent = `Player ${player} wins!`);
};

// Function to reset game
const resetGame = function () {
  gameActive = 1;
  hasAllElems = false;
  playerX = [];
  playerO = [];
  document.querySelector(".winner").classList.add("hidden");
  allBoxes.forEach(function (cur, i, arr) {
    cur.innerHTML = "&nbsp";
  });
};
