// =======================================================
//                      Initialize
// =======================================================

// Assumptions
// x plays first
// Human is x, computer is o


var playerStart = true; // true: player plays first

// fontawsome icons
var cross = '<i class="fas fa-times fa-6x">';
var circle = '<i class="far fa-circle fa-5x">';

var turnCross = true; // true: next click will show cross
var gameOver = false;
var nextMove = null;

var boardStatus = new Array(9).fill(null);
// Define board status for test
// boardStatus = ['o',null,'x','x',null,null,'x','o','o'];

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
    computerTurn();
}

function computerTurn() {
    // computer turn
    minmax(boardStatus, false, 0);
    boardStatus[choice] = turnCross ? 'x' : 'o';
    document.getElementById(choice+1).innerHTML = turnCross ? cross : circle;
    turnCross = !turnCross;
    var wonPlayer = checkBoard(boardStatus);
    if (wonPlayer) {
        gameOver = true;
        console.log(wonPlayer + ' won!');
    }
}

function restart() {

}

function checkBoard(game) {
    var winTable = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
    ];

    // Handle draw
    if(!game.includes(null)) {
        return 'draw';
    }

    for (var i = 0, n = winTable.length; i < n; i++) {
        var combination = winTable[i];
        if (game[combination[0]] !== null && 
            game[combination[0]] === game[combination[1]] &&
            game[combination[0]] === game[combination[2]] ) {
             // winning combination
             return game[combination[0]];
         }
    }
    return 0;
}

// Computer turn
var choice;
function minmax(game, nextCross, depth) {
    if (checkBoard(game)) {
        // console.log(game);
        return score(game, depth);
    }
    depth += 1;
    var scores = [];
    var moves = [];
    var move = nextCross ? 'x' : 'o';

    game.forEach(function(item, index) {
        if(!item) {
            var possibleGame = game.slice(); // Use of slice method to copy the array
            possibleGame[index] = move;
            scores.push(minmax(possibleGame, !nextCross, depth));
            moves.push(index);
        }
    });
    if (move === 'o') {
        // max calc
        var val = scores.reduce(function(a, b) {
            return Math.max(a,b);
        });
        choice = moves[scores.indexOf(val)];
        return(val);
    } else {
        // min calc
        var val = scores.reduce(function(a, b) {
            return Math.min(a,b);
        });
        choice = moves[scores.indexOf(val)];
        return(val);
    }
}

function score(game, depth) {
    // Score the game and define the related score
    var won = checkBoard(game);
    if (won === 'o') {
        return 10 - depth;
    } else if (won === 'x') {
        return depth - 10;
    } else {
        return 0;
    }
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }