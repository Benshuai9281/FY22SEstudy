function getData(cb) {
    console.log("loading ...");
    setTimeout(cb, 3000); // 外部サーバからのデータ取得を待ってから実行。
};

(async function () {
    console.log("getData start");
    // getDataを呼び出す。
    await new Promise (function(resolve,reject){
        getData(resolve);
    })
    console.log("getData finished");
})();
