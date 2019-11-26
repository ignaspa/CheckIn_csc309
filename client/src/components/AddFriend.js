import React, { Component } from "react";
import "../css/App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllUsers } from "../redux/actions";

class AddFriend extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: {},
            results: [],
            potentialfriends: {}
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
    }
    componentDidMount () {
        this.props.getPotentialFriends();
    }
    render() {
        console.log("props listusers", this.props.listUsers)
        return (
            <div>
                <div className="pagetitle">
                    <h3>Add Friends</h3>
                </div>
                <div className="input-group input-group-sm mb-3 text-center deletebar">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">User</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={this.handleOnChange} />
                </div>
                <div className="pagetitle">
                    <h5>Users In System</h5>
                </div>
                <ResultsTable results={this.state.results} changeUserStatus={this.changeUserStatus} />
                <div className="pagetitle">
                    <h5>...</h5>
                </div>
            </div>
        );
    }

    handleOnChange = (event) => {
        console.log("I am changing");
        console.log(event.target.value);
        this.setState({ results: [] });
        if (event.target.value === "") {
            return;
        }
        let newResults = [];
        for (let i = 0; i < this.state.potentialfriends.length; i++) {
            if (this.state.potentialfriends[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
                newResults.push(this.state.potentialfriends[i]);
            }
        }
        this.setState({ results: newResults });
        console.log(this.state.results);
        
    }

    changeUserStatus = (userID) => {
        for (let i = 0; i < this.state.potentialfriends.length; i++) {
            if (this.state.potentialfriends[i].id === userID) {
                console.log(this.state.potentialfriends[i].id);
                console.log(userID);
                let item = this.state.potentialfriends.splice(i, 1);
                console.log(item)
                // this.setState({added: this.state.added.push(item)});
            }
        }
        console.log(this.state.added);

    }

}

function ResultsTable(props) {
    const matchedUsers = props.results.map(user => (
        <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.joinDate}</td>
            <td>
                <button
                    onClick={() => props.changeUserStatus(user.id)}
                    className="btn btn-success">
                    Add Friend
              </button>
            </td>
        </tr>
    ));
    return (
        <div>
            <table className="table container-fluid">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Join Date</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {matchedUsers}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = store => ({
    user: store.user,
    listUsers: store.listUsers
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getPotentialFriends: getAllUsers}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);