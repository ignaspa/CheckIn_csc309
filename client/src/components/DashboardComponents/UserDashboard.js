/* The user dashboard */
import React, { Component } from "react";
import "../../css/UserDashboard.css"
import CheckInForm from "./CheckinForm"
import UserNav from "./UserNav"
import CheckInUpdates from "./UserData"

export default class UserDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
          id: 0,
          location: "",
          message: "",
          action: ""
        }
    }

    handleCheckInInput(event) {
        this.setState({ [event.target.name]: event.target.value }); 
        console.log("HELLO")
    }

    render() {
        return (
            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-3">
                        <UserNav />
                    </div>

                    <div className="col-9" id ="checkingContents">
                        
                        <CheckInForm handleCheckInInput = {this.handleCheckInInput.bind(this)}/>

                        <CheckInUpdates newCheckIn= {this.state} />
                    </div>
                </div>

            </div>
        );
    }
}

