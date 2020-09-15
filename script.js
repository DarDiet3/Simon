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
const selectedSpeed = document.querySelector("#speedSelect")
const userSpeed = document.querySelector("#userSpeed");
const leaderBoardDisplay = document.querySelectorAll("#leaderBoardDisplay");
const colorBlindToggle = document.querySelectorAll(".CBToggle .switch");
const progressiveSpeedToggle = document.querySelectorAll(".psToggle .switch");
const controlPanel = document.querySelector(".controlPanel h2");
const extremeToggle = document.querySelectorAll(".emToggle .switch");

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
let speedProgression = false;
let extreme = false;
let extremeSwitch = 4;
let switchPoint = 0;

// Local Storage Variables

let currentHighScore = localStorage.getItem("highScore");
let topScores;
if(localStorage.getItem("topScores")) {
    topScores = JSON.parse(localStorage.getItem("topScores"));
    
} else {
    topScores = [
        [0,""],
        [0,""],
        [0,""],
        [0,""],
        [0,""]
    ];
    localStorage.setItem("topScores", JSON.stringify(topScores));
} 
let ls1 = topScores[0][0];
let ls2 = topScores[1][0];
let ls3 = topScores[2][0];
let ls4 = topScores[3][0];
let ls5 = topScores[4][0];

let highScore = localStorage.getItem("highScore")

window.addEventListener ("load", (event) => {
    (highScoreDisplay.innerText = currentHighScore);
    
    updateLeaderBoard();
    
    });
    

// Event Listeners
gameBoard.addEventListener("click", userGameboardClick);
playButton.addEventListener("click", startGameHandler);
resetButton.addEventListener("click", resetGameHandler);
lostBox.addEventListener("click", resetGameHandler);
howToPlay.addEventListener("click", instructionsHandler);
colorBlindToggle[0].addEventListener("click", toggleColorBlindMode);
progressiveSpeedToggle[0].addEventListener("click",toggleProgressiveSpeed);
controlPanel.addEventListener("click", controlPanelHandler);
extremeToggle[0].addEventListener("click", toggleExtremeMode);

// Functions

function colorSelector() {
    let index = Math.floor(Math.random() * idList.length);
    idPresented.push(idList[index]);
}

function lightUpSimon(index, lightTime, darkTime = lightTime * 2) {
    let changeColor;
    if(colorBlindToggle[0].children[0].checked) {
        switch(true) {
            case index === 1:
                changeColor = setInterval(() => {
                    boxOne.style.background = "#FEFBEB";
                    boxOne.style.backgroundImage = "repeating-linear-gradient(45deg, transparent, transparent 20px, #1C1E21 20px, #1C1E21 40px)"
                }, lightTime);
                setTimeout(() => {clearInterval(changeColor); 
                    boxOne.style.background = "#FAE675";
                    boxOne.style.backgroundImage = "repeating-linear-gradient(45deg, transparent, transparent 20px, #1C1E21 20px, #1C1E21 40px)"
                }, darkTime);
                break;
            case index === 2:
                changeColor = setInterval(() => {
                    boxTwo.style.background = "#F0F5FA";
                    boxTwo.style.backgroundImage = "radial-gradient(#1C1E21 20%, transparent 20%),radial-gradient(#1C1E21 20%, transparent 20%)";
                    boxTwo.style.backgroundPosition= "0 0, 25px 25px";
                    boxTwo.style.backgroundSize = "50px 50px";
                }, lightTime);
                setTimeout(() => {clearInterval(changeColor); 
                    boxTwo.style.background = "#1482BC";
                    boxTwo.style.backgroundImage = "radial-gradient(#1C1E21 20%, transparent 20%),radial-gradient(#1C1E21 20%, transparent 20%)";
                    boxTwo.style.backgroundPosition= "0 0, 25px 25px";
                    boxTwo.style.backgroundSize = "50px 50px";
                }, darkTime);            
                break;
            case index === 3:
                changeColor = setInterval(() => {
                    boxThree.style.background = "#FCEDEE";
                    boxThree.style.backgroundImage = "linear-gradient(45deg, #1C1E21 25%, transparent 25%, transparent 75%, #1C1E21 75%, #1C1E21), linear-gradient(45deg, #1C1E21 25%, transparent 25%, transparent 75%, #1C1E21 75%, #1C1E21)";
                    boxThree.style.backgroundPosition= "0 0, 25px 25px";
                    boxThree.style.backgroundSize = "50px 50px";  
                }, lightTime);          
                setTimeout(() => {clearInterval(changeColor); 
                    boxThree.style.background = "#E45356";
                    boxThree.style.backgroundImage = "linear-gradient(45deg, #1C1E21 25%, transparent 25%, transparent 75%, #1C1E21 75%, #1C1E21), linear-gradient(45deg, #1C1E21 25%, transparent 25%, transparent 75%, #1C1E21 75%, #1C1E21)";
                    boxThree.style.backgroundPosition= "0 0, 25px 25px";
                    boxThree.style.backgroundSize = "50px 50px";
                }, darkTime);
                break;
            case index === 4:
                changeColor = setInterval(() => {
                    boxFour.style.background = "#F4F8F2";
                    boxFour.style.backgroundImage = "repeating-linear-gradient(0deg, transparent, transparent 30px, #1C1E21 30px, #1C1E21 45px)"}, lightTime);                
                setTimeout(() => {clearInterval(changeColor); 
                    boxFour.style.background = "#7DA75E"
                    boxFour.style.backgroundImage = "repeating-linear-gradient(0deg, transparent, transparent 30px, #1C1E21 30px, #1C1E21 45px)"
                }, darkTime);
                break;
        }
    }  
    else {
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
            if(speedProgression) {
                if(correctSequences !== 0 && correctSequences % 5 === 0) {
                    gameSpeed -= 25;
                    colorInterval = gameSpeed * 2.05;
                }
            }
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
    if(lostBox.style.display !== "block") {
        checkLeaderBoard(correctSequences);
    }
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
    displaySpeed(selectedSpeed.value)
    
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
    topScores = JSON.parse(localStorage.getItem("topScores"))
    let name;
    let newEntry;
    switch(true) {
        case score >= topScores[0][0]:
            name = prompt("Congrats! You climbed to the top of the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.unshift(newEntry);
            topScores.pop()
            updateLeaderBoard();
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
        case score >= topScores[1][0]:
            name = prompt("Congrats! You're on the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.splice(1, 0, newEntry)
            topScores.pop();
            updateLeaderBoard();
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
        case score >= topScores[2][0]:
            name = prompt("Congrats! You're on the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.splice(2, 0, newEntry)
            topScores.pop()
            updateLeaderBoard();
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
        case score >= topScores[3][0]:
            name = prompt("Congrats! You're on the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.splice(3, 0, newEntry)
            topScores.pop()
            updateLeaderBoard();
            localStorage.setItem("topScores", JSON.stringify(topScores));
            break;
        case score >= topScores[4][0]:
            name = prompt("Congrats! You just snuck on to the leader board! Please enter your name!");
            newEntry = [score, name];
            topScores.splice(4, 0, newEntry)
            updateLeaderBoard();
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

function toggleColorBlindMode() {
    if(colorBlindToggle[0].children[0].checked) {
        boxOne.classList.add("colorBlindMode1")       
        boxTwo.classList.add("colorBlindMode2");
        boxThree.classList.add("colorBlindMode3");
        boxFour.classList.add("colorBlindMode4");
    } else {
        boxOne.classList.remove("colorBlindMode1");
        boxTwo.classList.remove("colorBlindMode2");
        boxThree.classList.remove("colorBlindMode3");
        boxFour.classList.remove("colorBlindMode4");
        boxOne.style = "";
        boxTwo.style = "";
        boxThree.style = "";
        boxFour.style = "";
    }
}

function toggleProgressiveSpeed() {
    if(progressiveSpeedToggle[0].children[0].checked) {
        speedProgression = true;
    } else {
        speedProgression = false;
    }
}

function controlPanelHandler() {
    const windowWidth = window.innerWidth;
    if(windowWidth <= 1000) {
        let newWid = controlPanel.clientWidth;
        const controlSect = document.querySelector(".controlPanel section");
        let gameSpeed = document.querySelector(".gameSpeed");
        let colorBlind = document.querySelector(".colorBlind");
        let progressiveSpeed = document.querySelector(".progressiveSpeed");
        let controls = [gameSpeed, colorBlind, progressiveSpeed];
        for(let i = 0; i < controls.length; i++) {
            if(controls[i].style.display === "block") {
                controls[i].style.display = "";
                controlSect.style.border = "";
                controlSect.style.background = "";
                controlSect.style.transform = "";
                controlSect.style.width = "";
                controlSect.style.borderRadius = "";
            } else {
                controls[i].style.display = "block";
                controlSect.style.width = `${newWid}px`;
                controlSect.style.background = "#757780";
                controlSect.style.transform = "translate(-3px, -3px)";
                controlSect.style.border = "3px solid #1C1E21";
                controlSect.style.borderRadius = "0 0 8px 8px";
            }
        }
    }
}

function toggleExtremeMode() {
    if(extremeToggle[0].children[0].checked) {
        extreme = true;
    } else {
        extreme = false;
    }
}

function extremeModeHandler() {
    let set = [3, 4, 5, 6, 7];
    let index = Math.floor(Math.random() * set.legnth);
    extremeSwitch = set[index];
    let positions = ["one", "two", "three", "four"]
    let boxCount = 1;
    let row = 1;
    let column = 1;
    if(correctSequences === switchPoint) {
        for (let i = 0; i < 4; i++) {
            let posIndex = Math.floor(Math.random() * positions.length);
            let box = "one";
            switch(box) {
                case "one":
                    boxOne.style.gridRow = row;
                    boxOne.style.gridColumn = column;
                    break;
                case "two":
                    boxTwo.style.gridRow = row;
                    boxTwo.style.gridColumn = column;
                    break;
                case "three":
                    boxThree.style.gridRow = row;
                    boxThree.style.gridColumn = column;
                    break;
                case "four":
                    boxFour.style.gridRow = row;
                    boxFour.style.gridColumn = column;
                    break;
            }
            console.log(boxCount)
            switch(boxCount) {
                case 1:
                    column = 2;
                    console.log([row, column]);
                    break;
                case 2:
                    row = 2;
                    column = 1;
                    console.log([row, column]);
                    break;
                case 3: 
                    column = 2;
                    console.log([row, column]);
                    break;
            }
            boxCount++;
            
        }
    }
    /** Put the functionality here */

    switchPoint += extremeSwitch;

}

extremeModeHandler()