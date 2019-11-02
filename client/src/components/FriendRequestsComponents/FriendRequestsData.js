import React, { Component } from "react";

import User1 from "../DashboardComponents/DashboardAssets/User1.jpg"
import User2 from "../DashboardComponents/DashboardAssets/User2.jpg"
import User3 from "../DashboardComponents/DashboardAssets/User3.jpg"
import User4 from "../DashboardComponents/DashboardAssets/User4.jpg"
import User5 from "./FriendRequestAssets/User5.jpg"
import User6 from "./FriendRequestAssets/User6.jpg"
import User7 from "./FriendRequestAssets/User7.jpg"
import User8 from "./FriendRequestAssets/User8.jpg"

let friend_requests = [
    {
        id: 4
    }, 
    {
        id: 5
    },
    {
        id: 6
    }, 
    {
        id: 7
    }
]

let ALL_USERS = [
    {
        id: 0,
        isAdmin: false,
        name: 'Sonia',
        friends: [1, 2, 3],
        friend_request: [5],
        picture: User1,
        username: 'SoniaZaldana',
        bio: "I'm so tired",
    },
    {
        id: 1,
        isAdmin: false,
        name: 'Marco',
        friends: [0, 2, 3],
        friend_request: [],
        picture: User2,
        username:'MarcoAngelli',
        bio: "henlo",
    },
    {
        id: 2,
        isAdmin: false,
        name: 'Abdullah',
        friends: [0, 1, 3],
        friend_request: [],
        picture: User3,
        username: 'abdamin',
        bio: "web developer", 
    },

    {
        id: 3,
        isAdmin: false,
        name: 'Ignas',
        friends: [0, 1, 2],
        friend_request: [],
        picture: User4,
        username: 'iggy',
        bio: "i love my dog carmelo",
    },
    {
        id: 4,
        isAdmin: false,
        name: 'Mark',
        friends: [1, 2, 3, 6],
        friend_request: [5],
        picture: User5,
        username: 'LilMarco',
        bio: "sup",
    },
    {
        id: 5,
        isAdmin: false,
        name: 'Steve',
        friends: [1, 2, 6, 7],
        friend_request: [],
        picture: User6,
        username:'SteveJobs',
        bio: "henlo",
    },
    {
        id: 6,
        isAdmin: false,
        name: 'Bill',
        friends: [2, 3, 5, 7],
        friend_request: [],
        picture: User7,
        username: 'BillGates',
        bio: "i build things", 
    },

    {
        id: 7,
        isAdmin: false,
        name: 'Jeff',
        friends: [5, 6, 7],
        friend_request: [],
        picture: User8,
        username: 'JeffBezos',
        bio: "hi im bald",
    }
]


function findNumberOfCommonFriends(currentUserId, otherUserId) {
    // In here, there would be server call to get all users as opposed to using static data
    let currentUser = findGivenUser(currentUserId, ALL_USERS, ALL_USERS.length)
    let otherUser = findGivenUser(otherUserId, ALL_USERS, ALL_USERS.length)

    let mutualFriendsCount = 0;
    for (let i = 0; i < currentUser.friends.length; i++) {
        if (otherUser.friends.includes(currentUser.friends[i])) {
            mutualFriendsCount++;
        }
    }
    return mutualFriendsCount;
}

function findGivenUser(currentUserId, userData, size) {
    for (let i = 0; i < size; i++) {
        if (userData[i].id === currentUserId) {
            return userData[i]
        }
    }
}


export default class AllFriendRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friendRequests: friend_requests,
            allUsers: ALL_USERS
        }
    }

    render() {
        return(
            <div>
                <FriendRequests
                currentUser={ALL_USERS[0]}
                parentState={this.state}
                />
            </div>
        );
    }
}


function FriendRequests(props) {
    var rows = [];

    for (var i = 0; i < props.parentState.friendRequests.length; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        let user = findGivenUser(props.parentState.allUsers[i].id, props.parentState.allUsers, props.parentState.friendRequests.length)

        let mutualFriends = findNumberOfCommonFriends(props.currentUser.id, props.parentState.allUsers[i].id)
        if (i % 3 === 0) {
            rows.push(<div className="row"/>)
        }  
         rows.push(
             <div className="col">
         <FriendRequest 
            key={user.id}
            id={user.id}
            name={user.name}
            username={user.username}
            picture={user.picture}
            mutualFriends = {mutualFriends}
            parentState={props.parentState}
            />
             </div>
            );
    }
    return (
        <div>
        {rows}
        </div>
    );
}

function FriendRequest(props) {

    function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele.id !== value;
        });
     
     }

    function handleAcceptRequest(e) {
        e.preventDefault();
        console.log("ACCEPT REQUEST WAS CLICKED")
        console.log(props.parentState.friendRequests)

        let result = arrayRemove(props.parentState.friendRequests, props.id);
        props.parentState.friendRequests = result;
        console.log(props.parentState.friendRequests)
    }
    return (
        <div className="request">
            <div className="card">
                <div className="card-body">
                    <img src={props.picture} className="rounded-circle" width="60" height="60" />
                    <h4>{props.name}</h4>
                    <h6 className="text-muted"> @{props.username}</h6>
                    <p><a href="#">{props.mutualFriends} mutual friends</a></p>
                    <button className="btn btn-primary" onClick={handleAcceptRequest}>Accept Request</button>
                </div>
            </div>
        </div>  
    );
}
