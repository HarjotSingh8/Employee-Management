import React, { Component } from "react";
import { withUserContext } from "./UserContext";

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
      </div>
    );
  }
}

export default withUserContext(Home);
