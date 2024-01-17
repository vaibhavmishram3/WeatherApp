const apiKey = '7fbed285b51bde0917c0341e907f2960';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const reloadElement = document.getElementById('reload');
// const windElement = document.getElementById('wind');
// const icon = document.getElementById('icon');



function getWeather() {
  let temperature = document.getElementById("pretemperature");
  let description = document.getElementById("predescription");
  let location = document.getElementById("prelocation");


  description.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp;
        temperature.innerHTML = temp + "° C";
        location.innerHTML = data.name;
        description.innerHTML = data.weather[0].main;
      });
  }

  function error() {
    description.textContent = "Unable to retrieve your location";
  }
}

getWeather();


searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {

  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}° C`;
      descriptionElement.textContent = data.weather[0].description;
      // windElement.textContent = `${Math.round(data.wndspd)} km/h`;
      // icon.textContent = 
      //   `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"" style= 'height:10rem'/>`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}