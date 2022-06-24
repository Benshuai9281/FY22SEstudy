function playWithSmartphone() {
    console.log("スマホいじり");
}

function goToRestRoom() {
    console.log("トイレに行く");
}

function watchVideosOnNetflix() {
    console.log("Netflixを見る");
}

console.log("沸かす！");
setTimeout(function () {
    console.log("茹でる！");
    setTimeout(function () {
        console.log("冷やす！");
        setTimeout(function () {
            console.log("食べる！");
        }, 3000)
        goToRestRoom();
    }, 6000);
    playWithSmartphone();
}, 5000);
watchVideosOnNetflix();

