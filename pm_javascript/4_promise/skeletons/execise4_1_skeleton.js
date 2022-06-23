function getData(cb) {
    console.log("loading ...");
    setTimeout(cb, 3000); // 外部サーバからのデータ取得を待ってから実行してるふり。
};

console.log("getData start");
// getData()を呼んでデータを取得する。
// 取得完了したらgetData finishedと出力する。
// console.log("getData finished");

