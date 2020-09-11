// Document Selectors
const boxOne = document.querySelector("#one");
const boxTwo = document.querySelector("#two");
const boxThree = document.querySelector("#three");
const boxFour = document.querySelector("#four");


// Global Variables
const idList = [1, 2, 3, 4];
const idPresented = [];
const isUserSelected = [];

// Interval timers



// Event Listeners




// Functions

function colorSelector() {
    let index = Math.floor(Math.random() * idList.length);
    idPresented.push(idList[index])
}

function lightUpSimon(index) {
    switch(true) {
        case index === 1:
            boxOne.style.backgroundImage = "radial-gradient(white .1%, #fae675)";
            break;
        case index === 2:
            boxTwo.style.backgroundImage = "radial-gradient(white .1%, #4182bc)";
            break;
        case index === 3:
            boxThree.style.backgroundImage = "radial-gradient(white .1%, #e45356)";
            break;
        case index === 4:
            boxFour.style.backgroundImage = "radial-gradient(white .1%, #7da75e)";
            break;

    }
}

for(let i = 0; i < 10; i++) {
    colorSelector(); 
}

console.log(idPresented)

