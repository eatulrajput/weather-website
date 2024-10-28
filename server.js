const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios'); // Import axios for making API requests

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory

// Route to serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to handle weather data requests
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'New Delhi'; // Default to New Delhi if no city is specified
  try {
    const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/forecast.json`, {
      params: { q: city, days: 1 },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Securely access API key
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    });
    res.json(response.data); // Send weather data to client
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
