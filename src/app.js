function displayTemperature(response) {
  console.log(response.data.main.temp);
}
let apiKey = "6df7e1335a2ad82c3029b7821a8d1f8c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
