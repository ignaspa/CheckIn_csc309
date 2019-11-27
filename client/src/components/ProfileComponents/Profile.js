import React, { Component } from "react";
import { login, getActiveCheckin, getSpecificUser, getUserData, getCheckinsForUser, updateUserInfo } from '../../redux/actions.js'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getUserFromHandle, getUserFromId, removeFriend, requestFriend, getCheckIn, getOldCheckIn, changeBio, changeName } from '../MockData.js';

class Profile extends Component {
    constructor(props) {

        super(props);
        console.log("ID IN PROFILE: " + this.props.location.state.profile_user_id)
        this.props.getUserData()
        this.props.getUser(this.props.location.state.profile_user_id)
        this.props.getCheckinsForUser(this.props.location.state.profile_user_id)

        this.state = {
            edit_mode: false,
            user: props.userData, // User who is logged in
            userCheckins: this.props.userCheckins, 
            profile_user: this.props.specificUser // User whose profile we are looking at
        }
        this.newName = this.state.user.name;
        this.newBio = this.state.user.bio;
        this.onModeChange = this.onModeChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentDidMount() {
        this.props.getUserData()
        this.props.getUser(this.props.location.state.profile_user_id)
        this.props.getCheckinsForUser(this.props.location.state.profile_user_id)
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                edit_mode: false,
                user: this.props.userData.userData, // User who is logged in
                userCheckins: this.props.userCheckins.userCheckins,
                profile_user: this.props.specificUser.specificUser
            })
        }
    }


    onModeChange() {
        // changeName(this.state.user.id, this.newName);
        // changeBio(this.state.user.id, this.newBio);

        this.setState({
            edit_mode: !this.state.edit_mode, 
            user: this.props.userData, 
            profile_user: this.props.specificUser
        })
        this.props.updateUserInfo(this.newBio, this.newName)
    }
    handleInputChange(event) {

        if (event.target.name === "bio") {
            this.newBio = event.target.value;
        } else if (event.target.name === "name") {
            this.newName = event.target.value;
        }
    }

    render() {
        console.log("this.state in render: ", this.state)
        if (this.state.edit_mode && typeof(this.state.profile_user) != "undefined") {
            return (
                <div>
                   <EditProfileHeader
                    user={this.state.profile_user}
                    onModeChange={this.onModeChange}
                    handleInputChange={this.handleInputChange}
                    />
                    <CurrentLocation
                        profile_user={this.state.profile_user}
                    />
                    <PastLocations
                        profile_user={this.state.profile_user}
                        userCheckins={this.state.userCheckins}
                    />
                </div>
            );
        }

        if (typeof(this.state.profile_user) != "undefined" && typeof(this.state.user) != "undefined") {
            return (
                <div>
                    <ProfileHeader
                    user={this.state.profile_user}
                    onModeChange={this.onModeChange}
                    // user_id={this.state.user._id}
                    otherUser={this.state.user}
                    />
                    <CurrentLocation
                        profile_user={this.state.profile_user}
                    />
                    <PastLocations
                        profile_user={this.state.profile_user}
                        userCheckins={this.state.userCheckins}
                    />
                </div>
            );
        }
        return null
    }
}

class ActionButton extends Component {
    constructor(props) {
        super(props);
        // Index of the user viewing the profile
        this.state = {
            user: props.user, 
            isFriend: true,
            otherUser: props.otherUser
        }
        //this.removeFriend = this.removeFriend.bind(this)
        //this.addFriend = this.addFriend.bind(this)
    }

    addFriend(event) {
        // TODO: add redux action here to add friend 


        // requestFriend(this.state.user_id, this.profile_id);
        // this.setState((state, props) => {
        //     return {
        //         isFriend: true
        //     };
        // });
    }

    removeFriend(event) {
        // TODO: add redux action here to delete friend
    }

    render() {
        let label = "Edit Profile"
        let onClickAction = this.props.onModeChange
        console.log(this.state)


        if (this.state.user && this.state.otherUser && this.state.user._id !== this.state.otherUser._id && this.state.isFriend) {
            label = "Remove Friend";
            onClickAction = this.removeFriend;
        }
        if (this.state.user && this.state.otherUser && this.state.user._id !== this.state.otherUser._id && !this.state.isFriend) {
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
                            {/* <div><strong>{props.user.friends.length}</strong> friends</div> */}
                            <div>{props.user.bio}</div>
                        </div>
                    </th>
                    <th>
                        <ActionButton
                        onModeChange={props.onModeChange}
                        user={props.user}
                        otherUser={props.otherUser}/>
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
                    <img className="profile-pic rounded-circle border m-3 text-center" src={props.user.picture} alt="Profile"/>

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

                        {/* <div><strong>{props.user.friends.length}</strong> friends</div> */}
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
    
    // const checkin = getCheckIn(props.profile_id);
    const profile_user = props.profile_user

    if (typeof(profile_user) == "undefined" || profile_user.activeCheckin == null) {
        return (
            <div className="profile-section card mx-auto border-0">
            <h4 className="card-title"> No Current Location </h4>
        </div>
        );
    }
    
    // TODO: activeCheckin is the ID for the checkin not the actual checkin so you gotta create redux action to fetch that. 
    return (
        <div className="profile-section card mx-auto border-0">
            <h4 className="card-title"> Current Location </h4>
            <CheckIn
                cardStyle="active-card"
                checkin={profile_user.activeCheckin}
            />
        </div>
    );
}

function PastLocations(props) {

    let checkin_list = null
    if (typeof(props.profile_user) != "undefined" && typeof(props.userCheckins) != "undefined") {
        const user_oldCheckins = props.userCheckins
        if (Array.isArray(user_oldCheckins)) {
            checkin_list = user_oldCheckins.map(function (c) {
                return CheckIn({ cardStyle: "inactive-card", checkin: c, key: c._id })
            })
        }
    }
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
                <div><span className="checkin-title card-title">{props.checkin.location}</span> {timeSince(new Date(props.checkin.time))}</div>
                <h6 className="card-subtitle mb-2 mt-1 text-muted">{props.checkin.action}</h6>
                <p className="card-text">{props.checkin.message}</p>
            </div>
        </div>
    )
};

const mapStateToProps = store => ({
    userId: store.userId, 
    userData: store.userData,
    activeCheckin: store.activeCheckin, 
    specificUser: store.specificUser, 
    userCheckins: store.userCheckins
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        loginUser: login, 
        getActiveCheckin: getActiveCheckin, 
        getUser: getSpecificUser, 
        getUserData: getUserData, 
        getCheckinsForUser: getCheckinsForUser, 
        updateUserInfo: updateUserInfo
}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
