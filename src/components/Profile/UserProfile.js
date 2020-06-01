/*import React, { Component } from "react";
import { withUserContext, UserContext } from "./UserContext";
import { withStitch } from "./Stitch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStitch } from "../Stitch";
class UserProfile extends Component {
  state = {
    selectedTab: "Overview",
    editDescription: false,
    searchUser: "",
    searchEmployer: "",
    otherUsers: null,
  };
  check = (a, b) => {
    a = a.toLowerCase();
    console.log(a);
    b = b.toLowerCase();
    console.log(b);
    if (b.includes(a)) return true;
    else return false;
  };
  Description = () => {
    if (this.props.user.Description) {
      return <div className="col-12">{this.props.user.Description}</div>;
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
  showSearchedEmployees = () => {
    if (this.state.searchEmployer != "" && this.state.Organisations == null) {
      this.fetchUsers();
    }
    if (this.state.Organisations && this.state.searchEmployer != "") {
      return (
        <div className="col-12 ml-0 p-0">
          {Object.keys(this.state.Organisations).map((orgKey) => {
            if (
              this.check(
                this.state.searchEmployer,
                this.state.Organisations[orgKey].name
              )
            )
              return (
                <Link className="col-12 ml-0 btn btn-light border" key={orgKey}>
                  {this.state.Organisations[orgKey].name}
                </Link>
              );
          })}
        </div>
      );
    } else return <div></div>;
  };
  Employer = () => {
    if (this.props.user.Employer && this.props.user.Employer != "") {
      return <div className="col-12">{this.props.user.Employer}</div>;
    } else {
      return (
        <div className="col-12 p-0">
          <input
            className="col-12 form-control shadow"
            label="Employer"
            config={{ type: "Employer" }}
            placeholder="Search your Employer"
            style={{ height: "24px" }}
            onChange={(event) =>
              this.setState({ searchEmployer: event.target.value })
            }
          />
          {this.showSearchedEmployees()}
        </div>
      );
    }
  };
  Overview = () => {
    return (
      <div className="col-12 row">
        <div className="col-3 font-weight-bold pr-2">Employer:</div>
        <div className="col-9">{this.Employer()}</div>
        <div className="col-3 font-weight-bold pr-2">About:</div>
        <div className="col-9">{this.Description()}</div>
        <div className="col-3 font-weight-bold pr-2">Email:</div>
        <div className="col-9">
          <a href={this.props.user.email} className="col-12 pl-0">
            {this.props.user.email}
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
  showFriends = () => {
    return (
      <div className="col-12">
        {Object.keys(this.props.user.friends).map((friendKey) => (
          <div className="col-12">{this.props.user.friends[friendKey]}</div>
        ))}
      </div>
    );
  };
  fetchUsers = () => {
    if (this.state.Users == null)
      this.props.stitch.client
        .callFunction("fetchUsersforSearch", [])
        .then((response) => {
          console.log(response);
          this.setState({
            Users: response.Users,
            Organisations: response.Organisations,
          });
        });
  };
  SearchedFriends = () => {
    if (this.state.otherUsers == null) {
      this.fetchUsers();
    }
    if (this.state.searchUser != "" && this.state.otherUsers != null)
      return <div>Results here</div>;
    else
      return <div className="col-12 text-muted">Search to find more users</div>;
  };
  SearchFriendsBar = () => {
    return (
      <div>
        <input
          className="col-12 form-control shadow"
          label="Friends"
          config={{ type: "Friends" }}
          placeholder="Search a Friend"
          onChange={(event) =>
            this.setState({ searchUser: event.target.value })
          }
        />
        {this.SearchedFriends()}
        <div className="col-12"></div>
        {this.showFriends()}
      </div>
    );
  };
  Friends = () => {
    return <div className="col-12">{this.SearchFriendsBar()}</div>;
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
    if (this.state.selectedTab == "Friends") return this.Friends();
    if (this.state.selectedTab == "Teams") return this.Teams();
    if (this.state.selectedTab == "Settings") return this.Settings();
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
                this.state.selectedTab == "Friends"
                  ? "col-12 btn btn btn-light text-primary"
                  : "col-12 btn btn-light text-secondary"
              }
              onClick={() => this.setState({ selectedTab: "Friends" })}
            >
              Friends
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

export default withStitch(UserProfile);

/*
import "./Profile.css";
class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  static contextType = UserContext;

  render() {
    const { updateUser } = this.context;

    const user = this.props.stitch.client.auth.currentUser.customData;

    return (
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                  alt=""
                />
                <img
                  src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                  alt="user profile here"
                ></img>
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input className="btn btn-dark" type="file" name="file" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h6>{user.userName ? user.userName : "UserName"}</h6>
                <p className="proile-rating">
                  RANKINGS : <span>8/10</span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="">Website Link</a>
                <br />
                <a href="">Bootsnipp Profile</a>
                <br />
                <a href="">Bootply Profile</a>
                <p>SKILLS</p>
                <a href="">Web Designer</a>
                <br />
                <a href="">Web Developer</a>
                <br />
                <a href="">WordPress</a>
                <br />
                <a href="">WooCommerce</a>
                <br />
                <a href="">PHP, .Net</a>
                <br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.userId}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.companyName}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company EMS iD</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.ems_id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>123 456 7890</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>Web Developer and Designer</p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Your Bio</label>
                      <br />
                      <p>Your detail description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default withStitch(withUserContext(Profile));
*/
