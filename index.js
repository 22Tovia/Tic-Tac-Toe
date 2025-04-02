// Game State
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // "X" starts first
let gameActive = true;

// Winning Combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Selecting DOM elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

// Adding event listeners to the cells
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

// Function to handle cell clicks
function handleCellClick(event) {
    const index = event.target.dataset.index;

    // Check if the cell is already filled or if the game is over
    if (board[index] !== "" || !gameActive) return;

    // Mark the cell with the current player's symbol
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a winner or draw
    checkWinner();

    // Switch player if the game is still active
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check if a player has won
function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `Player ${board[a]} wins!`;
            highlightWinningCells(combo);
            return;
        }
    }

    // Check for a draw
    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a draw!";
    }
}

// Function to highlight winning cells
function highlightWinningCells(combo) {
    combo.forEach(index => {
        cells[index].style.background = "#4CAF50"; // Green background for winning cells
    });
}

// Function to reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's";

    // Clear the board and reset styles
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.background = "#f0f0f0"; // Reset cell background color
    });
}

// Adding event listener to restart button
restartButton.addEventListener("click", resetGame);


