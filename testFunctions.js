function lightSimon2() {
    let changeColor = setInterval(() => {boxOne.style.backgroundImage = `radial-gradient(white .1%, ${lightColors.one})`}, 1000);
    setTimeout(() => {clearInterval(changeColor); boxOne.style.backgroundImage = ""}, 2000);
}