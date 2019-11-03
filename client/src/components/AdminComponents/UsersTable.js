import React, { Component } from "react";
import PasswordChangeForm from "./PasswordChangeForm";

const USER_DATA = [
  {
    id: "1",
    name: "Abdullah Amin",
    email: "abdamin30@gmal.com",
    totalCheckins: "140",
    joinDate: "2019-01-10",
    showPasswordChangeForm: false
  },
  {
    id: "2",
    name: "Marco Angeli",
    email: "marco@gmal.com",
    totalCheckins: "127",
    joinDate: "2017-02-20",
    showPasswordChangeForm: false
  },
  {
    id: "3",
    name: "Ignas Panero",
    email: "ignas@gmal.com",
    totalCheckins: "250",
    joinDate: "2018-03-15",
    showPasswordChangeForm: false
  },
  {
    id: "4",
    name: "Sonia Zaldana",
    email: "sonia@gmal.com",
    totalCheckins: "198",
    joinDate: "2016-06-12",
    showPasswordChangeForm: false
  },
  {
    id: "5",
    name: "John Doe",
    email: "john@gmal.com",
    totalCheckins: "150",
    joinDate: "2018-01-11",
    showPasswordChangeForm: false
  },
  {
    id: "6",
    name: "Jane Doe",
    email: "jane@gmal.com",
    totalCheckins: "355",
    joinDate: "2019-03-15",
    showPasswordChangeForm: false
  },
  {
    id: "7",
    name: "Jack Ma",
    email: "Jackma@gmal.com",
    totalCheckins: "550",
    joinDate: "2017-02-22",
    showPasswordChangeForm: false
  },
  {
    id: "8",
    name: "Mark Zuckerberg",
    email: "markzuck@gmal.com",
    totalCheckins: "144",
    joinDate: "2018-03-15",
    showPasswordChangeForm: false
  },
  {
    id: "9",
    name: "Jeff Bezos",
    email: "jeffbezos@gmal.com",
    totalCheckins: "10",
    joinDate: "2019-07-10",
    showPasswordChangeForm: false
  },
  {
    id: "10",
    name: "Steve Jobs",
    email: "stevejobs@gmal.com",
    totalCheckins: "350",
    joinDate: "2014-02-07",
    showPasswordChangeForm: false
  },
  {
    id: "11",
    name: "Elon Musk",
    email: "elonmusk@gmal.com",
    totalCheckins: "122",
    joinDate: "2018-08-25",
    showPasswordChangeForm: false
  }
];

export default class UsersTable extends Component {
  constructor() {
    super();
    this.state = {
      usersData: []
    };
  }
  //later API will send a GET request to server to get user data
  componentDidMount() {
    this.setState({ usersData: USER_DATA });
  }

  //make change password form appear
  onPasswordChangeClick = userId => {
    const { usersData } = this.state;
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].id === userId) {
        usersData[i].showPasswordChangeForm = true;
        this.setState({ usersData: usersData });
        break;
      }
    }
  };

  //For now we are just modifying the state. Later when we implement server code, this method will send
  // a DELETE request to our express server to delete the user from our database
  onDeleteClick = userId => {
    const { usersData } = this.state;
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].id === userId) {
        const index = i;
        usersData.splice(index, 1);
        this.setState({ usersData: usersData });
        break;
      }
    }
  };
  render() {
    const usersData = this.state.usersData.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>

        <td>{user.totalCheckins}</td>
        <td>{user.joinDate}</td>

        {user.showPasswordChangeForm ? (
          <td>
            <PasswordChangeForm />
          </td>
        ) : (
          <td>
            <button
              onClick={() => this.onPasswordChangeClick(user.id)}
              className="btn btn-primary mr-2"
            >
              Change Password
            </button>
            <button
              onClick={() => this.onDeleteClick(user.id)}
              className="btn btn-danger"
            >
              Delete
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
              <th>Email</th>
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
