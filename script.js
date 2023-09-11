"use strict";

const allBoxes = document.querySelectorAll(".item");
const container = document.querySelector(".container");
const resetButton = document.querySelector(".reset");
const winnerDiv = document.querySelector(".winner");
let activePlayer = 0;
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

const CheckWin = function (curPlayer) {
  winningCombinations.forEach(function (curCombo, i, arr) {
    if (hasAllElems === true) return;
    hasAllElems = curCombo.flat().every(function (cur1, i, arr) {
      return curPlayer.includes(cur1);
    });
  });
};

container.addEventListener("click", function (cur, i, arr) {
  if (!cur.target.classList.contains("item")) return;
  if (gameActive === 0) return;
  if (cur.target.textContent === "O" || cur.target.textContent === "X") return;
  if (activePlayer === 0) {
    cur.target.textContent = "X";
    playerX.push(cur.target.classList[1]);
    CheckWin(playerX);
    activePlayer = 1;
    if (hasAllElems === true) {
      gameActive = 0;
      displayWinner("X");
      return;
    }
  } else if (activePlayer === 1) {
    cur.target.textContent = "O";
    playerO.push(cur.target.classList[1]);
    CheckWin(playerO);
    activePlayer = 0;
    if (hasAllElems === true) {
      gameActive = 0;
      displayWinner("O");
      return;
    }
  }
});

// Event Listener for Button
resetButton.addEventListener("click", function () {
  resetGame();
});

// Function to display winner
const displayWinner = function (player) {
  winnerDiv.classList.remove("hidden");
  winnerDiv.textContent = `Player ${player} wins!`;
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
