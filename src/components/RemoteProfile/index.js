import React, { Component } from "react";
import { withStitch } from "../Stitch";
import { withRouter } from "react-router-dom";
import UserProfile from "./UserProfile";
class RemoteProfile extends Component {
  state = { id: null, user: null, profile: null };
  componentDidMount() {
    if (this.props.match.params.id) {
      this.getProfile();
      this.setState({ id: this.props.match.params.id });
    }
  }
  componentDidUpdate() {
    console.log("remoteProfile");
    console.log(this.props);
    console.log(this.state);
    if (this.state.id != this.props.match.params.id) {
      this.setState({ id: this.props.match.params.id });
    }
    if (
      this.state.profile &&
      this.state.profile.userId &&
      this.state.id != this.state.profile.userId
    ) {
      this.getProfile();
    }
  }
  getProfile() {
    console.log(this.props.stitch.client.auth.currentUser.id);
    const UsersCollection = this.props.stitch.mongodb
      .db("Users")
      .collection("Users");
    const user = UsersCollection.findOne({
      userId: this.props.match.params.id,
    }).then((response) => {
      console.log(response);
      this.setState({ profile: response });
    });
    //this.watcher();
  }
  render() {
    if (this.state.profile) {
      return (
        <div>
          <UserProfile user={this.state.profile} />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default withStitch(withRouter(RemoteProfile));
