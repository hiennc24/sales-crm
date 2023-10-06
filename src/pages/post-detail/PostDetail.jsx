/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import DEvent from './event/DEvent';
import DPost from './post/DPost';


const PostDetail = (props) => {
  switch (props.match.params.type) {
    case "1":
      return <DPost postId={props.match.params.id} />;
    case "2":
      return <DPost postId={props.match.params.id} />;
    
    default:
      return;
  }
};

export default PostDetail;