import React, { Component } from "react";
import "../../css/UserDashboard.css"

export default class CheckInForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            checkin: ""            
        }
    }

    onSubmit = event => {
        event.preventDefault()
        let idInput = 0
        let locationInput = this.refs.location.value
        let actionInput = this.refs.action.value 
        let messageInput = this.refs.message.value
        let timeInput = new Date();
    

        let state = {
            id: idInput, 
            location: locationInput, 
            action: actionInput, 
            message: messageInput, 
            time: timeInput
        }

        this.setState({ checkin: state }, () => {
            console.log(this.state);
            this.props.submitCheckIn(this.state.checkin)
          }); 
    }


    render() {
        return (
            <div>
                {/* Post */}
                <div className="shadow">

                    <div className="card gedf-card">
                        <div className="card-body">

                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">

                                    <div className="form-row">
                                        <div className="col">

                                            <div className="form-group">
                                                <input
                                                    ref="location"
                                                    className="form-control"
                                                    id="inputText"
                                                    placeholder="Where are you?"
                                                    type="text"
                                                    // onChange={this.props.handleCheckInInput}
                                                />

                                            </div>
                                        </div>

                                        <div className="col">
                                            <select className="form-control" id="sel1" ref="action" >
                                                <option>Studying</option>
                                                <option>Eating</option>
                                                <option>Chilling</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <input
                                            ref="message"
                                            className="form-control"
                                            id="inputMessage"
                                            placeholder="Anything else you want to add?"
                                            type="text"
                                            // onChange={this.props.handleCheckInInput}
                                        />

                                    </div>
                                </div>

                                <div className="btn-toolbar justify-content-between">
                                    <button type="submit" className="btn btn-primary">Check-in!</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}