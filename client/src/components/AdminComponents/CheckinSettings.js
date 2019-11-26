import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";

const checkinS_DATA = [
  {
    id: "0",
    name: "BA2200"
  },
  {
    id: "1",
    name: "CSSU"
  },
  {
    id: "2",
    name: "VIC2200"
  },
  {
    id: "3",
    name: "Robarts Cafeteria"
  }
];

export default class CheckinSettings extends Component {
  constructor() {
    super();
    this.state = {
      checkinsData: [],
      typedcheckin: ""
    };
  }

  componentDidMount() {
    axios
      .get("/api/checkins/all")
      .then(res => {
        const checkinsData = res.data;
        this.setState({ checkinsData: checkinsData });
        console.log(checkinsData);
      })
      .catch(error => {
        console.log(error);
      });
  }
  //currently removes from state but later this will send a DELETE request to our express server
  onDeleteClick = checkinId => {
    axios
      .delete(`/api/checkins/`, checkinId)
      .then(res => {
        //reload page on success
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const checkinsData = this.state.checkinsData.map(checkin => (
      <tr key={checkin._id}>
        <td>{checkin.userid}</td>
        <td>{checkin.action}</td>
        <td>{checkin.location}</td>

        <td>{checkin.message}</td>
        <td>
          <Moment fparse="YYYY-MM-DD HH:mm">{checkin.time}</Moment>
        </td>

        <td>
          <button
            onClick={() => this.onDeleteClick(checkin._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container mt-5" id="checkin-settings">
        <h2 className="mb-5 mt-5">Checkins</h2>
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Doing</th>

                  <th>Location</th>
                  <th>Message</th>
                  <th>Time</th>

                  <th>Actions</th>
                </tr>
                {checkinsData}
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
