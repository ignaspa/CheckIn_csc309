import React, { Component } from "react";
import "../../css/UserDashboard.css"

export default class CheckInForm extends Component {

    render() {
        return (
            <div>
            {/* Post */}
            <div className="card gedf-card">
                <div className="card-body">

                    <form>
                    <div className="form-group">

                        <div className="form-row">
                            <div className="col">

                                <div className="form-group">
                                    <input
                                        name="location"
                                        className="form-control"
                                        id="inputText"
                                        placeholder="Where are you?"
                                        type="text"
                                        onChange= {this.handleCheckInInput}
                                    />

                                </div>
                            </div>

                            <div className="col">
                                <select className="form-control" id="sel1" name="action" onChange={this.handleCheckInInput}>
                                    <option>Studying</option>
                                    <option>Eating</option>
                                    <option>Chilling</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <input 
                            name="message"
                            className="form-control"
                            id="inputMessage"
                            placeholder="Anything else you want to add?"
                            type="text"
                            onChange={this.handleCheckInInput}
                            />

                        </div>
                    </div>
        
                    <div className="btn-toolbar justify-content-between">
                            <button  type="submit" className="btn btn-primary">Check-in!</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}