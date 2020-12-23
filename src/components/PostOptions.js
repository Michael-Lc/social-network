import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditIcon, DeleteIcon } from "./Icons";

import styles from "./styles/PostOptions.module.css";
import EditPost from "./EditPost";
import { deletePost } from "../actions/postActions";

export const PostOptions = (props) => {
  const { post, deletePost } = props;
  const [showEdit, setShowEdit] = useState(false);
  console.log(post);

  const handleDelete = () => {
    document.getElementById("modal").style.display = "none";
    deletePost(post);
    return;
  };

  return (
    <>
      <div className={styles.modal} id="modal">
        <div className={styles.modalContent}>
          <button
            className={styles.modalBtn}
            onClick={() => {
              setShowEdit(true);
              document.getElementById("modal").style.display = "none";
            }}
          >
            <EditIcon />
            <span>Edit Post</span>
          </button>
          <button className={styles.modalBtn} onClick={handleDelete}>
            <DeleteIcon /> <span>Delete Post</span>
          </button>
        </div>
      </div>
      {showEdit && <EditPost post={post} setShowEdit={setShowEdit} />}
    </>
  );
};

PostOptions.propTypes = {
  post: PropTypes.object,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostOptions);
