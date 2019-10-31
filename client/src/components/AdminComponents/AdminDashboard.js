import React, { Component } from "react";
import "./Admin.css";
import AdminStatistics from "./AdminStatistics";
import Options from "./Options";

export default class AdminDashboard extends Component {
  render() {
    return (
      <div className="text-center admin-dashboard">
        <h1 className="pt-5">
          Welcome <strong>Admin</strong>
        </h1>
        <AdminStatistics />
        <Options />
      </div>
    );
  }
}
