var result = 0;
var newNum = 0;
var nextOperation = "";
var screenContent = document.getElementById("screen-content");

function handleclick(val) {
    console.log(val);
    console.log("Operation: "+ nextOperation + "; result:" + result + "; newNum:" + newNum);
          
    switch(true) {
        case val === "ON/C":
            result = 0;
            newNum = 0;
            screenContent.style.display = screenContent.style.display === 'none' ? 'block' : 'none';
            break;
        case (val >= 0 && val <= 9):
            if (newNum.length > 1) {
                newNum += val;
            } else {
                newNum = parseFloat(val);
            }
            display(newNum);
            break;
        case val === ".":
            if (!newNum.toString().includes(".")) {
                newNum += ".";
            }
            break;
        case val === "C":
            result = 0;
            newNum = 0;
            display(result);
            break;
        case val === "√": // "&#8730;"
            result = Math.sqrt(newNum);
            display(result);
            newNum = 0;
            break;
        case val === "+":
        case val === "-": // "&#45;"
        case val === "×": // "&#215;"
        case val === "÷" : // "&#247;"
            if (nextOperation !== "") {
                performCalc();
            }
            nextOperation = val; 
            if (result === 0) result += parseFloat(newNum);
            newNum = 0;
            break;
        case val === "=":
            newNum = parseFloat(newNum);
            performCalc();
            nextOperation = "";
            break;
    } 
}

// Display the value in the screen area
function display(val) {
    screenContent.innerHTML = val;
}

// perform the calculation, reset newNum and display the result
function performCalc() {
    switch(nextOperation) {
        case "+":
            result += newNum;
            break;
        case "-":
            result -= newNum;
            break;
        case "×":
            result *= newNum;
            break;
        case "÷":
            result /= newNum;
            break;
    }
    newNum = 0;
    display(result);
}