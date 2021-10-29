//Erstellt eine Variable, welche sich auf die Klasse "status" bezieht//
const statusDisplay = document.querySelector(".status");

//definiert die Variable "gameActive"//
let gameActive = true;
//definiert die Variable "currentPlayer"//
let currentPlayer = "👽";
//definiert die Variable "gameState"//
let gameState = ["", "", "", "", "", "", "", "", ""];

//definiert
const winAlert = () => `Congratulations ${currentPlayer} you're the winner!`;
const drawAlert = () => `Both Players have the same amount of points!`;
const currentPlayerTurn = () => `Your turn ${currentPlayer}`;

statusDisplay.innerHTML = currentPlayerTurn();

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

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange(){
    currentPlayer = currentPlayer === "👽" ? "👻" : "👽";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    
    if (roundWon) {
        statusDisplay.innerHTML = winAlert();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawAlert();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive ){
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestart(){
    gameActive = true;
    currentPlayer = "👽";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}    

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestart);