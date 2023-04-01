let currentTime = document.querySelector("#show-time");
let now = new Date();
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
currentTime.innerHTML = `${day} ${hour}:${minute}`;

function search(city) {
  let apiKey = "1a8a00a0d298494828889a5f4e560ba8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function typeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#free-one").value;
  search(city);
}

let showSearch = document.querySelector("#current-search");
showSearch.addEventListener("submit", typeCity);
console.log(showSearch);

function showTemperature(response) {
  console.log(response);
  document.querySelector("#special-search").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#med-unit");
  temperatureElement.innerHTML = `${temperature} &#176c`;
  let description = response.data.weather[0].description;
  let showDescription = document.querySelector("#sunny");
  showDescription.innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humid");
  showHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let speedWind = document.querySelector("#windy");
  speedWind.innerHTML = `${wind}`;
  let cDegree = document.querySelector("#last-unit");
  cDegree.innerHTML = null;
}

function showposition(position) {
  let apiKey = "9c37ab9fa36516481c5970a9fe2db0eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}}&appid=${apiKey}`).then(Currentlocation);
}

function Currentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showposition);
}

let position = document.querySelector("#current-first");
position.addEventListener("click", Currentlocation);

search("new york");
