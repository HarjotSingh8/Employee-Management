import React from "react";

const UserContext = React.createContext(null);

export const withUserContext = (Component) => (props) => (
  <UserContext.Consumer>
    {(user) => <Component {...props} user={user} />}
  </UserContext.Consumer>
);

export default UserContext;
