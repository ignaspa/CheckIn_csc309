const axios = require('axios')

// Get user from id 
const getUserObject = async () => {
    axios
    .get('https://localhost:5000/api/users/')
    .then(res => {
        return res;
    })
    .catch(err => {
        return null;
    });
}