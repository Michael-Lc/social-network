import React from "react";

import Navbar from "../components/Navbar";

export default function withNavbar(Component) {
  return (props) => {
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <Navbar />
        {/* <br /> */}
        <Component />
      </div>
    );
  };
}
