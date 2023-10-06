import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Space, Dropdown, Menu } from 'antd'
import { SharePost } from '../../../social/components/detail-posts/post/SharePost'
import avatar from '../../../../assets/images/avatar.svg';
import moreIcon from '../../../../assets/images/more-icon.svg';
import Like from '../../../../assets/new/common/like.svg';
import Comment from '../../../../assets/new/common/comment.svg';
import Share from '../../../../assets/new/common/share.svg';
import publicIcon from '../../../../assets/images/public-icon.svg';
import rightArrowIcon from '../../../../assets/images/right-arrow-icon.svg';
import { formatMinutes, getUrlImage, getUrlFile } from '../../../../utils';

const DetailsPost = ({ post, index }) => {

  const [isShowShare, setIsShowShare] = useState(false);
  let file = post.Files && post.Files.length ? post.Files[0] : {}
  const imageUrl = file.Type === 1 ? getUrlImage(234, 234, file.Files) : ''
  const fileUrl = file.Type === 3 ? getUrlFile(file.Files) : ''
  const avataUrl = post.CreatedByAvatar !== '' ? getUrlImage(40, 40, post.CreatedByAvatar) : avatar

  useEffect(() => {
    document.addEventListener('click', handleShare, true);
    return (() => document.removeEventListener('click',handleShare))
  }, [])

  const handleShare = (event) => {
    const classList = typeof event?.target?.className !== 'object' ? event?.target?.className?.split(" ") : [];
    if (classList.length == 0 || classList[0] != 'share-wrapper__plugin') {
      setIsShowShare(false);
    }
  }

  const showSharePlugin = (event) => {
    const classList = typeof event?.target?.className !== 'object' ? event?.target?.className?.split(" ") : [];
    const parentClassList = [...event.target?.parentElement?.classList];

    if (classList.length != 0 && classList.find((r) => r == 'share-wrapper') || parentClassList.length != 0 && parentClassList.find((r) => r == 'share-wrapper')) {
      setIsShowShare(true);
    }
  }

  return (
    < div className="detail-post pb--0" key={index} >
      <div className="post-header">
        <div>
          <div className="avatar-wrapper">
            <img src={avataUrl} alt="avatar" />
          </div>
          <div>
            <div className="name-wrapper">
              <div className="fs--16 lh--19 c-262B32 font-weight--bold">{post.CreatedByName || "Anonymous"}</div>
              <img src={rightArrowIcon} alt="rightArrow" />
              <span className="fs--13 lh--16 c-6E7B94">{post.GroupName || "Toàn thể công ty"}</span>
            </div>
            <div className="post-status">
              <small>{formatMinutes(post.PublicDate)}</small>
              <img src={publicIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="more-actions mt--12 mr--16">
          <img src={moreIcon} alt="moreIcon" />
        </div>
      </div>
      <div className="post__content--wrapper">
        <div className="post__content--detail">
          <div>
            <div className="fs--18 lh--21 c-262B32 ml--12 my--12 font-weight--bold">{post.Title}</div>
            <div className="fs--14 lh--17 c-6E7B94 ml--12 mt--12 pr--16">{post.Content}</div>
            <div className="tags">
              {post?.Tags && post?.Tags?.length ? (
                <p
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#414346',
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  <Space>
                    <div style={{ width: 15, height: 0.5, backgroundColor: '#000' }} />
                    Với <b>{post?.Tags[0]?.FullName}</b>
                    {!!post?.Tags.slice(1).length && (
                      <>
                        <span style={{ fontSize: 14 }}>và</span>
                        <Dropdown
                          overlay={
                            <Menu>
                              {post?.Tags?.slice(1)?.map((tag, index) => (
                                <Menu.Item key={index}>{tag.FullName}</Menu.Item>
                              ))}
                            </Menu>
                          }
                          overlayClassName='name-wrapper__tag tag'
                        >
                          <b>{post?.Tags?.slice(1)?.length} người khác</b>
                        </Dropdown>
                      </>
                    )}
                  </Space>
                </p>
              ) : (
                ''
              )}

            </div>
          </div>
          {fileUrl && (
            <div className="">
              <a href={fileUrl} target="_blank" rel="noreferrer"> {file.Name} </a>
            </div>
          )}
          {imageUrl && (
            <div className="image-holder w--120 h--120 mr--16" style={{ minWidth: 120 }}>
              <img
                src={imageUrl}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>
        <div className="post-interative">
          <Row>
            <Col span="8">

              <div className="reaction-wrapper">
                <img src={Like} alt="likeIcon" />
                <p>{post.CountLike || 0} Thích</p>
              </div>
            </Col>
            <Col span="8">

              <div className="comment-wrapper">
                <img src={Comment} alt="commentIcon" />
                <p>{post.CountComment || 0} Bình luận</p>
              </div>
            </Col>
            <Col span="8">
              <div className={`share-wrapper ${isShowShare?'show-plugin':''}`} onClick={(e) => showSharePlugin(e)}>
                <img src={Share} alt="shareIcon" />
                <p>{post.CountShare || 0} Chia sẻ</p>
                <SharePost shareType={post.Type == 1?'post':(post.Type == 2? 'vote' : 'event')} id={post.Id} type={post.Type} isShow={isShowShare} setIsShowShare={(v) => setIsShowShare(v)}/>
              </div>
            </Col>
          </Row>
        </div>

      </div>
      {/* <div className="post-footer"></div> */}
    </div>
  )
}

DetailsPost.propTypes = {
  post: PropTypes.any,
  index: PropTypes.any
};

export default DetailsPost;