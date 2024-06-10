document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('show');
});

document.getElementById('menu-close').addEventListener('click', () => {
  document.getElementById('nav-links').classList.remove('show');
});

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b52d5ecc57msh821db320cd4648bp13143cjsn5bfd11274f05',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

const getWeather = (city) => {
  document.getElementById('cityName').innerHTML = city;

  fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
    .then(response => response.json())
    .then(response => {
      document.getElementById('cloud_pct').innerHTML = response.cloud_pct;
      document.getElementById('temp').innerHTML = response.temp;
      document.getElementById('temp2').innerHTML = response.temp;
      document.getElementById('feels_like').innerHTML = response.feels_like;
      document.getElementById('humidity').innerHTML = response.humidity;
      document.getElementById('humidity2').innerHTML = response.humidity;
      document.getElementById('min_temp').innerHTML = response.min_temp;
      document.getElementById('max_temp').innerHTML = response.max_temp;
      document.getElementById('wind_speed').innerHTML = response.wind_speed;
      document.getElementById('wind_speed2').innerHTML = response.wind_speed;
      document.getElementById('wind_degrees').innerHTML = response.wind_degrees;
      document.getElementById('sunrise').innerHTML = response.sunrise;
      document.getElementById('sunset').innerHTML = response.sunset;
    })
    .catch(err => console.error(err));
}

document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();
  getWeather(document.getElementById('city').value);

  // Close the menu by removing the 'show' class
  document.getElementById('nav-links').classList.remove('show');
});

getWeather("New York");
