import React, { Component, memo } from "react";
import { withStitch } from "../Stitch";

class Scrum extends Component {
  state = {
    teamsFetched: false,
    teams: null,
    myTeams: null,
    otherTeams: null,
    selectedTeam: null,
    selectedItem: null,
    teamsListener: false,
    showLeftSide: true,
    categories: ["ICE BOX", "EMERGENCY", "IN PROGRESS", "TESTING", "COMPLETE"],
    searchMembers: "",
  };
  checkForSearch = (a, b) => {
    a = a.toLowerCase();
    console.log(a);
    b = b.toLowerCase();
    console.log(b);
    if (b.includes(a)) return true;
    else return false;
  };
  componentDidUpdate() {
    console.log(this.state);
    if (this.state.teamsFetched && !this.state.teamsListener)
      this.teamsListener();
  }
  componentDidMount() {
    this.getTeams();
    this.fetchUsers();
  }
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
  getTeams = async () => {
    const TeamsCollection = this.props.stitch.mongodb
      .db("Organisations")
      .collection("Teams");
    const messages = TeamsCollection.find({
      membersArr: this.props.stitch.client.auth.currentUser.id,
    })
      .toArray()
      .then((response) => {
        console.log(response);
        var teams = {};
        var myTeams = {};
        var otherTeams = {};
        response.map((obj, key) => {
          teams[obj._id] = obj;
          if (obj.uid == this.props.stitch.client.auth.currentUser.id)
            myTeams[obj._id] = obj;
          else {
            otherTeams[obj._id] = obj;
          }
        });
        this.setState({
          myTeams: myTeams,
          otherTeams: otherTeams,
          teams: teams,
          teamsFetched: true,
        });
      });
  };

  teamsListener = async () => {
    const TeamsCollection = this.props.stitch.mongodb
      .db("Organisations")
      .collection("Teams");

    const stream = await TeamsCollection.watch({
      $or: [
        {
          "fullDocument.uid": this.props.stitch.client.auth.currentUser.id,
        },
      ],
    });
    stream.onNext((event) => {
      console.log("hello there");
      console.log(event.fullDocument);
      var teams = this.state.teams;
      teams[event.fullDocument._id] = event.fullDocument;
      if (
        event.fullDocument.uid == this.props.stitch.client.auth.currentUser.id
      ) {
        var myTeams = this.state.myTeams;
        myTeams[event.fullDocument._id] = event.fullDocument;

        this.setState({ myTeams: myTeams, teams: teams });
      } else {
        var otherTeams = this.state.otherTeams;
        otherTeams[event.fullDocument._id] = event.fullDocument;
        this.setState({ otherTeams: otherTeams, teams: teams });
      }
    });
    this.setState({ teamsListener: true });
  };
  showLeftSide = () => {
    if (this.state.myTeams || this.state.otherTeams) {
      return (
        <div className="col-12 my-2 p-0">
          <div className="col-12 h4 p-0">Teams</div>
          {this.state.myTeams ? <div className="h5">Managed By You</div> : ""}
          <div className="col-12 p-0">
            {Object.keys(this.state.myTeams).map((id) => (
              <div className="col-12 p-0 m-0">
                <button
                  className=" col-12 btn btn-success"
                  onClick={() => {
                    this.setState({ selectedTeam: id });
                  }}
                >
                  {this.state.myTeams[id].name}
                </button>
                {this.state.selectedTeam == this.state.myTeams[id]._id ? (
                  <div className="col-12 border px-1">
                    <div className="h5">Team Settings</div>
                    <div>Members</div>
                    <input
                      className="form-control col-12"
                      placeholder="add members"
                      value={this.state.searchMembers}
                      onChange={(event) => {
                        this.setState({ searchMembers: event.target.value });
                      }}
                    ></input>
                    {this.state.searchMembers != "" ? (
                      <div className="col-12">
                        {this.state.Users.map((obj, id) => {
                          if (
                            this.checkForSearch(
                              this.state.searchMembers,
                              obj.name
                            )
                          )
                            return (
                              <button
                                className="col-12 btn btn-dark btn-sm"
                                onClick={() => {
                                  var members = this.state.teams[
                                    this.state.selectedTeam
                                  ].members;

                                  var membersArr = this.state.teams[
                                    this.state.selectedTeam
                                  ].membersArr;
                                  members.push({
                                    uid: obj.userId,
                                    name: obj.name,
                                  });
                                  membersArr.push(obj.userId);
                                  this.props.stitch.client
                                    .callFunction("AddUserToTeam", [
                                      {
                                        id: this.state.selectedTeam,
                                        members: members,
                                        membersArr: membersArr,
                                      },
                                    ])
                                    .then((response) => console.log(response));
                                  this.setState({ searchMembers: "" });
                                }}
                              >
                                {obj.name}
                              </button>
                            );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.myTeams[id].members.map((obj, id) => {
                      if (
                        obj.uid == this.props.stitch.client.auth.currentUser.id
                      )
                        return (
                          <button className="btn btn-sm col-12 btn-success disabled">
                            {obj.name}
                          </button>
                        );
                      else
                        return (
                          <button className="btn btn-sm col-12 btn-dark disabled">
                            {obj.name}
                          </button>
                        );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <div className="col-12 p-0">
            {Object.keys(this.state.otherTeams).length > 0 ? (
              <div className="h5">Managed By Others</div>
            ) : (
              ""
            )}
            {Object.keys(this.state.otherTeams).map((id) => (
              <div>{this.state.otherTeams[id].name}</div>
            ))}
          </div>
        </div>
      );
    }
  };
  showRightSide = () => {
    if (this.state.teamsFetched && this.state.selectedTeam) {
      return (
        <div className="col-12 p-0">
          <div className="row text-center" style={{ fontSize: "12px" }}>
            <div className="col-2 border p-0">
              <div className="col-12 d-flex text-left p-0">
                {this.state.showLeftSide ? (
                  <button
                    className="btn btn-sm btn-primary py-0"
                    onClick={() => {
                      this.setState({ showLeftSide: false });
                    }}
                  >
                    {"<"}
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-primary py-0"
                    onClick={() => {
                      this.setState({ showLeftSide: true });
                    }}
                  >
                    {">"}
                  </button>
                )}
                <div className="flex-grow-1 text-center">CATEGORIES</div>
              </div>
              <div className="d-flex p-0 col-12">
                <input
                  id="categoryInput"
                  className="form-control flex-grow-1"
                  type="text"
                  placeholder="Add Category"
                ></input>
                <button
                  className="btn btn-sm  btn-primary"
                  onClick={() => {
                    if (document.getElementById("categoryInput").value != "")
                      this.props.stitch.client.callFunction(
                        "AddCategoryToTeam",
                        [
                          {
                            id: this.state.selectedTeam,
                            category: document.getElementById("categoryInput")
                              .value,
                          },
                        ]
                      );
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-2 border">ICE BOX</div>
            <div className="col-2 border">EMERGENCY</div>
            <div className="col-2 border">IN PROGRESS</div>
            <div className="col-2 border">TESTING</div>
            <div className="col-2 border">COMPLETE</div>
          </div>
          {this.state.teams[this.state.selectedTeam].categories.map(
            (obj, id) => (
              <div className="row border-bottom">
                <div className="row m-0 p-0 col-2 border-right">
                  <div className="flex-grow-1 px-2">{obj.name}</div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      this.props.stitch.client
                        .callFunction("addStoryToCategory", [
                          {
                            id: this.state.selectedTeam,
                            category: id,
                          },
                        ])
                        .then((result) => {
                          console.log(result);
                        });
                    }}
                  >
                    +
                  </button>
                </div>
                {this.state.categories.map((category) => (
                  <div className="col-2 border-right">
                    {Object.keys(obj.progress).map((progressId) => {
                      if (category == obj.progress[progressId].category)
                        return (
                          <btn
                            className={
                              obj.progress[progressId].assignedTo.uid ==
                              this.props.stitch.client.auth.currentUser.id
                                ? "col-12 btn btn-sm btn-success border-light"
                                : "col-12 btn btn-sm btn-dark border-light"
                            }
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() =>
                              this.setState({
                                selectedItem: {
                                  category: id,
                                  story: progressId,
                                  data: obj.progress[progressId],
                                },
                              })
                            }
                          >
                            {obj.progress[progressId].name}
                          </btn>
                        );
                    })}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      );
    } else if (this.state.teamsFetched)
      return <div className="col-12 text-center h4">Please Select a Team</div>;
    else return <div className="col-12 text-center h4">Loading</div>;
  };
  SaveChangesToStory = () => {
    this.props.stitch.client
      .callFunction("saveChangesToStory", [
        {
          id: this.state.selectedTeam,
          story: this.state.selectedItem,
        },
      ])
      .then((result) => {
        console.log(result);
      });
  };
  modal = () => {
    return (
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-11"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <input
                type="text"
                className="form-control"
                value={
                  this.state.selectedItem
                    ? this.state.selectedItem.data.name
                    : ""
                }
                placeholder="Story Name"
                onChange={(event) => {
                  var temp = this.state.selectedItem;
                  temp.data.name = event.target.value;
                  this.setState({ selectedItem: temp });
                }}
              ></input>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {this.state.selectedItem ? (
                <div className="col-12">
                  <textarea
                    className="form-control"
                    placeholder="Story Description"
                    value={this.state.selectedItem.data.description}
                    onChange={(event) => {
                      var temp = this.state.selectedItem;
                      temp.data.name = event.target.value;
                      this.setState({ selectedItem: temp });
                    }}
                  ></textarea>
                  {this.state.categories.map((obj, id) => {
                    if (obj == this.state.selectedItem.data.category)
                      return <button className="btn btn-success">{obj}</button>;
                    else
                      return (
                        <button
                          className="btn btn-dark"
                          onClick={() => {
                            var selectedItem = this.state.selectedItem;
                            selectedItem.data.category = obj;
                            this.setState({ selectedItem: selectedItem });
                          }}
                        >
                          {obj}
                        </button>
                      );
                  })}
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.state.selectedItem.data.assignedTo.uid
                        ? this.state.selectedItem.data.assignedTo.name
                        : "Assign to User"}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {this.state.myTeams[this.state.selectedTeam].members.map(
                        (obj, id) => {
                          if (
                            this.state.selectedItem.data.assignedTo.uid &&
                            this.state.selectedItem.data.assignedTo.uid ==
                              obj.uid
                          ) {
                            return (
                              <button className="col-12 btn btn-success">
                                {obj.name}
                              </button>
                            );
                          } else {
                            return (
                              <button
                                className="col-12 btn btn-dark"
                                onClick={() => {
                                  var temp = this.state.selectedItem;
                                  temp.data.assignedTo = {
                                    uid: obj.uid,
                                    name: obj.name,
                                  };
                                  this.setState({ selectedItem: temp });
                                }}
                              >
                                {obj.name}
                              </button>
                            );
                          }
                        }
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                data-target="#exampleModal"
                onClick={() => {
                  this.setState({ selectedItem: null });
                }}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  this.SaveChangesToStory();
                  this.setState({ selectedItem: null });
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="row m-5 bg-light rounded">
        {this.modal()}

        {this.state.showLeftSide ? (
          <div className="row col-12 m-0 p-0">
            <div className="col-2 border-right">{this.showLeftSide()}</div>
            <div className="col-10">{this.showRightSide()}</div>
          </div>
        ) : (
          <div className="col-12">{this.showRightSide()}</div>
        )}
      </div>
    );
  }
}

export default withStitch(Scrum);
