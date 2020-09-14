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
const leaderBoardDisplay = document.querySelectorAll("#leaderBoardDisplay")
// console.log(leaderBoardDisplay)
// console.log(leaderBoardDisplay[0].childNodes[7].classList)

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
let clicks = 0;
let presentIndex = 0;
let gameSpeed = 1000;
let colorInterval = gameSpeed * 2.05;
let speedDisplay;



// Local Storage Variables

let currentHighScore = localStorage.getItem("highScore");
let topScores = JSON.parse(localStorage.getItem("topScores"));
let ls1 = topScores[0][0];
let ls2 = topScores[1][0];
let ls3 = topScores[2][0];
let ls4 = topScores[3][0];
let ls5 = topScores[4][0];
let highScore = localStorage.getItem("highScore")

window.addEventListener ("load", (event) => {
    (highScoreDisplay.innerText = currentHighScore);
    console.log(topScores)
    updateLeaderBoard();
    
    });
    

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
        checkLeaderBoard(correctSequences);
        if(correctSequences > highScore) {
            highScore = correctSequences;
            localStorage.setItem("highScore", highScore);
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
    // checkLeaderBoard(correctSequences);
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

function checkLeaderBoard(score) {

    let name;
    let newEntry;
    switch(true) {
        case score >= parseInt(localStorage.getItem("ls1")):
            name = prompt("Congrats! You climbed to the top of the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.unshift(newEntry);
            topScores.pop()
            updateLeaderBoard();
            localStorage.setItem("ls1", score);
            localStorage.setItem("ln1", name);
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
        case score >= parseInt(localStorage.getItem("ls2")):
            name = prompt("Congrats! You're on the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.splice(1, 0, newEntry)
            console.log(topScores);
            topScores.pop();
            updateLeaderBoard();
            localStorage.setItem("ls2", score);
            localStorage.setItem("ln2", name);
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
        case score >= parseInt(localStorage.getItem("ls3")):
            name = prompt("Congrats! You're on the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.splice(2, 0, newEntry)
            console.log(topScores);
            topScores.pop()
            updateLeaderBoard();
            localStorage.setItem("ls3", score);
            localStorage.setItem("ln3", name);
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
        case score >= parseInt(localStorage.getItem("ls4")):
            name = prompt("Congrats! You're on the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.splice(3, 0, newEntry)
            console.log(topScores);
            topScores.pop()
            updateLeaderBoard();
            localStorage.setItem("ls4", score);
            localStorage.setItem("ln4", name);
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
        case score >= parseInt(localStorage.getItem("ls5")):
            name = prompt("Congrats! You just snuck on to the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.splice(4, 0, newEntry)
            console.log(topScores);
            updateLeaderBoard();
            localStorage.setItem("ls5", score);
            localStorage.setItem("ln5", name);
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
    }
}

function updateLeaderBoard() {
    for(let i = 0; i < 36; i++) {
        if(leaderBoardDisplay[0].childNodes[i].nodeName !== "#text"){
            switch(true) {
                case leaderBoardDisplay[0].childNodes[i].classList.contains("one"):
                    switch(true) {
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("name"): 
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[0][1];
                            break;
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("lscore"):
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[0][0];
                            break;
                    }
                    break;
                case leaderBoardDisplay[0].childNodes[i].classList.contains("two"):
                    switch(true) {
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("name"): 
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[1][1];
                            break;
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("lscore"):
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[1][0];
                            break;
                    }
                    break;
                case leaderBoardDisplay[0].childNodes[i].classList.contains("three"):
                    switch(true) {
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("name"): 
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[2][1];
                            break;
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("lscore"):
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[2][0];
                            break;
                    }
                    break;
                case leaderBoardDisplay[0].childNodes[i].classList.contains("four"):
                    switch(true) {
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("name"): 
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[3][1];
                            break;
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("lscore"):
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[3][0];
                            break;
                    }
                    break;
                case leaderBoardDisplay[0].childNodes[i].classList.contains("five"):
                    switch(true) {
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("name"): 
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[4][1];
                            break;
                        case leaderBoardDisplay[0].childNodes[i].classList.contains("lscore"):
                            leaderBoardDisplay[0].childNodes[i].innerText = topScores[4][0];
                            break;
                    }
                    break;
            }
        }
    }
}

// console.log(`idPresented = ${idPresented}`)

