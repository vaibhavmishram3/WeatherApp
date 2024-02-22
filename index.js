const apiKey = '7fbed285b51bde0917c0341e907f2960';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const reloadElement = document.getElementById('reload');
const category = document.getElementById('category');
const localTime = document.getElementById('time');
const windElement = document.getElementById('wind');
const icon = document.querySelector('.icon img');
const preicon = document.querySelector('.preicon img');



function getWeather() {
  let temperature = document.getElementById("pretemperature");
  let description = document.getElementById("predescription");
  let location = document.getElementById("prelocation");


  description.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        temperature.innerHTML = `${Math.round(data.main.temp)}° C`;
        location.innerHTML = data.name + ", " + data.sys.country;
        description.textContent = data.weather[0].main;
        var preCategoryValue = data['weather'][0]['main'];
        // preicon.setAttribute('src', iconURL);

        description.innerHTML = preCategoryValue;

        document.body.setAttribute("description", preCategoryValue);

        if (preCategoryValue == 'Clear') {
          document.getElementById("preimg").src = "icon/icons8-sun-500.png";
        } else if (preCategoryValue == 'Clouds') {
          document.getElementById("preimg").src = "icon/icons8-partly-cloudy-day-100.png";
        } else if (preCategoryValue == 'Rain') {
          document.getElementById("preimg").src = "icon/icons8-storm-100.png";
        } else if (preCategoryValue == 'Mist') {
          document.getElementById("preimg").src = "icon/icons8-mist-100.png";
        } else if (preCategoryValue == 'Stome') {
          document.getElementById("preimg").src = "icon/icons8-partly-cloudy-day-100.png";
        } else if (preCategoryValue == 'Haze') {
          document.getElementById("preimg").src = "icon/icons8-haze-100.png";
        }
        else if (preCategoryValue == '') {
          document.getElementById("preimg").innerHTML = "null";
        }
      });
  }

  function error() {
    description.textContent = "Unable to retrieve your location";
  }
}

getWeather();

locationInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("btn").click();
  }
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

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
      // const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`; 
      locationElement.textContent = data.name + ", " + data.sys.country;
      temperatureElement.innerHTML = `${Math.round(data.main.temp)}° C`;
      descriptionElement.textContent = data.weather[0].description;
      localTime.textContent = new Date(1610685149 * 1000).toDateString();
      var categoryValue = data['weather'][0]['main'];
      windElement.textContent = `${Math.round(data.main.wndspd)} km/h`;
      // icon.setAttribute('src', iconURL);

      descriptionElement.innerHTML = categoryValue;

      document.body.setAttribute("descriptionElement", categoryValue);

      if (categoryValue == 'Clear') {
        document.getElementById("img").src = "icon/icons8-sun-500.png";
      } else if (categoryValue == 'Clouds') {
        document.getElementById("img").src = "icon/icons8-partly-cloudy-day-100.png";
      } else if (categoryValue == 'Rain') {
        document.getElementById("img").src = "icon/icons8-storm-100.png";
      } else if (categoryValue == 'Mist') {
        document.getElementById("img").src = "icon/icons8-mist-100.png";
      } else if (categoryValue == 'Stome') {
        document.getElementById("img").src = "icon/icons8-partly-cloudy-day-100.png";
      } else if (categoryValue == 'Haze') {
        document.getElementById("img").src = "icon/icons8-haze-100.png";
      }
      else if (categoryValue == '') {
        document.getElementById("img").innerHTML = "null";
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}