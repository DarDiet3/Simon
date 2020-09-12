// Document Selectors
const boxOne = document.querySelector("#one");
const boxTwo = document.querySelector("#two");
const boxThree = document.querySelector("#three");
const boxFour = document.querySelector("#four");
const gameBoard = document.querySelector(".gameBoard");
const lostBox = document.querySelector(".lost");
const userScoreDisplay = document.querySelector("#topBox p");
const highScoreDisplay = document.querySelector("#bottomBox p");
const playButton = document.querySelector("#startGame");
const resetButton = document.querySelector("#resetGame");

// Global Variables
const idList = [1, 2, 3, 4];
let idPresented = [];
let idUserSelected = [];
const lightColors = {
    one: "#fae675",
    two: "#4182bc",
    three: "#e45356",
    four: "#7da75e"
};
let correctSequences = 0;
let highScore = 0;
let clicks = 0;
let presentIndex = 0;

// Event Listeners
gameBoard.addEventListener("click", userGameboardClick);
playButton.addEventListener("click", startGameHandler);
resetButton.addEventListener("click", resetGameHandler);
lostBox.addEventListener("click", resetGameHandler);


// Functions

function colorSelector() {
    let index = Math.floor(Math.random() * idList.length);
    idPresented.push(idList[index]);
    console.log(`idPresented = ${idPresented}`)
}

function lightUpSimon(index, lightTime, darkTime = lightTime * 2) {
    let changeColor;
    switch(true) {
        case index === 1:
            changeColor = setInterval(() => {boxOne.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.one})`}, lightTime);
            setTimeout(() => {clearInterval(changeColor); boxOne.style.backgroundImage = ""}, darkTime);
            break;
        case index === 2:
            changeColor = setInterval(() => {boxTwo.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.two})`}, lightTime);
            setTimeout(() => {clearInterval(changeColor); boxTwo.style.backgroundImage = ""}, darkTime);            break;
        case index === 3:
            changeColor = setInterval(() => {boxThree.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.three})`}, lightTime);
            setTimeout(() => {clearInterval(changeColor); boxThree.style.backgroundImage = ""}, darkTime);
            break;
        case index === 4:
            changeColor = setInterval(() => {boxFour.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.four})`}, lightTime);
            setTimeout(() => {clearInterval(changeColor); boxFour.style.backgroundImage = ""}, darkTime);
            break;

    }
}


function colorPresentHandler(){
        setTimeout(() => {
            presentIndex++;
            lightUpSimon(idPresented[presentIndex-1],1000);
            if(presentIndex <= idPresented.length) {
                colorPresentHandler();
            }
        },2050);
    //  Stack overflow solution to similar issue: https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop;
}

function userGameboardClick() {
    let square = event.target.id;
    switch(true) {
        case square === "one":
            lightUpSimon(1,0,250);
            idUserSelected.push(1);
            break;
        case square === "two":
            lightUpSimon(2,0,250);
            idUserSelected.push(2)
            break;
        case square === "three":
            lightUpSimon(3,0,250);
            idUserSelected.push(3)
            break;
        case square === "four":
            lightUpSimon(4,0,250);
            idUserSelected.push(4)
            break;
    }
    confirmSelection();
}

function confirmSelection() {
    let userAnswer = idUserSelected.join("");
    let answerHolder = [];
    clicks ++;
    for(let i = 0; i < clicks; i++) {
        answerHolder.push(idPresented[i])
    }
    let answer = answerHolder.join("");
    console.log(clicks)
    if(userAnswer === answer) {
        if(clicks === idPresented.length) {
            idUserSelected = [];
            clicks = 0;
            correctSequences ++;
            userScoreDisplay.innerText = correctSequences;
            colorSelector();
            presentIndex = 0;
            colorPresentHandler();
        }
    } else {
        if(correctSequences > highScore) {
            highScore = correctSequences;
            highScoreDisplay.innerText = highScore;
        }
        lostBox.style.display = "block";
    }
}

function startGameHandler() {
    event.preventDefault();
    colorSelector();
    lightUpSimon(idPresented[0],350);
}

function resetGameHandler() {
    event.preventDefault();
    idPresented = [];
    idUserSelected = [];
    clicks = 0;
    correctSequences = 0;
    userScoreDisplay.innerText = correctSequences;
    lostBox.style.display = "none"
    presentIndex = 0;
}


// console.log(`idPresented = ${idPresented}`)

