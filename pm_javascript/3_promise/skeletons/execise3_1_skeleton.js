function playingWithSmartphone() {
    console.log("スマホいじり");
}

function startEatingEggs() {
    console.log("食べる！");
}

console.log("茹でる！");
// 6秒待ってからstartEatingEggsを呼ぼう。
// その間にplayWithSmartphoneを呼ぼう。
setTimeout(function () {
    console.log("卵うまい");
}, 6000);
playWithSmartphone();
