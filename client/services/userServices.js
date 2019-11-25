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
const deleteUser = async (user) => {
    axios
    .delete('https://localhost:5000/api/users/' + user)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}

// given a JSON of data to post
const registerUser = async (userInfo) => {
    axios
    .post('https://localhost:5000/api/users/register', userInfo)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}

const loginUser = async (username, password) => {
    axios
    .post('https://localhost:5000/api/users/login', {username: username, password: password})
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}

