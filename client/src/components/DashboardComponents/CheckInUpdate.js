import React, { Component } from "react";
import "../../css/UserDashboard.css"

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
                <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {this.props.time}</div>
                {/* <a className="card-link"> */}
                    <h5 className="card-title">{this.props.name} is {this.props.action} in {this.props.location}</h5>
                {/* </a> */}
                <p className="card-text">
                    {this.props.customMessage}
                   </p>
                <div className="card-footer">
                    <a href="#Coming" className="card-link"><i className="fa fa-gittip"></i> I'm coming!</a>
                </div>
            </div>
            </div>
        );
    }
}