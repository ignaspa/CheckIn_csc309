import React, { Component } from "react";
import { login } from '../../redux/actions.js'
import { connect } from 'react-redux';
import {findGivenUser, findNumberOfCommonFriends, getUserFromId, acceptFriendRequest, removeFriendRequest} from '../MockData.js'

class AllFriendRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getUserFromId(props.userId),
        };
    }

    arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele.id !== value;
        });  
    }
    handleRequest = event => {
        event.persist()
        event.preventDefault()

        let friendId = event.target.id
        let friend_requests = this.state.user.friend_request
        let new_requests = this.arrayRemove(friend_requests, parseInt(friendId, 10))
        this.state.user.friend_request = new_requests

        if (event.target.name === "accept") {
            acceptFriendRequest(this.state.user.id, parseInt(friendId, 10))
        } else {
            removeFriendRequest(this.state.user.id, parseInt(friendId, 10))
        }
        this.setState({
            user: getUserFromId(this.state.user.id)
        });
    }
    render() {
        return(
            <div>
                <FriendRequests
                user={this.state.user}
                handleRequest={this.handleRequest}
                />
            </div>
        );
    }
}


class FriendRequests extends Component{
    constructor(props) {
        super(props);
        this.user = props.user;
    }

    render() {
        var rows = [];

    let friend_requests = this.user.friend_request
    let key = 0;
    for (var i = 0; i < friend_requests.length; i++) {
        let user = findGivenUser(friend_requests[i])
        let mutualFriends = findNumberOfCommonFriends(this.user.id, user.id)
        if (i % 3 === 0) {
            rows.push(<div className="row" key={key}/>)
            key++
        }  
         rows.push(
             <div className="col" key={key}>
         <FriendRequest 
            id={user.id}
            name={user.name}
            username={user.username}
            picture={user.picture}
            mutualFriends = {mutualFriends}
            handleRequest = {this.props.handleRequest}
            />
            </div>
            );
            key++
    }
    
    return (
        <div>
        {rows}
        </div>
    );
    }
}

class FriendRequest extends Component {

    render() {
      
    
    return (
        <div className="request">
            <div className="card">
                <div className="card-body text-center">
                    <img src={this.props.picture} className="rounded-circle" width="60" height="60" alt=""/>
                    <h4>{this.props.name}</h4>
                    <h6 className="text-muted"> @{this.props.username}</h6>
                    <p className="font-weight-bold">{this.props.mutualFriends} mutual friends</p>                    
                    <div className="row">
                        <div className="col text-right">
                            <button className="btn btn-primary" name="accept" id={this.props.id} onClick={this.props.handleRequest}>Accept Request</button>
                        </div>
                        <div className="col text-left">
                            <button className="btn btn-primary decline" name="decline" id={this.props.id} onClick={this.props.handleRequest}>Decline Request</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );

    }
}

const mapStateToProps = store => ({
    userId: store.userId
});

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllFriendRequests);
