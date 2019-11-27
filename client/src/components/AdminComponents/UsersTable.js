import React, { Component } from "react";
import PasswordChangeForm from "./PasswordChangeForm";
import axios from "axios";
import Moment from "react-moment";

export default class UsersTable extends Component {
  constructor() {
    super();
    this.state = {
      usersData: []
    };
  }
  //later API will send a GET request to server to get user data
  componentDidMount() {
    axios
      .get("/api/users/all")
      .then(res => {
        const usersData = res.data;
        this.appendShowPasswordChangeField(usersData);
        this.setState({ usersData: usersData });
      })
      .catch(err => {
        console.log(err);
      });
  }

  appendShowPasswordChangeField = usersData => {
    for (let i = 0; i < usersData.length; i++) {
      usersData[i].showPasswordChangeForm = false;
    }
  };

  //make change password form appear
  onPasswordChangeClick = userId => {
    const { usersData } = this.state;
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i]._id === userId) {
        usersData[i].showPasswordChangeForm = true;
        this.setState({ usersData: usersData });
        break;
      }
    }
  };

  //make change password form appear
  hidePasswordChangeForm = userId => {
    const { usersData } = this.state;
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i]._id === userId) {
        usersData[i].showPasswordChangeForm = false;
        this.setState({ usersData: usersData });
        break;
      }
    }
  };

  //make DELETE request to express server to delete user
  onDeleteClick = userId => {
    axios
      .delete(`/api/users/${userId}`)
      .then(res => {
        //reload page on success
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const usersData = this.state.usersData.map(user => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.username}</td>

        <td>{user.totalCheckins}</td>
        <td>
          <Moment fparse="YYYY-MM-DD HH:mm">{user.date}</Moment>
        </td>

        {user.showPasswordChangeForm ? (
          <td>
            <PasswordChangeForm
              userId={user._id}
              hidePasswordChangeForm={this.hidePasswordChangeForm}
            />
          </td>
        ) : (
          <td>
            <button
              onClick={() => this.onPasswordChangeClick(user._id)}
              className="btn btn-primary mr-2"
            >
              Change Password
            </button>
            <button
              onClick={() => this.onDeleteClick(user._id)}
              className="btn btn-danger"
            >
              Delete User
            </button>
          </td>
        )}
      </tr>
    ));

    return (
      <div className="container mt-5" id="users-table">
        <h2 className="mt-5 mb-5">Users</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Username</th>
              <th>Total Checkins</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
            {usersData}
          </thead>
        </table>
      </div>
    );
  }
}
