var playerStart = true; // true: player plays first

var cross = '<i class="fas fa-times fa-6x">';
var circle = '<i class="far fa-circle fa-5x">';

var turnCross = true; // true: next click will show cross

function handleClick(element) {
    var id = element.id;
    var square = document.getElementById(id);

    // if square is not empty -> error
    if (square.innerHTML !== "") {
        // console.log('This square is not empty!');
        return 0;
    }
    // show cross or circle based on turnCross boolean
    square.innerHTML = turnCross ? cross : circle;
    
    turnCross = !turnCross;
}

