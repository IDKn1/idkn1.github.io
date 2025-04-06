// Replace with your OpenWeather API key
const apiKey = "f8137a263cd78d0f3999d99f72a18df2";
const city = "Toronto"; // Change to your city

let weatherData = {};

function setup() {
  noCanvas();
  // Fetch weather data from OpenWeather API
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=43.65&lon=-79.38&appid=${apiKey}&units=metric`;
  loadJSON(url, gotWeather);
}

function gotWeather(data) {
  // Handle the API data and display it on the webpage
  const weatherTitle = document.getElementById("weatherTitle");
  const weatherInfo = document.getElementById("weather-info");
  const weatherDetails = `
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Condition: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
      `;
  weatherInfo.innerHTML = weatherDetails;
  weatherTitle.innerHTML = `Weather in ${data.name}`;
}
