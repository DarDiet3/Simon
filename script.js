// Document Selectors
const boxOne = document.querySelector("#one");
const boxTwo = document.querySelector("#two");
const boxThree = document.querySelector("#three");
const boxFour = document.querySelector("#four");


// Global Variables
const idList = [1, 2, 3, 4];
const idPresented = [];
const isUserSelected = [];
const lightColors = {
    one: "#fae675",
    two: "#4182bc",
    three: "#e45356",
    four: "#7da75e"
}

// Interval timers



// Event Listeners




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

function lightSimon2() {
    let changeColor = setInterval(() => {boxOne.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.one})`}, 1000);
    setTimeout(() => {clearInterval(changeColor); boxOne.style.backgroundImage = ""}, 2000);
}

for(let i = 0; i < 10; i++) {
    colorSelector(); 
}

console.log(idPresented)

colorPresentHandler()
// lightSimon2()
// lightUpSimon(1)
// lightUpSimon(2)
// lightUpSimon(3)
// lightUpSimon(4)