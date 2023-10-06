import React, { useState } from 'react';
import { message, Tooltip, Space } from 'antd';
import PropTypes from 'prop-types';
import API from '../../../../services/api';
import './CommentFooter.scss';

import unlikeIcon from '../../../../assets/new/common/like-active.svg';
import likeIcon from '../../../../assets/new/common/like.svg';
import avatar from '../../../../assets/images/avatar.svg';
import { getUrlImage } from '../../../../utils';

const ItemComment = ({ comment }) => {
  const [isLike, setLike] = useState(comment.IsLike || false);
  const [countLike, setCountLike] = useState(comment.CountLike || 0);

  const actionLikeComment = () => {
    var count = countLike;
    var data;
    if (isLike) {
      //unlike
      setLike(false);
      setCountLike(countLike - 1);
      data = {
        id: comment.Id,
        action: 1,
        status: 0,
      };
    } else {
      //like
      setLike(true);
      setCountLike(countLike + 1);
      data = {
        id: comment.Id,
        action: 1,
        status: 1,
      };
    }
    API.posts
      .reactPost(data)
      .then((res) => {
        // console.log(res);
        if (res?.code === 200) {
        } else {
          if (data.status === 1) {
            setLike(false);
            setCountLike(count);
          } else {
            setLike(true);
            setCountLike(count);
          }
          message.error('Đã xảy ra lỗi vui lòng thử lại sau!!!');
        }
      })
      .catch(() => {
        if (data.status === 1) {
          setLike(false);
          setCountLike(count);
        } else {
          setLike(true);
          setCountLike(count);
        }
        message.error('Đã xảy ra lỗi vui lòng thử lại sau!!!');
      });
  };

  return (
    <div className='comment-item'>
      <div className='avatar-wrapper'>
        <img
          className='avt-comment-item'
          src={
            comment.CreatedByAvatar && comment.CreatedByAvatar !== ''
              ? getUrlImage(35, 35, comment.CreatedByAvatar)
              : avatar
          }
          alt='avatar'
          style={{ borderRadius: '50%' }}
        />
      </div>
      <div className="comment-item-content">
        <h3 className='user-name'>{comment.CreatedByName || 'Anonymous'}</h3>
        <span>{comment.Content}</span>
        <div className='action-like-cmt' onClick={actionLikeComment}>
          <Tooltip placement='topLeft' title={!isLike ? 'Thích' : 'Bỏ thích'}>
            <Space size={5}>
              {isLike ? (
                <img src={likeIcon} className='w--16' />
              ) : (
                <img src={unlikeIcon} className='w--16' />
              )}
              <div
                style={{
                  color: !isLike ? '#0498C1' : '#414346',
                  fontSize: 12,
                  marginBottom: -4,
                }}
              >
                Thích
              </div>
            </Space>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
ItemComment.propTypes = {
  comment: PropTypes.object,
};

export default ItemComment;
