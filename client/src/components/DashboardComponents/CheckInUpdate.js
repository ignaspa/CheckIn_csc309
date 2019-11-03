import React, { Component } from "react";
import "../../css/UserDashboard.css"

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
   
    render() {
        return (
            <div className="card gedf-card">
                <div className="card-header">
                    <div className="d-flex align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="55" height="55" src={this.props.picture} alt="" />

                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">{this.props.name}</div>
                            <div className="h7 text-muted">@{this.props.username}</div>
                        </div>
                    </div>
                </div>

            <div className="card-body">
                {/* TODO: Add marco's time since function here  */}
                <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {timeSince(this.props.time)}</div>
                {/* <a className="card-link"> */}
                    <h5 className="card-title">{this.props.name} is {this.props.action} in {this.props.location}</h5>
                {/* </a> */}
                <p className="card-text">
                    {this.props.message}
                   </p>
            </div>
            </div>
        );
    }
}