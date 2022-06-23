function getData(cb) {
    console.log("loading ...");
    const now = new Date().getDate();
    if (now % 2 == 0) {
        setTimeout(cb, 3000, true); // success
    } else {
        setTimeout(cb, 1000, false); // failed
    }
};

console.log("getData start");
// getData()を呼んでデータを取得する。
// 取得完了したらgetData finishedと出力する。
// console.log("getData finished");

