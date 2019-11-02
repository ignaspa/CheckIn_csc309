import React, { Component } from "react";
import cat from "./cat.jpg";

let userData = [
    {
        id: 0,
        isAdmin: false,
        name: 'Sonia',
        friends: [1, 2, 3],
        friend_request: [5],
        picture: "User1",
        username: 'SoniaZaldana',
        bio: "I'm so tired",
    },
    {
        id: 1,
        isAdmin: false,
        name: 'Marco Angeli',
        friends: [0, 2, 3],
        friend_request: [],
        picture: "User2",
        username: 'MarcoAngeli',
        bio: "henlo",
    },
    {
        id: 2,
        isAdmin: false,
        name: 'Abdullah',
        friends: [0, 1, 3],
        friend_request: [],
        picture: "User3",
        username: 'abdamin',
        bio: "web developer",
    },

    {
        id: 3,
        isAdmin: false,
        name: 'Ignas',
        current_location: 'Gerstein',
        friends: [0, 1, 2],
        friend_request: [],
        picture: "User4",
        username: 'iggy',
        bio: "i love my dog carmelo",
    }
]

let checkins = [
    {
        id: 1,
        action: "studying",
        location: "Gerstein",
        time: new Date("November 1, 2019 03:24:00"),
        message: "309 is tough. help :("
    },
    {
        id: 2,
        action: "eating",
        location: "Sidney Smith",
        time: new Date("October 2, 2019 03:24:00"),
        message: "let's get a burrito bowl!"
    },
    {
        id: 3,
        action: "chilling",
        location: "CSSU",
        time: new Date("October 29, 2019 03:24:00"),
        message: "come play smash :)"
    }
]

let oldCheckins = [
    {
        id: 1,
        action: "studying",
        location: "Robarts",
        time: new Date("October 29, 2019 03:24:00"),
        message: "309 is tough. help :("
    },
    {
        id: 1,
        action: "studying",
        location: "Grahams",
        time: new Date("October 28, 2019 03:24:00"),
        message: "309 is tough. help :("
    },

]
const id = 1;

export default class Profile extends Component {

    render() {
        const user = userData.find(function (u) {
            return u.id === id;
        });
        const headerStyle = {
            width: "20rem",
        }
        const style = {
            width: "40rem",
        }
        return (
            <div>
                <ProfileHeader
                    user={user}
                    cardStyle={style}
                />
                <CurrentLocation
                    cardStyle={style}
                />
                <PastLocations
                    cardStyle={style}
                />
            </div>
        );
    }
}

function ProfileHeader(props) {
    return (
        <div className="container mx-auto border-0" style={props.cardStyle}>
            <div className="row">
                <div className="col-sm">
                    <img className="profile-pic rounded-circle border m-3 text-center" src={cat} />
                </div>
                <div className="col-sm">
                    <h3 className="card-title mt-3"> {props.user.name} </h3>
                    <div><strong>{props.user.friends.length}</strong> friends</div>
                    <div>{props.user.bio}</div>
                </div>
            </div>
        </div>
    );
}

function CurrentLocation(props) {
    const checkin = checkins.find(function (c) {
        return c.id == id;
    });
    if (!checkin) {
        return null;
    }
    return (
        <div className="card mx-auto border-0" style={props.cardStyle}>
            <h4 className="card-title"> Current Location </h4>
            <CheckIn
                cardStyle={props.cardStyle}
                checkin={checkin}
            />
        </div>

    );
}

function PastLocations(props) {
    const user_oldCheckins = oldCheckins.filter(function (c) {
        return c.id == id;
    });
    console.log(user_oldCheckins)
    var checkin_list = user_oldCheckins.map(function(c) {
        return CheckIn({cardStyle: props.cardStyle, checkin: c})
    })
    return (
        <div className="card mx-auto border-0 mt-3" style={props.cardStyle}>
            <h4 className="card-title"> Past Locations </h4>
            {checkin_list}
        </div>
        
        
    );
}

function timeSince(date) {
    const now = new Date();
    var seconds = Math.floor((now - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

function CheckIn(props) {
    return (
        <div className="card" style={props.cardStyle}>
            <div className="card-body">
                <div><span className="checkin-title card-title">{props.checkin.location}</span> {timeSince(props.checkin.time)}</div>
                <h6 className="card-subtitle mb-2 mt-1 text-muted">{props.checkin.action}</h6>
                <p className="card-text">{props.checkin.message}</p>
            </div>
        </div>
    )
}