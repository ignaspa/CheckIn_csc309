import React, { Component } from "react";
import { Link } from "react-router-dom";
import User1 from "../DashboardComponents/DashboardAssets/User1.jpg"
import User2 from "../DashboardComponents/DashboardAssets/User2.jpg"
import User3 from "../DashboardComponents/DashboardAssets/User3.jpg"
import User4 from "../DashboardComponents/DashboardAssets/User4.jpg"

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
        name: 'Marco Angeli',
        friends: [0, 2, 3],
        friend_request: [],
        picture: User2,
        username: 'MarcoAngeli',
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
        current_location: 'Gerstein',
        friends: [0, 1, 2],
        friend_request: [],
        picture: User4,
        username: 'iggy',
        bio: "i love my dog carmelo",
    }
]

let checkins = [
    {
        id: 0,
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
        id: 0,
        action: "studying",
        location: "Robarts",
        time: new Date("October 29, 2019 03:24:00"),
        message: "309 is tough. help :("
    },
    {
        id: 0,
        action: "studying",
        location: "Grahams",
        time: new Date("October 28, 2019 03:24:00"),
        message: "309 is tough. help :("
    },


]


export default class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            edit_mode: false,
            user_id: props.location.state.user_id,
            profile_id: props.location.state.profile_id,
        }
        this.onModeChange = this.onModeChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)


    }
    onModeChange() {
        console.log(this.state)
        this.setState((state, props) => {
            return { edit_mode: !this.state.edit_mode }
        })
    }
    handleInputChange(event) {
        const profile_id = this.state.profile_id
        const user_id = this.state.user_id

        const user_index = userData.findIndex(function (u) {
            return u.id === profile_id;
        })

        let newName = userData[user_index].name;
        let newBio = userData[user_index].bio;

        if (event.target.name === "bio") {
            newBio = event.target.value;
        } else if (event.target.name === "name") {
            newName = event.target.value;
        }
        userData[user_index].name = newName;
        userData[user_index].bio = newBio;
    }

    render() {
        const profile_id = this.state.profile_id
        const user = userData.find(function (u) {
            return u.id === profile_id;
        });
        let profile_header = <ProfileHeader
            user={user}
            onModeChange={this.onModeChange}
            user_id={this.state.user_id}
            profile_id={profile_id}
        />;
        if (this.state.edit_mode) {
            profile_header = <EditProfileHeader
                user={user}
                onModeChange={this.onModeChange}
                handleInputChange={this.handleInputChange}
            />
        }
        return (
            <div>
                {profile_header}
                <CurrentLocation
                    profile_id={profile_id}
                />
                <PastLocations
                    profile_id={profile_id}
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
            return u.id === props.user_id;
        })
        this.state = { isFriend: userData[this.user_index].friends.includes(props.profile_id) }
        this.removeFriend = this.removeFriend.bind(this)
        this.addFriend = this.addFriend.bind(this)

    }

    removeFriend(event) {
        const index_to_remove = userData[this.user_index].friends.indexOf(this.props.profile_id)
        if (index_to_remove > -1) {
            userData[this.user_index].friends.splice(index_to_remove, 1);
        }
        this.setState((state, props) => {
            return { isFriend: false }
        })
        console.log(userData[this.user_index].friends)
    }

    addFriend(event) {

        userData[this.user_index].friends.push(this.props.profile_id);
        this.setState((state, props) => {
            return { isFriend: true }
        })
        console.log(userData[this.user_index].friends)
    }

    render() {
        let label = "Edit Profile"
        let onClickAction = this.props.onModeChange
        if (this.props.user_id != this.props.profile_id && this.state.isFriend) {
            label = "Remove Friend";
            onClickAction = this.removeFriend;
        }

        if (this.props.user_id != this.props.profile_id && !this.state.isFriend) {
            label = "Add Friend"
            onClickAction = this.addFriend;
        }
        return <button className={"btn rounded btn-primary mt-3"} onClick={onClickAction}>{label}</button>;

    }
}

function ProfileHeader(props) {

    return (
        <table className="profile-section table mx-auto">
            <tbody>
                <tr>
                    <th>
                        <img className="profile-pic rounded-circle border m-3 text-center" src={props.user.picture} alt="Profile" />

                    </th>
                    <th>
                        <div className="col-sm">
                            <h3 className="card-title mt-3 mb-0"> {props.user.name} </h3>
                            <div className="handle"> @{props.user.username} </div>
                            <div><strong>{props.user.friends.length}</strong> friends</div>
                            <div>{props.user.bio}</div>
                        </div>
                    </th>
                    <th>
                        <ActionButton
                            onModeChange={props.onModeChange}
                            user_id={props.user_id}
                            profile_id={props.profile_id} />
                    </th>
                </tr>
                <tr>
                    <th>
                        <button type="button" class="btn btn-primary attractionbutton">
                            <Link to={"/changepic"} className="nav-link text-white">
                                Change Profile Picture
                            </Link>
                        </button>
                    </th>
                </tr>
            </tbody>

        </table>
    );
}

function EditProfileHeader(props) {

    return (
        <table class="profile-section table mx-auto">

            <tr>
                <th>
                    <img className="profile-pic rounded-circle border m-3 text-center" src={props.user.picture} alt="Profile" />

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
                    <button className="btn rounded btn-primary mt-3" onClick={props.onModeChange}>Done</button>
                </th>
            </tr>

        </table>
    );
}

function CurrentLocation(props) {
    const checkin = checkins.find(function (c) {
        return c.id === props.profile_id;
    });
    if (!checkin) {
        return null;
    }
    return (
        <div className="profile-section card mx-auto border-0">
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
        return c.id === props.profile_id;
    });
    console.log(user_oldCheckins)
    var checkin_list = user_oldCheckins.map(function (c) {
        return CheckIn({ cardStyle: "inactive-card", checkin: c })
    })
    return (
        <div className="profile-section card mx-auto border-0 mt-3">
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