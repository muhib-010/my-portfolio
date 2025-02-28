let cross = true;
let crossArr = [];
let circleArr = [];
let winnerIcon = document.querySelector(".winner-icon")
let isSolo
const dropdown = document.getElementById('modeDropdown');
const selectedMode = document.getElementById('selectedMode');
const dialog = document.querySelector('#dialog');
const restartBtn = document.querySelector('#restart');
const squares = document.querySelectorAll(".square");
let moveCount = 0;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];
selectMode("Solo");
canMove(true)

while(moveCount < 9){
    canMove(true)
    moveCount+=2
}
// Call this function to start a solo game

function checkWin(playerArr) {
    return winningCombinations.some(combo => combo.every(elem => playerArr.includes(elem)));
}
function checkDraw(crossArr, circleArr){
    return crossArr.length + circleArr.length >= 9
}
function renderBoard(crossArr, circleArr) {
    squares.forEach((square, index) => {
        if (crossArr.includes(index)) {
            square.style.backgroundImage = "url(./cross.svg)";
        } else if (circleArr.includes(index)) {
            square.style.backgroundImage = "url(./circle.svg)";
        } else {
            square.style.backgroundImage = "none"; // Clear background for empty cells
        }
    });
}

function move(elem) {
    canMove(true)
    const id = parseInt(elem.id); // Convert to number for consistency

    if (crossArr.includes(id) || circleArr.includes(id)) {
        return;
    }

    // Update arrays
    cross ? crossArr.push(id) : circleArr.push(id);
    // ✅ Render the board after updating moves
    renderBoard(crossArr, circleArr);

    // Check for win
    if (checkWin(cross ? crossArr : circleArr)) {
        
        squares.forEach(square => square.removeAttribute("onclick"));
         dialog.innerHTML = `<h1 class="title">Game Over</h1>
                            <div class="winner-div">
                                <div class="winner-icon"></div>
                                <h2 class="title"> Won</h2>
                            </div>
                            <button id="restart" onclick="restart()">Play again!</button>`
        winnerIcon = document.querySelector(".winner-icon")
        winnerIcon.style.backgroundImage = cross?  "url(./cross.svg)" :"url(./circle.svg)"
        dialog.style.display = "flex";
        return;
    }
    else if(checkDraw(crossArr, circleArr)){
        squares.forEach(square => square.removeAttribute("onclick"));
        dialog.innerHTML = `<h1 class="title">Game Over</h1>
                                <div class="winner-div">
                                    <div class="winner-icon"></div>
                                    <h2 class="title"> It's a draw</h2>
                                </div>
                            <button id="restart" onclick="restart()">Play again!</button>`
        dialog.style.display = "flex";
        return;
    }
    cross = isSolo? cross: !cross; // Switch turns
    elem.classList.add("no-hover"); // Disable hover for the clicked cell
    isSolo? canMove(false) : canMove(true)
    if(isSolo){
        setTimeout(() => {
            solo(cross, crossArr, circleArr);
            canMove(true)
        }, 700)
    }
    renderBoard(crossArr, circleArr);
}

function restart() {
    moveCount = 0;
    crossArr = [];
    circleArr = [];
    cross = Math.random() >= 0.5;

    squares.forEach(square => {
        square.setAttribute("onclick", "move(this)");
        square.classList.remove("no-hover");
    });

    renderBoard(crossArr, circleArr); // Clear the board
    dialog.style.display = "none";    // Hide the dialog
}
function toggleDropdown() {
    dropdown.classList.toggle('open');
}

function selectMode(mode) {
    selectedMode.textContent = mode;
    mode === "Solo"? isSolo = true : isSolo =  false;
    dropdown.classList.remove('open');
    restart()
}

window.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});
function canMove(canMove){
    canMove? squares.forEach(square => square.setAttribute("onclick", "move(this)")) :squares.forEach(square => square.removeAttribute("onclick"))
    return
}
function solo(cross, crossArr, circleArr){
    // canMove(false);
    let firstMove;
    do {
        firstMove = Math.floor(Math.random() * 8) + 1; // Generates a number from 1 to 8
    } while (crossArr.includes(firstMove) || circleArr.includes(firstMove));
    console.log(firstMove)
    if (cross){
        circleArr.push(firstMove)
        renderBoard(crossArr, circleArr);
        if (checkWin(circleArr)) {
            squares.forEach(square => square.removeAttribute("onclick"));
            dialog.innerHTML = `<h1 class="title">Game Over</h1>
                                <div class="winner-div">
                                    <div class="winner-icon"></div>
                                    <h2 class="title"> Won</h2>
                                </div>
                                <button id="restart" onclick="restart()">Play again!</button>`
            winnerIcon = document.querySelector(".winner-icon")
            winnerIcon.style.backgroundImage = "url(./circle.svg)"
            dialog.style.display = "flex";
        }
    }
    else{
        crossArr.push(firstMove) 
        renderBoard(crossArr, circleArr);
        if (checkWin(crossArr)) {
            squares.forEach(square => square.removeAttribute("onclick"));
            dialog.innerHTML = `<h1 class="title">Game Over</h1>
                                <div class="winner-div">
                                    <div class="winner-icon"></div>
                                    <h2 class="title"> Won</h2>
                                </div>
                                <button id="restart" onclick="restart()">Play again!</button>`
            winnerIcon = document.querySelector(".winner-icon")
            winnerIcon.style.backgroundImage = "url(./cross.svg)";
            dialog.style.display = "flex";
        }   
        canMove(true)
        return
    }
}