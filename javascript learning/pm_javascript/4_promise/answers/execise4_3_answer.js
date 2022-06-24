function getData(cb) {
    console.log("loading ...");
    const now = new Date().getTime();
    if (now % 10 >= 5) {
        setTimeout(cb, 3000, true); // success
    } else {
        setTimeout(cb, 1000, false); // failed
    }
};

console.log("getData start");
new Promise(function (resolve, reject) {
    getData(function (result) {
        if (result) {
            console.log("getData completed");
        } else {
            console.log("getData failed");
        }
        resolve();
    })
}).then(function () {
    console.log("getData finished");
})
