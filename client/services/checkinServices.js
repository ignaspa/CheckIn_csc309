import axios from "axios"

// Get checkins for given user id 
export function getCheckinsForUser() {
    axios.get('http://localhost:5000/api/checkins/')
    .then(res => {
        console.log(res)
        return res;
    })
    .catch(err => {
        return err;
    });
}


// Post a checkin. Don't need userID or time because those are automatically sent 
export function addCheckin(action, message, location) {
    axios
    .post('http://localhost:5000/api/checkins/', {
        action: action, 
        message: message, 
        location: location
    })
    .then(response => {
        return response
        console.log(response)
    })
    .catch(err => {
        console.log(err)
        return null
    })
}

// Delete a checkin 
export function deleteCheckIn(checkinId) {
    axios.
    delete("http://localhost:5000/api/checkins/", {
        checkinId: checkinId
    })
    .then(response => {
        console.log(response)
        return response
    })
    .catch(err => {
        console.log(err)
        return null
    })
}

// get your friends checkins 
export function getFriendsCheckins() {
    axios.get("http//localhost:5000/api/checkins/friends")
    .then(response => {
        console.log(response)
        return response
    })
    .catch(err => {
        console.log(err)
        return null
    })
}



