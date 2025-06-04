let radToDeg = (val) => val * (Math.PI/180);

let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    document.getElementById("display").value = `${previousInput} ${currentOperation} ${currentInput}`;
}

function appendOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById("display").value = `${previousInput} ${currentOperation}`;
}

var degreeMode = true;

const mode = document.getElementById("calcMode");
mode.addEventListener("click", changeMode);

function showCalcHistory() {
    calcHistoryModal.style.display = "block";
}
let exitCalcHistory = () => calcHistoryModal.style.display = "none";

const calcHistoryBtn = document.getElementById("calcHistoryBtn");
calcHistoryBtn.addEventListener("click", showCalcHistory);

var calcHistoryModal = document.getElementById("exitCalcHistory");

const exitCalcHistoryBtn = document.getElementById("exitCalcHistoryBtn");
exitCalcHistoryBtn.addEventListener("click", exitCalcHistory);

function changeMode() {
    degreeMode = !degreeMode;
    if (degreeMode) document.getElementById("calcMode").innerHTML = "Deg";
    else if (!degreeMode) document.getElementById("calcMode").innerHTML = "Rad";
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '^':
            result = prev ** current;
            break;
        case '√':
            result = prev * Math.sqrt(current);
            break;
        case 'cos':
            if (!degreeMode) result = prev * Math.cos(current);
            else if (degreeMode) result = prev * Math.cos(radToDeg(current));
            break;
        case 'sin':
            if (!degreeMode) result = prev * Math.sin(current);
            else if (degreeMode) result = prev * Math.sin(radToDeg(current));
            break;
        case 'tan':
            if (!degreeMode) result = prev * Math.tan(current);
            else if (degreeMode) result = prev * Math.tan(radToDeg(current));
            break;
        case 'log':
            result = prev * Math.log10(current);
            break;
    }

    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    document.getElementById("display").value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    document.getElementById("display").value = '';
}

if (isUsingMobile == false) dragCalulator(calcModal);

function dragCalulator(elmnt) {
    let pos1, pos2, pos3, pos4;
    calcModal.onmousedown = dragMouseDown;
    calcModal.ontouchstart = dragMouseDown;

    function dragMouseDown(event) {
        event.preventDefault();
        pos3 = event.clientX;
        pos4 = event.clientY;
        
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(event) {
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
    }
}
