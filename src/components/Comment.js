import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPost, fetchComments } from "../actions/commentActions";

import withNavbar from "../hoc/withNavbar";

import styles from "./styles/Comment.module.css";
import postStyles from "./styles/Post.module.css";
import { Loading } from "./Icons";

function Comment(props) {
  const { post, comments, fetchPost, fetchComments, match, loading } = props;

  useEffect(() => {
    const id = match.params.id;
    fetchPost(id);
    fetchComments(id);
  }, [match, fetchComments, fetchPost]);

  console.log(post, comments);

  if (loading) {
    return <Loading />;
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
            <span>{comments.length} Comments</span>
            {comments &&
              comments.map((comment) => (
                <div className={styles.comment} key={comments.indexOf(comment)}>
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
                  </div>

                  <div className={postStyles.postContent}>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

Comment.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  fetchPost: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
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
