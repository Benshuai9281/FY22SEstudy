function getData(cb) {
    console.log("loading ...");
    setTimeout(cb, 3000, "hello"); // 外部サーバからのデータ取得を待ってから実行。
};

(async function () {
    console.log("getData start");
    // getDataを呼び出す。
    console.log("getData finished");
})();
