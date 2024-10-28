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
      } else {
        console.error("Weather data is missing in the response.");
      }
    })
    .catch(err => console.error('Error fetching weather data:', err));
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
  "Agartala, Tripura, India",
  "Agra, Uttar Pradesh, India",
  "Ahmedabad, Gujarat, India",
  "Aizawl, Mizoram, India",
  "Amritsar, Punjab, India",
  "Bangalore, Karnataka, India",
  "Bhopal, Madhya Pradesh, India",
  "Bhubaneswar, Odisha, India",
  "Chandigarh, Chandigarh, India",
  "Chennai, Tamil Nadu, India",
  "Coimbatore, Tamil Nadu, India",
  "Dehradun, Uttarakhand, India",
  "Delhi, Delhi, India",
  "Dibrugarh, Assam, India",
  "Durgapur, West Bengal, India",
  "Faridabad, Haryana, India",
  "Gandhinagar, Gujarat, India",
  "Gangtok, Sikkim, India",
  "Guwahati, Assam, India",
  "Hyderabad, Telangana, India",
  "Imphal, Manipur, India",
  "Indore, Madhya Pradesh, India",
  "Itanagar, Arunachal Pradesh, India",
  "Jaipur, Rajasthan, India",
  "Jalandhar, Punjab, India",
  "Jamshedpur, Jharkhand, India",
  "Jodhpur, Rajasthan, India",
  "Kochi, Kerala, India",
  "Kolkata, West Bengal, India",
  "Kozhikode, Kerala, India",
  "Lucknow, Uttar Pradesh, India",
  "Ludhiana, Punjab, India",
  "Mumbai, Maharashtra, India",
  "Nagpur, Maharashtra, India",
  "Nashik, Maharashtra, India",
  "Panaji, Goa, India",
  "Patna, Bihar, India",
  "Pune, Maharashtra, India",
  "Raipur, Chhattisgarh, India",
  "Ranchi, Jharkhand, India",
  "Shillong, Meghalaya, India",
  "Shimla, Himachal Pradesh, India",
  "Siliguri, West Bengal, India",
  "Srinagar, Jammu & Kashmir, India",
  "Surat, Gujarat, India",
  "Thiruvananthapuram, Kerala, India",
  "Tiruchirappalli, Tamil Nadu, India",
  "Udaipur, Rajasthan, India",
  "Vadodara, Gujarat, India",
  "Varanasi, Uttar Pradesh, India",
  "Vijayawada, Andhra Pradesh, India",
  "Visakhapatnam, Andhra Pradesh, India"
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
