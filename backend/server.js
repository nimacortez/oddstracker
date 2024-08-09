const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const homepage = await axios.get('https://api.the-odds-api.com/v4/sports/', {
      params: {
        apiKey: process.env.RAPIDAPI_KEY
      }
    });
    res.json(homepage.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Error fetching data from API');
  }
});


app.get('/sports', async (req, res) => {
  try {
    const response = await axios.get('https://api.the-odds-api.com/v4/sports/upcoming/odds/', {
      params: {
        regions: 'us',
        markets: 'h2h',
        apiKey: process.env.RAPIDAPI_KEY
      }
    });
    console.log('API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching odds:', {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response ? error.response.data : 'No response data'
    });
    res.status(500).send('Error fetching odds: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
