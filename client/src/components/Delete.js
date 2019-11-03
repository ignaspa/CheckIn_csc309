import React, { Component } from "react";
import "../css/App.css";

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
export default class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: [],
            loading: false

        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    // const selectedUsers = this.state.usersData.map(user => (
    //     this.state.query
    // )
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

            </div>
        );
    }

    handleOnChange = (event) => {
        console.log("I am changing")
        console.log(event.target.value)
        this.setState({results: []});
        for(let i = 0; i < USER_DATA.length; i++){
            if(USER_DATA[i].name.includes(event.target.value)){
                this.setState({results: results.push(USER_DATA[i])});
            }
        }
    }

}