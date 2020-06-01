import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStitch } from "../Stitch";
class CompanyProfile extends Component {
  state = { selectedTab: "Overview", editDescription: false };
  Description = () => {
    if (this.props.user.Description) {
    } else if (this.state.editDescription) {
      return (
        <div>
          <textarea className="col-12 form-control"></textarea>
          <button
            className="btn btn-dark py-0"
            style={{ height: "24px", fontSize: "10px" }}
          >
            Save changes...
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="btn btn-dark py-0"
          style={{ height: "24px", fontSize: "10px" }}
          onClick={() => {
            this.setState({ editDescription: true });
          }}
        >
          Add Description...
        </button>
      );
    }
  };
  Overview = () => {
    return (
      <div className="col-12 row">
        <div className="col-3 font-weight-bold pr-2">About:</div>
        <div className="col-9">{this.Description()}</div>
        <div className="col-3 font-weight-bold pr-2">Website:</div>
        <div className="col-9">
          <a href={this.props.user.Website} className="col-12 pl-0">
            {this.props.user.Website}
          </a>
          <button
            className="btn btn-secondary py-0 disabled"
            style={{ height: "24px", fontSize: "10px" }}
          >
            edit
          </button>
        </div>
        <div className="col-3 font-weight-bold pr-2">Location:</div>
        <div className="col-9">
          <div className="col-12 pl-0">
            {this.props.user.Street},
            <button
              className="btn btn-secondary py-0 disabled"
              style={{ height: "24px", fontSize: "10px" }}
            >
              edit
            </button>
          </div>
          <div className="col-12 pl-0">{this.props.user.City},</div>
          <div className="col-12 pl-0 ">{this.props.user.State},</div>
          <div className="col-12 pl-0">{this.props.user.Country}</div>
        </div>
      </div>
    );
  };
  Employees = () => {
    return <div></div>;
  };
  showTeams = () => {
    console.log(this.props.user);
    if (Object.keys(this.props.user.teams).length == 0)
      return <div>No Teams (Add a new team to start)</div>;
    else
      return (
        <div className="col-12">
          {Object.keys(this.props.user.teams).map((teamId) => (
            <Link
              to="/team/"
              className="btn btn-secondary col-12 my-1 mx-0"
              key={teamId}
            >
              {this.props.user.teams[teamId]}-
              {teamId.substring(teamId.length - 4, teamId.length)}
            </Link>
          ))}
        </div>
      );
  };
  addTeam = async () => {
    var name = document.getElementById("newTeamName").value;
    console.log(name);
    if (name.trim() === "") return;
    await this.props.stitch.client
      .callFunction("CreateNewTeam", [{ name: name }])
      .then((result) => {
        console.log("succesful");
        console.log(result);
      });
  };
  Teams = () => {
    return (
      <div className="col-12 row">
        <div className="col-12 btn-group mb-3">
          <input
            id="newTeamName"
            className="form-control col-md-8 col-7"
            placeholder="Team Name"
            type="text"
          ></input>
          <button
            className="btn btn-dark col-md-4 col-5"
            onClick={() => this.addTeam()}
          >
            Add Team
          </button>
        </div>
        <div className="col-3 font-weight-bold pr-2">Teams:</div>
        <div className="col-9">
          <div className="col-12">{this.showTeams()}</div>
        </div>
      </div>
    );
  };
  Settings = () => {
    return <div>Settings</div>;
  };
  panelSwitcher = () => {
    if (this.state.selectedTab == "Overview") return this.Overview();
    if (this.state.selectedTab == "Teams") return this.Teams();
    if (this.state.selectedTab == "Settings") return this.Settings();
    if (this.state.selectedTab == "Employees") return this.Employees();
  };
  mainPanel = () => {
    return (
      <div className="row pt-1 pb-5">
        <div className="col-12 h3 font-weight-light">
          {this.state.selectedTab}
        </div>
        {this.panelSwitcher()}
      </div>
    );
  };
  render() {
    return (
      <main className="d-flex mt-md-5 justify-content-center">
        <div className="row col-sm-12 col-md-10 col-lg-8 justify-content-center bg-light shadow px-0">
          <div className="col-12 text-center border-bottom display-4 py-5">
            {this.props.user.name}
          </div>
          <div className="col-4 border-right pb-5">
            <button
              className={
                this.state.selectedTab == "Overview"
                  ? "col-12 btn btn btn-light text-primary"
                  : "col-12 btn btn-light text-secondary"
              }
              onClick={() => this.setState({ selectedTab: "Overview" })}
            >
              Overview
            </button>
            <button
              className={
                this.state.selectedTab == "Teams"
                  ? "col-12 btn btn btn-light text-primary"
                  : "col-12 btn btn-light text-secondary"
              }
              onClick={() => this.setState({ selectedTab: "Teams" })}
            >
              Teams
            </button>
            <button
              className={
                this.state.selectedTab == "Employees"
                  ? "col-12 btn btn btn-light text-primary"
                  : "col-12 btn btn-light text-secondary"
              }
              onClick={() => this.setState({ selectedTab: "Employees" })}
            >
              Employees
            </button>
            <button
              className={
                this.state.selectedTab == "Settings"
                  ? "col-12 btn btn btn-light text-primary"
                  : "col-12 btn btn-light text-secondary"
              }
              onClick={() => this.setState({ selectedTab: "Settings" })}
            >
              Settings
            </button>
          </div>
          <div className="col-8">{this.mainPanel()}</div>
        </div>
      </main>
    );
  }
}

export default withStitch(CompanyProfile);
