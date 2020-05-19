import React, { Component } from "react";
import Navbar from "../Navbar";
import { withUserContext } from "../UserContext";
import NavNonAuth from "./NavNonAuth";
import NavAuth from "./NavAuth";
import { withStitch } from "../Stitch";
class NavbarAuthentication extends Component {
  state = { user: null };
  /*componentDidUpdate(prevProps) {
    console.log("prev props");
    console.log(prevProps);
    console.log("current props");
    console.log(this.props);
    if (this.state.user != this.props.stitch.client) {
      console.log("updating user");
      this.setState({ user: this.props.stitch.client });
    }
  }*/
  render() {
    // if (this.state.user != this.props.stitch.client) {
    //   this.setState({ user: this.props.stitch.client });
    // }
    console.log(this.props.stitch.client);
    //if (this.state.user == null || this.state.user == false) {
    if (this.props.stitch.client.auth.activeUserAuthInfo.userId) {
      return (
        <NavAuth
          email={
            this.props.stitch.client.auth.activeUserAuthInfo.userProfile.data
              .email
          }
        />
      );
    } else {
      return <NavNonAuth />;
    }
  }
}

export default withStitch(NavbarAuthentication);
