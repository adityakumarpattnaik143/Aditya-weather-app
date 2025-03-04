// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const API_KEY = '1896b38d2fe1d2d36da39d2475ef3fa6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    alert('Please enter a city name.');
  }
});

async function fetchWeatherData(city) {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message || 'An error occurred while fetching weather data.');
  }
}

function updateUI(data) {
  const { name, main, weather, wind } = data;

  // Update UI elements
  document.getElementById('city-name').textContent = name;
  document.getElementById('temperature').textContent = Math.round(main.temp);
  document.getElementById('humidity').textContent = main.humidity;
  document.getElementById('wind-speed').textContent = wind.speed;
  document.getElementById('condition').textContent = weather[0].description;

  // Update weather icon
  const iconClass = getWeatherIcon(weather[0].main);
  document.getElementById('weather-icon').className = iconClass;
}

function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'fas fa-sun';
    case 'clouds':
      return 'fas fa-cloud';
    case 'rain':
    case 'drizzle':
      return 'fas fa-cloud-rain';
    case 'thunderstorm':
      return 'fas fa-bolt';
    case 'snow':
      return 'fas fa-snowflake';
    default:
      return 'fas fa-question';
  }
}