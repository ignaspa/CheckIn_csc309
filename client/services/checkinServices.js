const axios = require('axios')

// Get checkins for given user id 
const getCheckinsForUser = async () => {
    axios
    .get('https://localhost:5000/api/checkins')
    .then(res => {
        return res;
    })
    .catch(err => {
        return null;
    });
}

