/* The user dashboard */
import React, { Component } from "react";
import "../css/UserDashboard.css"
import User1 from "../DummyPics/User1.jpg"
import User2 from "../DummyPics/User2.jpg"

export default class UserDashboard extends Component {
    render() {
        return (
            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-3">
                        <UserSide />
                    </div>

                    <div className="col-9">
                        <WriteCheckIn/>
                        <CheckInUpdate/>
                        <CheckInUpdate/>
                        <CheckInUpdate/>
                    </div>
                </div>

            </div>
        );
    }
}

function UserSide(props) {
    return (
            <div className="card">
                <div className="card-body">
                    <div>
                        <img className="rounded-circle img-responsive" width="65" height="65" src={User1} alt="" />
                    </div>
                    <div class="h5">@Sonia</div>
                    <div class="h7 text-muted"> Sonia Zaldana</div>
                    <div class="h7">I do things</div>
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

function WriteCheckIn(props) {
    return (
        <div>
            {/* Post */}
            <div className="card gedf-card">
                <div className="card-body">
                    <div className="form-group">

                        <div className="form-row">
                            <div className="col">

                                <div className="form-group">
                                    <input
                                        name=""
                                        class="form-control"
                                        id="inputText"
                                        placeholder="Where are you?"
                                        type="text"
                                    />

                                </div>
                            </div>

                            <div className="col">
                                <select class="form-control" id="sel1">
                                    <option>Studying</option>
                                    <option>Eating</option>
                                    <option>Chilling</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="btn-toolbar justify-content-between">
                        <div className="btn-group">
                            <button type="submit" class="btn btn-primary">Check-in!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckInUpdate(props) {
    return (
            <div className="card gedf-card">
                <div className="card-header">
                    <div className="d-flex align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="55" height="55" src={User2} alt="" />

                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">Marco</div>
                            <div className="h7 text-muted">@MarcoAngelli</div>
                        </div>
                    </div>
                </div>

            <div className="card-body">
                <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> 10 min ago</div>
                <a className="card-link" href="#">
                    <h5 className="card-title">Marco is studying in 3200!</h5>
                </a>
                <p className="card-text">
                    Hey, i'm doing 309 come join.
                   </p>
                <div className="card-footer">
                    <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                    <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                    <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                </div>
            </div>
            </div>
    );
}
