function getData(cb) {
    console.log("loading ...");
    setTimeout(cb, 3000, "hello"); // 外部サーバからのデータ取得を待ってから実行。
};

(async function () {
    console.log("getData start");
    await new Promise(function (resolve, reject) {
        getData(function (a) {
            console.log(a);
            resolve();
        })
    })
    console.log("getData finished");
})();
