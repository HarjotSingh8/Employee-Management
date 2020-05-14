import React from "react";

const StitchContext = React.createContext(null);

export const withStitch = (Component) => (props) => (
  <StitchContext.Consumer>
    {(stitch) => <Component {...props} stitch={stitch} />}
  </StitchContext.Consumer>
);

export default StitchContext;
