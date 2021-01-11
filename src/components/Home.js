import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { newPostsBatch } from "../actions/postActions";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";

import PostList from "./PostList";

import withNavbar from "../hoc/withNavbar";

function Home({ posts, fetchPosts }) {
  useEffect(() => {
    fetchPosts();
    // newPostsBatch();
  }, [fetchPosts]);

  console.log(posts);

  return (
    <div className="container">
      <PostList data={posts} />
    </div>
  );
}

Home.propTypes = {
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { fetchPosts })(withNavbar(Home));
