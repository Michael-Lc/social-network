import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserPosts } from "../actions/postActions";
import { fetchUserDetails } from "../actions/userActions";

import withNavbar from "../hoc/withNavbar";
import PostList from "./PostList";

import styles from "./styles/User.module.css";
import { Edit, Loading } from "./Icons";
import { Link } from "react-router-dom";

function User(props) {
  const {
    user,
    posts,
    loading,
    userDetails,
    fetchUserPosts,
    fetchUserDetails,
    match,
  } = props;
  const id = match.params.id;

  useEffect(() => {
    fetchUserDetails(id);
    fetchUserPosts(id);
  }, [id, fetchUserPosts, fetchUserDetails]);

  // console.log(userDetails, posts);

  if (loading) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.details}>
        {user &&
          (user.id === id ? (
            <Link
              to={{ pathname: `/user/${user.id}/update-profile` }}
              className={styles.editProfile}
            >
              <Edit />
            </Link>
          ) : (
            ""
          ))}
        <img
          src={userDetails.profilePicture}
          className={styles.profilePicture}
          alt="Profile"
        />
        <div>
          <div className={styles.userName}>{userDetails.username}</div>
          <div className={styles.description}>{userDetails.description}</div>
        </div>
      </div>
      <PostList data={posts} />
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  userDetails: PropTypes.object.isRequired,
  fetchUserPosts: PropTypes.func.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  posts: state.posts.userPosts,
  loading: state.user.loading,
  userDetails: state.user.userDetails,
});

const mapDispatchToProps = {
  fetchUserPosts,
  fetchUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavbar(User));
