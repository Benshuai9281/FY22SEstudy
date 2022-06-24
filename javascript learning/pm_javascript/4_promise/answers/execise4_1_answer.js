function getData(cb) {
    console.log("loading ...");
    setTimeout(cb, 3000); // 外部サーバからのデータ取得を待ってから実行。
};

console.log("getData start");
new Promise(function (resolve, reject) {
    getData(resolve)
}).then(function () {
    console.log("getData finished");
})

