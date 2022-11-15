function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let descriptionHumidity = document.querySelector("#humidity");
  let descriptionWind = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  descriptionHumidity.innerHTML = response.data.main.humidity;
  descriptionWind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "6df7e1335a2ad82c3029b7821a8d1f8c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
