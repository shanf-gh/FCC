// =======================================================
//                      Initialize
// =======================================================

var playerStart = true; // true: player plays first

// fontawsome icons
var cross = '<i class="fas fa-times fa-6x">';
var circle = '<i class="far fa-circle fa-5x">';

var turnCross = true; // true: next click will show cross
var gameOver = false;

var boardStatus = new Array(9).fill(null);
var squares = document.getElementsByClassName('square');

// squares.forEach(function(el, i){
//     square[i] = el.firstChild.classList[1];
// });

console.log(squares);

// =======================================================
//                      Logics
// =======================================================
function handleClick(element) {
    var id = element.id;
    var square = document.getElementById(id);

    // if square is not empty -> error or if gameOver
    if (square.innerHTML !== "" || gameOver) {
        // console.log('This square is not empty!');
        return 0;
    }
    // show cross or circle based on turnCross boolean
    square.innerHTML = turnCross ? cross : circle;
    boardStatus[id - 1] = turnCross ? 'x' : 'o';
    // toggle for next turn
    turnCross = !turnCross;
    // check if won
    checkBoard();
}

function restart() {

}

function checkBoard() {
    var winTable = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
    ];

    winTable.forEach(function(combination) {
        if(boardStatus[combination[0]] !== null && 
            boardStatus[combination[0]] === boardStatus[combination[1]] &&
            boardStatus[combination[0]] === boardStatus[combination[2]] ) {
             // winning combination
             gameOver = true;
             return gameOver;
         }
    })
    return 0;
}

// Computer turn

function computer() {
    
    

    // toggle for next turn
    turnCross = !turnCross;
}