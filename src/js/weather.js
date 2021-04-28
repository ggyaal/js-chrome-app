const API_KEY = "298ce67c534ec1bc4f2cb6f9ecc8edeb";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
const loading = document.querySelector(".js-loading");

function handleReset() {
  loading.classList.add("loading");
  weather.innerText = "";
  askForCoords();
}

function getWeater(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=kr&units=metric&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const reset = document.createElement("button");
      const temp = json.main.temp;
      const city = json.name;
      reset.innerText = "🔄";
      reset.addEventListener("click", handleReset);
      loading.classList.remove("loading");
      weather.innerText = `${temp}℃ @ ${city}`;
      weather.appendChild(reset);
      weather.classList.add("show-up");
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeater(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeater(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
