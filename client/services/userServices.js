const axios = require('axios')

// Get user from id 
const getUserObject = async () => {
    axios
    .get('https://localhost:5000/api/users/')
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}
const getAllUserObjects = async () => {
    axios
    .get('https://localhost:5000/api/users/all')
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}
const changeUserDetails = async (name, bio) => {
    axios
    .patch('https://localhost:5000/api/users/details', {newbio: bio, newname: name})
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}
const changeUserImage = async (newimage) => {
    axios
    .patch('https://localhost:5000/api/users/profilepic', {newpic: newimage})
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}
const changeUserImage = async (newimage) => {
    axios
    .patch('https://localhost:5000/api/users/profilepic', {newpic: newimage})
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}