import React, { Component } from "react";
import "../../css/UserDashboard.css"
import { Redirect } from "react-router";


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

export default class CheckInUpdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: ""
        }
    }

    seeProfile = event => {
        this.setState({redirect: "/profile"})
    }
    render() {
        if (this.state.redirect === "/profile") {
            console.log("ID feeding into profile: " + this.props.user._id)
            return(
                <Redirect
                        to={{
                            pathname: '/profile/' + this.props.user.username,
                            state: { profile_user_id: this.props.user._id }
                 }}
                 push={true}/>
            );
        }

        return (
            <div className="card gedf-card">
                <div className="card-header">
                    <div className="d-flex align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="55" height="55" src={this.props.picture} alt="" />

                        </div>
                        <div className="ml-2">
                            <button className="btn btn-link" onClick={this.seeProfile}>
                            <div className="h4">{this.props.name} </div></button>
                            <div className="h7 text-muted">@{this.props.username}</div>
                        </div>
                    </div>
                </div>

            <div className="card-body">
                <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {timeSince(this.props.time)}</div>
                    <h5 className="card-title">{this.props.name} is {this.props.action} in {this.props.location}</h5>
                <p className="card-text">
                    {this.props.message}
                   </p>
            </div>
            </div>
        );
    }
}
