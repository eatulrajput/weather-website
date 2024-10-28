// Menu toggle functionality
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('show');
});

document.getElementById('menu-close').addEventListener('click', () => {
  document.getElementById('nav-links').classList.remove('show');
});

// API configuration
const getWeather = (city) => {
  document.getElementById('cityName').textContent = city;

  fetch(`/weather?city=${city}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const currentWeather = data.current;
      const forecastDay = data.forecast.forecastday[0].astro;  // Access astro data for sunrise/sunset
      const timezoneOffset = data.location.tz_id;  // Get the timezone ID from the response

      if (currentWeather) {
        // Update weather data fields
        document.getElementById('cloud_pct').textContent = currentWeather.cloud || 'N/A';
        document.getElementById('temp').textContent = currentWeather.temp_c || 'N/A';
        document.getElementById('temp2').textContent = currentWeather.temp_c || 'N/A';
        document.getElementById('feels_like').textContent = currentWeather.feelslike_c || 'N/A';
        document.getElementById('humidity').textContent = currentWeather.humidity || 'N/A';
        document.getElementById('humidity2').textContent = currentWeather.humidity || 'N/A';
        document.getElementById('min_temp').textContent = currentWeather.temp_c || 'N/A';
        document.getElementById('max_temp').textContent = currentWeather.temp_c || 'N/A';
        document.getElementById('wind_speed').textContent = currentWeather.wind_kph || 'N/A';
        document.getElementById('wind_speed2').textContent = currentWeather.wind_kph || 'N/A';
        document.getElementById('wind_degrees').textContent = currentWeather.wind_degree || 'N/A';
        document.getElementById('sunrise').textContent = forecastDay.sunrise || 'N/A';
        document.getElementById('sunset').textContent = forecastDay.sunset || 'N/A';
        
        // Show current date and time
        showDateTime(timezoneOffset);
      } else {
        console.error("Weather data is missing in the response.");
      }
    })
    .catch(err => console.error('Error fetching weather data:', err));
};

// Function to show current date and time
let timeInterval; // Variable to store the interval ID

const showDateTime = (timezone) => {
  // Clear previous interval to prevent multiple intervals running
  clearInterval(timeInterval);

  // Update time immediately and set interval
  updateDateTime(timezone); // Initial update
  timeInterval = setInterval(() => {
    updateDateTime(timezone);
  }, 1000); // Update every second
};

const updateDateTime = (timezone) => {
  const date = new Date();
  
  // Create a Date object with the city's timezone
  const options = { 
    timeZone: timezone, 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true 
  };
  const cityDateTime = new Intl.DateTimeFormat('en-US', options).format(date);
  
  document.getElementById('dateTime').textContent = `It is ${cityDateTime}`;
};

// Event listener for submit button
document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value.trim();
  if (city) {
    getWeather(city);
    document.getElementById('nav-links').classList.remove('show'); // Close the menu
  }
});

// Initial weather fetch
getWeather("New Delhi");

// List of cities for suggestions
const cities = [
  // Your list of cities...
];

// Elements
const cityInput = document.getElementById('city');
const suggestionsContainer = document.getElementById('suggestions');

// Function to filter and display suggestions
const showSuggestions = (input) => {
  suggestionsContainer.innerHTML = '';

  // Show default cities if input is empty
  const filteredCities = input
    ? cities.filter(city => city.toLowerCase().startsWith(input.toLowerCase()))
    : cities.slice(0, 5);  // Show first 5 cities as default

  if (filteredCities.length === 0) {
    suggestionsContainer.style.display = 'none';
    return;
  }

  // Create suggestion items
  filteredCities.forEach(city => {
    const suggestionItem = document.createElement('div');
    suggestionItem.className = 'suggestion-item';
    suggestionItem.textContent = city;

    // Add click event to populate input with the selected suggestion
    suggestionItem.addEventListener('click', () => {
      cityInput.value = city;
      suggestionsContainer.style.display = 'none';
    });

    suggestionsContainer.appendChild(suggestionItem);
  });

  // Show suggestions container
  suggestionsContainer.style.display = 'block';
};

// Event listener to capture input changes
cityInput.addEventListener('input', () => {
  const input = cityInput.value.trim();
  showSuggestions(input);
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!suggestionsContainer.contains(e.target) && e.target !== cityInput) {
    suggestionsContainer.style.display = 'none';
  }
});
