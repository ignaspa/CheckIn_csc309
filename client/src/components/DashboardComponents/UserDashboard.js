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
        this.handleCheckInInput = this.handleCheckInInput.bind(this)
    }

    handleCheckInInput(event) {
        console.log("HELLO")
        this.setState({[
            event.target.name]: event.target.value 
        }); 
    }

    render() {
        return (
            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-3">
                        <UserNav />
                    </div>

                    <div className="col-9" id ="checkingContents">
                        
                        <CheckInForm handleCheckInInput = {this.handleCheckInInput}/>

                        <CheckInUpdates newCheckIn= {this.state} />
                    </div>
                </div>

            </div>
        );
    }
}

