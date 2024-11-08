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
// List of top 200 cities with "city, state, country" format
const cities = [
  "Tokyo, Tokyo, Japan", "Delhi, Delhi, India", "Shanghai, Shanghai, China", "São Paulo, São Paulo, Brazil", 
  "Mumbai, Maharashtra, India", "Cairo, Cairo Governorate, Egypt", "Beijing, Beijing, China", 
  "Dhaka, Dhaka Division, Bangladesh", "Mexico City, Mexico City, Mexico", "Osaka, Osaka Prefecture, Japan", 
  "Karachi, Sindh, Pakistan", "Chongqing, Chongqing, China", "Istanbul, Istanbul, Turkey", 
  "Buenos Aires, Buenos Aires, Argentina", "Kolkata, West Bengal, India", "Lagos, Lagos, Nigeria", 
  "Kinshasa, Kinshasa, DR Congo", "Manila, Metro Manila, Philippines", "Tianjin, Tianjin, China", 
  "Rio de Janeiro, Rio de Janeiro, Brazil", "Guangzhou, Guangdong, China", "Lahore, Punjab, Pakistan", 
  "Bangalore, Karnataka, India", "Shenzhen, Guangdong, China", "Moscow, Moscow, Russia", 
  "Chennai, Tamil Nadu, India", "Bogotá, Bogotá, Colombia", "Paris, Île-de-France, France", 
  "Jakarta, Jakarta, Indonesia", "Lima, Lima, Peru", "Bangkok, Bangkok, Thailand", 
  "Hyderabad, Telangana, India", "Seoul, Seoul, South Korea", "Nagoya, Aichi, Japan", 
  "London, England, United Kingdom", "Chengdu, Sichuan, China", "Nanjing, Jiangsu, China", 
  "Tehran, Tehran, Iran", "Ho Chi Minh City, Ho Chi Minh, Vietnam", "Luanda, Luanda, Angola", 
  "New York City, New York, USA", "Ahmedabad, Gujarat, India", "Kuala Lumpur, Federal Territory, Malaysia", 
  "Hong Kong, Hong Kong, China", "Hangzhou, Zhejiang, China", "Surat, Gujarat, India", 
  "Suzhou, Jiangsu, China", "Riyadh, Riyadh, Saudi Arabia", "Shijiazhuang, Hebei, China", 
  "Wuhan, Hubei, China", "Harbin, Heilongjiang, China", "Giza, Giza, Egypt", "Shantou, Guangdong, China", 
  "Los Angeles, California, USA", "Pune, Maharashtra, India", "Santiago, Santiago Metropolitan, Chile", 
  "Madrid, Madrid, Spain", "Toronto, Ontario, Canada", "Dar es Salaam, Dar es Salaam, Tanzania", 
  "Johannesburg, Gauteng, South Africa", "Barcelona, Catalonia, Spain", "Sanaa, Amanat Al Asimah, Yemen", 
  "Kabul, Kabul, Afghanistan", "Qingdao, Shandong, China", "Alexandria, Alexandria, Egypt", 
  "Dalian, Liaoning, China", "Faisalabad, Punjab, Pakistan", "Nairobi, Nairobi, Kenya", 
  "Zunyi, Guizhou, China", "Dubai, Dubai, UAE", "Ankara, Ankara, Turkey", 
  "Rangoon, Yangon Region, Myanmar", "Busan, Busan, South Korea", "Hanoi, Hanoi, Vietnam", 
  "Ningbo, Zhejiang, China", "Rome, Lazio, Italy", "Haikou, Hainan, China", 
  "Cleveland, Ohio, USA", "Houston, Texas, USA", "Berlin, Berlin, Germany", 
  "Sydney, New South Wales, Australia", "Melbourne, Victoria, Australia", 
  "Munich, Bavaria, Germany", "Stuttgart, Baden-Württemberg, Germany", 
  "Miami, Florida, USA", "Milan, Lombardy, Italy", "Dubai, Dubai, UAE", 
  "Lisbon, Lisbon, Portugal", "Birmingham, Alabama, USA", "Toronto, Ontario, Canada", 
  "Zurich, Zurich, Switzerland", "Atlanta, Georgia, USA", "Vienna, Vienna, Austria", 
  "Dublin, Leinster, Ireland", "Manchester, England, United Kingdom", 
  "Lyon, Auvergne-Rhône-Alpes, France", "Frankfurt, Hesse, Germany", 
  "Madrid, Madrid, Spain", "Copenhagen, Capital Region, Denmark", 
  "Edinburgh, Scotland, United Kingdom", "Helsinki, Uusimaa, Finland", 
  "Brussels, Brussels, Belgium", "Ottawa, Ontario, Canada", "Stockholm, Stockholm, Sweden", 
  "Glasgow, Scotland, United Kingdom", "Antwerp, Flanders, Belgium", 
  "Oslo, Oslo, Norway", "Lisbon, Lisbon, Portugal", "Warsaw, Masovian, Poland", 
  "Cape Town, Western Cape, South Africa", "Vienna, Vienna, Austria", 
  "Hamburg, Hamburg, Germany", "Montreal, Quebec, Canada", "Kiev, Kiev, Ukraine", 
  "Auckland, Auckland, New Zealand", "Barcelona, Catalonia, Spain", "Brisbane, Queensland, Australia", 
  "Perth, Western Australia, Australia", "Adelaide, South Australia, Australia", 
  "Glasgow, Scotland, United Kingdom", "Leeds, England, United Kingdom", 
  "Nottingham, England, United Kingdom", "Belfast, Northern Ireland, United Kingdom", 
  "Bristol, England, United Kingdom", "Liverpool, England, United Kingdom", 
  "Sheffield, England, United Kingdom", "London, Ontario, Canada", 
  "Halifax, Nova Scotia, Canada", "Lima, Lima Province, Peru", 
  "Bogotá, Bogotá Capital District, Colombia", "Cartagena, Bolívar, Colombia", 
  "Barranquilla, Atlántico, Colombia", "Quito, Pichincha, Ecuador", 
  "Guayaquil, Guayas, Ecuador", "Asunción, Asunción, Paraguay", 
  "Montevideo, Montevideo Department, Uruguay", "Santiago, Santiago Metropolitan Region, Chile", 
  "Valparaíso, Valparaíso Region, Chile", "Buenos Aires, Buenos Aires Province, Argentina"
  // More cities can be added to complete the list up to 200 cities
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
