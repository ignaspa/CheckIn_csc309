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

// export default class UserDashboard extends Component {

//     render() {
//         return (
//             <div className="container text-center">
//                 <div className="row">
//                     <div className="col-sm-3 well">

//                         <div className="well">
//                             <p>My Profile </p>
//                             <img src={User1} class="img-circle" height="100" width="100" alt="Avatar" />
//                         </div>

//                         <p>Link</p>
//                         <p>Link</p>
//                         <p>Link</p>
//                     </div>

//                     <div className="col-sm-9">

//                         <div className="row">
//                             <div className="col-sm-12">
//                                 <div className="panel panel-default text-left">
//                                     <div className="panel-body">
//                                         <p contenteditable="true">Status: Feeling Blue</p>
//                                         <button type="button" className="btn btn-default btn-sm">
//                                             <span className="glyphicon glyphicon-thumbs-up"></span> Like
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div class="col-sm-2 text-center">
//                                 <img src={User2} className="img-circle" height="65" width="65" alt="Avatar"/>
//                             </div>
//                             <div className="col-sm-10">
//                                 <h4>Anja <small>Sep 29, 2015, 9:12 PM</small></h4>
//                                 <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//                             {/* <br> */}
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//                 );
//             }
//         }
