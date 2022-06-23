function eatingRamen() {
    console.log("ラーメンうまい");
}

function playWithSmartphone() {
    console.log("スマホいじり");
}

function waitingForRamen() {
    const start = new Date().getTime();
    let now = start;
    while( (now - start) < 3000) {
        now = new Date().getTime();
    }
}

waitingForRamen();
playWithSmartphone();
eatingRamen();


