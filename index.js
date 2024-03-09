const apiKey = '7fbed285b51bde0917c0341e907f2960';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const reloadElement = document.getElementById('reload');
const category = document.getElementById('category');
const humidity = document.getElementById('humidity');
const windElement = document.getElementById('wind');

const icon = document.querySelector('.icon img');
const preicon = document.querySelector('.preicon img');



function getWeather() {
  let temperature = document.getElementById("pretemperature");
  let description = document.getElementById("predesription");
  let location = document.getElementById("prelocation");
  let preWind = document.getElementById('prewind');
  let preHumidity = document.getElementById('prehumidity');


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
        description.textContent = data.weather[0].description;
        var preCategoryValue = data['weather'][0]['main'];
        // preicon.setAttribute('src', iconURL);
        var sunsetElement = `${new Date((data.sys.sunset + data.timezone) * 1000).toUTCString().slice(-11, -7)} PM`;
        var sunriseElement = `${new Date((data.sys.sunrise + data.timezone) * 1000).toUTCString().slice(-11, -7)} AM`;
        var timeElement = `${new Date()}`;
        console.log(sunriseElement);

        preWind.textContent = `${data.wind.speed} meter/sec`;
        preHumidity.textContent = `${Math.round(data.main.humidity)}% Humidity`;

        description.innerHTML = preCategoryValue;

        document.body.setAttribute("description", preCategoryValue);

        if (preCategoryValue == 'Clear') {
          document.getElementById("preimg").src = "icon/day/clear sky.png";
        } else if (preCategoryValue == 'Clouds') {
          document.getElementById("preimg").src = "icon/day/few clouds.png";
        } else if (preCategoryValue == 'Rain') {
          document.getElementById("preimg").src = "icon/day/rain.png";
        } else if (preCategoryValue == 'Mist') {
          document.getElementById("preimg").src = "icon/day/mist.png";
        } else if (preCategoryValue == 'Stome') {
          document.getElementById("preimg").src = "icon/day/thunderstorm.png";
        } else if (preCategoryValue == 'Scattered Clouds') {
          document.getElementById("preimg").src = "icon/day/scattered clouds.png";
        } else if (preCategoryValue == 'Shower Rain') {
          document.getElementById("preimg").src = "icon/day/shower rain.png";
        } else if (preCategoryValue == 'Haze') {
          document.getElementById("preimg").src = "icon/day/haze.png";
        }
        else if (categoryValue == '') {
          document.getElementById("img").innerHTML = "null";
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
      // localTime.textContent = new Date(1610685149 * 1000).toDateString();
      var categoryValue = data['weather'][0]['main'];

      


      windElement.textContent = `${data.wind.speed} meter/sec`;
      humidity.textContent = `${Math.round(data.main.humidity)}% Humidity`;
      
    
      var sunsetElement = `${new Date((data.sys.sunset ) * 1000).toUTCString().slice(-11, -7)} PM`;
      var sunriseElement = `${new Date((data.sys.sunrise) * 1000).toUTCString().slice(-11, -7)} AM`;
      var timeElement = `${new Date()}`;

      descriptionElement.innerHTML = categoryValue;

      document.body.setAttribute("descriptionElement", categoryValue);

      if (categoryValue == 'Clear') {
        document.getElementById("img").src = "icon/day/clear sky.png";
      } else if (categoryValue == 'Clouds') {
        document.getElementById("img").src = "icon/day/few clouds.png";
      } else if (categoryValue == 'Rain') {
        document.getElementById("img").src = "icon/day/rain.png";
      } else if (categoryValue == 'Mist') {
        document.getElementById("img").src = "icon/day/mist.png";
      } else if (categoryValue == 'Stome') {
        document.getElementById("img").src = "icon/day/thunderstorm.png";
      } else if (categoryValue == 'Scattered Clouds') {
        document.getElementById("img").src = "icon/day/scattered clouds.png";
      } else if (categoryValue == 'Shower Rain') {
        document.getElementById("img").src = "icon/day/shower rain.png";
      } else if (categoryValue == 'Haze') {
        document.getElementById("img").src = "icon/day/haze.png";
      }
      else if (categoryValue == '') {
        document.getElementById("img").innerHTML = "null";
      }

var sunset = `${new Date((data.sys.sunset + data.timezone) * 1000).toUTCString().slice(-11, -7)} PM`;
var sunrise = `${new Date((data.sys.sunrise + data.timezone) * 1000).toUTCString().slice(-11, -7)} AM`;
      // icon.setAttribute('src', iconURL);
d = new Date();
localTime = d.getTime();
localOffset = d.getTimezoneOffset() * 60000;
utc = localTime + localOffset;
var atlanta = utc + (1000 * -14400);
nd = new Date(atlanta);

if(nd>=sunrise && nd<sunset) {

  // document.getElementsByClassName("weather-info").style.backgroundImage = "url('background/morning.jpg')";
} else {
  document.getElementsByClassName("weather-info").style.backgroundImage = "url('background/night.jpg')";

}    


    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });


}