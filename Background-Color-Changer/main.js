const button = document.querySelector("#changeBtn")
const hexColor = document.querySelector("#hexColor")

const hexValues = ["A", "B", "C", "D", "E", "F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

button.addEventListener("click", () => {
    let hexSymbol = "#"
    console.log("Hello!")
    while (hexSymbol.length < 7) {
        let randomNum = Math.floor(Math.random() * 16)
        console.log(randomNum)
        hexSymbol += hexValues[randomNum]
        console.log(hexSymbol)
    }
    hexColor.innerText = hexSymbol; 
    hexColor.style.color = hexSymbol;
    document.body.style.backgroundColor = hexSymbol;
})
 