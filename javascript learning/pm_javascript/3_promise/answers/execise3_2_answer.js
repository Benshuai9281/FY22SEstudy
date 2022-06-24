function playWithSmartphone() {
    console.log("スマホいじり");
}

function goToRestRoom() {
    console.log("トイレに行く");
}

function startEatingEggs() {
    console.log("食べる！");
}

function startCoolingAndEating() {
    console.log("冷やす！");
    setTimeout(startEatingEggs, 3000);
    goToRestRoom();
}

console.log("茹でる！");
setTimeout(startCoolingAndEating, 6000);
playWithSmartphone();

