/* The user dashboard */
import React, { Component } from "react";
import "../../css/UserDashboard.css"
import CheckInForm from "./CheckinForm"
import UserNav from "./UserNav"
import CheckInUpdates from "./UserData"

let checkins = [
    {
        id: 1,
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


export default class UserDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
                allCheckins: checkins
        }
    }

    submitCheckIn = state => {
        console.log("Submitting check in")

        let currentCheckins = this.state.allCheckins
        currentCheckins.unshift({
            id: 0, 
            action: state.action,
            location: state.location, 
            message: state.message, 
            time: state.time
        })

        this.setState({allCheckins: currentCheckins}, () => {
            console.log(this.state)
        })
        
    }

    render() {
        return (
            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-3">
                        <UserNav />
                    </div>

                    <div className="col-9" id ="checkingContents">
                        
                        <CheckInForm submitCheckIn={this.submitCheckIn}/>

                        <CheckInUpdates allCheckins= {this.state.allCheckins} 
                        currentUserId="0"/>
                    </div>
                </div>

            </div>
        );
    }
}

