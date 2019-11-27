import React, { Component } from "react";
import { Star, User, MapPin, CheckSquare } from "react-feather";
import axios from "axios";

export default class AdminStatistics extends Component {
  constructor() {
    super();
    this.state = {
      totalUsers: 0,
      totalCheckins: 0,
      newUsersToday: 0,
      newCheckinsToday: 0
    };
  }

  componentDidMount() {
    //get totol stats
    axios
      .get("/api/statistics/total")
      .then(res => {
        const totalStatsData = res.data;
        this.setState({
          totalUsers: totalStatsData.totalUsers,
          totalCheckins: totalStatsData.totalCheckins
        });
      })
      .catch(err => {
        console.log(err);
      });

    //get today's stats
    axios
      .get("/api/statistics/today")
      .then(res => {
        const newTodayStatsData = res.data;
        this.setState({
          newUsersToday: newTodayStatsData.newUsersToday,
          newCheckinsToday: newTodayStatsData.newCheckinsToday
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
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
                    <h3 className="mb-2">{this.state.newUsersToday} </h3>
                    <div className="mb-0">
                      New Signups <br />
                      Today
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
                    <h3 className="mb-2">{this.state.totalUsers}</h3>
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
                    <h3 className="mb-2">{this.state.totalCheckins}</h3>
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
                    <h3 className="mb-2">{this.state.newCheckinsToday} </h3>
                    <div className="mb-0">
                      New CheckIns <br /> today
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
