import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserPosts } from "../actions/postActions";
import { fetchUserDetails } from "../actions/userActions";

import withNavbar from "../hoc/withNavbar";
import Posts from "./Posts";

import styles from "./styles/User.module.css";

function User(props) {
  const { posts, userDetails, fetchUserPosts, fetchUserDetails, match } = props;

  useEffect(() => {
    const id = match.params.id;
    fetchUserPosts(id);
    fetchUserDetails(id);
  }, [fetchUserPosts, fetchUserDetails, match]);

  console.log(userDetails);

  return (
    <div className="container">
      <div className={styles.details}>
        <img
          src={userDetails.profilePicture}
          className={styles.profilePicture}
          alt="Profile"
        />
        <div className={styles.userName}>{userDetails.username}</div>
        <div className={styles.description}>{userDetails.description}</div>
      </div>
      <Posts data={posts} />
    </div>
  );
}

User.propTypes = {
  posts: PropTypes.array.isRequired,
  userDetails: PropTypes.object.isRequired,
  fetchUserPosts: PropTypes.func.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.userPosts,
  userDetails: state.user.userDetails,
});

const mapDispatchToProps = {
  fetchUserPosts,
  fetchUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavbar(User));
