function playWithSmartphone() {
    console.log("スマホいじり");
}

function goToRestRoom() {
    console.log("トイレに行く");
}

function startEatingEggs() {
    console.log("食べる！");
}

function startCoolingEggs() {
    console.log("冷やす！");
}

console.log("茹でる！");
setTimeout(startCoolingEggs, 6000);
playWithSmartphone();
setTimeout(startEatingEggs, 3000);
goToRestRoom();

