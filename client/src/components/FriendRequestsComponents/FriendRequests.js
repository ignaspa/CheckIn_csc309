import React, { Component } from "react";
import "./FriendRequests.css"
import UserNav from "../DashboardComponents/UserNav"
import AllFriendRequests from "./FriendRequestsData";


export default class FriendRequestSection extends Component {
    render() {
        return (

            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-3">
                        <UserNav />
                    </div>

                    <div className="col-9">
                            <AllFriendRequests/>
                    </div>
                </div>
            </div>
        );
    }
}


