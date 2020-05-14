import React, { Component } from "react";
import { withUserContext } from "./UserContext";
import { withStitch } from "./Stitch";

class Home extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <div>this is home page </div>
        <button
          onClick={() => {
            this.props.user.updateContext("Hello");
          }}
        >
          update user
        </button>
        <button
          onClick={async () => {
            let user = await this.props.stitch.logInAnonymously();

            console.log(user);
            this.props.user.updateContext(user);
            console.log(this.props);
          }}
        >
          login anonymously
        </button>
      </div>
    );
  }
}
let HomeWithUser = withUserContext(Home);
export default withStitch(HomeWithUser);
