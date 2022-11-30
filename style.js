//Today's Forecast function

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
// display forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row">`;
  let days = ["Thursday", "Friday", "Saturday", "Sunday"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
 
    <div class="col-2">
      <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)} </div>
      <div class= "weather-forecast-img"><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
           alt=""
           width="36"/>
    </div>
          <div class="weather-forecast-description">${
            forecastDay.weather[0].main
          }
          </div>
       <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temp-max">${Math.round(
            forecastDay.temp.max
          )}˚</span> 
          <span class="weather-forecast-temp-min"> ${Math.round(
            forecastDay.temp.min
          )}˚</span>
        </div>
    </div>
 
  `;
    }
  });
  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

//display today's weather
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#descToday");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description;`);
  getForecast(response.data.coord);
}

//search button function

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
//degree conversion function

function showDegreesFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function showDegreesCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let degreeF = document.querySelector("#degreeF");
degreeF.addEventListener("click", showDegreesFahrenheit);

let degreeC = document.querySelector("#degreeC");
degreeC.addEventListener("click", showDegreesCelcius);

// search button defined
search("Houston");
