/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Row, Col, Tooltip, Space, Popover, Button, Avatar, Modal, Image } from "antd";
import Picker from "emoji-picker-react";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import apis from '../../../../../services/api';
import DefaulAvatar from '../../../../../assets/images/avatar_default.jpg';
import Like from '../../../../../assets/new/create-post/unlike.svg';
import { FORMAT_DATE_TIME } from '../../../../../constants/config'
import moreIcon from '../../../../../assets/images/more-icon.svg';
import IconEmoji from '../../../../../assets/new/comment/icon-emoji.svg'
import {
  editComment,
  deleteComment,
  createComment,
} from '../../../../../stores/posts/posts.action';
import {
  editEventComment,
  deleteEventComment,
} from '../../../../../stores/event/event.action';
import { getUrlImage, getUrlFile } from '../../../../../utils';
import FormatText3 from '../../../../../utils/FormatText3';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import '../DetailPosts.scss';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Delete from "../../../../../assets/new/messenger/xoa-tin-nhan.svg";
import EditComment from "../../../../../assets/new/messenger/edit.svg";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Comment from '../../../../../assets/new/create-post/comment.svg';
import PinkHeart from '../../../../../assets/new/create-post/pink-heart.svg';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import IconPdf from "../../../../../assets/images/icon-pdf.svg";
import IconZip from "../../../../../assets/images/icon-zip.svg";
import IconRar from "../../../../../assets/images/icon-rar.svg";
import IconExcel from "../../../../../assets/images/icon-excel.svg";
import IconWord from "../../../../../assets/images/icon-word.svg";
import IconOther from "../../../../../assets/images/icon-other-file.svg";
import InputComment from './InputComment'
import { createPost } from '../../../../../stores/posts/posts.action';
import AvatarCustom from '../../../../../components/avatar-custom';
import RenderFiles from '../../../../../components/file';

const SingleComment = ({ item, postId, children, isReplyCmt, parentList = [] }) => {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(item.IsLike);
  const [countLike, setCountLike] = useState(item.CountLike);
  const [isShowEmojiPicker, showEmojiPicker] = useState(null);
  const [comment, setComment] = useState(item.Content || '');
  const [isEdit, setIsEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isEvent, setIsEvent] = useState(false)
  const location = useLocation();
  const userInfo = useSelector((state) => state.get('userProfile').get('profile'));
  const [isReply, setIsReply] = useState(false)

  useEffect(() => {
    setIsEvent(location.pathname.includes('event'))
  }, [])

  const likeAction = () => {
    apis.posts.reactPost({
      id: item.Id,
      action: 1,
      status: isLike ? 0 : 1
    });
    setIsLike(!isLike);
    isLike ?
      setCountLike(countLike - 1) :
      setCountLike(countLike + 1);
  };

  const handleEditPost = (item) => {
    setComment(item.Content)
    setIsEdit(true)
  };

  const handleDeletePost = () => {
    !isEvent ? dispatch(deleteComment({ id: +item.Id, parentId: +item.ParentId, parentList })) : dispatch(deleteEventComment({ id: +item.Id, parentId: +item.ParentId, parentList }))
    setIsShowModalDelete(false)
  };

  const submitEdit = (value) => {
    setIsEdit(false)
    dispatch(
      editComment({
        ...item,
        id: +item.Id,
        tags: typeof item.Tags == 'string' ? JSON.parse(item.Tags) : item.Tags,
        employees: typeof item.Employee == 'string' ? JSON.parse(item.Employee) : item.Employee,
        priority: item.Priority,
        ...value,
        parentList,
        parentId: +parentList[parentList.length - 2],
        isEvent
      })
    )
    // !isEvent ?
    //   dispatch(
    //     editComment({
    //       ...item,
    //       id: +item.Id,
    //       tags: typeof item.Tags == 'string' ? JSON.parse(item.Tags) : item.Tags,
    //       employees: typeof item.Employee == 'string' ? JSON.parse(item.Employee) : item.Employee,
    //       priority: item.Priority,
    //       ...value,
    //       parentList,
    //       parentId: +parentList[parentList.length - 2]
    //     })
    //   )
    //   :
    //   dispatch(
    //     editEventComment({
    //       id: +item.Id,
    //       groupId: 0,
    //       isPost: 0,
    //       isPin: 0,
    //       publicDate: item.PublicDate,
    //       tags: typeof item.Tags == 'string' ? JSON.parse(item.Tags) : item.Tags,
    //       employees: typeof item.Employee == 'string' ? JSON.parse(item.Employee) : item.Employee,
    //       type: item.Type,
    //       isPublic: item.IsPublic,
    //       lat: item.Lat,
    //       lon: item.Lon,
    //       address: item.Address,
    //       priority: item.Priority,
    //       ...value,
    //       parentList,
    //       parentId: +parentList[parentList.length - 2]
    //     })
    //   )
  }

  const handlePushComment = (data) => {
    dispatch(createComment({ ...data, parentId: +item.Id, parentList, isEvent }))
  };

  const isCheckUrl = (url) => {
    if (url.includes('facebook.com') || url.includes('www.w3.org') || url.includes('fbcdn.net')) {
      return false
    }
    return true
  }

  const getLinkFromPost = () => {
    const links = Array.from(item.Content?.matchAll(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g), l => l[0])
    var _links = []
    _links = links.filter(r => { return _links.includes(r) ? "" : _links.push(r) })
    return _links;
  }

  const handleRenderFiles = (files) => {
    const imagesList = [];
    const videoList = [];
    const fileList = [];
    files.forEach((item) => {
      if (item.Type == 1) {
        imagesList.push(item);
      } else if (item.Type == 2) {
        videoList.push(item);
      } else {
        fileList.push(item);
      }
    });

    const bodyContentPost = document.getElementById('bodyContentPost')
    let width = 220;
    if (bodyContentPost) {
      let count = 0;
      for (let i = 1; i <= files.length; i++) {
        if (i * 210 > bodyContentPost.clientWidth - 60) {
          width = (i - 1) * 210;
          break;
        }
        else {
          count++;
        }
      }

      if (count == files.length) {
        width = files.length * 210;
      }
    }

    const renderIcon = (file) => {
      if (file.includes('pdf')) {
        return <img src={IconPdf} alt="pdf" />;
      } else if (file.includes('zip')) {
        return <img src={IconZip} alt="zip" />;
      } else if (file.includes('rar')) {
        return <img src={IconRar} alt="rar" />;
      } else if (file.includes('sheet')) {
        return <img src={IconExcel} alt="excel" />;
      } else if (file.includes('doc') || file.includes('docx')) {
        return <img src={IconWord} alt="word" />;
      } else {
        return <img src={IconOther} alt="other" />;
      }
    };

    return (
      <>
      <div className="images-preview-wrapper" style={{ gridTemplateColumns: 'repeat(auto-fit, 180px)', width: width, marginBottom: 0, marginTop: 5 }}>
        {
          imagesList.map(rs => {
            return <div className="image-preview-wapper wrap-image" key={rs.Files} style={{ maxWidth: 200, width: 'max-content' }}>
              <Image
                className="image-item"
                width={180}
                height={180}
                src={getUrlImage(0, 0, rs.Files)}
              />
            </div>
          })
        }
        {
          videoList.map(rs => {
            return <div className="image-preview-wapper" key={rs.Files} style={{ maxWidth: 200, width: 'max-content' }}>
              <video key={index} width="110" height="80" className="video-search" alt={rs.Name}>
                <source src={getUrlFile(rs.Files)} />
              </video>
            </div>
          })
        }
        {/* {
          fileList.map(rs => {
            return <div className="image-preview-wapper" key={rs.Files} style={{ maxWidth: 200, width: 'max-content' }}>
              <div className="wrap-file">
                <div className="contain-img">
                  {renderIcon(rs.Files)}
                </div>
                <div className="contain-ctrl">
                  <div className="contain-name">
                    {rs.Name}
                  </div>
                  <div className="btn-download">
                    <a href={getUrlFile(rs.Files)} target="_blank" rel="noopener noreferrer">
                      Download File
                    </a>
                  </div>
                </div>
              </div>
            </div>
          })
        } */}
        
      </div>
      <RenderFiles filesList={fileList}/>
      </>
    );
  };

  const getFiles = () => {
    return typeof item.Files === 'string' ? JSON.parse(item.Files) : item.Files;
  }

  console.log('item', item)

  return (<div style={{ width: '100%' }}>
    {!isEdit && <>
      <div className='comment-container'>
        <div className='comment-container__main'>
          <div className="content">
            <div>
              <div className="content-comment">
                <div className="name-user">
                  <a href={'/income/profile/' + item.CreatedBy}>
                    <div className="avatar">
                      <AvatarCustom
                        src={item.CreatedByAvatar ? `https://filemanager.crmdemo.net/file/image?width=24&height=24&format=png&image_id=${item.CreatedByAvatar}&fit=inside` : ''}
                        size={24}
                        fullName={item.CreatedByName || 'Anonymous'}
                      />
                    </div>
                  </a>
                  <div className="name-user__info">
                    <a href={'/income/profile/' + item.CreatedBy} className='main-tag-user'>
                      <div>
                        {item.CreatedByName || 'Anonymous'}
                      </div>
                    </a>
                    <div
                      key="date-time"
                      className='comment-time'
                    >
                      {moment(item.CreatedAt, FORMAT_DATE_TIME)
                        .startOf("minutes")
                        .fromNow()}
                    </div>
                  </div>
                </div>
                <FormatText3 content={item?.Content ?? ""} />
                {
                  getLinkFromPost().filter(url => isCheckUrl(url)).length != 0 &&
                  <div className='preview-url-wrapper'>
                    {
                      getLinkFromPost().map((url, index) => {
                        return isCheckUrl(url) && <LinkPreview showLoader={true} key={index} className='preview-url-wrapper__container' url={url} descriptionLength={50} />

                      })
                    }
                  </div>
                }
              </div>
              {
                item.Files && getFiles().length > 0 &&
                handleRenderFiles(getFiles())
              }
              <div className='content-comment__footer'>
                <Tooltip
                  title={!isLike ? "Thích" : "Bỏ thích"}
                >
                  <div className={isReplyCmt ? 'comment-action like-cmt' : 'comment-action'} size={3} onClick={likeAction}>
                    {isLike ? (
                      <img src={PinkHeart} className="w--16" style={{ width: 12, height: 12 }} />
                    ) : (
                      <img src={Like} className="w--16" style={{ width: 12, height: 12 }} />
                    )}
                    <div className="footer-control__name">
                      Thích {countLike}
                    </div>
                  </div>
                </Tooltip>
                <div className={isReplyCmt ? 'reply-cmt' : ''}>
                <Tooltip
                  title={"Trả lời"}
                  onClick={() => setIsReply(!isReply)}
                >
                  <Space className='comment-action comment-action-reply' size={3}>
                    <img src={Comment} alt="commentIcon" style={{ width: 12, height: 12 }} />
                    <div className="footer-control__name">Trả lời</div>
                  </Space>
                </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className='comment-action__more' style={{ width: 26 }}>
            {
              item.CreatedBy == userInfo.Id &&
              <Popover
                placement="bottomRight"
                trigger="click"
                className="more-options"
                content={
                  <>
                    <Row
                      className="more-action"
                      onClick={() => handleEditPost(item)}
                    >
                      <Col style={{ display: "flex" }}>
                        <img
                          style={{ width: 16, marginRight: 3 }}
                          src={EditComment}
                          alt="EditComment"
                        />
                        <p>Chỉnh sửa</p>
                      </Col>
                    </Row>
                    <Row
                      className="more-action"
                      onClick={() => setIsShowModalDelete(true)}
                    >
                      <Col style={{ display: "flex" }}>
                        <img
                          style={{ width: 16, marginRight: 3 }}
                          src={Delete}
                          alt="Delete"
                        />
                        <p>Xóa bình luận</p>
                      </Col>
                    </Row>
                  </>
                }>
                <button className="icon">
                  <img
                    src={moreIcon}
                    alt="moreIcon"
                  />
                </button>
              </Popover>
            }
          </div>
        </div>
        {
          item.Comments && item.Comments?.length > 0 && <div className="comment-container__reply">
            {
              typeof item.Comments !== 'string' &&
              item.Comments.map(cmt => {
                return <SingleComment key={cmt.Id} item={cmt} postId={item.ParentId} isReplyCmt={true} parentList={[...parentList, cmt.Id]} />
              })
            }
            {
              typeof item.Comments === 'string' &&
              JSON.parse(item.Comments).map(cmt => {
                return <SingleComment key={cmt.Id} item={cmt} postId={item.ParentId} isReplyCmt={true} parentList={[...parentList, cmt.Id]} />
              })
            }
          </div>
        }

        <Modal
          title="Xác nhận xóa"
          visible={isShowModalDelete}
          onOk={() => handleDeletePost(item)}
          onCancel={() => setIsShowModalDelete(false)}
          okText="Xóa bình luận"
          cancelText="Hủy"
        >
          <p>Bạn có chắc là muốn xoá bình luận này không?</p>
        </Modal>
      </div>
      {
        isReply && <div className="reply-container">
          <InputComment post={item} onClose={() => setIsReply(false)} createComment={handlePushComment} />
        </div>
      }
    </>
    }
    {
      isEdit &&
      <>
        <div style={{ width: '100%' }}>
          <InputComment
            post={item}
            onClose={() => setIsEdit(false)}
            createComment={submitEdit}
            isEdit={isEdit}
            content={comment}
            initFiles={typeof item.Files === 'string' ? JSON.parse(item.Files) : item.Files}
          />
        </div>
      </>
    }
  </div>);
};

export default SingleComment;