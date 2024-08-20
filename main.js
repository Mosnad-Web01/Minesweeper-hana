// Define the Minesweeper board input
const inputBoard = [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 0]
];

// Function to create the Minesweeper board
function minesweeperBoard(inputBoard) {
    const rows = inputBoard.length;
    const cols = inputBoard[0].length;

    // Create a new board with all cells initialized to 0
    const outputBoard = Array.from({ length: rows }, () => Array(cols).fill(0));

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    function countMines(row, col) {
        let count = 0;
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && inputBoard[newRow][newCol] === 1) {
                count++;
            }
        }
        return count;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (inputBoard[r][c] === 1) {
                outputBoard[r][c] = 9;
            } else {
                outputBoard[r][c] = countMines(r, c);
            }
        }
    }

    return outputBoard;
}

// Create the Minesweeper board and render it to the page
function renderBoard() {
    const boardElement = document.getElementById('minesweeper-board');
    const board = minesweeperBoard(inputBoard);

    boardElement.style.gridTemplateColumns = `repeat(${board[0].length}, 40px)`;

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.dataset.value = cell;
            if (cell === 9) {
                cellElement.classList.add('mine');
            } else {
                cellElement.textContent = ''; // Hide the number initially
            }
            cellElement.addEventListener('click', () => handleClick(cellElement, cell));
            boardElement.appendChild(cellElement);
        });
    });
}

// Handle cell click
function handleClick(cellElement, cellValue) {
    if (cellValue === 9) {
        cellElement.textContent = '💣'; // Show a bomb emoji for mines
    } else {
        cellElement.textContent = cellValue; // Show the number of adjacent mines
    }
}

// Render the board when the page loads
window.onload = renderBoard;
