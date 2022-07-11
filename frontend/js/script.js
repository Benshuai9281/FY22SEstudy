
let weather = {
  apiKey: "c65350629184079defcee862e4d82fd2",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like } = data.main;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?city " + name + "')";
    document.body.style.backgroundRepeat = "none";
    document.body.style.backgroundSize = "100";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

let weatherfc = {
  apiKey: "c65350629184079defcee862e4d82fd2",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .finally(
        function(){
          if (document.getElementById("ame").innerText == "今日は雨が降る！") {
            amedesu();
          }
        }
      );
  },
  displayWeather: function (data) {
    let ame = 0;
    document.getElementById("ame").innerText = "";
    while (document.querySelector(".container").firstChild) {
      document.querySelector(".container").removeChild(document.querySelector(".container").lastChild);
     }
    for (var i = 0; i <= 4; i++) {
        const { main, icon } = data.list[i].weather[0];
        if (main == "Rain") {
            ame = 1;
        }
        const imager = document.createElement('img');
        console.log(imager);
        imager.src  = "https://openweathermap.org/img/wn/" + icon + ".png";
        console.log(imager.src);
        document.querySelector(".container").appendChild(imager);
        console.log(ame);
    }
    if (ame == 1){
        document.getElementById("ame").innerText = "今日は雨が降る！";
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
  weatherfc.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
      weatherfc.search();
    }
  });

document.body.style.backgroundImage =
"url('https://source.unsplash.com/1600x900/?weather')";
document.body.style.backgroundRepeat = "none";
document.body.style.backgroundSize = "100";
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";


