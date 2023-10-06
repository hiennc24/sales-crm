/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, forwardRef } from 'react';
import { List } from "antd";
import SingleComment from "./Comment";
import apis from "../../../../../services/api";
import { useDispatch } from "react-redux";
import { getCommentsSuccess } from "../../../../../stores/posts/posts.action";

// eslint-disable-next-line react/display-name
const PostComments = forwardRef(({ comments, post }, ref) => {

  const dispatch = useDispatch();
  const [isLoadMoreComments, setIsLoadMoreComments] = useState(post.comments.length < post.CountComment);
  
  
  useEffect(() => {
    if(comments.length >= post.CountComment) {
      setIsLoadMoreComments(false);
    }
  }, [comments,comments.length, post.CountComment, post])

  const handleLoadeMoreComments = () => {
    apis.posts.getCommentPaging(post.Id, Math.floor(comments.length/15) + 1, 15).then(res => {
      const newArr = res.data.filter(r => {
        return comments.findIndex((item) => item.Id == r.Id) == -1;
      })
      dispatch(getCommentsSuccess({ comments: newArr, id: post.Id }));
    });
  };

  return (
    <div>
      {
        comments.length !== 0 &&
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <li className="mb--10">
              <SingleComment item={item} postId={post.Id} parentList={[post.Id, item.Id]}>
                {item?.comments && <PostComments comments={item.comments} />}
              </SingleComment>
            </li>
          )}
        />
      }
      
       {isLoadMoreComments && (
        <p className='load-more-comment' onClick={handleLoadeMoreComments} style={{ cursor: "pointer", marginLeft: 70, marginBottom: 5 }}>
          Xem thêm bình luận
        </p>
      )}
    </div>
  );
});

export default PostComments;
