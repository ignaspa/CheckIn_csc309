import axios from "axios"

// Get users friends
export function getUserFriends() {
    axios.get('http://localhost:5000/api/friends/')
    .then(res => {
        console.log(res)
        return res;
    })
    .catch(err => {
        console.log(err)
        return null;
    });
}

// Add friend 
export function addFriend(friendID) {
    axios.patch("http://localhost:5000/api/friends/add", {
        friendID: friendID
    })
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => {
        console.log(err)
        return null
    })
}

// Deletes a friend
export function deleteFriend(friendID) {
    axios.patch("http://localhost:5000/api/friends/delete", {
        friendID: friendID
    })
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => {
        console.log(err)
        return null
    })
}

// Add a friend request 
export function addFriendRequest(friendID) {
    axios.patch("http://localhost:5000/api/requests/add", {
        friendID: friendID
    })
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => {
        console.log(err) 
        return null
    })
}

// Delete a friend request 
export function addFriendRequest(friendID) {
    axios.patch("http://localhost:5000/api/requests/delete", {
        friendID: friendID
    })
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => {
        console.log(err) 
        return null
    })
}