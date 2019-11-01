/* The user dashboard */
import React, { Component } from "react";
import "../../css/UserDashboard.css"
import CheckInForm from "./CheckinForm"
import UserNav from "./UserNav"
import CheckInUpdates from "./UserData"

export default class UserDashboard extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-3">
                        <UserNav />
                    </div>

                    <div className="col-9" id ="checkingContents">
                        
                        <CheckInForm/>

                        {/* <CheckInUpdate
                        name={marco.name}
                        username={marco.username}
                        picture={marco.picture}
                        time="10 mins ago"
                        location={marco.location}
                        action={marco.action}
                        customMessage="come join! I'm bored"/>
                        <CheckInUpdate
                        name={abdullah.name}
                        username={abdullah.username}
                        picture={abdullah.picture}
                        time="1 hour ago"
                        location={abdullah.location}
                        action={abdullah.action}
                        customMessage="Is anybody else around here?"/>
                        <CheckInUpdate
                        name={ignas.name}
                        username={ignas.username}
                        picture={ignas.picture}
                        time="1 day ago"
                        location={ignas.location}
                        action={ignas.action}
                        customMessage="im studying for 309 pls help"/> */}

                        <CheckInUpdates/>
                    </div>
                </div>

            </div>
        );
    }
}




// function UserSide(props) {
//     return (
//             <div className="card">
//                 <div className="card-body">
//                     <div>
//                         <img className="rounded-circle img-responsive" width="65" height="65" src={props.picture} alt="" />
//                     </div>
//                     <div className="h5">{props.name} </div>
//                     <div className="h7 text-muted">@{props.username}</div>
//                     <div className="h7">{props.bio}</div>
//                 </div>
//                 <ul className="list-group list-group-flush">
//                 <li className="list-group-item align-items-center">
//                     <a href="#" role="button"> Add Friends </a>                
//                 </li>
//                 <li className="list-group-item align-items-center">
//                     <a href="#" role="button"> Friend Requests</a>
//                 </li>
//                 <li className="list-group-item align-items-center">
//                     <a href="#" role="button"> Settings</a>
//                 </li>
//             </ul>
//             </div>

//     );
// }

// function WriteCheckIn(props) {
//     return (
//         <div>
//             {/* Post */}
//             <div className="card gedf-card">
//                 <div className="card-body">

//                     <form>

                    
//                     <div className="form-group">

//                         <div className="form-row">
//                             <div className="col">

//                                 <div className="form-group">
//                                     <input
//                                         name="location"
//                                         class="form-control"
//                                         id="inputText"
//                                         placeholder="Where are you?"
//                                         type="text"
//                                         onChange= {this.handleChange}
//                                     />

//                                 </div>
//                             </div>

//                             <div className="col">
//                                 <select class="form-control" id="sel1" name="action" onChange={this.handleChange}>
//                                     <option>Studying</option>
//                                     <option>Eating</option>
//                                     <option>Chilling</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="form-row">
//                             <input 
//                             name="message"
//                             class="form-control"
//                             id="inputMessage"
//                             placeholder="Anything else you want to add?"
//                             type="text"
//                             onChange={this.handleChange}
//                             />

//                         </div>
//                     </div>
        
//                     <div className="btn-toolbar justify-content-between">
//                             <button  type="submit" class="btn btn-primary">Check-in!</button>
//                     </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function CheckInUpdate(props) {
//     return (
//             <div className="card gedf-card">
//                 <div className="card-header">
//                     <div className="d-flex align-items-center">
//                         <div className="mr-2">
//                             <img className="rounded-circle" width="55" height="55" src={props.picture} alt="" />

//                         </div>
//                         <div className="ml-2">
//                             <div className="h5 m-0">{props.name}</div>
//                             <div className="h7 text-muted">@{props.username}</div>
//                         </div>
//                     </div>
//                 </div>

//             <div className="card-body">
//                 <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {props.time}</div>
//                 <a className="card-link" href="#">
//                     <h5 className="card-title">{props.name} is {props.action} in {props.location}</h5>
//                 </a>
//                 <p className="card-text">
//                     {props.customMessage}
//                    </p>
//                 <div className="card-footer">
//                     <a href="#" className="card-link"><i className="fa fa-gittip"></i> I'm coming!</a>
//                 </div>
//             </div>
//             </div>
//     );
// }
