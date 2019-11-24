const axios = require('axios')

var instance = axios.create({
    baseURL: 'https://localhost:5000/api/',
    timeout: 1000,
    headers: {'Authorization': 'TOKEN SHOULD BE HERE'}
  });

// Get checkins for given user id 
const getCheckinsForUser = async () => {
    try {
      return await axios.get('checkins')
    } catch (error) {
      console.error(error)
    }
  }