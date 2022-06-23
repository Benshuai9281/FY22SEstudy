(async function () {
    console.log("getData start");
    // APIコールする。
    const result = await (await fetch("https://ibbp6l4jpe.execute-api.ap-northeast-1.amazonaws.com/sisusuku/v3/weather")).json();
    console.log(result.forecast.tokyo[0]);
})();