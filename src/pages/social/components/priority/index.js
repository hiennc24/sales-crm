import React, { useEffect, useState } from "react";
import { Avatar, Space, Row, Col, Tooltip } from "antd";
import { getUrlImage } from "../../../../utils";
import avatar from "../../../../assets/images/avatar.svg";
import World from "../../../../assets/new/common/world.svg";
import moreIcon from "../../../../assets/images/more-icon.svg";
import forward from "../../../../assets/new/create-post/forward.png";
import Check from "../../../../assets/new/create-post/check.svg";
import Star from "../../../../assets/new/create-post/star.svg";
import Close from "../../../../assets/new/create-post/close.svg";
import forwardHover from "../../../../assets/new/create-post/forward-hover.png";
import { useSelector, useDispatch } from "react-redux";
import {
  selectListHotPosts,
  selectListAttentionPosts,
  selectListConsideredPosts,
  selectChangeDelete,
  selectPriorityType,
} from "../../../../stores/posts/posts.selector";
import {
  getListAttentionPosts,
  getListHotPosts,
  getListConsideredPosts,
  clearPriorityData,
  updatePriorityProcess,
} from "../../../../stores/posts/posts.action";
import { useHistory } from "react-router-dom";
import { FORMAT_DATE_TIME } from "../../../../constants/config";
import NoData from "../../../../assets/new/common/no-data.svg";
import FormatText3 from "../../../../utils/FormatText3";
import * as moment from "moment";
import "./styles.scss";
import ReactPaginate from "react-paginate";
import AvatarCustom from "../../../../components/avatar-custom";
import EmptyData from '../detail-posts/post/EmptyData';
import PropTypes from "prop-types";

const Priority = ({setCurrentPriorityTab, currentPriorityTab}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );
  const hotPosts = useSelector(selectListHotPosts);
  const changeDelete = useSelector(selectChangeDelete);
  const priorityType = useSelector(selectPriorityType);
  const consideredPosts = useSelector(selectListConsideredPosts);
  const [indexHot, setIndexHot] = useState(1);
  const [indexAttention, setIndexAttention] = useState(1);
  const [indexConsidered, setIndexConsidered] = useState(1);
  const [showMoreHot, setShowMoreHot] = useState(true);
  const [showMoreAttention, setShowMoreAttention] = useState(true);
  const [showMoreConsidered, setShowMoreConsidered] = useState(true);
  const [currentPriority, setCurrentPriority] = useState(currentPriorityTab ?? 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentItemPosts, setCurrentItemPosts] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPost, setCurrentPost] = useState(null);
  const [isBackwardHover, setBackwardHover] = useState(false);
  const [isForwardHover, setForwardHover] = useState(false);
  const [totalRow, setTotalRow] = useState(1);
  const [isProcessed, setProcessed] = useState(false);
  const [isClose, setClose] = useState(true);
  const [isDelete, setIsDelete] = useState(false);



  useEffect(() => {
    console.log("changeDelete1", changeDelete, priorityType, currentPriority);
    if (changeDelete === 0 || priorityType !== currentPriority) return;
    console.log("changeDelete2");
    let curRow = totalRow - 1;
    let curTotalPage =
      curRow % 5 === 0 ? parseInt(curRow / 5) : parseInt(curRow / 5 + 1);
    setCurrentPage(currentPage > curTotalPage ? curTotalPage : currentPage);
    setIsDelete(true);
    getPostsPriority(currentPage > curTotalPage ? curTotalPage : currentPage);
  }, [changeDelete]);
  useEffect(() => {
    if (currentPosts === [] || currentPosts.length === 0) {
      setTotalRow(0);
      return;
    }
    if (currentPosts[0]?.TotalRow >= 0 && !isDelete) {
      const position = 0;
      setCurrentItemPosts(0);
      setCurrentPost(currentPosts[position]);
      setTotalRow(currentPosts[position].TotalRow);
      const currentRow = currentPosts[position].TotalRow;
      currentRow % 5 === 0
        ? setTotalPage(parseInt(currentRow / 5))
        : setTotalPage(parseInt(currentRow / 5 + 1));
      setIsDelete(false);
    }
    if (currentPosts[0] && currentPosts[0]?.TotalRow >= 0 && isDelete) {
      let position =
        currentItemPosts > currentPosts.length - 1
          ? currentPosts.length - 1
          : currentItemPosts;
      position = position === -1 ? (position = 4) : position;
      setCurrentItemPosts(position);
      setCurrentPost(currentPosts[position]);
      setTotalRow(currentPosts[position].TotalRow);
      const currentRow = currentPosts[position].TotalRow;
      currentRow % 5 === 0
        ? setTotalPage(parseInt(currentRow / 5))
        : setTotalPage(parseInt(currentRow / 5 + 1));
      setIsDelete(false);
    }
  }, [currentPosts]);

  useEffect(() => {
    if (hotPosts.length === 0) {
      setCurrentPosts([]);
      return;
    }
    if (typeof hotPosts[0] === "undefined") return;
    if (currentPriority !== hotPosts[0].Priority) {
      return;
    }
    setCurrentPosts(hotPosts);
    setCurrentPost(hotPosts[0])
    setCurrentItemPosts(0);
  }, [hotPosts]);

  useEffect(() => {
    getPostsPriority(1);
    setCurrentPage(1);
    setCurrentItemPosts(0);
 
  }, [currentPriority]);

  useEffect(() => {
    getPostsPriority(currentPage);
  }, [currentPage]);

  // const nextPost = () => {
  //   const position = currentItemPosts + 1;
  //   if (position > 4) {
  //     setCurrentPage(currentPage + 1);
  //     setCurrentItemPosts(0);
  //   } else {
  //     setCurrentItemPosts(position);
  //     setCurrentPost(currentPosts[position]);
  //   }
  // };

  // const previousPost = () => {
  //   const position = currentItemPosts - 1;
  //   if (position < 0) {
  //     getPostsPriority(currentPage - 1);
  //     setCurrentPage(currentPage - 1);
  //     setCurrentItemPosts(4);
  //   } else {
  //     setCurrentItemPosts(position);
  //     setCurrentPost(currentPosts[position]);
  //   }
  // };

  useEffect(() => {
    dispatch(
      getListHotPosts({
        groupId: 0,
        type: 1,
        priority: 1,
        index: 1,
        pageSize: 5,
      })
    );
    return () => {
      dispatch(clearPriorityData());
    };
  }, []);

  const getPostsPriority = (index) => {
    let data = {
      groupId: 0,
      type: 1,
      priority: currentPriority,
      index: index,
      pageSize: 5,
    };

    dispatch(getListHotPosts(data));
  };

  const updateProcessStatus = (type) => {
    //1:PIN 2:PROCESS
    let data = {
      id: currentPost.Id,
      type: 1, //PRCESSED
      status: true,
    };
    if (type === 1) {
      data = {
        id: currentPost.Id,
        type: 0, //UNPIN
        status: true,
      };
    }
    dispatch(updatePriorityProcess(data));
    let newCurrentPosts = [...currentPosts];
    newCurrentPosts = newCurrentPosts.filter(item => item.Id !== currentPost.Id);
    setCurrentPosts([...newCurrentPosts]);
  };

  return (
    <div className="priority" style={{marginTop:0}}>
      <div
        className={`priority-wrapper ${currentPriority === 1
            ? "hot-bg"
            : currentPriority === 2
              ? "attention-bg"
              : "consider-bg"
          } `}
      >
        <div className="priority-type-wrapper">
          <div className="hot" onClick={() => {setCurrentPriority(1); setCurrentPriorityTab(1)}}>
            <p>Quan trọng</p>{" "}
          </div>
          <div className="attention" onClick={() => {setCurrentPriority(2); setCurrentPriorityTab(2)}}>
            <p>Chú ý</p>
          </div>
          <div className="considered" onClick={() => {setCurrentPriority(3); setCurrentPriorityTab(3)}}>
            <p>Lưu tâm</p>
          </div>
        </div>

        <div className="priority-content">
          <div className="priority__item">
            {/* {currentPosts.length > 0 && !!currentPost && ( */}
            {currentPosts.length > 0 && currentPosts.map((currentPost, index) => 
              (
                <div className="priority__itemInfo" key={index}>
                  <Row
                    align="middle"
                    justify="space-between"
                    onClick={() => {
                      history.push(`/detail/1/${+currentPost.Id}`);
                    }}
                  >
                    <Col>
                      <Space>
                        <AvatarCustom
                          src={currentPost.CreatedByAvatar ? getUrlImage(200, 200, currentPost.CreatedByAvatar) : null}
                          size={32}
                          fullName={currentPost?.CreatedByName || 'Anonymous'}
                        />
                        <div>
                          <div className="priority__itemInfo__name">
                            {currentPost?.CreatedByName}
                          </div>
                          <div className="priority__itemInfo__time">
                            {moment(currentPost?.CreatedAt, FORMAT_DATE_TIME)
                              .startOf("minutes")
                              .fromNow()}
                            {/* <img src={World} /> */}
                          </div>
                        </div>
                      </Space>
                    </Col>
  
                    <div className="action-pin-wrapper">
                      {!currentPost.Handled && (
                        <Tooltip placement="top" title={"Đánh dấu đã xử lý"}>
                          <img
                            style={{ paddingRight: "5px" }}
                            src={Check}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateProcessStatus(2);
                            }}
                          />
                        </Tooltip>
                      )}
                      {currentPost.Handled && (
                        <div className="processed-wrapper">
                          <Tooltip placement="top" title={""}>
                            <img style={{ paddingRight: "5px" }} src={Star} />
                            <div className="writing">Đã xử lý</div>
                          </Tooltip>
                        </div>
                      )}
                      {!currentPost.DelPriority && (
                        <Tooltip placement="top" title={"Loại bỏ"}>
                          <img
                            style={{ paddingRight: "5px" }}
                            src={Close}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateProcessStatus(1);
                            }}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </Row>
                  <div
                    className="priority__itemInfo__content"
                    onClick={() => {
                      history.push(`/detail/1/${+currentPost.Id}`);
                    }}
                  >
                    <FormatText3
                      key={currentPost.Id}
                      title={currentPost.Title}
                      content={currentPost.Content}
                      rowsLimit={4}
                      lengthInRow={40}
                    />
                  </div>
                </div>
              )
              ) }
          </div>
          {currentPosts.length === 0 && (
            <div className="no-item">
              <div style={{ textAlign: "center" }}>
                <EmptyData type={'priority'} />
              </div>
            </div>
          )}
          {/* <ul className={"list-posts " + (currentPriority === 1 ? "list-posts-hot-bg" : currentPriority === 2 ? "list-posts-attention-bg" : "list-posts-consider-bg")}>
            {currentPosts.map((item, index) => (
              <li
                onClick={() => {
                  setCurrentPost(currentPosts[index]);
                  setCurrentItemPosts(index);
                }}
                key={index}
                className={`li-item-post${index === currentItemPosts ? " li-item-post-activate" : ""
                  }
                      ${currentPriority === 1
                    ? "hot-bg"
                    : currentPriority === 2
                      ? "attention-bg"
                      : "consider-bg"
                  } 
                      
                      `}
              >
                <div
                  className={
                    index === currentItemPosts
                      ? "current-post item-post"
                      : "item-post"
                  }
                >
                  {index + 1}
                </div>
              </li>
            ))}
          </ul> */}
          
          {/* {totalRow > 5 && (
            <ReactPaginate
              previousLabel={"Trước"}
              nextLabel={"Tiếp"}
              breakLabel={"..."}
              breakClassName={"pagination-break-me"}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={(e) => {
                setCurrentPage(e.selected + 1);
                setCurrentItemPosts(0);
              }}
              containerClassName={"pagination"}
              activeClassName={"pagination-active"}
              forcePage={currentPage - 1}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

Priority.propTypes = {
  setCurrentPriorityTab: PropTypes.func,
  currentPriorityTab: PropTypes.number,
};

export default Priority;
