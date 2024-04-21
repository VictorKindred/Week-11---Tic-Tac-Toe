/*
 * Event object:
 * https://developer.mozilla.org/en-US/docs/Web/API/Event
 *
 * Target object:
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/target
 *
 * textContent property:
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 *
 * getAttribute method:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
 *
 */

/*
     Steps for Tic Tac Toe

     1- Build the grid
     2- Reference which cell was clicked
     3- Make sure cell is empty
     4- Put X or O in cell
     5- Store existing choices in array (state of the grid) 
     6- Check if winner (use array of winning combinations - array of arrays)
     7- If winner, display winning message ("X Wins or O Wins")
     8- Have reset button - reset game

*/

const restartBtn = document.querySelector(".restart");
const gameStatus = document.querySelector(".status");
const cells = document.querySelectorAll(".cell");
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let player = "X";
let playerScore = ["", "", "", "", "", "", "", "", ""];
let gameOngoing = false;

start();

function start() {
  cells.forEach((cell, index) =>
    cell.addEventListener("click", () => {
      press(index);
    })
  );
  restartBtn.addEventListener("click", restart);
  gameStatus.textContent = `Game begin: ${player}'s turn`;
  gameOngoing = true;
}

function press(index) {
  if (playerScore[index] != "" || !gameOngoing) {
    return;
  }

  playerScore[index] = player;
  cells[index].textContent = player;
  checkWinner();
  player = player == "X" ? "O" : "X";
  gameStatus.textContent = `${player}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const a = playerScore[condition[0]];
    const b = playerScore[condition[1]];
    const c = playerScore[condition[2]];

    if (a == "" || b == "" || c == "") {
      continue;
    }
    if (a == b && b == c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    alert(`${player} wins`);
    gameOngoing = false;
  } else if (!playerScore.includes("")) {
    alert(`Draw`);
    gameOngoing = false;
  }
}

function restart() {
  player = "X";
  playerScore = ["", "", "", "", "", "", "", "", ""];
  gameStatus.textContent = `Game begin: ${player}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  gameOngoing = true;
}