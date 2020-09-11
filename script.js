// Document Selectors
const boxOne = document.querySelector("#one");
const boxTwo = document.querySelector("#two");
const boxThree = document.querySelector("#three");
const boxFour = document.querySelector("#four");
const gameBoard = document.querySelector(".gameBoard")

// Global Variables
const idList = [1, 2, 3, 4];
const idPresented = [];
const idUserSelected = [];
const lightColors = {
    one: "#fae675",
    two: "#4182bc",
    three: "#e45356",
    four: "#7da75e"
};
let correctSequences = 0;

// Interval timers



// Event Listeners
gameBoard.addEventListener("click", userGameboardClick)



// Functions

function colorSelector() {
    let index = Math.floor(Math.random() * idList.length);
    idPresented.push(idList[index])
}

function lightUpSimon(index) {
    let changeColor;
    switch(true) {
        case index === 1:
            changeColor = setInterval(() => {boxOne.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.one})`}, 1000);
            setTimeout(() => {clearInterval(changeColor); boxOne.style.backgroundImage = ""}, 2000);
            break;
        case index === 2:
            changeColor = setInterval(() => {boxTwo.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.two})`}, 1000);
            setTimeout(() => {clearInterval(changeColor); boxTwo.style.backgroundImage = ""}, 2000);            break;
        case index === 3:
            changeColor = setInterval(() => {boxThree.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.three})`}, 1000);
            setTimeout(() => {clearInterval(changeColor); boxThree.style.backgroundImage = ""}, 2000);
            break;
        case index === 4:
            changeColor = setInterval(() => {boxFour.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.four})`}, 1000);
            setTimeout(() => {clearInterval(changeColor); boxFour.style.backgroundImage = ""}, 2000);
            break;

    }
}

let index = 0;
function colorPresentHandler(){
        setTimeout(() => {
            index++;
            lightUpSimon(idPresented[index-1]);
            if(index <= idPresented.length) {
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
}

function confirmSelection(userSelected, presented) {
    let answer = presented.join("");
    let userAnswer = userSelected.join("");
    if(userAnswer === answer)
}
// function startGameHandler {
//     /**Here will be the logic that will check everything working */
// }

// for(let i = 0; i < 10; i++) {
//     colorSelector(); 
// }

// console.log(idPresented)
