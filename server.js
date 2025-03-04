const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
const cors = require('cors'); // Optional: Enable CORS

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cors()); // Enable CORS (if needed)

// Route to serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle weather data requests
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'New Delhi'; // Default to New Delhi if no city is specified

  if (!process.env.RAPIDAPI_KEY) {
    return res.status(500).json({ error: 'API key missing. Please check your environment variables.' });
  }

  try {
    const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json', {
      params: { q: city, days: 1 },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    });

    res.json(response.data); // Send weather data to client
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    
    res.status(500).json({
      error: 'Unable to fetch weather data. Please try again later.',
      details: error.response ? error.response.data : error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
