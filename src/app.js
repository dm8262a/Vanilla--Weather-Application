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
  return `${day}, ${month} ${todaysDate}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let conditionIconElement = document.querySelector("#conditionIcon");

  celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
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
}

function search(city) {
  let apiKey = "6df7e1335a2ad82c3029b7821a8d1f8c";
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

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", requestedCity);

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", showFartemp);

let celciusLink = document.querySelector("#cel-link");
celciusLink.addEventListener("click", showCelsiustemp);

search("New York");
