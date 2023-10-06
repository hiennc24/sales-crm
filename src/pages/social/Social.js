import React, { useEffect, useState, useRef, useMemo } from "react";
import { Empty, Tooltip } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import LayoutMain from "../../components/LayoutMain";
// import RecentNews from './components/recent-news/RecentNews';
// import MyTask from "./components/my-task/MyTask";
// import Shortcuts from './components/shortcuts/ShortCuts';
import SideBar from "../../components/sidebar";

import NewPost from "./components/new-post/NewPost";
import HeaderPost from "./components/new-post/HeaderPost";
import FinanceSlice from "./components/finance-slice/FinanceSlice";
import EventList from "./components/event-list/EventList";
import ChatBox from "./components/chat-box/ChatBox";
import DetailPosts from "./components/detail-posts/DetailPosts";
import Priority from "./components/priority";
import API from "../../services/api";
import ChatRoom from "./components/chat-room/ChatRoom";
import SearchType from "./components/search-type/SearchType";
import { useDispatch, useSelector } from "react-redux";
import ListGroupGrid from "../group/components/list-group-grid/ListGroupGrid";
import ListGroupSearch from "../group/components/list-group-search/ListGroupSearch";
import Calendar from "../../pages/calendar/Calendar";

import { clearListGroup } from "../group/Group.action";
import { Button } from "antd";
import { toggleHeaderPostAction } from "../../stores/global/global.action";
import { useCookies } from "react-cookie";
import TodoTable from "./components/todo-table";
import Todo from "./components/detail-posts/todo/Todo";
import { PrevSolidYellowIcon } from "./icon";
import ChatModal from "../../components/chat-modal";
import ChartIcon from "../../assets/new/common/chart.svg";
import FlagRedIcon from "../../assets/new/common/flag-red.svg";
import FlagYellowIcon from "../../assets/new/common/flag-yellow.svg";
import FlagGreenIcon from "../../assets/new/common/flag-green.svg";
import MessIcon from "../../assets/new/common/textsms.svg";
import CloseIcon from "../../assets/new/messenger/close2.svg";
import featureComming from '../../assets/new/calendar/feature-comming.png'

const Social = () => {
  const [listEmployee, setListEmployee] = useState([]);
  const [isExpand, setIsExpand] = useState(true);
  const [type, changeType] = useState("post");
  const detailPostsRef = useRef();
  const dispatch = useDispatch();
  const typeList = useSelector((state) => state.get("global").get("typeList"));
  const [collapseLevel1, setCollapseLevel1] = useState(true);
  const [collapseLevel2, setCollapseLevel2] = useState(true);
  const collapseLeft = useSelector((state) =>
    state.get("global").get("expandCollapseLeft")
  );
  const collapseRight = useSelector((state) =>
    state.get("global").get("expandCollapseRight")
  );
  const [isHeaderPost, setIsHeaderPost] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["@isHeaderPost"]);
  const [menuRightType, setMenuRightType] = useState(null);
  const [currentPriorityTab, setCurrentPriorityTab] = useState(1);

  useEffect(() => {
    if (collapseLeft && collapseRight) {
      setCollapseLevel1(true);
      setCollapseLevel2(true);
    } else if (collapseLeft || collapseRight) {
      setCollapseLevel1(true);
      setCollapseLevel2(false);
    } else {
      setCollapseLevel1(false);
      setCollapseLevel2(false);
    }
  }, [collapseLeft, collapseRight]);


  const expandCollapse = useSelector((state) =>
    state.get("global").get("expandCollapse")
  );

  function onChangeType(v) {
    changeType(v);
  }

  const onChange = (v) => {
    onChangeType(v);
    window.scrollTo({ y: 0 })

    if (
      typeList === "todo" ||
      typeList === "group" ||
      typeList === "calendar"
    ) {
      return;
    }
    detailPostsRef.current.getData();
  };

  const handleToggleHeaderPost = () => {
    console.log(isHeaderPost, cookies["@isHeaderPost"]);
    setCookie("@isHeaderPost", !isHeaderPost);
    setIsHeaderPost(!isHeaderPost);
    // dispatch(toggleHeaderPostAction());
  };

  useEffect(() => {
    API.employee.getEmployeeByName("").then((res) => {
      if (res.code === 200) {
        setListEmployee(
          res.data.map((e) => {
            return { ...e, FullName: e.FullName || e.Email };
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    if (cookies["@isHeaderPost"] === undefined) return setIsHeaderPost(true);
    setIsHeaderPost(cookies["@isHeaderPost"] === "true");
  }, []);

  // useMemo(() => {
  //   console.log(typeList)
  // }, [typeList])

  console.log("typeList", typeList);
  return (
    <>
      {/* <ChatModal /> */}
      <LayoutMain>
        <div className="common--layout">
          <div
            className={`common--layout__sidebar ${collapseLevel1 ? "level1" : ""
              } ${collapseLevel2 ? "level2" : ""}`}
          >
            <SideBar title="InCom" />
          </div>
          <div
            className={`common--layout__main ${collapseLevel1 ? "level1" : ""
              } ${collapseLevel2 ? "level2" : ""}`}
            style={!collapseLevel1 ? {
              width: !menuRightType
                ? `calc(100% - 247px - 54px - 132px ${collapseLevel2 ? '+ 160px': ''})`
                : `calc(100% - 247px - 26% - 132px ${collapseLevel2 ? '+ 160px': ''})`,
            } : 
            {
              width: !menuRightType
                ? `calc(100% - 247px - 54px ${collapseLevel2 ? '+ 160px': ''})`
                : `calc(100% - 247px - 26% ${collapseLevel2 ? '+ 160px': ''})`,
            }
          }
          >
            {expandCollapse && isHeaderPost ? (
              <HeaderPost onCloseClick={handleToggleHeaderPost} />
            ) : (
              <div className="expand-header-post-btn">
                <button
                  type="button"
                  onClick={handleToggleHeaderPost}
                  style={{
                    padding: "0px",
                    margin: "0px",
                    border: "none",
                    cursor: "pointer",
                    background: "none",
                  }}
                >
                  <PrevSolidYellowIcon
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
              </div>
            )}
            <div style={{ position: "sticky", top: "40px", zIndex: "100" }}>
              <NewPost type={typeList} changeType={(e) => onChange(e)} />
            </div>

            {typeList !== "todo" && <SearchType typeList={typeList} />}

            {/* {typeList === 'group'
      ? <>
        <ListGroupSearch isShowSearch={false} keySearch="" isSearchPage={false} />
        <ListGroupGrid />
      </>
      : typeList === 'calendar'
        ? <Calendar />
        : typeList !== 'todo' ? <DetailPosts ref={detailPostsRef} type={type} /> : <><TodoTable/></>
    } */}
            {typeList === "group" ? (
              <>
                <ListGroupSearch
                  isShowSearch={false}
                  keySearch=""
                  isSearchPage={false}
                />
                <ListGroupGrid />
              </>
            ) : typeList === "calendar" ? (
              <div style={{ marginTop: "50px" }}>
                <Empty
                  image={<img src={featureComming} alt="featureComming" />}
                  description={<div><p style={{ fontSize: "16px", fontWeight: "500" }}>Tính năng sắp ra mắt</p></div>}
                />
              </div>
            ) : typeList === "todo" ? (
              <Todo />
            ) : (
              <DetailPosts ref={detailPostsRef} type={typeList} />
            )}
          </div>
          <div
            className="common--layout__right"
            style={{
              display: "flex",
              width: !menuRightType ? 54 : "26%",
              marginRight: !menuRightType ? 2 : 0,
            }}
          >
            <div
              className="menu-right"
              style={{
                height: "100%",
                backgroundColor: "#F3F4F6",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 20,
                boxShadow: "1px 0px 4px rgba(39, 39, 39, 0.2)",
              }}
            >
              <div
                style={{
                  padding: 6,
                  marginBottom: 16,
                  cursor: "pointer",
                  borderRadius: "100%",
                  backgroundColor: !menuRightType
                    ? "rgba(47, 206, 0, 0.1)"
                    : menuRightType === "finance"
                      ? "#fff"
                      : null,
                }}
                onClick={() => setMenuRightType("finance")}
              >
                <Tooltip placement="left" title="Finance">
                  <img
                    src={ChartIcon}
                    style={{ width: 24, maxWidth: "none" }}
                  ></img>
                </Tooltip>
              </div>
              <div
                style={{
                  padding: 6,
                  marginBottom: 16,
                  borderRadius: "100%",
                  cursor: "pointer",
                  backgroundColor:
                    menuRightType === "prioritize" ? "#fff" : null,
                }}
                onClick={() => setMenuRightType("prioritize")}
              >
                <Tooltip placement="left" title="Ưu tiên">
                  {currentPriorityTab === 1 && (
                    <img
                      src={FlagRedIcon}
                      style={{ width: 24, maxWidth: "none", }}
                    ></img>
                  )}
                  {currentPriorityTab === 2 && (
                    <img
                      src={FlagYellowIcon}
                      style={{ width: 24, maxWidth: "none" }}
                    ></img>
                  )}
                  {currentPriorityTab === 3 && (
                    <img
                      src={FlagGreenIcon}
                      style={{ width: 24, maxWidth: "none" }}
                    ></img>
                  )}
                </Tooltip>
              </div>
              <div
                style={{
                  padding: 6,
                  marginBottom: 16,
                  borderRadius: "100%",
                  cursor: "pointer",
                  backgroundColor: menuRightType === "chatbox" ? "#fff" : null,
                }}
                onClick={() => setMenuRightType("chatbox")}
              >
                <Tooltip placement="left" title="Chat box">
                  <img
                    src={MessIcon}
                    style={{ width: 24, maxWidth: "none" }}
                  ></img>
                </Tooltip>
              </div>
            </div>
            {/* <Scrollbars autoHide style={{ height: "100%" }}>
      {expandCollapse && <FinanceSlice />}
      <Priority />
      <ChatBox listMember={listEmployee} />
      <ChatRoom />
    </Scrollbars> */}
            {menuRightType === "finance" && (
              <Scrollbars
                autoHide
                style={{
                  height: "100%",
                  boxShadow: "1px 0px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "16px 16px",
                    alignItems: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={CloseIcon}
                    style={{ marginRight: 16, height: 15, cursor: "pointer" }}
                    onClick={() => { setMenuRightType(null); setCurrentPriorityTab(1); }}
                  ></img>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "rgba(39, 39, 39, 0.8)",
                    }}
                  >
                    Finance slice box
                  </div>
                </div>
                <div style={{ height: 4, backgroundColor: "#E9F4F0" }}></div>
                {expandCollapse && <FinanceSlice />}
              </Scrollbars>
            )}
            {menuRightType === "prioritize" && (
              <Scrollbars
                autoHide
                style={{
                  height: "100%",
                  boxShadow: "1px 0px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "16px 16px",
                    alignItems: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={CloseIcon}
                    style={{ marginRight: 16, height: 15, cursor: "pointer" }}
                    onClick={() => setMenuRightType(null)}
                  ></img>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "rgba(39, 39, 39, 0.8)",
                    }}
                  >
                    {currentPriorityTab === 1 && "Thông tin quan trọng"}
                    {currentPriorityTab === 2 && "Thông tin cần chú ý"}
                    {currentPriorityTab === 3 && "Thông tin cần lưu tâm"}
                  </div>
                </div>
                <div style={{ height: 4, backgroundColor: "#E9F4F0" }}></div>
                <Priority setCurrentPriorityTab={setCurrentPriorityTab} />
              </Scrollbars>
            )}
            {menuRightType === "chatbox" && (
              <Scrollbars
                autoHide
                style={{
                  height: "100%",
                  boxShadow: "1px 0px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "16px 16px",
                    alignItems: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={CloseIcon}
                    style={{ marginRight: 16, height: 15, cursor: "pointer" }}
                    onClick={() => setMenuRightType(null)}
                  ></img>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "rgba(39, 39, 39, 0.8)",
                    }}
                  >
                    Chat box
                  </div>
                </div>
                <div style={{ height: 4, backgroundColor: "#E9F4F0" }}></div>
                <ChatRoom />
              </Scrollbars>
            )}
          </div>
        </div>
      </LayoutMain>
    </>
  );
};

Social.propTypes = {};

export default Social;
