import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withUserContext } from "./UserContext";
import { withStitch } from "./Stitch";

//import User, { UserContext } from "./UserContext";
//import StitchClass, { StitchContext } from "./Stitch";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ConfirmEmail from "./ConfirmEmail";
import ResetPassword from "./ResetPassword";
import Navbar from "./Navbar";
import FirstLoginData from "./FirstLoginData";
import CommuncationsPage from "./Communications";

class App extends Component {
  updateUserData = async () => {
    console.log(this.props.stitch);
    if (this.props.stitch.client.auth.currentUser) {
      console.log("refreshing user data on page refresh");
      let res = await this.props.stitch.client.auth.refreshCustomData();
      console.log(this.props.stitch.client.auth.currentUser);
      this.props.user.updateUser(this.props.stitch.client.auth.currentUser);
    } else {
      console.log("user not logged in");
    }
  };
  componentDidMount() {
    //this.props.stitch.client;
    this.updateUserData();
  }
  render() {
    return (
      <Router basename="/">
        <div>
          <Navbar />
          <button
            onClick={async () => {
              //let res = await this.props.stitch.client.auth.refreshCustomData();
              console.log(this.props.stitch.client.auth.currentUser);
            }}
          >
            console.log userdata in app.js
          </button>
          <Switch>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/SignIn">
              <SignIn />
            </Route>
            <Route path="/FirstLoginData">
              <FirstLoginData />
            </Route>
            <Route path="/Communications">
              <CommuncationsPage />
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

export default withStitch(withUserContext(App));
//export default App;
