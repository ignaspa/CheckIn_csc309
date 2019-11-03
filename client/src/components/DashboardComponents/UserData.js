import React, { Component } from "react";
import CheckInUpdate from "./CheckInUpdate"

import User1 from "./DashboardAssets/User1.jpg"
import User2 from "./DashboardAssets/User2.jpg"
import User3 from "./DashboardAssets/User3.jpg"
import User4 from "./DashboardAssets/User4.jpg"

// As opposed to using this, with a backend we would get actual data.
let userData = [
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
    }
]

let checkins = [
    {
        id: 1, 
        action: "studying", 
        location: "Gerstein", 
        time: "10 min ago", 
        message: "309 is tough. help :("
    }, 
    {
        id: 2, 
        action: "eating", 
        location: "Sidney Smith", 
        time: "1 hour ago", 
        message: "let's get a burrito bowl!"
    }, 
    {
        id: 3, 
        action: "chilling", 
        location: "CSSU", 
        time: "1 day ago", 
        message: "come play smash :)"
    }
]

export default class CheckIns extends Component {
    render() {
        return (
            <CheckInUpdates currentUser={this.props.newCheckIn}/>
        );
    }
}

function CheckInUpdates(props) {
    var rows = [];
    let foundUser = findUser(props.currentUser.id, userData)

    rows.push(<CheckInUpdate
        key={foundUser.id}
        name={foundUser.name}
        username={foundUser.username}
        picture={foundUser.picture}
        location={props.currentUser.location}
        action={props.currentUser.action}
        message={props.currentUser.message}
        />)

    for (var i = 0; i < checkins.length; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        let user = findUser(checkins[i].id, userData)
         rows.push(<CheckInUpdate 
            key={user.id}
            name={user.name}
            username={user.username}
            picture={user.picture}
            location={checkins[i].location}
            action={checkins[i].action}
            message={checkins[i].message}
            time = {checkins[i].time}
            />);
    }
    return (
        <div>
        {rows}
        </div>
    );
}

function findUser(id, userData) {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].id === id) {
            return userData[i]
        }
    }
}

 


