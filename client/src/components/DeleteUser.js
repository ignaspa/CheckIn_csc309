import React, { Component } from "react";
import "../css/App.css";

const USER_DATA = [
    {
        id: "1",
        name: "Abdullah Amin",
        email: "abdamin30@gmail.com",
        totalCheckins: "20",
        joinDate: "2019-01-10",
        showPasswordChangeForm: false
    },
    {
        id: "2",
        name: "Marco Angeli",
        email: "marco@gmail.com",
        totalCheckins: "47",
        joinDate: "2017-02-20",
        showPasswordChangeForm: false
    },
    {
        id: "3",
        name: "Ignas Panero Armoska",
        email: "ignas@gmail.com",
        totalCheckins: "250",
        joinDate: "2018-03-15",
        showPasswordChangeForm: false
    },
    {
        id: "4",
        name: "Sonia Zaldana",
        email: "sonia@gmail.com",
        totalCheckins: "198",
        joinDate: "2016-06-12",
        showPasswordChangeForm: false
    },
    {
        id: "5",
        name: "John Doe",
        email: "john@gmail.com",
        totalCheckins: "150",
        joinDate: "2018-01-11",
        showPasswordChangeForm: false
    },
    {
        id: "6",
        name: "Jane Doe",
        email: "jane@gmail.com",
        totalCheckins: "355",
        joinDate: "2019-03-15",
        showPasswordChangeForm: false
    },
    {
        id: "7",
        name: "Jack Ma",
        email: "Jackma@mogul.com",
        totalCheckins: "550",
        joinDate: "2017-02-22",
        showPasswordChangeForm: false
    },
    {
        id: "8",
        name: "Mark Zuckerberg",
        email: "markzuck@fb.com",
        totalCheckins: "144",
        joinDate: "2018-03-15",
        showPasswordChangeForm: false
    },
    {
        id: "9",
        name: "Jeff Bezos",
        email: "jeffbezos@gmail.com",
        totalCheckins: "10",
        joinDate: "2019-07-10",
        showPasswordChangeForm: false
    },
    {
        id: "10",
        name: "Steve Jobs",
        email: "stevejobs@apple.com",
        totalCheckins: "350",
        joinDate: "2014-02-07",
        showPasswordChangeForm: false
    },
    {
        id: "11",
        name: "Elon Musk",
        email: "elonmusk@tesla.com",
        totalCheckins: "122",
        joinDate: "2018-08-25",
        showPasswordChangeForm: false
    }
];
export default class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            deleted: []
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
    }
    
    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h3>Delete Users</h3>
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
                <div className="pagetitle text-danger">
                    <h5>Deleted Users</h5>
                </div>
                <DeletedTable deleted={this.state.deleted} />
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
        for (let i = 0; i < USER_DATA.length; i++) {
            if (USER_DATA[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
                newResults.push(USER_DATA[i]);
            }
        }
        this.setState({ results: newResults });
        console.log(this.state.results);
    }

    changeUserStatus = (userID) => {
        for (let i = 0; i < USER_DATA.length; i++) {
            if (USER_DATA[i].id === userID) {
                console.log(USER_DATA[i].id);
                console.log(userID);
                let item = USER_DATA.splice(i, 1);
                console.log(item)
                this.setState({deleted: this.state.deleted.push(item)});
            }
        }
        console.log(this.state.deleted);
        
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
                    className="btn btn-danger">
                    Delete User
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

function DeletedTable(props) {
    console.log(props.deleted);
    const matchedUsers = props.deleted.map(user => (
        <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.joinDate}</td>
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
                        
                    </tr>
                </thead>
                <tbody>
                {matchedUsers}
                </tbody>
            </table>
        </div>
    );
}