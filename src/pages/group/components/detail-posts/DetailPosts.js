import React from 'react';
import avatar from '../../../../assets/images/avatar.svg';
import publicIcon from '../../../../assets/images/public-icon.svg';
import rightArrowIcon from '../../../../assets/images/right-arrow-icon.svg';
import postImage from '../../../../assets/images/post-image.svg';
import likeIcon from '../../../../assets/images/like-icon.svg';
import commentIcon from '../../../../assets/images/comment-icon.svg';
import shareIcon from '../../../../assets/images/share-icon.svg';
import pinIcon from '../../../../assets/images/pin-icon.svg';
import moreIcon from '../../../../assets/images/more-icon.svg';
import './DetailPosts.scss';

const DetailPosts = () => {
  return (
    <div>
      {[1, 2, 3].map((post, index) => (
        <div className="detail-post" key={index}>
          <div className="post-header">
            <div>
              <div className="avatar-wrapper">
                <img src={avatar} alt="avatar" />
              </div>
              <div>
                <div className="name-wrapper">
                  <h4 className="">Gnab</h4>
                  <img src={rightArrowIcon} alt="rightArrow" />
                  <p>Phòng thiết kế</p>
                </div>
                <div className="post-status">
                  <small>10 phút trước</small>
                  <img src={publicIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="more-actions">
              <img src={pinIcon} alt="pinIcon" />
              <img src={moreIcon} alt="moreIcon" />
            </div>
          </div>
          <div className="post-content">
            <h4>Cung cấp thêm thông tin trong hồ sơ của bạn</h4>
            <p>Cung cấp thêm thông tin trong hồ sơ của bạn</p>
            <div className="tags">
              <p>#Phongnhansu</p>
              <p>#Phongmarketing</p>
              <p>#Phongketoan</p>
            </div>
            <div className="post-images">
              <img src={postImage} alt="postImage" />
            </div>
            <div className="post-interative">
              <div className="reaction-wrapper">
                <img src={likeIcon} alt="likeIcon" />
                <p>1k</p>
              </div>
              <div className="comment-wrapper">
                <img src={commentIcon} alt="commentIcon" />
                <p>150</p>
              </div>
              <div className="share-wrapper">
                <img src={shareIcon} alt="shareIcon" />
              </div>
            </div>
          </div>
          <div className="post-footer"></div>
        </div>
      ))}
    </div>
  );
};

export default DetailPosts;
