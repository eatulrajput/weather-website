document.addEventListener("DOMContentLoaded", () => {
  // 🏗️ Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && menuClose) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
    menuClose.addEventListener("click", () => navLinks.classList.remove("show"));
  }

  // 🌍 API Configuration
  const getWeather = async (city) => {
    if (!city) return;
    document.getElementById("cityName").textContent = city;

    try {
      const response = await fetch(`/weather?city=${city}`);
      if (!response.ok) throw new Error(`API request failed: ${response.status}`);

      const data = await response.json();
      const { current, forecast, location } = data;

      if (current && forecast && location) {
        const astro = forecast.forecastday[0].astro;

        // 🌡️ Update Weather Info
        const weatherElements = {
          cloud_pct: current.cloud,
          temp: current.temp_c,
          temp2: current.temp_c,
          feels_like: current.feelslike_c,
          humidity: current.humidity,
          humidity2: current.humidity,
          min_temp: current.temp_c,
          max_temp: current.temp_c,
          wind_speed: current.wind_kph,
          wind_speed2: current.wind_kph,
          wind_degrees: current.wind_degree,
          sunrise: astro.sunrise,
          sunset: astro.sunset
        };

        Object.keys(weatherElements).forEach((id) => {
          const element = document.getElementById(id);
          if (element) element.textContent = weatherElements[id] || "N/A";
        });

        // ⏳ Show Date & Time
        showDateTime(location.tz_id);
      } else {
        console.error("Incomplete weather data received.");
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  // ⏳ Show Date & Time in City's Timezone
  let timeInterval;
  const showDateTime = (timezone) => {
    clearInterval(timeInterval);
    updateDateTime(timezone);
    timeInterval = setInterval(() => updateDateTime(timezone), 1000);
  };

  const updateDateTime = (timezone) => {
    const date = new Date();
    const options = {
      timeZone: timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };
    document.getElementById("dateTime").textContent = `It is ${new Intl.DateTimeFormat("en-US", options).format(date)}`;
  };

  // 📍 Event Listener for Search Button
  document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value.trim();
    if (city) {
      getWeather(city);
      navLinks.classList.remove("show");
    }
  });

  // 🔄 Fetch Default Weather Data
  getWeather("New Delhi");

  // 📌 City Suggestions
  const cityInput = document.getElementById("city");
  const suggestionsContainer = document.getElementById("suggestions");

  // ⏳ Debounce Function to Improve Performance
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  // 🔍 Show Suggestions
  const showSuggestions = (input) => {
    suggestionsContainer.innerHTML = "";
    if (!input) return;

    const filteredCities = cities
      .filter((city) => city.toLowerCase().startsWith(input.toLowerCase()))
      .slice(0, 8);

    if (filteredCities.length === 0) {
      suggestionsContainer.style.display = "none";
      return;
    }

    filteredCities.forEach((city) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.className = "suggestion-item";
      suggestionItem.textContent = city;
      suggestionItem.addEventListener("click", () => {
        cityInput.value = city;
        suggestionsContainer.style.display = "none";
      });
      suggestionsContainer.appendChild(suggestionItem);
    });

    suggestionsContainer.style.display = "block";
  };

  // 🎯 Attach Event Listener with Debounce
  cityInput.addEventListener("input", debounce(() => showSuggestions(cityInput.value.trim()), 300));

  // ❌ Close Suggestions When Clicking Outside
  document.addEventListener("click", (e) => {
    if (!suggestionsContainer.contains(e.target) && e.target !== cityInput) {
      suggestionsContainer.style.display = "none";
    }
  });
});
