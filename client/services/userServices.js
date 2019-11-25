const axios = require('axios')

// Get user from id 
const getUserObject = async () => {
    axios
    .get('http://localhost:5000/api/users/')
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
    .get('http://localhost:5000/api/users/all')
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
    .patch('http://localhost:5000/api/users/details', {newbio: bio, newname: name})
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
    .patch('http://localhost:5000/api/users/profilepic', {newpic: newimage})
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}
const deleteUser = async (userID) => {
    axios
    .delete('http://localhost:5000/api/users/', {
        params: {
            id: userID
        }
    })
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
    .post('http://localhost:5000/api/users/register', userInfo)
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
    .post('http://localhost:5000/api/users/login', {username: username, password: password})
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
}
const getUserFromUsername = async(username) => {
    axios
    .post("http://localhost:5000/api/users/username", {username: username})
    .the(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
        return null;
    })
}

