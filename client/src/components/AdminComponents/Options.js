import React, { Component } from "react";
import UsersTable from "./UsersTable";
import CheckinSettings from "./CheckinSettings";
import ProfileIcon from "./adminAssets/icons8-profile.png";
import AnswerIcon from "./adminAssets/icons8-answer.png";
import { Link } from "react-scroll";

export default class Options extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mb-5">
            <div
              className="card bg-white mb-3 text-center w-75"
              id="card-hover"
              style={{
                boxShadow: "12px 15px 20px 0px rgba(46,61,73,0.15)",
                borderRadius: "40px"
              }}
            >
              <div className="text-center mt-3">
                <img
                  className="card-img-top"
                  src={ProfileIcon}
                  style={{ height: "102px", width: "102px" }}
                  alt=""
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Manage Users</h5>
                <Link
                  className="stretched-link"
                  to="users-table"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={900}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center mb-5">
            <div
              className="card bg-white mb-3 text-center w-75"
              id="card-hover"
              style={{
                boxShadow: "12px 15px 20px 0px rgba(46,61,73,0.15)",
                borderRadius: "40px"
              }}
            >
              <div className="text-center mt-3">
                <img
                  className="card-img-top"
                  src={AnswerIcon}
                  style={{ height: "102px", width: "102px" }}
                  alt=""
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Setup CheckIns</h5>
                <Link
                  className="stretched-link"
                  to="checkin-settings"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={900}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <UsersTable />
          <hr />
          <CheckinSettings />
        </div>
      </div>
    );
  }
}
