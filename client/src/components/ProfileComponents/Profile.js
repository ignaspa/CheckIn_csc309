import React, { Component } from "react";
import { login } from '../../redux/actions.js'
import { connect } from 'react-redux';
import { getUserFromHandle, getUserFromId, removeFriend, requestFriend, getCheckIn, getOldCheckIn, changeBio, changeName } from '../MockData.js';
import {Link} from "react-router-dom";

class Profile extends Component {
    constructor(props) {

        super(props);
        const user = getUserFromId(props.userId);
        this.state = {
            edit_mode: false,
            user: user, // User who is logged in
            profile_user: getUserFromHandle(props.match.params.username, user) // User whose profile we are looking at
        }
        this.newName = this.state.user.name;
        this.newBio = this.state.user.bio;
        this.onModeChange = this.onModeChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    onModeChange() {
        changeName(this.state.user.id, this.newName);
        changeBio(this.state.user.id, this.newBio);

        this.setState((state, props) => {
            return {
                edit_mode: !this.state.edit_mode,
                user: getUserFromId(props.userId),
                profile_user: this.state.user
            };
        })
    }
    handleInputChange(event) {
        const profile_id = this.state.profile_id

        if (event.target.name === "bio") {
            this.newBio = event.target.value;
        } else if (event.target.name === "name") {
            this.newName = event.target.value;
        }
    }

    render() {
        const profile_id = this.state.profile_id
        let profile_header = <ProfileHeader
            user={this.state.profile_user}
            onModeChange={this.onModeChange}
            user_id={this.state.user.id}
            profile_id={this.state.profile_user.id}
        />;
        if (this.state.edit_mode) {
            profile_header = <EditProfileHeader
                user={this.state.profile_user}
                onModeChange={this.onModeChange}
                handleInputChange={this.handleInputChange}
            />
        }
        return (
            <div>
                {profile_header}
                <CurrentLocation
                    profile_id={this.state.profile_user.id}
                />
                <PastLocations
                    profile_id={this.state.profile_user.id}
                />
            </div>
        );
    }
}

class ActionButton extends Component {
    constructor(props) {
        super(props);
        // Index of the user viewing the profile
        this.profile_id = props.profile_id;
        this.state = {
           isFriend: true,
            user: getUserFromId(props.user_id),
        }
        //this.removeFriend = this.removeFriend.bind(this)
        //this.addFriend = this.addFriend.bind(this)
    }

    addFriend(event) {
        requestFriend(this.state.user_id, this.profile_id);
        this.setState((state, props) => {
            return {
                isFriend: true
            };
        });
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
                        <img className="profile-pic rounded-circle border m-3 text-center" src={props.user.profilepic} alt="Profile" />

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
                        <button type="button" class="btn btn-primary changepicbutton">
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
    const checkin = getCheckIn(props.profile_id);
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
    const user_oldCheckins = getOldCheckIn(props.profile_id);
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
};

const mapStateToProps = store => ({
    userId: store.userId
});

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
