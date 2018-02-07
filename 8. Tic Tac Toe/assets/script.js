var playerStart = true; // true: player plays first

var cross = '<i class="fas fa-times fa-6x">';
var circle = '<i class="far fa-circle fa-5x">';

var turnCross = true; // true: next click will show cross
var gameOver = false;
var boardStatus = new Array(9).fill(null);

// =======================================================
//                      Logics
// =======================================================
function handleClick(element) {
    var id = element.id;
    var square = document.getElementById(id);

    // if square is not empty -> error
    if (square.innerHTML !== "" && gameOver) {
        // console.log('This square is not empty!');
        return 0;
    }
    // show cross or circle based on turnCross boolean
    square.innerHTML = turnCross ? cross : circle;
    boardStatus[id] = turnCross ? 'x' : 'o';
    // toggle for next turn
    turnCross = !turnCross;

    console.log(checkBoard());
}

function restart() {

}

function checkBoard() {
    var winTable = [
        [1,2,3], [4,5,6], [7,8,9], // rows
        [1,4,7], [2,5,8], [3,6,9], // columns
        [1,5,9], [3,5,7]           // diagonals
    ];

    winTable.forEach(function(combination) {
        if(boardStatus[combination[0]] !== null && 
            boardStatus[combination[0]] === boardStatus[combination[1]] &&
            boardStatus[combination[0]] === boardStatus[combination[2]] ) {
                console.log(boardStatus);
                console.log(boardStatus[combination[0]]);
             // winning combination
             return 1;
         }
    })

    // for (var i = 0, n = winTable.length; i < n; i++) {
    //     var combination = winTable[i];
    //     if(boardStatus[combination[0]] !== null && 
    //        boardStatus[combination[0]] === boardStatus[combination[1]] &&
    //        boardStatus[combination[0]] === boardStatus[combination[2]] ) {
    //         // winning combination
    //         return 1;
    //     }
    // }
    // No winning combination
    return 0;
}