/* eslint-disable react/prop-types */
import React from 'react';
import TypeofPosts from '../../../new-post/TypeofPosts';

const EditPost = ({ post, hideModal }) => {
  return <TypeofPosts
    isEditType={true}
    data={post}
    hideModal={hideModal}
  />;
};

export default EditPost;