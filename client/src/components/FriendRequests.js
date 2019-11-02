import React, { Component } from "react";

export default class FriendRequests extends Component {
    render() {
        return (
           <div className="container">
               <div className="top">
                   <h2> Friend Requests</h2>
               </div>

               <div className="row">
                   <div className="shadow">
                       <div className="col-sm-12">
                           <div className="col-sm-12">
                               {/* <img src={User1} className="img-circle" width="60" /> */}
                           </div>
                           <div className="col-sm-8">
                               <h4>Raul</h4>
                               <p>@Raul</p>
                           </div>
                           <div className="col-sm-2">
                               <button className="btn btn-primary">Accept Request</button>
                           </div>
                       </div>
                       <div className="clearfix"/>
                       <hr />
                   </div>
               </div>
               
           </div>
        );
    }
}