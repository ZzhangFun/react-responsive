# by Doux
## v. 0.1.2
____
stack:
    js,
    react,
    typescript

bundler:
    microbundle(*rollup*)

that's npm module
____
use command npm install
____
## **Example**
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import MediaQuery, { useMediaQuery } from "../src/react-responsive";




export const App = () => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  return (
    <div>
      <h1>Device Test!</h1>

      {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
      {isBigScreen && <p>You  have a huge screen</p>}
      {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
      <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
      {isRetina && <p>You are retina</p>}

      <MediaQuery minWidth={1224} maxHeight={2000}>
        <p>You are a desktop or laptop</p>
        <MediaQuery minWidth={1824}>
          <p>You also have a huge screen</p>
        </MediaQuery>
      </MediaQuery>
      <MediaQuery minResolution="2dppx">{/* @media (-webkit-min-device-pixel-ratio: 2) */}
        {/* You can also use a function (render prop) as a child */}
        {(matches) =>
          matches ? <p>You are retina</p> : <p>You are not retina</p>
        }
      </MediaQuery>
    </div>
  );
};




const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
```