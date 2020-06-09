import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStitch } from "../Stitch";
class UserProfile extends Component {
  state = {
    user: null,
    selectedTab: "Overview",
  };
  componentDidMount() {
    if (this.state.user != this.props.user)
      this.setState({ user: this.props.user });
  }
  componentDidUpdate() {
    if (this.state.user.userId != this.props.user.userId)
      this.setState({ user: this.props.user, selectedTab: "Overview" });
    else if (this.state.user != this.props.user) {
      this.setState({ user: this.props.user });
    }
  }
  Description = () => {
    if (this.props.user.Description) {
      return <div className="col-12">{this.props.user.Description}</div>;
    } else {
      return <div className="muted">No description available</div>;
    }
  };

  Employer = () => {
    if (this.props.user.Employer && this.props.user.Employer != "") {
      return <div className="col-12">{this.props.user.Employer}</div>;
    } else {
      return (
        <div className="col-12 muted p-0">
          currently not joined with an organisation
        </div>
      );
    }
  };
  Overview = () => {
    return (
      <div className="col-12 row overflow-auto">
        <div className="col-3 font-weight-bold pr-2">Employer:</div>
        <div className="col-9">{this.Employer()}</div>
        <div className="col-3 font-weight-bold pr-2">About:</div>
        <div className="col-9">{this.Description()}</div>
        <div className="col-3 font-weight-bold pr-2">Email:</div>
        <div className="col-9">
          <a href={this.props.user.email} className="col-12 pl-0">
            {this.props.user.email}
          </a>
        </div>
        <div className="col-3 font-weight-bold pr-2">Location:</div>
        <div className="col-9">
          <div className="col-12 pl-0">{this.props.user.Street},</div>
          <div className="col-12 pl-0">{this.props.user.City},</div>
          <div className="col-12 pl-0 ">{this.props.user.State},</div>
          <div className="col-12 pl-0">{this.props.user.Country}</div>
        </div>
      </div>
    );
  };
  showFriends = () => {
    if (this.props.user.friends)
      return (
        <div className="col-12">
          {this.props.user.friends.map((friend, id) => (
            <div className="d-flex border-bottom">
              <div className="flex-shrink-1">{friend.name}</div>
              <div className="flex-grow-1"></div>
              <Link
                to={"/remoteProfile/" + friend.uid}
                className="btn btn-dark d-inline-flex mr-1"
              >
                Go To Profile
              </Link>
            </div>
          ))}
        </div>
      );
  };

  addFriend = (id, name) => {
    this.props.stitch.client
      .callFunction("addFriend", [{ id: id, name: name }])
      .then((response) => {
        console.log(response);
      });
  };
  SearchedFriends = () => {
    if (this.state.otherUsers == null) {
      this.fetchUsers();
    }
    if (this.state.searchUser != "" && this.state.Users != null)
      return (
        <div className="col-12">
          {Object.keys(this.state.Users).map((userId) => {
            if (
              this.checkForSearch(
                this.state.searchUser,
                this.state.Users[userId].name
              )
            )
              return (
                <div className="col-12 px-0 btn-group">
                  <Link
                    to="/Profile/h"
                    className="col-8 px-0 shadow btn btn-light"
                  >
                    {this.state.Users[userId].name}
                  </Link>
                  {this.props.user.friends[this.state.Users[userId].userId] ? (
                    <>
                      {this.props.user.friends[this.state.Users[userId].userId]
                        .confirmed ? (
                        <Link
                          className="col-4 flex-shrink-1 btn btn-dark"
                          to={"message/" + this.props.userId}
                        >
                          Message
                        </Link>
                      ) : (
                        <button className="col-4 flex-shrink-1 btn btn-dark disabled">
                          Requested
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <Link
                        to={"/remoteProfile/" + this.state.Users[userId].userId}
                      >
                        Show Profile
                      </Link>
                      <button
                        className="col-4 flex-shrink-1 btn btn-dark"
                        onClick={() => {
                          this.addFriend(
                            this.state.Users[userId].userId,
                            this.state.Users[userId].name
                          );
                        }}
                      >
                        Add Friend
                      </button>
                    </>
                  )}
                </div>
              );
          })}
        </div>
      );
    else return <div className="col-12 text-muted">No Friends</div>;
  };

  panelSwitcher = () => {
    if (this.state.selectedTab == "Overview") return this.Overview();
    if (this.state.selectedTab == "Friends") return this.showFriends();
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
    if (this.state.user)
      return (
        <div className="overflow-auto flex-grow-1">
          <main className="d-flex mt-md-5 justify-content-center">
            <div className="row col-sm-12 col-md-10 col-lg-8 justify-content-center bg-light shadow px-0">
              <div className="col-12 text-center border-bottom display-4 py-5">
                {this.state.user.name}
              </div>
              <div className="col-4 border-right pb-5">
                <button
                  className="col-12 btn btn-dark"
                  onClick={() => {
                    this.addFriend(
                      this.state.user.userId,
                      this.state.user.name
                    );
                  }}
                >
                  Add Friend
                </button>
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
              </div>
              <div className="col-8">{this.mainPanel()}</div>
            </div>
          </main>
        </div>
      );
    else return <div></div>;
  }
}

export default withStitch(UserProfile);
