import React, { Component } from "react";
import "../../css/UserDashboard.css"
import User1 from "./DashboardAssets/User1.jpg"
import {Redirect} from "react-router";
import { connect } from 'react-redux';

class UserNav extends Component {

    // We would use a server call to get the actual current user. This is just a placeholder
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = {
            redirect: ""
        }
    }

    friendRequests = event => {
        console.log("friend requests clicked")
        this.setState({ redirect: '/friend-requests' })
    }

    addFriends = event => {
        console.log("add friends clicked")
        this.setState({redirect: '/addfriend'})
    }


    editProfile = event => {
        console.log("edit profile clicked")
        this.setState({ redirect: "/profile" })
        return (
        < Redirect
            to={{
                pathname: '/profile',
                state: {
                    user_id: 1,
                    profile_id: 1,
                }
            }
            } push={true}/>);
    }

    render() {
        if (this.state.redirect === "/friend-requests") {
            return (
                <Redirect to="/friend-requests" push={true}/>
            );
        } else if (this.state.redirect === "/profile") {
            return (
                <Redirect
                    to={{
                        pathname: '/profile/' + this.user.username,
                    }}
                    push={true}/>
            )
        } else if (this.state.redirect == "/addfriend") {
            return (
                <Redirect to="/addFriend" push={true} />
            )
        }

        return (

            <div className="shadow">

                <div className="card">
                    <div className="card-body">
                        <div>
                            <img className="rounded-circle img-responsive" width="65" height="65" src={this.user.picture} alt="" />
                        </div>
                        <div className="h5">{this.user.name} </div>
                        <div className="h7 text-muted">@{this.user.username}</div>
                        <div className="h7">{this.user.bio}</div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item align-items-center">
                            <button className="btn btn-link" onClick={this.addFriends}> Add Friends </button>

                        </li>
                        <li className="list-group-item align-items-center">
                            <button className="btn btn-link" onClick={this.friendRequests}> Friend Requests</button>

                        </li>
                        <li className="list-group-item align-items-center">
                            <button className="btn btn-link" onClick={this.editProfile}> Edit Profile</button>

                        </li>
                    </ul>
                </div>

            </div>



        );
    }
}

const mapStateToProps = store => ({
    user: store.user
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(UserNav);
