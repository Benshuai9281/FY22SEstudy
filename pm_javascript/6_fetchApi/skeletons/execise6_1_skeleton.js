(async function () {
    console.log("getData start");
    // APIコールする。APIのURLは、https://<当日発表>.execute-api.ap-northeast-1.amazonaws.com/sisusuku/v1/weather
    const result = /* APIを叩こう */
    await (await fetch("https://ibbp6l4jpe.execute-api.ap-northeast-1.amazonaws.com/sisusuku/v1/weather")).text();
    console.log(result);
})();

