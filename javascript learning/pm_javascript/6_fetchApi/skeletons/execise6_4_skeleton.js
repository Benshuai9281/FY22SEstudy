(async function () {
    console.log("getData start");
    // APIコールする。APIのURLは、https://<当日発表>.execute-api.ap-northeast-1.amazonaws.com/sisusuku/v2/weather
    const result = await (await fetch("https://u6xn2y2he0.execute-api.ap-northeast-1.amazonaws.com/sisusuku/v4/weather/13")).json();
    console.log(result.forecast[0]);
})();

