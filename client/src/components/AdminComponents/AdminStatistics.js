import React, { Component } from "react";
import { Star, User, MapPin, CheckSquare } from "react-feather";

export default class AdminStatistics extends Component {
  render() {
    return (
      <div className=" mt-5 container">
        <div className="row">
          <div className="col-md-3">
            <div className="card flex-fill text-center statistic-card">
              <div className="card-body py-4 d-flex justify-content-center">
                <div className="media">
                  <div className="d-inline-block mt-2 mr-3">
                    <Star className="feather-lg text-warning" />
                  </div>
                  <div className="media-body">
                    <h3 className="mb-2">10</h3>
                    <div className="mb-0">
                      Active Users <br />
                      last 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card flex-fill text-center statistic-card">
              <div className="card-body py-4 d-flex justify-content-center">
                <div className="media">
                  <div className="d-inline-block mt-2 mr-3">
                    <User className="feather-lg text-primary" />
                  </div>
                  <div className="media-body">
                    <h3 className="mb-2">11</h3>
                    <div className="mb-0">
                      Total Registered <br /> Users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card flex-fill text-center statistic-card">
              <div className="card-body py-4 d-flex justify-content-center">
                <div className="media">
                  <div className="d-inline-block mt-2 mr-3">
                    <MapPin className="feather-lg text-success" />
                  </div>
                  <div className="media-body">
                    <h3 className="mb-2">8920</h3>
                    <div className="mb-0">
                      Total CheckIns <br /> to date
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card flex-fill text-center statistic-card">
              <div className="card-body py-4 d-flex justify-content-center">
                <div className="media">
                  <div className="d-inline-block mt-2 mr-3">
                    <CheckSquare className="feather-lg text-danger" />
                  </div>
                  <div className="media-body">
                    <h3 className="mb-2">43</h3>
                    <div className="mb-0">
                      CheckIns <br /> last 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
