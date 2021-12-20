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
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
        alt=""
        width="36"
      />
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">20º</span>
        <span class="weather-forecast-temp-min">15º</span>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let minElement = document.querySelector("#min");
  let maxElement = document.querySelector("#max");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;
  fahrenheitMin = response.data.main.temp_min;
  fahrenheitMax = response.data.main.temp_max;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  minElement.innerHTML = Math.round(fahrenheitMin);
  maxElement.innerHTML = Math.round(fahrenheitMax);
  conditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "ff769fda7e31b5b213b488e026c99310";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let minElement = document.querySelector("#min");
  let maxElement = document.querySelector("#max");
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let celciusMin = ((fahrenheitMin - 32) * 5) / 9;
  let celciusMax = ((fahrenheitMax - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  minElement.innerHTML = Math.round(celciusMin);
  maxElement.innerHTML = Math.round(celciusMax);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let minElement = document.querySelector("#min");
  let maxElement = document.querySelector("#max");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  minElement.innerHTML = Math.round(fahrenheitMin);
  maxElement.innerHTML = Math.round(fahrenheitMax);
}

let fahrenheitTemperature = null;
let fahrenheitMin = null;
let fahrenheitMax = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("Minneapolis");
displayForecast();
