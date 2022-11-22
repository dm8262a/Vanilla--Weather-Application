function formatDate(times) {
  let date = new Date(times);
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
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let todaysDate = date.getDate();
  return `${day}, ${month} ${todaysDate} (updated at: ${hours}:${minutes})`;
}
function formatDay(timeStampDate) {
  let date = new Date(timeStampDate * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wedn", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast-temperatures");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
        <div class="col-2">
                 <div class="weather-forecast-date">${formatDay(
                   forecastDay.dt
                 )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
                <div class="forecast-temperatures">
                  <span class="forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function obtainForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let conditionIconElement = document.querySelector("#conditionIcon");

  celsiusTemp = response.data.main.temp;

  feelsCelsiusTemp = response.data.main.feels_like;

  tempElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = Math.round(feelsCelsiusTemp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  conditionIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  conditionIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );

  obtainForecast(response.data.coord);
}

function search(city) {
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function requestedCity(event) {
  event.preventDefault();
  let enteredCityElement = document.querySelector("#entered-city");
  search(enteredCityElement.value);
}

function showFartemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let farTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farTemp);
}

function showCelsiustemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function showFeelsFarTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#feels-like");
  let feelsfarTemp = (feelsCelsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(feelsfarTemp);
}

function showFeelsCelTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#feels-like");
  tempElement.innerHTML = Math.round(feelsCelsiusTemp);
}

let celsiusTemp = null;

let feelsCelsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", requestedCity);

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", showFartemp);

let celciusLink = document.querySelector("#cel-link");
celciusLink.addEventListener("click", showCelsiustemp);

let feelsFarLink = document.querySelector("#feels-far-link");
feelsFarLink.addEventListener("click", showFeelsFarTemp);

let feelsCelLink = document.querySelector("#feels-cel-link");
feelsCelLink.addEventListener("click", showFeelsCelTemp);

search("New York");
