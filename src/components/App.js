import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withUserContext } from "./UserContext";
import { withStitch } from "./Stitch";

import Home from "./Home";
import SignUp from "./SignUp";
import ConfirmEmail from "./ConfirmEmail";
import ResetPassword from "./ResetPassword";

class App extends Component {
  render() {
    return (
      <Router basename="/">
        <div>
          <Link to="/SignUp">SignUp</Link>
          <button
            onClick={() => {
              console.log(this.props.user);
            }}
          >
            Check User
          </button>

          <Switch>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/ConfirmMail" component={ConfirmEmail} />
            <Route path="/ResetPassword">
              <ResetPassword />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withUserContext(App);
