// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
  unit: "celcius",
};

//App consts and vars
const KELVIN = 273;
const key = "edf4a5dc86c54cfb5fd6c65d68163c67";

//check for geolocation support in browser

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>";
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor((data.main.temp - KELVIN) * 9/5 +32);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      console.log(data);
    })
    .then(function () {
      displayWeather();
    });

  function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="" />`;
    tempElement.innerHTML = `${weather.temperature.value} ° <span>F</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = weather.city;




    console.log(weather.description);
  }
}
