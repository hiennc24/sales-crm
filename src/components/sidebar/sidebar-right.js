import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Tooltip } from "antd";
import SocialIcon from "../../assets/new/side-bar/social-active-icon.svg";
import NewsIcon from "../../assets/new/side-bar/newsIcon.png";
import PageIcon from "../../assets/new/side-bar/pages-active-icon.svg";
import VideoIcon from "../../assets/new/side-bar/video elearing.svg";
import LiveIcon from "../../assets/new/side-bar/video-cam.svg";
import OJTIcon from "../../assets/new/side-bar/ojt-active-icon.svg";
import SocialActiveIcon from "../../assets/new/side-bar/social-active-icon.svg";
import NewsActiveIcon from "../../assets/new/side-bar/news-active-icon.svg";
import PageActiveIcon from "../../assets/new/side-bar/pages-active-icon.svg";
import VideoActiveIcon from "../../assets/new/side-bar/video elearing.svg";
import LiveActiveIcon from "../../assets/new/side-bar/video-cam.svg";
import OJTActiveIcon from "../../assets/new/side-bar/ojt-active-icon.svg";
import ChatIcon from "../../assets/new/side-bar/chat.svg";
import ChatActiveIcon from "../../assets/new/header/chat-icon.svg";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { useRecoilState } from "recoil";
import { openChatModalState } from "../../recoil/chat-atom";

const listItemSideBar1 = [
  {
    id: uuid(),
    key: 0,
    title: "Social",
    icon: SocialIcon,
    iconActive: SocialActiveIcon,
    linkTo: "/",
  },
  {
    id: uuid(),
    key: 1,
    title: "News",
    icon: NewsIcon,
    iconActive: NewsActiveIcon,
    linkTo: "/",
  },
  {
    id: uuid(),
    key: 6,
    title: "Chat",
    icon: ChatIcon,
    iconActive: ChatActiveIcon,
    linkTo: "/messages-box",
  },
  // { id: uuid(), key: 2, title: 'Page & Blog', icon: PageIcon, iconActive: PageActiveIcon, linkTo: "/" }
];
const listItemSideBar2 = [
  {
    id: uuid(),
    key: 3,
    title: "Video Learning",
    icon: VideoIcon,
    iconActive: VideoActiveIcon,
    linkTo: "/",
  },
  {
    id: uuid(),
    key: 4,
    title: "Live Class",
    icon: LiveIcon,
    iconActive: LiveActiveIcon,
    linkTo: "/",
  },
  {
    id: uuid(),
    key: 5,
    title: "My OJT",
    icon: OJTIcon,
    iconActive: OJTActiveIcon,
    linkTo: "/",
  },
];

const blocksItem = {
  [uuid()]: {
    name: "listItemSideBar1",
    items: listItemSideBar1,
  },
  // [uuid()]: {
  //   name: "listItemSideBar2",
  //   items: listItemSideBar2
  // },
};

const SidebarRight = () => {
  const [isOpenChatModal, setIsOpenChatModal] =
    useRecoilState(openChatModalState);
  const history = useHistory();
  const [columns, setColumns] = useState([]);
  const collapseRight = useSelector((state) =>
    state.get("global").get("expandCollapseRight")
  );

  useEffect(() => {
    const sideBar = localStorage.getItem("sidebar");
    if (sideBar) {
      setColumns(JSON.parse(sideBar));
    } else {
      setColumns(blocksItem);
    }
  }, []);

  // useEffect(() => {
  //     console.log(history.location.pathname)
  // }, [history.location])

  const isCheckActive = (item) => {
    var pathname = history.location.pathname;
    if (item.key === 1 && pathname === "/") {
      return true;
    }
    if (item.key === 6 && pathname === "/messages-box") return true;
    return false;
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const _column = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
      localStorage.setItem("sidebar", JSON.stringify(_column));
      setColumns(_column);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const _column = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
      localStorage.setItem("sidebar", JSON.stringify(_column));
      setColumns(_column);
    }
  };

  const goTo = (item) => {
    // console.log(item)
    // if (item && (item.key === 6)) {
    //   setIsOpenChatModal(true)
    // }
    // else {
    //   history.push(item.linkTo)
    // }
    history.push(item.linkTo);
  };

  useEffect(() => {
    Object.entries(columns).map(([columnId, column], index) => {
      // console.log('COLOUMN', column);
    });
  }, []);

  return (
    <div>
      {collapseRight ? (
        <div>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <>
                <div
                  className={`sidebar--layout__right--divide ${
                    collapseRight ? "collapse" : ""
                  }`}
                  style={{ borderBottom: "1px solid #C4C4C4" }}
                ></div>
                <div
                  className="sidebar--layout__right--block"
                  style={{
                    width: "100%",
                  }}
                >
                  {column.items.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => goTo(item)}
                        className={`sidebar--layout__right--block__item ${
                          isCheckActive(item) ? "active" : ""
                        }`}
                        style={{
                          userSelect: "none",
                        }}
                      >
                        <Tooltip placement="right" title={item.title}>
                          <img
                            className="sidebar--layout__right--block__item--icon"
                            src={
                              isCheckActive(item) ? item.iconActive : item.icon
                            }
                            width={24}
                            height={24}
                          ></img>
                        </Tooltip>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div key={columnId}>
                <div
                  className="sidebar--layout__right--divide"
                  style={{ borderBottom: "1px solid #C4C4C4" }}
                ></div>
                <div style={{ margin: "8px 0px" }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="sidebar--layout__right--block"
                          style={{
                            width: "100%",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      onClick={() => goTo(item)}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`sidebar--layout__right--block__item ${
                                        isCheckActive(item) ? "active" : ""
                                      }`}
                                      style={{
                                        userSelect: "none",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <img
                                        className="sidebar--layout__right--block__item--icon"
                                        src={
                                          isCheckActive(item)
                                            ? item.iconActive
                                            : item.icon
                                        }
                                        width={24}
                                        height={24}
                                      ></img>
                                      <div>
                                        <span className="sidebar--layout__right--block__item--title">
                                          {item.title}
                                        </span>
                                        {item.titleSub && (
                                          <span
                                            className="sidebar--layout__right--block__item--title"
                                            style={{ float: "left" }}
                                          >
                                            {item.titleSub}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      )}
    </div>
  );
};
export default SidebarRight;
