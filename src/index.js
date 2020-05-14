import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import User, { UserContext } from "./components/UserContext";
import StitchClass, { StitchContext } from "./components/Stitch";

ReactDOM.render(
  <StitchContext.Provider value={new StitchClass()}>
    <UserContext.Provider value={new User()}>
      <App />
    </UserContext.Provider>
  </StitchContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
