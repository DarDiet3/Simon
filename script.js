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
const howToPlay = document.querySelector(".instructions h2");
const instructions = document.querySelectorAll(".instructions p")
const speedBar = document.querySelector(".speedBar");
const userSpeed = document.querySelector("#userSpeed");

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
let gameSpeed = 1000;
let colorInterval = gameSpeed * 2.05;
let speedDisplay;

// Event Listeners
gameBoard.addEventListener("click", userGameboardClick);
playButton.addEventListener("click", startGameHandler);
resetButton.addEventListener("click", resetGameHandler);
lostBox.addEventListener("click", resetGameHandler);
howToPlay.addEventListener("click", instructionsHandler);

// Functions

function colorSelector() {
    let index = Math.floor(Math.random() * idList.length);
    idPresented.push(idList[index]);
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
            setTimeout(() => {clearInterval(changeColor); boxTwo.style.backgroundImage = ""}, darkTime);            
            break;
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
            lightUpSimon(idPresented[presentIndex-1],gameSpeed);
            if(presentIndex <= idPresented.length) {
                colorPresentHandler();
            }
        },colorInterval);
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
    if(correctSequences > highScore) {
        highScore = correctSequences;
        highScoreDisplay.innerText = highScore;
    }
    idPresented = [];
    idUserSelected = [];
    clicks = 0;
    correctSequences = 0;
    userScoreDisplay.innerText = correctSequences;
    lostBox.style.display = "none"
    presentIndex = 0;
    
}

function instructionsHandler() {
    let newWidth = howToPlay.clientWidth;
    const instSection = document.querySelector(".instructions section");
    for(let i = 0; i < instructions.length; i++) {
        if(instructions[i].style.display === "block") {
            instructions[i].style.display = "";
            instSection.style.border = "";
            instSection.style.borderRadius = "";
            
        } else {
            instructions[i].style.display = "block";
            instSection.style.width = `${newWidth}px`;
            instSection.style.border = "3px solid #1C1E21";
            instSection.style.borderRadius = "0 0 8px 8px";
            instSection.style.transform = "translate(-3px, -3px)";
        }
    }
}

function displaySpeed(speed) {
    switch (true) {
        case parseInt(speed) === 1:
            gameSpeed = 1000;
            colorInterval = gameSpeed * 2.05;
            speedDisplay = "SLOW";
            break;
        case parseInt(speed) === 2:
            gameSpeed = 500;
            colorInterval = gameSpeed * 2.05;
            speedDisplay = "NORMAL";
            break;
        case parseInt(speed) === 3:
            gameSpeed = 300;
            colorInterval = gameSpeed * 2.05;
            speedDisplay = "FAST";
            break;
        case parseInt(speed) === 4:
            gameSpeed = 100;
            colorInterval = gameSpeed * 2.05;
            speedDisplay = "FREAKY FAST";
            break;
    }
    
    userSpeed.innerText = speedDisplay;
}

// console.log(`idPresented = ${idPresented}`)

