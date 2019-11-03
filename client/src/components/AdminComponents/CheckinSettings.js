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
  onLocationFormChange = e => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  };

  //After server side code is implemented, this method will make a POST request to our express endpoint
  addLocation = e => {
    e.preventDefault();
    console.log(this.state.typedLocation);

    const { locationsData } = this.state;
    //generate dummy id
    const newLocation = {
      id: locationsData.length,
      name: this.state.typedLocation
    };
    console.log(newLocation);

    locationsData.push(newLocation);
    this.setState({ locationsData: locationsData });
  };
  componentDidMount() {
    this.setState({ locationsData: LOCATIONS_DATA });
  }
  render() {
    const locationsData = this.state.locationsData.map(location => (
      <tr key={location.id}>
        <td>{location.name}</td>

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
          <div className="col-md-4">
            <form className="form-inline" onSubmit={this.addLocation}>
              <div className="row">
                <div className="form-group col-sm-6 mb-12">
                  <label htmlFor="inputLocation" className="sr-only">
                    Location
                  </label>
                  <input
                    type="test"
                    className="form-control"
                    id="inputLocation"
                    placeholder="Enter Location"
                    name="typedLocation"
                    value={this.state.typedLocation}
                    onChange={this.onLocationFormChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <button type="submit" className="btn btn-primary mb-2 mt-2">
                    Add Location
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Location</th>

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
