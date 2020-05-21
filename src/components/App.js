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
  state = { temp: 0 };
  updateUserData = async () => {
    console.log(this.props.stitch);
    if (this.props.stitch.client.auth.currentUser) {
      console.log("refreshing user data on page refresh");
      let res = await this.props.stitch.client.auth.refreshCustomData();
      console.log(this.props.stitch.client.auth.currentUser);
      this.props.user.updateUser(this.props.stitch.client.auth.currentUser);
      console.log(this.props.user);
    } else {
      console.log("user not logged in");
    }
  };
  componentDidMount() {
    this.updateUserData();
    this.props.user.setUpdater(this.updated);
  }
  updated = () => {
    console.log("changing app.js state");
    //console.log(this.props.user);
    this.setState({ temp: this.state.temp + 1 });
  };

  render() {
    return (
      <Router basename="/">
        <div>
          <button
            onClick={() => {
              this.setState({ temp: !this.state.temp });
            }}
          >
            toggle state
          </button>
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
