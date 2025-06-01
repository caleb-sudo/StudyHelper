let reloadPage = () => location.reload();

let radToDeg = (val) => val * (Math.PI/180);

let dragStart = (event) => event.dataTransfer.setData("Text", event.target.id);
let allowDrop = (event) => event.preventDefault();
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
}

const gettopic = localStorage.getItem("topic");
const getUsername = localStorage.getItem("username");
const getscore = localStorage.getItem("score");
const getstrk = localStorage.getItem("streak");
const getHighscore = localStorage.getItem("highscore");
const getHighestStrk = localStorage.getItem("highestStreak");
const getTotalAnsweredCorrect = localStorage.getItem("totalAnsweredCorrect");
const getTotalAnswered = localStorage.getItem("totalAnswered");
const getShowAnsSetting = localStorage.getItem("showAnsSetting");
var score = parseInt(getscore);
var strk = parseInt(getstrk);
var highscore = parseInt(getHighscore);
var highestStrk = parseInt(getHighestStrk);
var totalAnsweredCorrect = parseInt(getTotalAnsweredCorrect);
var totalAnswered = parseInt(getTotalAnswered);
var topic = gettopic;
if (getscore == null) {
    localStorage.setItem("score", 0);
    reloadPage();
}
if (getstrk == null) localStorage.setItem("streak", 0);
if (getHighscore == null) localStorage.setItem("highscore", 0);
if (getHighestStrk == null) localStorage.setItem("highestStreak", 0);
if (getTotalAnsweredCorrect == null) localStorage.setItem("totalAnsweredCorrect", 0);
if (getTotalAnswered == null) localStorage.setItem("totalAnswered", 0);
localStorage.setItem("topic", gettopic);
localStorage.setItem("username", getUsername);
localStorage.setItem("showAnsSetting", true);
//localStorage.setItem("lastCalculation", )

document.getElementById("UnitSelector").value = topic;

function randomize(n) {
    const order = new Set();
    while (order.size < n) {
        let r = Math.floor(Math.random() * n);
        order.add(r);
    }
    return Array.from(order);
}

function hide(element, hide) {
    if (hide == true) return element.style.display = "none";
    if (hide == false) return element.style.display = "block";
}

const downArrow = document.getElementById("userInfoDownArrow");
const upArrow = document.getElementById("userInfoUpArrow");
const userInfoModal = document.getElementById("userInfoModal");
function openUserInfoModal() {
    hide(userInfoModal, false);
    hide(downArrow, true);
}
function closeUserInfoModal() {
    hide(userInfoModal, true);
    hide(downArrow, false);
}
openUserInfoModal();

const menubar = document.getElementById("menuBtn");
const menuModal = document.getElementById("menuModal")
function openMenu() {
    hide(menuModal, false);
    hide(menubar, true);
}
function closeMenu() {
    hide(menuModal, true);
    hide(menubar, false);
}
menubar.addEventListener("click", openMenu);

const settingsModal = document.getElementById("settingsModal");
function openSettings() {
    hide(settingsModal, false);
    closeMenu();
}
let closeSettings = () => hide(settingsModal, true);

const calcModal = document.getElementById("calcModal");
function openCalc() {
    hide(calcModal, false);
    closeMenu();
}
let closeCalc = () => hide(calcModal, true);

const helpModal = document.getElementById("helpModal");
function openHelpModal() {
    hide(helpModal, false);
    closeMenu();
}
let closeHelpModal = () => hide(helpModal, false);

const strkText = document.getElementById("streak");
const scoreText = document.getElementById("score");
const highscoreText = document.getElementById("highscore");
const highestStreakText = document.getElementById("highestStreak");

scoreText.innerHTML = "Your Score: <b class='scoresText'>" + getscore + "</b>";
highscoreText.innerHTML = "Your Highscore: <b class='scoresText'>" + getHighscore + "</b>";
strkText.innerHTML = "Your Streak: <b class='scoresText'>" + getstrk + "</b>";
highestStreakText.innerHTML = "Your highest Streak: <b class='scoresText'>" + getHighestStrk + "</b>";

if (score >= highscore) localStorage.setItem("highscore", score);
if (strk >= highestStrk) localStorage.setItem("highestStreak", strk);

if (score > 0) {
    scoreText.style.color = "green";
} else if (score < 0) {
    scoreText.style.color = "red";
} else if (score == 0) {
    scoreText.style.color = "orange";
}

const fixxer = document.getElementById("fixxer");

function resetUserScores() {
    let prompt = "Are you sure you want to reset your scores?\nYou should only use this if your score shows NaN\nTo miniminze cheating it will only work if one of you scores displays null";
    if (confirm(prompt) == true && getscore == null || getstrk == null || getHighscore == null || getHighestStrk == null) {
        localStorage.setItem("score", 0);
        localStorage.setItem("streak", 0);
        localStorage.setItem("highscore", 0);
        localStorage.setItem("highestStreak", 0);
        reloadPage();
    }
}

function onePanelMode() {
    let sidePanel = document.getElementById("sidePanel");
    sidePanel.style.width = "100%";
    sidePanel.style.textAlign = "center";
    sidePanel.style.paddingLeft = "5%";
    sidePanel.style.paddingRight = "5%";

    let ansBox = document.getElementById("answerBox");
    ansBox.style.display = "none";
}

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

dragCalulator(calcModal);

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

function buildQuestion() {
    fetch('https://caleb-sudo.github.io/StudyHelper2/resources/questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            var unit = data.Bio.Bio20.UnitD;

            const unitSelect = document.getElementById("UnitSelector");

            unitSelect.addEventListener("change", function () {
                localStorage.setItem("topic", unitSelect.value);
                reloadPage();
            });

            if (unitSelect.value[1] == '2') {
                if (unitSelect.value[0] == 'C') {
                    switch (unitSelect.value[2]) {
                        case 'A':
                            unit = data.Chem.Chem20.UnitA;
                            break;
                        case 'B':
                            unit = data.Chem.Chem20.UnitB;
                            break;
                        case 'C':
                            unit = data.Chem.Chem20.UnitCa;
                            break;
                        case 'E':
                            unit = data.Chem.Chem20.UnitCb;
                            break;
                        case 'D':
                            unit = data.Chem.Chem20.UnitD;
                            break;
                    }
                } else if (unitSelect.value[0] == 'B') {
                    switch (unitSelect.value[2]) {
                        case 'A':
                            unit = data.Bio.Bio20.UnitA;
                            break;
                        case 'B':
                            unit = data.Bio.Bio20.UnitB;
                            break;
                        case 'C':
                            unit = data.Bio.Bio20.UnitC;
                            break;
                        case 'D':
                            unit = data.Bio.Bio20.UnitD;
                            break;
                    }
                } else if (unitSelect.value[0] == 'S') {
                    switch (unitSelect.value[2]) {
                        case 'A':
                            unit = data.Social.Social20.UnitA;
                            break;
                        case 'B':
                            unit = data.Social.Social20.UnitB;
                            break;
                        case 'C':
                            unit = data.Social.Social20.UnitC;
                            break;
                    }
                }
            }
            if (unitSelect.value[0] == 'M' && unitSelect.value[1] == '3') {
                switch (unitSelect.value[2]) {
                    case 'A':
                        unit = data.Math.Math30_1.UnitA;
                        break;
                    case 'B':
                        unit = data.Math.Math30_1.UnitB;
                        break;
                    case 'C':
                        unit = data.Math.Math30_1.UnitC;
                        break;
                    case 'D':
                        unit = data.Math.Math30_1.UnitD;
                        break;
                    case 'E':
                        unit = data.Math.Math30_1.UnitE;
                        break;
                }
            }
            const question = document.getElementById("question");
            const qField = document.getElementById("box");
            const field = document.getElementById("box2");

            let questionNum = Math.floor(Math.random() * unit.length);
            question.innerHTML = unit[questionNum].question;

            if (unit[questionNum].type == 0) { //multiple choice question
                const imgField = document.getElementById("box");
                const pict = document.createElement('img');

                if (unit[questionNum].picture != null) {
                    pict.src = unit[questionNum].picture;
                    pict.style.width = '98%';
                    pict.style.height = 'auto';
                    imgField.appendChild(pict);
                    imgField.appendChild(document.createElement('br'));
                }

                const opts = [
                    "A) ",
                    "B) ",
                    "C) ",
                    "D) "
                ];
                
                for (let i = 0; i < 4; i++) {
                    const div = document.createElement('div');
                    div.classList = "radioBox";
                    field.appendChild(div);
                    const radio = document.createElement('input');
                    const lab = document.createElement('label');
                    radio.type = "radio";
                    radio.name = "opts";
                    radio.id = 'r' + i;
                    radio.className = "radios";
                    lab.htmlFor = 'r' + i;
                    lab.innerHTML = opts[i] + unit[questionNum].options[i];
                    lab.className = "radioLabel";
                    div.appendChild(radio);
                    div.appendChild(lab);
                    field.appendChild(document.createElement('hr'));
                }

                const radios = document.getElementsByClassName("radios");
                let submitBtn = document.createElement('button');
                let nextBtn = document.createElement('button');

                submitBtn.innerHTML = "Submit";
                submitBtn.classList = "submitBtn";
                field.appendChild(submitBtn);

                nextBtn.innerHTML = "next";
                nextBtn.classList = "nextBtn";
                
                function submitMultChoice() {
                    for (let i = 0; i < 4; i++) {
                        if (radios[i].checked == true) {
                            radios.disabled = true;
                            submitBtn.style.display = "none";
                            field.appendChild(nextBtn);
                            let span = document.createElement("span");
                            span.style.fontSize = "25px";
                            let label = document.getElementsByClassName("radioLabel");
                            localStorage.setItem("totalAnswered", totalAnswered + 1);
                            let checkedIndex = [...document.querySelectorAll("input[name=opts]")].findIndex(e=>e.checked);
                            if (checkedIndex == unit[questionNum].answer) {
                                localStorage.setItem("streak", strk + 1);
                                localStorage.setItem("score", score + 1);
                                localStorage.setItem("totalAnsweredCorrect", totalAnsweredCorrect + 1);
                                span.innerHTML = "&check;";
                                span.style.color = "green";
                                label[checkedIndex].appendChild(span);
                            } else {
                                strk = 0;
                                localStorage.setItem("streak", strk);
                                localStorage.setItem("score", score - 1);
                                span.innerHTML = "&cross;";
                                span.style.color = "red";
                                label[checkedIndex].appendChild(span);
                                let correctAnsSpan = document.createElement("span");
                                correctAnsSpan.innerHTML = "&check;";
                                correctAnsSpan.style.color = "green";
                                correctAnsSpan.style.fontSize = "25px";
                                label[unit[questionNum].answer].appendChild(correctAnsSpan);
                            }
                        }
                    }
                }
                submitBtn.addEventListener("click", submitMultChoice);
                nextBtn.addEventListener("click", reloadPage);
            } else if (unit[questionNum].type == 1) { //single word answer question

            } if (unit[questionNum].type == 2) { //drag and drop question
                let r = randomize(unit[questionNum].totalElements);
                for (var i = 0; i < unit[questionNum].totalElements; i++) {
                    let draggables = document.createElement('div');
                    let dropboxes = document.createElement('div');
                    let droppers = document.createElement('div');
                    let p = document.createElement('p');
                    let dropText = document.createElement('span');
                    draggables.draggable = true;
                    draggables.innerHTML = unit[questionNum].terms[r[i]];
                    draggables.classList = "draggables";
                    draggables.id = "draggable" + i;
                    draggables.addEventListener("dragstart", function(event) {
                        dragStart(event);
                    });
                    dropboxes.classList = "dropboxes";
                    dropboxes.id = "dropbox" + i;
                    dropText.innerHTML = "Drop the draggable blocks here";
                    dropText.classList = "dropText";
                    dropText.id = "dropText" + i;
                    dropText.style.display = "block";
                    droppers.addEventListener("drop", function(event) {
                        drop(event);
                    });
                    droppers.addEventListener("dragover", function(event) {
                        allowDrop(event);
                    });
                    droppers.classList = "droppers";
                    droppers.id = "dropper" + i;
                    qField.appendChild(draggables);
                    field.appendChild(dropboxes);
                    field.appendChild(document.createElement('br'));
                    p.innerHTML = unit[questionNum].definitions[r[i]];
                    p.classList = "dropboxParas";
                    p.id = "dropboxPara" + i;
                    dropboxes.appendChild(p);
                    dropboxes.appendChild(droppers);
                    droppers.appendChild(dropText);
                    /*if (dropText[i].innerHTML.toString() != droppers[i].innerText.toString()) {
                        dropText[i].style.display = "none";
                    } else {
                        dropText[i].style.display = "block";
                    }*/
                }

                let submitBtn = document.createElement('button');
                submitBtn.innerHTML = "Submit";
                submitBtn.classList = "submitBtn";
                field.appendChild(submitBtn);

                let nextBtn = document.createElement('button');
                nextBtn.innerHTML = "Next";
                nextBtn.classList = "nextBtn";
                
                function submitDragboxes() {
                    let correct = 0;
                    submitBtn.style.display = "none";
                    field.appendChild(nextBtn);
                    localStorage.setItem("totalAnswered", totalAnswered + unit[questionNum].totalElements);
                    for (var i = 0; i < unit[questionNum].totalElements; i++) {
                        let draggables = document.getElementsByClassName("draggables");
                        let p = document.getElementsByClassName("dropboxParas");
                        let checker = document.createElement("span");
                        checker.classList = "checker";
                        //terms.indexOf(d[i].innerHTML) == definitions.indexOf(p[i].innerHTML
                        let terms = unit[questionNum].terms;
                        let definitions = unit[questionNum].definitions;
                        if (terms.indexOf(draggables[i].innerHTML) == definitions.indexOf(p[i].innerHTML)) {
                            checker.style.color = "green";
                            checker.innerHTML = "&check;";
                            correct++;
                            localStorage.setItem("score", score + correct);
                            localStorage.setItem("streak", strk + correct);
                            localStorage.setItem("totalAnsweredCorrect", totalAnsweredCorrect + correct);
                        } else {
                            checker.style.color = "red";
                            checker.innerHTML = "&cross;";
                            localStorage.setItem("score", score - (unit[questionNum].totalElements - correct));
                            localStorage.setItem("streak", 0);
                        }
                        draggables[i].appendChild(checker);
                    }
                }
                submitBtn.addEventListener("click", submitDragboxes);
                nextBtn.addEventListener("click", reloadPage);
            } else if (unit[questionNum].type == 3) { //sorting question
                let r = randomize(unit[questionNum].totalElements);
                for (var i = 0; i < unit[questionNum].totalElements; i++) {
                    let draggables = document.createElement("div");
                    let dropboxes = document.createElement("div");
                    let number = document.createElement("span");
                    number.classList = "labels";
                    dropboxes.classList = "dropboxes";
                    dropboxes.id = "dropbox" + i;
                    dropboxes.addEventListener("drop", function(event) {
                        drop(event);
                    });
                    dropboxes.addEventListener("dragover", function(event) {
                        allowDrop(event);
                    });
                    field.appendChild(dropboxes);
                    draggables.draggable = true;
                    draggables.addEventListener("dragstart", function(event) {
                        dragStart(event);
                    });
                    draggables.innerHTML = unit[questionNum].definitions[r[i]];
                    draggables.classList = "draggables";
                    draggables.id = "draggable" + i;
                    number.innerHTML = i;
                    dropboxes.appendChild(number);
                    dropboxes.appendChild(draggables);
                }
                let submitBtn = document.createElement('button');
                submitBtn.innerHTML = "Submit";
                submitBtn.classList = "submitBtn";
                field.appendChild(submitBtn);

                let nextBtn = document.createElement('button');
                nextBtn.innerHTML = "Next";
                nextBtn.classList = "nextBtn";

                function submitSort() {
                    let correct = 0;
                    submitBtn.style.display = "none";
                    field.appendChild(nextBtn);
                    localStorage.setItem("totalAnswered", totalAnswered + unit[questionNum].totalElements);
                    for (var i = 0; i < unit[questionNum].totalElements; i++) {
                        let draggables = document.getElementsByClassName("draggables");
                        let checker = document.createElement("span");
                        checker.classList = "checker";
                        draggables.draggable = false;
                        localStorage.setItem("totalAnswered", totalAnswered + unit[questionNum].totalElements)
                        if (draggables[i].innerHTML == unit[questionNum].definitions[i]) {
                            checker.style.color = "green";
                            checker.innerHTML = "&check;";
                            correct++;
                            localStorage.setItem("score", score + correct);
                            localStorage.setItem("streak", strk + 1);
                            localStorage.setItem("totalAnsweredCorrect", totalAnsweredCorrect + correct);
                        } else {
                            checker.style.color = "red";
                            checker.innerHTML = "&cross;";
                            localStorage.setItem("score", score - (unit[questionNum].totalElements - correct));
                            localStorage.setItem("streak", 0);
                        }
                        draggables[i].appendChild(checker);
                    }
                }
                submitBtn.addEventListener("click", submitSort);

                nextBtn.addEventListener("click", reloadPage);
            } else if (unit[questionNum].type == 4) { //numeric response question
                onePanelMode();

                let br = document.createElement('br');

                let text = document.createElement('span');
                text.style.color = "white";
                text.style.textAlign = "center";
                text.style.fontSize = "15px";

                let checker = document.createElement('span');
                checker.classList = "checker";

                let responseBox = document.createElement('input');
                responseBox.type = "text";
                responseBox.id = "response";
                qField.appendChild(responseBox);
                qField.appendChild(checker);
                qField.appendChild(br);

                let submitBtn = document.createElement('button');
                submitBtn.innerHTML = "Submit";
                submitBtn.classList = "submitBtn";
                qField.appendChild(submitBtn);

                let nextBtn = document.createElement('button');
                nextBtn.innerHTML = "Next";
                nextBtn.classList = "nextBtn";

                function submitNumeric() {
                    submitBtn.style.display = "none";
                    let value = responseBox.value;
                    let val = parseFloat(value);
                    let valMin = val - 1;
                    let valMax = val + 1;
                    let answer = unit[questionNum].answer;
                    let u = unit[questionNum].unit;
                    let correctAns = document.createElement('span');
                    correctAns.style.color = "white";
                    localStorage.setItem("totalAnswered", totalAnswered + 1);
                    qField.appendChild(br);
                    
                    if (val == answer && value.search(u) != -1) {
                        localStorage.setItem("score", score + 1);
                        localStorage.setItem("streak", strk + 1);
                        localStorage.setItem("totalAnsweredCorrect", totalAnsweredCorrect + 1);
                        checker.style.color = "green";
                        checker.innerHTML = "&check;";
                    } else if (val == answer && value.search(u) == -1) {
                        localStorage.setItem("score", score + 0.5);
                        localStorage.setItem("streak", strk + 1);
                        localStorage.setItem("totalAnsweredCorrect", totalAnsweredCorrect + 0.5);
                        let unitsArr = [
                            "You forgot you're units.",
                            "What does that number represent!?",
                            "What does that number mean!?",
                            "What does that number mean!? Grams?, Moles?, Miles?, Liters? What is it?!"
                        ];
                        checker.style.fontSize = "25px";
                        checker.style.color = "green";
                        checker.innerHTML = "&check;";
                        qField.appendChild(br);
                        text.innerHTML = unitsArr[Math.floor(Math.random() * unitsArr.length)];
                        qField.appendChild(text);
                    } else if (valMin <= val <= valMax && val != answer && value.search(u) != -1) {
                        localStorage.setItem("score", score + 0.5);
                        localStorage.setItem("streak", strk + 1);
                        localStorage.setItem("totalAnsweredCorrect", totalAnsweredCorrect + 0.5);
                        if (unitSelect.value[0] == 'C' || unitSelect.value[0] == 'P') {
                            let valsArr = [
                                "So Close",
                                "Did you round incorrectly?",
                                "Did you check your significant digits?"
                            ];
                        } else {
                            let valsArr = [
                                "So Close"
                            ];
                        }
                        checker.style.fontSize = "25px";
                        checker.style.color = "green";
                        checker.innerHTML = "&check";
                        qField.appendChild(br);
                        text.innerHTML = valsArr[Math.floor(Math.random() * valsArr.length)];
                        qField.appendChild(text);
                    } else {
                        localStorage.setItem("score", score - 1);
                        localStorage.setItem("streak", 0);
                        checker.style.color = "red";
                        checker.innerHTML = "&cross;";
                        correctAns.innerHTML = "The correct was <b>&asymp;" + answer + u[0] + "</b>";
                        qField.appendChild(correctAns);
                    }
                    qField.appendChild(br);
                    qField.appendChild(nextBtn);
                }
                submitBtn.addEventListener("click", submitNumeric);
                nextBtn.addEventListener("click", reloadPage);
            } else if (unit[questionNum].type == 5) { //true or false

            } else if (unit[questionNum].type == 6) { //fill in the blanks
                onePanelMode();
                let r = randomize(unit[questionNum].totalElements);
                for (var i = 0; i < unit[questionNum].totalElements; i++) {
                    let br = document.createElement('br');
                    let elements = document.createElement('span');
                    elements.innerHTML = unit[questionNum].definitions[r[i]];
                    elements.classList = "fill_inDefinitions";
                    elements.id = "fill_inDefinition" + i;
                    qField.appendChild(elements);
                    qField.appendChild(br);
                }
                
                let submitBtn = document.createElement('button');
                submitBtn.innerHTML = "Submit";
                submitBtn.classList = "submitBtn";
                qField.appendChild(submitBtn);

                let nextBtn = document.createElement('button');
                nextBtn.innerHTML = "Next";
                nextBtn.classList = "nextBtn";
                function submitFillIn() {
                    let correct = 0;
                    submitBtn.style.display = "none";
                    for (var i = 0; i < unit[questionNum].totalElements; i++) {
                        let definitions = document.getElementsByClassName("fill_inDefinitions");
                        let checker = document.createElement('span');
                        checker.classList = "checker";
                        let textBox = document.getElementsByClassName("fill_in");
                        let value = textBox[r[i]].value;
                        let val = value.toLowerCase();
                        let ans = (x) => unit[questionNum].answers[r[i]][x].toString().toLowerCase();
                        if (ans(0) == val || ans(1) == val) {
                            checker.style.color = "green";
                            checker.innerHTML = "&check;";
                            correct++;
                            localStorage.setItem("score", score + correct);
                            localStorage.setItem("streak", strk + 1);
                            localStorage.setItem("totalAnsweredCorrect", totalAnsweredCorrect + correct);
                        } else {
                            checker.style.color = "red";
                            checker.innerHTML = "&cross;";
                            localStorage.setItem("score", score - (unit[questionNum].totalElements - correct));
                            localStorage.setItem("streak", 0);
                        }
                        definitions[i].appendChild(checker)
                    }
                    qField.appendChild(nextBtn);
                }

                submitBtn.addEventListener("click", submitFillIn);
                nextBtn.addEventListener("click", reloadPage);
            }
        })
        .catch(error => console.error('Failed to fetch data: ', error));
}
buildQuestion();

function openLeaderBoards() {
    const btn = document.getElementById("leaderboardIco");
    const modal = document.getElementById("leaderboardModal");
    const exit = document.getElementById("exitLeaderboardModal");
    const table = document.getElementById("leaderboardTable");

    let openModal = () => modal.style.display = "block";
    let closeModal = () => modal.style.display = "none";

    btn.addEventListener("click", function(){
        openModal();
    });
    exit.addEventListener("click", closeModal);

    function createUser() {
        let userprompt = prompt("Please enter the username you would like to go by");
        localStorage.setItem("username", userprompt);
    }
    if (getUsername == '') createUser();

    for (let i = 0; i < 10; i++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < 2; j++) {
            const td = document.createElement("td");
            td.innerHTML = i;
            tr.appendChild(td);
        }
    }
}