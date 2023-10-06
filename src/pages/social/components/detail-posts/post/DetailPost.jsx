/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import avatar from "../../../../../assets/images/avatar.svg";
import publicIcon from "../../../../../assets/images/public-icon.svg";
import "../DetailPosts.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  reactPost,
  pinPost,
  createPost,
  deletePost,
  updatePriorityProcess,
  createComment,
} from "../../../../../stores/posts/posts.action";
import moment from "moment";
import {
  Popover,
  Modal,
  Avatar,
  Menu,
  Dropdown,
  Tooltip,
  Space,
  Typography,
} from "antd";
import TypeofPosts from "../../new-post/TypeofPosts";
import DetailVote from "./vote/DetailsVote";
import PostComments from "./Comments";
import apis from "../../../../../services/api";
import FormatText3 from "../../../../../utils/FormatText3";

import { getUrlImage } from "../../../../../utils";
import { GGMap } from "../../new-post/components";
import { useHistory } from "react-router-dom";
import RenderListImagesNew from "./RenderListImagesNew";
import CloseBlack from "../../../../../assets/new/common/close-black.svg";
import PinBlack from "../../../../../assets/new/common/pin-black.svg";
import PinRed from "../../../../../assets/new/common/pin-red.svg";
import EditBlack from "../../../../../assets/new/common/edit-black.svg";
import Delete from "../../../../../assets/new/common/delete-gray.svg";
import More from "../../../../../assets/new/common/more.svg";
import Like2 from "../../../../../assets/new/common/like-2.svg";
// import Like from '../../../../../assets/new/create-post/thumbs-up-solid.svg';
import Like from "../../../../../assets/new/create-post/like1.svg";
import UnLike from "../../../../../assets/new/create-post/like2.svg";
// import UnLike from '../../../../../assets/new/create-post/thumbs-up-regular.svg';
import PostIcon from "../../../../../assets/new/new-post/post-icon.svg";
import Star from "../../../../../assets/new/new-post/checked.svg";
import Check from "../../../../../assets/new/create-post/check.svg";
import UnCheck from "../../../../../assets/new/create-post/uncheck.svg";
import PlayButton from "../../../../../assets/new/create-post/play-button.svg";
// import Comment from '../../../../../assets/new/create-post/comment.svg';
import Comment from "../../../../../assets/new/create-post/comment2.svg";
import GreyFlag from "../../../../../assets/new/create-post/grey-flag.png";
import BlueFlag from "../../../../../assets/new/create-post/blue-flag.svg";
import YellowFlag from "../../../../../assets/new/create-post/yellow-flag.png";
import RedFlag from "../../../../../assets/new/create-post/red-flag.png";
import GreenFlag from "../../../../../assets/new/create-post/green-flag.png";
import Share from "../../../../../assets/new/create-post/share.svg";
import { FORMAT_DATE_TIME } from "../../../../../constants/config";
// import CloseNoti from '../../../../../assets/new/common/tat-thong-bao.svg';
import { SharePost } from "./SharePost";
import { useEffect } from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { useLocation } from "react-router-dom";
import RenderFiles from "../../../../../components/file/index";
import InputComment from "./InputComment";
// import { Icons } from '@styled-icons/fa-solid';
import { Icons } from "../../../../../utils";
import AvatarCustom from "../../../../../components/avatar-custom";
import arrowIcon from "../../../../../assets/new/create-post/arrow.png";

const DetailPost = ({
  props,
  post,
  index,
  isGroupPage,
  comments,
  groupId,
  isSearch = false,
  afterSubmit = () => { },
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showEditModalId, setShowEditModalId] = useState(null);
  const [showMoreOptionPopupId, setShowMoreOptionPopupId] = useState(null);
  const [isShowShare, setIsShowShare] = useState(false);
  const [isExpand, setIsExpand] = useState(true);
  const location = useLocation();
  const [keySearch, setKeySearch] = useState("");
  const [includeMedia, setIncludeMedia] = useState(true);
  const [isProcessed, setProcessed] = useState(false);

  useEffect(() => {
    setKeySearch(location.search.substring(3, location.search.length));
    // if (location.pathname.includes("detail")) {
    // seteDetailPage(true)
    // }
    const imagesList = [];
    const filesList = [];
    const videoList = [];
    [...post.Files].forEach((item) => {
      if (item.Type == 1) {
        imagesList.push(item);
      } else if (item.Type == 3) {
        filesList.push(item);
      } else if (item.Type == 2) {
        videoList.push(item);
      }
    });
    setIncludeMedia(
      videoList.length > 0 || imagesList.length > 0 ? true : false
    );
  }, [location]);

  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );

  const goToGroup = (id) => {
    history.push(`/group-work/${id}`);
  };
  const directToDetailPage = () => {
    if (isSearch) history.replace(`/detail/${post.Type}/${post.Id}`);
  };
  document.addEventListener(
    "click",
    (event) => {
      const classList =
        typeof event?.target?.className !== "object"
          ? event?.target?.className?.split(" ")
          : [];
      if (classList.length == 0 || classList[0] != "share-wrapper__plugin") {
        setIsShowShare(false);
      }
    },
    true
  );

  const showSharePlugin = (event) => {
    const classList =
      typeof event?.target?.className !== "object"
        ? event?.target?.className?.split(" ")
        : [];
    const parentClassList = [...event.target?.parentElement?.classList];

    if (
      (classList.length != 0 && classList.find((r) => r == "share-wrapper")) ||
      (parentClassList.length != 0 &&
        parentClassList.find((r) => r == "share-wrapper"))
    ) {
      setIsShowShare(true);
    }
  };

  const likePost = (data) => {
    dispatch(reactPost(data));
  };

  const handlePinPost = (data) => {
    dispatch(pinPost(data));
  };

  const handleShowEditModal = (index) => {
    setShowEditModalId(showEditModalId === index ? null : index);
    setShowMoreOptionPopupId(null);
  };

  const handleShowMoreOptionPopup = (index) => {
    setShowMoreOptionPopupId(showMoreOptionPopupId === index ? null : index);
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
    setShowMoreOptionPopupId(null);
  };

  const handlePushComment = (data) => {
    dispatch(createComment({ ...data, parentList: [post.Id] }));
  };

  const getUserTags = () => {
    return post.Tags.filter((t) => t.TagType != 2);
  };

  const getLinkFromPost = () => {
    const links = Array.from(
      post?.Content?.matchAll(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
      ),
      (l) => l[0]
    );
    var _links = [];
    _links = links.filter((r) => {
      return _links.includes(r) ? "" : _links.push(r);
    });
    return _links;
  };

  const updateProcessStatus = (type) => {
    //1:PIN 2:PROCESS
    let data = {
      id: post.Id,
      type: 1, //PRCESSED
      status: true,
    };
    if (type === 1) {
      data = {
        id: post.Id,
        type: 0, //UNPIN
        status: true,
      };
    }
    dispatch(updatePriorityProcess(data));
  };
  const updateProcessStatusSearch = (type) => {
    //1:PIN 2:PROCESS
    let data = {
      id: post.Id,
      type: 1, //PRCESSED
      status: true,
    };
    if (type === 1) {
      data = {
        id: post.Id,
        type: 0, //UNPIN
        status: true,
      };
    }
    apis.posts.updateStatusTypePriority(data).then((rs) => {
      if (rs?.code === 200) {
        setProcessed(true);
      }
    });
  };

  const handleRenderFiles = (post) => {
    const imagesList = [];
    const filesList = [];
    const videoList = [];
    [...post?.Files].forEach((item) => {
      if (item.Type == 1) {
        imagesList.push(item);
      } else if (item.Type == 3) {
        filesList.push(item);
      } else if (item.Type == 2) {
        videoList.push(item);
      }
    });

    return (
      <div>
        {videoList.length > 0 && !isSearch && (
          <div className="videos-wrapper">
            {videoList.map((r, index) => (
              <video
                key={index}
                width="600"
                className="video-wrapper"
                controls
                alt={r.Name}
              >
                <source
                  src={`https://filemanager.crmdemo.net/uploads/${r.Files}`}
                />
              </video>
            ))}
          </div>
        )}

        {isSearch && videoList.length > 0 ? (
          <div className="thumbnail-video">
            <video
              key={index}
              width="110"
              height="80"
              className="video-search"
              alt={videoList[0].Name}
            >
              <source
                src={`https://filemanager.crmdemo.net/uploads/${videoList[0].Files}#t=5`}
              />
            </video>
            <div className="mask-thumnail-video-square">
              <div className="mask-thumnail-video-square-1"></div>
              <div className="mask-thumnail-video-square-2"></div>
              <div className="mask-thumnail-video-square-3"></div>
            </div>
            <div className="mask-thumnail-video-background"></div>

            <div className="mask-thumnail-video">
              <img className="play-button" src={PlayButton} alt="" />
            </div>
          </div>
        ) : (
          imagesList.length > 0 && (
            <div style={{ margin: isSearch ? "0px 0px" : "20px 0px" }}>
              <RenderListImagesNew listImg={imagesList} isSearch={isSearch} />
            </div>
          )
        )}
        {!isSearch && (
          <div style={{ marginBottom: "20px" }}>
            <RenderFiles filesList={filesList} />
          </div>
        )}
      </div>
    );
  };

  const handleRenderFilesSearch = (post) => {
    const filesList = [];
    [...post.Files].forEach((item) => {
      if (item.Type == 3) {
        filesList.push(item);
      }
    });
    return (
      <div style={{ margin: "20px 0px" }}>
        <RenderFiles filesList={filesList} />
      </div>
    );
  };

  const handleRedirectToProfile = (userId) => {
    if (userInfo.Id == userId) {
      history.push("/profile");
    }
  };

  const getPriority = () => {
    let border = "";
    let type = "";
    let icon = "";
    if (post?.Priority === 1) {
      border += " #ef7678";
      type = "Quan trọng";
      icon = RedFlag;
    } else if (post?.Priority === 2) {
      border += " #ff9f1a";
      type = "Chú ý";
      icon = YellowFlag;
    } else if (post?.Priority === 3) {
      border += " #61bd4f";
      type = "Lưu tâm";
      icon = GreenFlag;
    } else {
      border += " #897d7f";
      type = "Không";
      icon = GreyFlag;
    }

    return { border, type, icon };
  };

  const getTime = (time) => {
    var preDay = moment(moment(Date.now())).diff(time, "days");
    if (preDay < 3) {
      // if (moment(moment(Date.now())).diff(time, "minute") < 4) {
      //   return "Vừa Xong";
      // }
      return moment(time, FORMAT_DATE_TIME).startOf("minute").fromNow();
    }
    return moment.utc(time).format("LLL");
  };

  const isCheckUrl = (url) => {
    if (
      url.includes("facebook.com") ||
      url.includes("www.w3.org") ||
      url.includes("fbcdn.net")
    ) {
      return false;
    }
    return true;
  };

  const getCountMemberGroup = () => {
    let count = post.Tags.slice(1)?.length;
    if (post.GroupName && post.GroupId && post.GroupId !== "0") {
      count++;
    }
    return count;
  };

  const typoExpand = () => { };

  return (
    <div
      id="bodyContentPost"
      className={`detail-post ${isSearch ? "search-post-item" : ""}`}
      onClick={directToDetailPage}
    >
      <div className="post-header">
        <div style={{ flexGrow: 1 }}>
          <div className='avatar-wrapper'>
            <a
              href={userInfo.Id === post.CreatedBy ? null : '/income/profile/' + post.CreatedBy}
              className='main-tag-group'
            >
              <AvatarCustom
                src={post?.CreatedByAvatar ? getUrlImage(50, 50, post?.CreatedByAvatar) : ''}
                size={32}
                fullName={post?.CreatedByName || 'Anonymous'}
                onClick={() => handleRedirectToProfile(post.CreatedBy)}
              />
            </a>
          </div>
          <div>
            <div className='name-wrapper'>
              <a
                href={userInfo.Id === post.CreatedBy ? null : '/income/profile/' + post.CreatedBy}
                className='main-tag-group'
              >
                <h4
                  className=''
                  onClick={() => handleRedirectToProfile(post.CreatedBy)}
                  style={{ cursor: 'pointer', color: "#0498c1" }}
                >
                  {post?.CreatedByName || 'Anonymous'}
                </h4>
              </a>
              {post.Tags && post.Tags.length > 0 && <div>
                <p
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#414346',
                    marginBottom: 0,
                  }}
                >
                  <Space className="gap-custom">
                    {/* <span className="color-gray" style={{ fontWeight: 400 }}>- cùng với</span> */}
                    <img className='arrow-icon' src={arrowIcon} alt='arrowIcon' />
                    {post.Tags[0]?.TagType === 2 || post.Tags[0]?.TagType === 1
                      ? <a
                        href={(post.Tags[0]?.TagType === 2 ? '/income/group-work/' : '/income/profile/') + post.Tags[0]?.Id}
                        className='main-tag-group'>
                        <p className="main-tag">{post.Tags[0]?.FullName}</p>
                      </a>
                      : <p className="main-tag">{post.Tags[0]?.FullName}</p>}
                    {/* {(post.Tags.length > 1 || (post.GroupName && post.GroupId && post.GroupId !== "0")) && */}
                    {post.Tags.length > 1 && (
                      <>
                        <span className="color-gray and-word">và</span>
                        <Dropdown
                          overlay={
                            <Menu>
                              {post.Tags.slice(1)?.map((tag, index) =>
                                tag.TagType === 2 || tag.TagType === 1 ? (
                                  <Menu.Item
                                    key={index}
                                    className="sub-tag-group"
                                  >
                                    <a
                                      href={
                                        (tag.TagType === 2
                                          ? "/income/group-work/"
                                          : "/income/profile/") + tag.Id
                                      }
                                    >
                                      {tag.FullName}
                                    </a>
                                  </Menu.Item>
                                ) : (
                                  <Menu.Item key={index}>
                                    {tag.FullName}
                                  </Menu.Item>
                                )
                              )}
                              {post.GroupName && (
                                <Menu.Item>{post.GroupName}</Menu.Item>
                              )}
                            </Menu>
                          }
                          overlayClassName="name-wrapper__tag tag"
                        >
                          <p className="main-tag">
                            {getCountMemberGroup()} Người/nhóm khác
                          </p>
                        </Dropdown>
                      </>
                    )}
                  </Space>
                </p>
              </div>
              }
            </div>
            <div className="post-status">
              {/* <div className="dot"></div> */}
              <p className="time">{getTime(post?.CreatedAt)}</p>
              {post?.IsPublic ? <img src={publicIcon} alt="public" /> : null}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip placement="top" title={getPriority().type}>
            <img style={{ paddingRight: "5px" }} src={getPriority().icon} />
          </Tooltip>
        </div>
        {isSearch && (
          <div className="more-actions">
            {post.Handled === false && isProcessed === false && (
              <img style={{ paddingRight: "5px", width: 20 }} src={Check} />
            )}
            {(post.Handled === true || isProcessed === true) && (
              <div className="more-actions">
                <img
                  style={{ paddingRight: "5px", width: 20, marginLeft: 10 }}
                  src={Check}
                />
                <div className="writing" style={{ color: "#32A1C8" }}>
                  Đã xử lý
                </div>
              </div>
            )}
          </div>
        )}
        {!isSearch && (
          <div className="more-actions">
            {!post.Handled && (
              <Tooltip placement="top" title={"Đánh dấu đã xử lý"}>
                <img
                  style={{ paddingRight: "5px", width: 20 }}
                  src={Check}
                  onClick={() => updateProcessStatus(2)}
                />
              </Tooltip>
            )}
            {post.Handled && (
              <div className="more-actions">
                <Tooltip placement="top" title={""}>
                  <img
                    style={{ paddingRight: "5px", width: 20, marginLeft: 10 }}
                    src={Check}
                  />
                  <div className="writing" style={{ color: "#32A1C8" }}>
                    Đã xử lý
                  </div>
                </Tooltip>
              </div>
            )}

            {post?.IsPin ? (
              <Tooltip placement="top" title={"Bỏ ghim"}>
                <img
                  style={{ height: 20 }}
                  src={PinRed}
                  onClick={() =>
                    handlePinPost(
                      isGroupPage
                        ? { id: post?.Id, isPin: 0, groupId: groupId }
                        : { id: post?.Id, isPin: 0 }
                    )
                  }
                />
              </Tooltip>
            ) : (
              <Tooltip placement="top" title={"Ghim"}>
                <img
                  style={{ height: 20 }}
                  src={PinBlack}
                  onClick={() =>
                    handlePinPost(
                      isGroupPage
                        ? { id: post?.Id, isPin: 1, groupId: groupId }
                        : { id: post?.Id, isPin: 1 }
                    )
                  }
                />
              </Tooltip>
            )}
            {post.CreatedBy == userInfo.Id && (
              <Dropdown
                placement="bottomRight"
                zIndex={1}
                overlay={
                  <Menu>
                    <Menu.Item
                      key="0"
                      onClick={() => {
                        handlePinPost({
                          id: post.Id,
                          isPin: post?.IsPin ? 0 : 1,
                        });
                        setShowMoreOptionPopupId(null);
                      }}
                      icon={
                        !post?.IsPin ? (
                          <img src={PinBlack} />
                        ) : (
                          <div className="unpin">
                            <div className="custom-remove__pin" />
                            <img src={PinBlack} />
                          </div>
                        )
                      }
                    >
                      {!post?.IsPin ? "Ghim bài viết" : "Bỏ ghim"}
                    </Menu.Item>
                    <Menu.Item
                      key="1"
                      onClick={() => handleShowEditModal(index)}
                      icon={<img src={Icons.write} width="24" />}
                    >
                      Chỉnh sửa bài viết
                    </Menu.Item>
                    <Menu.Item
                      key="2"
                      onClick={() => handleDeletePost(post.Id)}
                      icon={<img src={Delete} />}
                    >
                      Xóa bài viết
                    </Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
                visible={showMoreOptionPopupId === index}
                onVisibleChange={() => handleShowMoreOptionPopup(index)}
              >
                <img src={More} className="pin" alt="moreIcon" />
              </Dropdown>
            )}
          </div>
        )}

        {/* )} */}
      </div>
      {!isSearch && <hr className=" middle-line" />}
      <div className={`post-content`}>
        <div className={isSearch ? "post-content-search" : ""}>
          <div
            className={`post-content-wrapper ${includeMedia ? "includeMedia" : ""
              }`}
          >
            <div className="post-content-title">
              <FormatText3
                key={post.Id}
                title={post?.Title ?? ""}
                content={post?.Content ?? ""}
                keySearch={keySearch}
              />
            </div>
          </div>
          {isSearch && handleRenderFiles(post)}
        </div>
        {!isSearch && getLinkFromPost().length != 0 && (
          <div className="preview-url-wrapper">
            {getLinkFromPost().map((url, index) => {
              return (
                isCheckUrl(url) && (
                  <LinkPreview
                    showLoader={true}
                    key={index}
                    className="preview-url-wrapper__container"
                    url={url}
                    descriptionLength={50}
                  />
                )
              );
            })}
          </div>
        )}

        {isSearch && handleRenderFilesSearch(post)}
        {getUserTags().length != 0 && (
          <p
            style={{
              whiteSpace: "nowrap",
              color: "#414346",
              marginBottom: 0,
            }}
          ></p>
        )}
        {post.Type == 2 && (
          <DetailVote key={post.Id} isSearch={isSearch} data={post} />
        )}
        {!isSearch && post.Files && post.Files.length != 0 && (
          <div>{post?.Files.length != 0 && handleRenderFiles(post)}</div>
        )}
        {!!post.Lat && !isSearch && !!post.Lon && (
          <>
            {post.Address && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 15,
                    height: 0.5,
                    backgroundColor: "#000",
                    marginRight: 8,
                  }}
                />
                <p
                  style={{
                    color: "#414346",
                    marginBottom: 0,
                    marginRight: 8,
                  }}
                >
                  Tại{" "}
                </p>
                <p
                  style={{
                    color: "#414346",
                    marginBottom: 0,
                    fontWeight: "bold",
                  }}
                >
                  {post.Address}
                </p>
              </div>
            )}
            <GGMap lat={post.Lat} lng={post.Lon} />
          </>
        )}
        {!isSearch ? (
          <>
            <div className="post-interative">
              <div
                className={`reaction-wrapper ${post.IsLike ? "active" : ""}`}
                onClick={() =>
                  likePost({
                    id: +post.Id,
                    action: 1,
                    status: post.IsLike ? 0 : 1,
                  })
                }
              >
                {post.IsLike ? (
                  <Tooltip placement="top" title={"Bỏ thích"}>
                    <img src={Like} style={{ color: "red", width: 20 }} />
                  </Tooltip>
                ) : (
                  <Tooltip placement="top" title={"Thích"}>
                    <img src={UnLike} style={{ width: 20 }} />
                  </Tooltip>
                )}
                <p className="like-comment-share">Thích {post.CountLike}</p>
              </div>
              <div
                className="comment-wrapper"
                onClick={() => setIsExpand(!isExpand)}
              >
                <Tooltip placement="top" title={"Trả lời"}>
                  <img
                    src={Comment}
                    alt="commentIcon"
                    style={{ width: "18px !important" }}
                  />
                </Tooltip>
                <p className="like-comment-share">
                  Bình luận {post?.CountComment}
                </p>
              </div>
              <div
                className={`share-wrapper ${isShowShare ? "show-plugin" : ""}`}
                onClick={(e) => showSharePlugin(e)}
              >
                <Tooltip placement="top" title={"Chia sẻ"}>
                  <img src={Share} alt="shareIcon" style={{ width: 20 }} />
                </Tooltip>
                <p className="like-comment-share">Chia sẻ {post?.CountShare}</p>
                <SharePost
                  shareType="post"
                  id={post.Id}
                  type={post.Type}
                  isShow={isShowShare}
                  setIsShowShare={(v) => setIsShowShare(v)}
                />
              </div>
            </div>
          </>
        ) : null}
         
      </div>
      {isSearch ? (
          <>
            <div style={{fontSize: "12px"}}>
              <span style={{marginRight: "24px"}}>{post.CountLike} Thích</span>
              <span>{post?.CountComment} Bình luận</span>
            </div>
          </>
        ) : null}
      {!isSearch && (
        <div className="post-footer">
          {isExpand && <PostComments comments={post.comments} post={post} />}
          <InputComment createComment={handlePushComment} post={post} />
        </div>
      )}

      {showEditModalId != null && (
        <Modal
          title={
            <p style={{ textAlign: "center", margin: 0 }}>Chỉnh sửa bài viết</p>
          }
          visible={showEditModalId === index}
          onOk={() => { }}
          onCancel={() => setShowEditModalId(null)}
          className="post-modal new-post-container-social"
          footer={false}
          closeIcon={<img src={CloseBlack} />}
        >
          {showEditModalId === index && (
            <div style={{ marginTop: "8px" }}>
              <TypeofPosts
                groupId={isGroupPage}
                isEditType={true}
                data={post}
                hideModal={() => handleShowEditModal(null)}
                afterSubmit={afterSubmit}
                type={post.Type == 1 ? "post" : "vote"}
              />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default DetailPost;
