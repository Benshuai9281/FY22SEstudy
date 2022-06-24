const goodBtn = document.getElementById("good")
const goodCounter = document.getElementById("counter")

let goods = 0

function goodIncrement(){
    goods++;
    goodCounter.innerText = goods
}

goodBtn.addEventListener("click", goodIncrement)

