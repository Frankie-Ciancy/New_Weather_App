///////// time display
function setTodayData() {
  setTimeNow();
  setDateNow();
  determineLocation();
}
///set place now
function determineLocation() {
  navigator.geolocation.getCurrentPosition(displayCurrentPosition);
  displayCurrentPosition;
}
function displayCurrentPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  currentWeatherHere(longitude, latitude);
}
function currentWeatherHere(longitude, latitude) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(displayHereWeather);
}
function displayHereWeather(position) {
  let currentCity = position.data.name;
  displayCity(currentCity);
}
function displayCity(searchedCity) {
  displayedCity.innerHTML = `${searchedCity}`;
  searchAPI(searchedCity);
}

function searchAPI(searchedCity) {
  let searchTodayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  axios.get(searchTodayUrl).then(displayCurrentTemp);
  axios.get(searchTodayUrl).then(displayCurrentHumidity);
  axios.get(searchTodayUrl).then(displayCurrentWind);
  axios.get(searchTodayUrl).then(chooseUnit);
}

function displayCurrentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  todayTemp.innerHTML = `${temp}°C`;
  // chooseUnit();
}
function displayCurrentHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let humidityToday = document.querySelector("#humidity-today");
  humidityToday.innerHTML = `${humidity}%`;
}
function displayCurrentWind(response) {
  let wind = Math.round(response.data.wind.speed);
  let windToday = document.querySelector("#wind-today");
  windToday.innerHTML = `${wind} m/s`;
}
///Time Right Now
function setTimeNow() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let getMinute = now.getMinutes();
  let getHour = now.getHours();
  let getWeekDay = now.getDay();
  let weekDayNow = document.querySelector("#week-day-now");
  weekDayNow.innerHTML = `${weekDays[getWeekDay]}, ${getHour}:${getMinute}`;
}

function setDateNow() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let getMonth = now.getMonth();
  let getDate = now.getDate();
  let getYear = now.getFullYear();
  let dateNow = document.querySelector("#date-now");
  dateNow.innerHTML = `${months[getMonth]} ${getDate}, ${getYear}`;
}
////definitions

let now = new Date();
let searchLine = document.querySelector(".form-control");
let displayedCity = document.querySelector("#searched-city");
let todayTemp = document.querySelector("#today-temp");
let unitSwitch = document.querySelector("#unit-switch");
let apiKey = "d0374efc7dd8f24099f54d563eb3c31c";

///call functions
setTodayData();
////////////////////////////////////////////////////////////////////////////////
////click buttons
let cityButtons = document.querySelector("#city-buttons");
cityButtons.addEventListener("click", discernButton);

function discernButton(event) {
  event.preventDefault();
  clickButtonAmsterdam();
  clickButtonMilan();
  clickCurrentPosition();
}
///amsterdam button
function clickButtonAmsterdam() {
  let amsterdamButton = document.querySelector("#amsterdam-button");
  amsterdamButton.addEventListener("click", setAmsterdam);
}

function setAmsterdam(event) {
  event.preventDefault();
  let buttonCity = "Amsterdam";
  changeCity(buttonCity);
}
////milan button
function clickButtonMilan() {
  let milanButton = document.querySelector("#milan-button");
  milanButton.addEventListener("click", setMilan);
}

function setMilan(event) {
  event.preventDefault();
  let buttonCity = "Milan";
  changeCity(buttonCity);
}
///current location button
function clickCurrentPosition() {
  let currentPositionButton = document.querySelector("#set-here-button");
  currentPositionButton.addEventListener("click", determineLocation);
}
/////// through search thing

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findSearchValue);

function findSearchValue(event) {
  event.preventDefault();
  let searchedCity = searchLine.value;
  changeCity(searchedCity);
}
///// change city
function changeCity(newcity) {
  displayCity(newcity);
}
//////////change unit

function chooseUnit(response) {
  let temp = Math.round(response.data.main.temp);
  displayCelsius(temp);
  displayFarenheit(temp);
}
function displayCelsius(temp) {
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", function (event) {
    event.preventDefault();
    todayTemp.innerHTML = `${temp}°C`;
  });
}
function displayFarenheit(temp) {
  // event.preventDefault();
  let farenheitLink = document.querySelector("#farenheit-link");
  farenheitLink.addEventListener("click", function (event) {
    event.preventDefault();
    let tempInFarenheit = (temp * 9) / 5 + 32;
    todayTemp.innerHTML = `${tempInFarenheit}°F`;
  });
}
