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
        friend_request: friend_requests,
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

let user_id = 0; // ID of the current user, we would otherwise have a server call to see the user_id

export default class AllFriendRequests extends Component {

    constructor(props) {
        super(props)
        this.user_index = ALL_USERS.findIndex(function (u) {
            return u.id === user_id;
        })
        this.state = {
            allUsers: ALL_USERS
        }
    }

    arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele.id !== value;
        });  
    }
    
    handleRequest = event => {
        event.persist()
        event.preventDefault()
        console.log(this.state)

        let friendId = event.target.id
        let friend_requests = this.state.allUsers[this.user_index].friend_request
        let new_requests = this.arrayRemove(friend_requests, parseInt(friendId, 10))
        let users = this.state.allUsers;
        users[this.user_index].friend_request = new_requests
        this.setState({ allUsers: users });

        if (event.target.name === "accept") {
            this.acceptFriendRequest(this.user_index, parseInt(friendId, 10))
        }
        console.log(this.state)
    }

    acceptFriendRequest = (user_index, friend_id) => {
        let users = this.state.allUsers
        users[user_index].friends.push(friend_id)
        this.setState({ allUsers: users,
        friendRequets: this.state.friendRequests });
    }

    render() {
        return(
            <div>
                <FriendRequests
                currentUser={ALL_USERS[0]}
                user_index = {this.user_index}
                allUsers={this.state.allUsers}
                handleRequest={this.handleRequest}
                />
            </div>
        );
    }
}


class FriendRequests extends Component{

    render() {
        var rows = [];

    let friend_requests = this.props.allUsers[this.props.user_index].friend_request
    
    let key = 0;
    for (var i = 0; i < friend_requests.length; i++) {
        let user = findGivenUser(friend_requests[i].id, this.props.allUsers, this.props.allUsers.length)

        let mutualFriends = findNumberOfCommonFriends(this.props.currentUser.id, this.props.allUsers[i].id)
        if (i % 3 === 0) {
            rows.push(<div className="row" key={key}/>)
            key++
        }  
         rows.push(
             <div className="col" key={key}>
         <FriendRequest 
            id={user.id}
            name={user.name}
            username={user.username}
            picture={user.picture}
            mutualFriends = {mutualFriends}
            handleRequest = {this.props.handleRequest}
            />
            </div>
            );
            key++
    }
    
    return (
        <div>
        {rows}
        </div>
    );
    }
}

class FriendRequest extends Component {

    render() {
      
    
    return (
        <div className="request">
            <div className="card">
                <div className="card-body text-center">
                    <img src={this.props.picture} className="rounded-circle" width="60" height="60" alt=""/>
                    <h4>{this.props.name}</h4>
                    <h6 className="text-muted"> @{this.props.username}</h6>
                    <p><button className="btn btn-link">{this.props.mutualFriends} mutual friends</button></p>                    
                    <div className="row">
                        <div className="col text-right">
                            <button className="btn btn-primary" name="accept" id={this.props.id} onClick={this.props.handleRequest}>Accept Request</button>
                        </div>
                        <div className="col text-left">
                            <button className="btn btn-primary decline" name="decline" id={this.props.id} onClick={this.props.handleRequest}>Decline Request</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );

    }
}
