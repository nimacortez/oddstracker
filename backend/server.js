const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/events', async (req, res) => {
  try {
    const response = await axios.get('https://api.the-odds-api.com/v4/sports', {
      params: {
        apiKey: '8c29f602d6e6e7e72c40df4086672e3e'
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
