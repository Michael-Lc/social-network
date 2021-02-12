import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPost, fetchComments } from "../actions/commentActions";

import withNavbar from "../hoc/withNavbar";

import styles from "./styles/Comment.module.css";
import postStyles from "./styles/Post.module.css";
import { Loading, PostOptionsIcon } from "./Icons";
import AddComment from "./AddComment";
import CommentOptions from "./CommentOptions";

function Comment(props) {
  const {
    user,
    post,
    comments,
    fetchPost,
    fetchComments,
    match,
    loading,
  } = props;
  const [commentEdit, setCommentEdit] = useState(null);

  useEffect(() => {
    const id = match.params.id;
    fetchPost(id);
    fetchComments(id);
  }, [match, fetchComments, fetchPost]);

  // console.log(post, comments);

  const toggleOptions = (comment) => {
    // store id in state and pass it to props for postOptions
    setCommentEdit(comment);

    const modal = document.getElementById("modal");

    if (modal.style.display === "flex") {
      modal.style.display = "none";
    } else {
      modal.style.display = "flex";
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container">
      {Object.keys(post).length !== 0 ? (
        <>
          <div className={styles.post}>
            <div className={postStyles.postUser}>
              <Link to={{ pathname: `/user/${post.userId}` }}>
                <img
                  src={post.profileImage}
                  alt=""
                  className={postStyles.profileImage}
                />
              </Link>
              <Link to={{ pathname: `/user/${post.userId}` }}>
                <span className={postStyles.username}>{post.username}</span>
              </Link>
            </div>
            <div className={postStyles.postContent}>
              <p>{post.postContent}</p>
            </div>
          </div>

          <div className={styles.commentContainer}>
            <span>{comments.length} Comment(s)</span>
            {comments &&
              comments.map((comment) => (
                <div className={styles.comment} key={comment.id}>
                  <div className={postStyles.postUser}>
                    <Link to={{ pathname: `/user/${comment.userId}` }}>
                      <img
                        src={comment.profileImage}
                        alt=""
                        className={postStyles.profileImage}
                      />
                    </Link>
                    <Link to={{ pathname: `/user/${comment.userId}` }}>
                      <span className={postStyles.username}>
                        {comment.username}
                      </span>
                    </Link>
                    {user &&
                      (comment.userId === user.id ? (
                        <button
                          className={postStyles.openOptions}
                          id="openOptions"
                          onClick={() => toggleOptions(comment)}
                        >
                          <PostOptionsIcon />
                        </button>
                      ) : null)}
                  </div>

                  <div className={postStyles.postContent}>
                    <p>{comment.commentContent}</p>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
      {user && (
        <>
          <CommentOptions
            comment={commentEdit}
            setCommentEdit={setCommentEdit}
          />
          <AddComment post={post} />
        </>
      )}
    </div>
  );
}

Comment.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  fetchPost: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  post: state.comments.post,
  comments: state.comments.comments,
  loading: state.comments.loading,
});

const mapDispatchToProps = {
  fetchPost,
  fetchComments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavbar(Comment));
