import React from "react";
import { MediaQuery, useMediaQuery } from "./react-responsive";

const App = () => {
  return (
    <div>
      <h1>Device Test!</h1>
      <MediaQuery minWidth={1224} maxHeight={2000}>
        <p>You are a desktop or laptop</p>
        <MediaQuery minWidth={1824}>
          <p>You also have a huge screen</p>
        </MediaQuery>
      </MediaQuery>
      <MediaQuery minResolution="2dppx">
        {" "}
        {/* @media (-webkit-min-device-pixel-ratio: 2) */}
        {/* You can also use a function (render prop) as a child */}
        {(matches) =>
          matches ? <p>You are retina</p> : <p>You are not retina</p>
        }
      </MediaQuery>
    </div>
  );
};

export default App;
