import React, { Component } from "react";
import CompanyProfile from "./CompanyProfile";
import { withStitch } from "../Stitch";
import UserProfile from "./UserProfile";
class Profile extends Component {
  state = { user: null };
  /*componentDidUpdate() {
    if (this.state.user != this.props.user) {
      this.setState({ user: this.props.user });
    }
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }*/
  render() {
    if (this.props.stitch.client.auth.currentUser.customData.name) {
      //console.log(this.props.user);
      if (
        this.props.stitch.client.auth.currentUser.customData.accountType ==
        "User"
      )
        return (
          <UserProfile
            user={this.props.stitch.client.auth.currentUser.customData}
          />
        );
      else if (
        this.props.stitch.client.auth.currentUser.customData.accountType ==
        "Organisation"
      ) {
        return (
          <CompanyProfile
            user={this.props.stitch.client.auth.currentUser.customData}
          />
        );
      } else
        return (
          <main className="d-flex m-5 justify-content-center">
            <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
              <div className="col-12 text-center display-4">Loading</div>
            </div>
          </main>
        );
    } else {
      return (
        <main className="d-flex m-5 justify-content-center">
          <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
            <div className="col-12 text-center display-4">Loading</div>
          </div>
        </main>
      );
    }
  }
}
export default withStitch(Profile);
