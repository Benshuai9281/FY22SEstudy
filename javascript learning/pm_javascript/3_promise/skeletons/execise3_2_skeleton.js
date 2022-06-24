function playWithSmartphone() {
    console.log("スマホいじり");
}

function goToRestRoom() {
    console.log("トイレに行く");
}

function startEatingEggs() {
    console.log("食べる！");
}

console.log("茹でる！");
// 6秒茹でてる間にplayWithSmartphone関数を呼んでスマホを弄ろう
setTimeout(function () {
    console.log("冷やす！");
    setTimeout(function () {
        console.log("食べる！");
    }, 3000);
    goToRestRoom();
}, 6000);
// 6秒後、"冷やす"と言ってから3秒間卵を冷やそう。その間にトイレにいこう。
// 3秒後、卵を食べよう。
playWithSmartphone();
