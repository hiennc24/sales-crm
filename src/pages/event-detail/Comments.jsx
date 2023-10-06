/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { List } from "antd";
import SingleComment from "../social/components/detail-posts/post/Comment"
import apis from "../../services/api";
import { useDispatch } from "react-redux";
import { getCommentsSuccess } from "../../stores/event/event.action";

const PostComments = ({ comments, post }) => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(2);
  const [isLoadMoreComments, setIsLoadMoreComments] = useState(
    post.comments.length < post.CountComment);
  const handleLoadeMoreComments = () => {
    apis.posts.getCommentPaging(post.Id, offset, 10).then(res => {
      dispatch(getCommentsSuccess({ comments: res.data, id: post.Id }));
      setOffset(offset + 1);
      if (res.data.length < 10) {
        setIsLoadMoreComments(false);
      }
    });
  };


  return (
    <div>
      {isLoadMoreComments && (
        <p onClick={handleLoadeMoreComments} style={{ cursor: "pointer" }}>
          Xem thêm bình luận
        </p>
      )}
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
    </div>
  );
};

export default PostComments;
