function getData(cb) {
    console.log("loading ...");
    const now = new Date().getDate();
    if (now % 2 == 0) {
        setTimeout(cb, 3000, true); // success
    } else {
        setTimeout(cb, 1000, false); // failed
    }
};

(async function () {
    console.log("getData start");
    // getDataを呼び出す。
    console.log("getData finished");
})();

