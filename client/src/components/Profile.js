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
const id = 1; // ID of the user whose profile is being seen
const user_id = 1; // ID of the user viewing the profile

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_mode: false,
        }
        this.onModeChange = this.onModeChange.bind(this)
    }
    onModeChange() {
        console.log(this.state)
        this.setState((state, props) => {
            return { edit_mode: !this.state.edit_mode }
        })
    }
    handleInputChange(event) {
        const user_index = userData.findIndex(function (u) {
            return u.id === id;
        })

        let newName = userData[user_index].name;
        let newBio = userData[user_index].bio;

        if (event.target.name == "bio") {
            newBio = event.target.value;
        } else if (event.target.name == "name") {
            newName = event.target.value;
        }
        userData[user_index].name = newName;
        userData[user_index].bio = newBio;
    }

    render() {
        const user = userData.find(function (u) {
            return u.id === id;
        });

        const style = {
            width: "40rem",
        }
        let profile_header = <ProfileHeader
            user={user}
            cardStyle={style}
            modeChange={this.onModeChange}
        />;
        if (this.state.edit_mode) {
            profile_header = <EditProfileHeader
                user={user}
                cardStyle={style}
                modeChange={this.onModeChange}
                handleInputChange={this.handleInputChange}
            />
        }
        return (
            <div>
                {profile_header}
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

class ActionButton extends Component {
    constructor(props) {
        super(props);
        // Index of the user viewing the profile
        this.user_index = userData.findIndex(function (u) {
            return u.id === user_id;
        })
        this.state = {isFriend: userData[this.user_index].friends.includes(id)}
    }

    removeFriend(event) {
        console.log(userData[this.user_index].friends)
        const index_to_remove = userData[this.user_index].friends.indexOf(id)
        if (index_to_remove > -1) {
            userData[this.user_index].friends.splice(index_to_remove, 1);
        }
        console.log(userData[this.user_index].friends)
    }

    addFriend(event) {
        console.log(userData[this.user_index].friends)

    }

    render() {
        let label = "Remove Friend";
        if (!this.state.isFriend) {
            label = "Add Friend"
        }
        return <button className={"btn rounded btn-primary mt-3"} onClick={this.removeFriend}>{label}</button>;

    }
}

function ProfileHeader(props) {
    const button_class = "btn rounded btn-primary mt-3";

    // Index of the user viewing the profile
    const user_index = userData.findIndex(function (u) {
        return u.id === user_id;
    })

    function removeFriend(event) {
        console.log(userData[user_index].friends)
        const index_to_remove = userData[user_index].friends.indexOf(id)
        userData[user_index].friends.splice(index_to_remove, 1);
        console.log(userData[user_index].friends)
    }


    // Default case: If the user is viewing their own profile
    let action_button = <button className={button_class} onClick={props.modeChange}>Edit Profile</button>;
    // Case where the user is viewing one of their friend's profile
    if (userData[user_index].friends.includes(id)) {
        action_button = <button className={button_class} onClick={removeFriend}>Remove friend</button>;
    }
    return (
        <table className="table mx-auto" style={props.cardStyle}>
            <tbody>
                <tr>
                    <th>
                        <img className="profile-pic rounded-circle border m-3 text-center" src={cat} />

                    </th>
                    <th>
                        <div className="col-sm">
                            <h3 className="card-title mt-3"> {props.user.name} </h3>
                            <div><strong>{props.user.friends.length}</strong> friends</div>
                            <div>{props.user.bio}</div>
                        </div>
                    </th>
                    <th>
                        {action_button}
                    </th>
                </tr>
            </tbody>

        </table>
    );
}

function EditProfileHeader(props) {

    return (
        <table class="table mx-auto" style={props.cardStyle}>

            <tr>
                <th>
                    <img className="profile-pic rounded-circle border m-3 text-center" src={cat} />

                </th>
                <th>
                    <div className="col-sm">
                        <h3>
                            <input className="display-name-input mt-3"
                                name="name"
                                defaultValue={props.user.name}
                                onChange={props.handleInputChange}
                            />
                        </h3>

                        <div><strong>{props.user.friends.length}</strong> friends</div>
                        <div><input className="mt-3"
                            name="bio"
                            defaultValue={props.user.bio}
                            onChange={props.handleInputChange}

                        />
                        </div>
                    </div>
                </th>
                <th>
                    <button className="btn rounded btn-primary mt-3" onClick={props.modeChange}>Done</button>
                </th>
            </tr>

        </table>
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
                cardStyle="active-card"
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
    var checkin_list = user_oldCheckins.map(function (c) {
        return CheckIn({ cardStyle: "inactive-card", checkin: c })
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
    const className = "card " + props.cardStyle;
    return (
        <div className={className}>
            <div className="card-body">
                <div><span className="checkin-title card-title">{props.checkin.location}</span> {timeSince(props.checkin.time)}</div>
                <h6 className="card-subtitle mb-2 mt-1 text-muted">{props.checkin.action}</h6>
                <p className="card-text">{props.checkin.message}</p>
            </div>
        </div>
    )
}