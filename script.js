// Document Selectors
const boxOne = document.querySelector("#one");
const boxTwo = document.querySelector("#two");
const boxThree = document.querySelector("#three");
const boxFour = document.querySelector("#four");
const gameBoard = document.querySelector(".gameBoard");
const lostBox = document.querySelector(".lost");
const userScore = document.querySelector("#topBox p")

console.log(userScore)
// Global Variables
const idList = [1, 2, 3, 4];
const idPresented = [];
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
// Interval timers



// Event Listeners
gameBoard.addEventListener("click", userGameboardClick)



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

let presentIndex = 0;
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
            idUserSelected.push(1)
            break;
        case square === "two":
            idUserSelected.push(2)
            break;
        case square === "three":
            idUserSelected.push(3)
            break;
        case square === "four":
            idUserSelected.push(4)
            break;
    }
    console.log(idUserSelected)
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
            
            colorSelector();
            presentIndex = 0;
            colorPresentHandler();
        }
    } else {
        if(correctSequences > highScore) {
            highScore = correctSequences;
        }
        lostBox.style.display = "block";
    }
}
// function startGameHandler {
//     /**Here will be the logic that will check everything working */
// }

for(let i = 0; i < 3; i++) {
    colorSelector(); 
}

console.log(`idPresented = ${idPresented}`)



        // correctSequences ++;
        // idUserSelected = [];
        // colorSelector();
        // colorPresentHandler();