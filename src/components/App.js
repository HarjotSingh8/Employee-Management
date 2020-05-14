import React, { Component } from "react";
import Home from "./Home";
import { withUserContext } from "./UserContext";
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
