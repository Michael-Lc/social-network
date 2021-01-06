import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CommentIcon, Loading } from "./Icons";

import AddPost from "./AddPost";
import PostOptions from "./PostOptions";

import styles from "./styles/Post.module.css";

function Posts(props) {
  const { user, data, loading } = props;
  const [postEdit, setPostEdit] = useState(null);

  const toggleOptions = (post) => {
    // store id in state and pass it to props for postOptions
    setPostEdit(post);

    const modal = document.getElementById("modal");

    if (modal.style.display === "flex") {
      modal.style.display = "none";
    } else {
      modal.style.display = "flex";
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {data.length >= 1 ? (
        data.map((post) => (
          <div key={props.data.indexOf(post)} className={styles.post}>
            <div className={styles.postUser}>
              <Link to={{ pathname: `/user/${post.userId}` }}>
                <img
                  src={post.profileImage}
                  alt=""
                  className={styles.profileImage}
                />
              </Link>
              <span className={styles.username}>
                <Link to={{ pathname: `/user/${post.userId}` }}>
                  {post.username}
                </Link>
              </span>
              {user &&
                (post.userId === user.id ? (
                  <button
                    className={styles.openOptions}
                    id="openOptions"
                    onClick={() => toggleOptions(post)}
                  >
                    <i className="down"></i>
                  </button>
                ) : (
                  ""
                ))}
            </div>
            <Link to={{ pathname: `/post/${post.id}`, state: post }}>
              <div className={styles.postContent}>
                <p>{post.postContent}</p>
              </div>
            </Link>
            <div className={styles.bottomIconsContainer}>
              <Link to={{ pathname: `/post/${post.id}`, state: post }}>
                <CommentIcon />
                <span>comment</span>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>No Posts</div>
      )}
      {user && (
        <>
          <PostOptions post={postEdit} setPostEdit={setPostEdit} />
          <AddPost />
        </>
      )}
    </>
  );
}

Posts.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.posts.loading,
});

export default connect(mapStateToProps, null)(Posts);
