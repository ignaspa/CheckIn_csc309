import React, { Component } from "react";
import "../../css/UserDashboard.css"
import User1 from "./DashboardAssets/User1.jpg"

export default class UserNav extends Component {

    // We would use a server call to get the actual current user. This is just a placeholder
    constructor(props) {
        super(props)
        this.user = {
            id: 0,
            isAdmin: false,
            name: 'Sonia',
            current_location: 'BA 3200',
            friends: [1, 2, 3],
            friend_request: [5],
            picture: User1,
            username: 'SoniaZaldana',
            bio: "I'm so tired",
            time: "10"
        }
    }
    
    render() {
        return(
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
                <a href="#" role="button"> Add Friends </a>                
            </li>
            <li className="list-group-item align-items-center">
                <a href="#" role="button"> Friend Requests</a>
            </li>
            <li className="list-group-item align-items-center">
                <a href="#" role="button"> Settings</a>
            </li>
        </ul>
        </div>
        );
    }
}