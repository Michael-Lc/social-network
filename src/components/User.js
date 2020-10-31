import React from "react";
import "./styles/User.css";

function User() {
  return (
    <div className="container">
      <div className="details">
        <div className="profile-picture">Profile Picture</div>
        <div>Name</div>
        <div>Description</div>
      </div>
      <div>Posts</div>
    </div>
  );
}

export default User;
