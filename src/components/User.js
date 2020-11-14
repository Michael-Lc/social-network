import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";
import faker from "faker";

import withNavbar from "../hoc/withNavbar";
import Posts from "./Posts";

import styles from "./styles/User.module.css";

function User({ posts, fetchPosts }) {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container">
      <div className={styles.details}>
        <img
          src={faker.image.avatar()}
          className={styles.profilePicture}
          alt="Profile"
        />
        <div className={styles.userName}>{faker.name.firstName()}</div>
        <div className={styles.description}>{faker.random.words(10)}</div>
      </div>
      <Posts data={posts} />
    </div>
  );
}

User.propTypes = {
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { fetchPosts })(withNavbar(User));
