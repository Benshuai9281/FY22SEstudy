(async function () {
    console.log("getData start");
    // APIコールする。APIのURLは、https://<当日発表>.execute-api.ap-northeast-1.amazonaws.com/sisusuku/v2/weather
    const result = await (await fetch("https://ibbp6l4jpe.execute-api.ap-northeast-1.amazonaws.com/sisusuku/v2/weather")).json();
    console.log(result.tokyo);
})();

