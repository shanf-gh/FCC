// =======================================================
//                      Initialize
// =======================================================

var playerStart = true; // true: player plays first

// fontawsome icons
var cross = '<i class="fas fa-times fa-6x">';
var circle = '<i class="far fa-circle fa-5x">';

var turnCross = true; // true: next click will show cross
var gameOver = false;
var nextMove = null;

var boardStatus = new Array(9).fill(null);
// Define board status for test
boardStatus = ['o',null,'x','x',null,null,'x','o','o'];

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
    var wonPlayer = checkBoard(boardStatus);
    if (wonPlayer) {
        gameOver = true;
        console.log(wonPlayer + ' won!');
    }

    // computer turn
}

function restart() {

}

function checkBoard(game) {
    var winTable = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
    ];

    for (var i = 0, n = winTable.length; i < n; i++) {
        var combination = winTable[i];
        if (game[combination[0]] !== null && 
            game[combination[0]] === game[combination[1]] &&
            game[combination[0]] === game[combination[2]] ) {
             // winning combination
             return game[combination[0]];
         }
    }

    if(!game.includes(null)) {
        return 'draw';
    }

    return 0;
}

// Computer turn
(function computer(game, nextCross) {
    if (checkBoard(game)) {
        console.log(game);
        var scoring = score(game);
        console.log('scoring: ' + scoring);
        return scoring;
    }
    var scores = [];
    var moves = [];
    var move = nextCross ? 'x' : 'o';

    game.forEach(function(item, index) {
        if(!item) {
            var possibleGame = game.slice(); // Use of slice method to copy the array
            possibleGame[index] = move;
            scores.push(computer(possibleGame, !nextCross));
            moves.push(index);
        }
    });
    console.log('score array: ');
    console.log(scores);
    // min - max calculation
    // if (move === 'x') {
    //     // max calc

    // } else {
    //     // min calc

    // }

})(boardStatus, true)

function score(game) {
    console.log('Scoring...');
    // if player start computer is 'o'
    // else computer is 'x'
    var player = checkBoard(game);
    console.log('player: ' + player);
    if (player === 'x') {
        return 10;
    } else if (player === 'o') {
        return -10;
    } else {
        return 0;
    }

}