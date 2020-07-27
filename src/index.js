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
  axios.get(searchTodayUrl).then(displayCurrentIcon);
}

function displayCurrentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  todayTemp.innerHTML = `${temp}°C`;
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
  displayFuturePlusOne(months, getMonth, getDate, getYear);
  // checkMonth(monthName, getDate, getYear);
}
////definitions

let now = new Date();
let searchLine = document.querySelector(".form-control");
let displayedCity = document.querySelector("#searched-city");
let todayTemp = document.querySelector("#today-temp");
let unitSwitch = document.querySelector("#unit-switch");
let apiKey = "d0374efc7dd8f24099f54d563eb3c31c";

///call functions

////////////////////////////////////////////////////////////////////////////////
////click buttons
discernButton();

function discernButton() {
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
  currentPositionButton.addEventListener("click", preventRefresh);
}
function preventRefresh(event) {
  event.preventDefault();
  determineLocation();
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
//////current weather icons
function displayCurrentIcon(response) {
  let icon = response.data.weather[0].icon.substr(0, 2);
  let todayIcon = document.querySelector("#today-icon");
  let retrieveIconSet = {
    "01": 0,
    "02": 1,
    "03": 2,
    "04": 3,
    "09": 4,
    "10": 6,
    "11": 6,
    "13": 7,
    "50": 8,
  };
  let iconRetrievalNumber = retrieveIconSet[icon];

  let iconSet = [
    `<i class="fas fa-sun"></i>`,
    `<i class="fas fa-cloud-sun"></i>`,
    `<i class="fas fa-cloud"></i>`,
    `<i class="fas fa-cloud"></i>`,
    `<i class="fas fa-cloud-sun-rain"></i>`,
    `<i class="fas fa-cloud-showers-heavy"></i>`,
    `<i class="fas fa-bolt"></i>`,
    `<i class="far fa-snowflake"></i>`,
    `<i class="fas fa-smog"></i>`,
  ];
  todayIcon.innerHTML = iconSet[iconRetrievalNumber];
}
///////// future icons

function checkMonth(months, getMonth, getDate, getYear, previousMonthDays) {
  let monthName = months[getMonth];
  let count = 0;
  let thirtyOneDaysMonths = {
    January: 0,
    March: 1,
    May: 2,
    July: 3,
    August: 4,
    October: 5,
    December: 6,
  };

  let thirtyOneDays = Array(32)
    .fill()
    .map((x, i) => i);

  let thirtyDaysMonths = ["April", "June", "September", "November"];
  if (
    thirtyOneDaysMonths[monthName] !== undefined &&
    thirtyOneDays[getDate] !== undefined ///defining 31 day months
  ) {
  } else if (
    thirtyDaysMonths[monthName] !== undefined && ////defining thirty day months
    thirtyOneDays[getDate + 1] !== undefined
  ) {
  } else if (
    getYear / 4 !== undefined &&
    thirtyOneDays[getDate + 2] !== undefined ///defining february on leap years
  ) {
  } else if (thirtyOneDays[getDate + 3] !== undefined) {
    //// defining february not on leap years
  } else {
    monthName = months[getMonth + 1];

    if (
      thirtyOneDaysMonths[monthName] !== undefined ///defining 31 day months
    ) {
      getDate = getDate - 31;
    } else if (thirtyDaysMonths[monthName] !== undefined) {
      getDate = getDate - 30;
    } else if (
      getYear / 4 !==
      undefined ///defining february on leap years
    ) {
      getDate = getDate - 29;
    } else {
      getDate - 28;
    }
  }
  return (futuredate = {
    date: getDate,
    month: monthName,
  });
}

function dude(count) {
  count = count + 1;
  return count;
}

function displayFuturePlusOne(months, getMonth, getDate, getYear) {
  let oneDayMore = document.querySelector("#one-day-more");
  let twoDaysMore = document.querySelector("#two-days-more");
  let threeDaysMore = document.querySelector("#three-days-more");
  let fourDaysMore = document.querySelector("#four-days-more");
  let fiveDaysMore = document.querySelector("#five-days-more");
  let sixDaysMore = document.querySelector("#six-days-more");
  let i;

  for (i = 0; i < 6; i++) {
    let previousMonthDays = i;
    getDate = getDate + 1;
    let checkMonthCalls = i;
    checkMonth(
      months,
      getMonth,
      getDate,
      getYear,
      i,
      checkMonthCalls,
      previousMonthDays
    );
    let futuredisplays = [
      oneDayMore,
      twoDaysMore,
      threeDaysMore,
      fourDaysMore,
      fiveDaysMore,
      sixDaysMore,
    ];

    futuredisplays[i].innerHTML = `${futuredate.month} ${futuredate.date}`;
  }
}

setTodayData();
