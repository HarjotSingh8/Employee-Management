import React, { Component } from "react";
import { withUserContext } from "./UserContext";
import { withStitch } from "./Stitch";

import Home from "./Home";

class App extends Component {
  render() {
    return (
      <div>
        App.js
        <Home />
        <button
          onClick={() => {
            console.log(this.props.user);
          }}
        >
          Check User
        </button>
      </div>
    );
  }
}

export default withUserContext(App);
