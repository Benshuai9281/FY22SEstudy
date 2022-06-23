function getData(cb) {
    console.log("loading ...");
    const now = new Date().getTime();
    if (now % 10 >= 5) {
        console.log("getData response is true");
        setTimeout(cb, 3000, true); // success
    } else {
        console.log("getData response is false");
        setTimeout(cb, 1000, false); // failed
    }
};

(async function () {
    console.log("getData start");
    await new Promise(function (resolve, reject) {
        getData(function (result) {
            if (result) {
                console.log("getData completed");
            } else {
                console.log("getData failed");
            }
            resolve();
        })
    });
    console.log("getData finished");
})();

