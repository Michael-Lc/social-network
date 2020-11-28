import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserPosts } from "../actions/postActions";
import { fetchUser } from "../actions/userActions";

import withNavbar from "../hoc/withNavbar";
import Posts from "./Posts";

import styles from "./styles/User.module.css";

function User({ posts, user, fetchUserPosts, fetchUser, match }) {
  useEffect(() => {
    const id = match.params.id;
    fetchUserPosts(id);
    fetchUser(id);
  }, [fetchUserPosts, fetchUser, match]);

  console.log(posts);

  return (
    <div className="container">
      <div className={styles.details}>
        <img
          src={user.profilePicture}
          className={styles.profilePicture}
          alt="Profile"
        />
        <div className={styles.userName}>{user.username}</div>
        <div className={styles.description}>{user.description}</div>
      </div>
      <Posts data={posts} />
    </div>
  );
}

User.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  fetchUserPosts: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.userPosts,
  user: state.user.user,
});

const mapDispatchToProps = {
  fetchUserPosts,
  fetchUser,
};

export default connect(mapStateToProps, { ...mapDispatchToProps })(
  withNavbar(User)
);
