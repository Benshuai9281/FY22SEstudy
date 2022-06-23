function playWithSmartphone() {
    console.log("スマホいじり");
}

function goToRestRoom() {
    console.log("トイレに行く");
}

console.log("茹でる！");
setTimeout(function () {
    console.log("冷やす！");
    setTimeout(function () {
        console.log("食べる！");
    }, 3000);
    goToRestRoom();
}, 6000);
playWithSmartphone();

