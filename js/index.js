// script.js

// Estado inicial
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Definir funciones antes de agregar los event listeners
const handleCellClick = ( event ) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute( 'data-index' ) );

    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

const updateCell = ( cell, index ) => {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

const checkResult = () => {
    let roundWon = false;

    for ( let i = 0; i < winningConditions.length; i++ ) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if ( a === '' || b === '' || c === '' ) {
            continue;
        }

        if ( a === b && b === c ) {
            roundWon = true;
            break;
        }
    }

    if ( roundWon ) {
        isGameActive = false;
        setTimeout(() => alert( `Jugador ${currentPlayer} ha ganado!` ), 100);
        return;
    }

    if ( !board.includes("") ) {
        isGameActive = false;
        setTimeout(() => alert('Empate!'), 100);
        return;
    }

    switchPlayer();
}

const resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}

// Luego se agregan los event listeners
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
