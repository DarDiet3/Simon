function lightSimon2() {
    let changeColor = setInterval(() => {boxOne.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.one})`}, 1000);
    setTimeout(() => {clearInterval(changeColor); boxOne.style.backgroundImage = ""}, 2000);
}

let Arr = ["dog", "cat", "chicken"]
let inInd = 2;
let newAn = "fish";
Arr.splice(inInd,2,newAn);
// console.log(Arr)

localStorage.setItem("name","Darci")
localStorage.setItem("name","Jo")

let name = localStorage.getItem("name")
// console.log(name)

boxCount = 1;

switch(boxCount) {
    case 1:
        console.log("one");
}