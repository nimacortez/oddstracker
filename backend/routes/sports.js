const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.the-odds-api.com/v4/sports', {
      headers: {
        'x-api-key': process.env.API_KEY,
        
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching sports data');
  }
});

module.exports = router;
