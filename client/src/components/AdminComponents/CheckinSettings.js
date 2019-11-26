import React, { Component } from "react";

const LOCATIONS_DATA = [
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
      locationsData: [],
      typedLocation: ""
    };
  }

  componentDidMount() {
    this.setState({ locationsData: LOCATIONS_DATA });
  }
  //currently removes from state but later this will send a DELETE request to our express server
  onDeleteClick = locationId => {
    const { locationsData } = this.state;
    for (let i = 0; i < locationsData.length; i++) {
      if (locationsData[i].id === locationId) {
        const index = i;
        locationsData.splice(index, 1);
        this.setState({ locationsData: locationsData });
        break;
      }
    }
  };

  render() {
    const locationsData = this.state.locationsData.map(location => (
      <tr key={location.id}>
        <td></td>
        <td></td>
        <td>{location.name}</td>

        <td></td>
        <td></td>

        <td>
          <button
            onClick={() => this.onDeleteClick(location.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container mt-5" id="checkin-settings">
        <h2 className="mb-5 mt-5">Default CheckIn Locations</h2>
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
                {locationsData}
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
