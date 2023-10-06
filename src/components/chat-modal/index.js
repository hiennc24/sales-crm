import React, { useState, useEffect, useMemo } from "react";
import "./ChatModal.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { MessageBox } from "../../pages/social/components/messages/message-box";
import { openChatModalState } from "../../recoil/chat-atom";
import { Drawer, Space, Button } from "antd";
import { MessageModalContent } from "../../pages/social/components/messages/MessageModalContent";
import { useHistory } from "react-router-dom";
export default function ChatModal(props) {
  const history = useHistory();
  const [isOpenChatModal, setIsOpenChatModal] =
    useRecoilState(openChatModalState);
  const [isTopResizing, setIsTopResizing] = useState(false);
  const [height, setHeight] = useState(window.innerHeight - 40);
  const [isLeftResizing, setIsLeftResizing] = useState(false);
  const [isRightResizing, setIsRightResizing] = useState(false);
  const [width, setWidth] = useState(window.innerWidth - 17);
  const [leftDistance, setLeftDistance] = useState(0);
  const [rightDistance, setRightDistance] = useState(0);

  const [position, setPosition] = useState("right");

  const onClose = () => {
    setIsOpenChatModal(false);
  };

  const onMouseTopDown = (e) => {
    setIsTopResizing(true);
  };

  const onMouseTopUp = (e) => {
    setIsTopResizing(false);
  };

  const onMouseTopMove = (e) => {
    if (isTopResizing) {
      let offsetBottom =
        document.body.offsetHeight - (e.clientY - document.body.offsetTop);
      const minHeight = 200;
      const maxHeight = window.innerHeight - 60;
      if (offsetBottom > minHeight && offsetBottom < maxHeight) {
        setHeight(offsetBottom);
      }
    }
  };

  const onMouseLeftDown = (e) => {
    setIsLeftResizing(true);
    setPosition("right");
  };

  const onMouseLeftUp = (e) => {
    setIsLeftResizing(false);
  };

  const onMouseLeftMove = (e) => {
    if (isLeftResizing) {
      let offsetRight =
        document.body.offsetWidth - (e.clientX - document.body.offsetLeft) - rightDistance;
      const minWidth = 960;
      const maxWidth = window.innerWidth - 17;
      if (offsetRight > minWidth && offsetRight < maxWidth) {
        const leftDistanceValue = leftDistance + width - offsetRight;
        setLeftDistance(leftDistanceValue);
        setWidth(offsetRight);
      }
    }
  };

  const onMouseRightDown = (e) => {
    setIsRightResizing(true);
    setPosition("left");
  };

  const onMouseRightUp = (e) => {
    setIsRightResizing(false);
  };

  const onMouseRightMove = (e) => {
    if (isRightResizing) {
      let offsetRight =
      window.innerWidth - 17 - (document.body.offsetWidth - (e.clientX - document.body.offsetLeft)) - leftDistance;
      const minWidth = 960;
      const maxWidth = window.innerWidth - 17;
      if (offsetRight > minWidth && offsetRight < maxWidth) {
        const rightDistanceValue = rightDistance + width - offsetRight;
        setRightDistance(rightDistanceValue);
        setWidth(offsetRight);
      }

    }
  };

  const handleZoomOut = () => {
    setHeight(window.innerHeight - 40);
    setWidth(window.innerWidth - 17);
    setLeftDistance(0);
    setRightDistance(0);
  }

  // useEffect(() => {
    
  // },[isOpenChatModal])

  useEffect(() => {
    document.addEventListener("mousemove", onMouseRightMove);
    document.addEventListener("mouseup", onMouseRightUp);

    return () => {
      document.removeEventListener("mousemove", onMouseRightMove);
      document.removeEventListener("mouseup", onMouseRightUp);
    };
  }, [isRightResizing]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseLeftMove);
    document.addEventListener("mouseup", onMouseLeftUp);

    return () => {
      document.removeEventListener("mousemove", onMouseLeftMove);
      document.removeEventListener("mouseup", onMouseLeftUp);
    };
  }, [isLeftResizing]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseTopMove);
    document.addEventListener("mouseup", onMouseTopUp);

    return () => {
      document.removeEventListener("mousemove", onMouseTopMove);
      document.removeEventListener("mouseup", onMouseTopUp);
    };
  }, [isTopResizing]);

  return (
    <>
      {isOpenChatModal && (
        <div
          backgroundcolor="#E9F0F4"
          tabIndex={-1}
          className="ant-drawer ant-drawer-bottom ant-drawer-open chat-modal"
          style={{}}
        >
          <div className="ant-drawer-mask" onClick={onClose}/>
          <div
            className="ant-drawer-content-wrapper"
            style={
              { height: height, width: width, right: rightDistance, left: leftDistance }
            }
          >
            <div className="ant-drawer-content">
              <div className="ant-drawer-wrapper-body" style={{}}>
                {/* <div className="ant-drawer-header">
                  <div className="ant-drawer-title">Tin nhắn</div>
                  <button
                    type="button"
                    aria-label="Close"
                    className="ant-drawer-close"
                    style={{ scrollBar: "17px" }}
                    onClick={onClose}
                  >
                    <span
                      role="img"
                      aria-label="close"
                      className="anticon anticon-close"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="close"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                      </svg>
                    </span>
                  </button>
                </div> */}
                <div className="ant-drawer-body" style={{paddingBottom:0}}>
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "5px",
                      padding: "4px 0 0",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      zIndex: 100,
                      cursor: "n-resize",

                    }}
                    onMouseDown={onMouseTopDown}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: "5px",
                      padding: "4px 0 0",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      zIndex: 100,
                      cursor: "ew-resize",

                    }}
                    onMouseDown={onMouseLeftDown}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: "5px",
                      padding: "4px 0 0",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 100,
                      cursor: "ew-resize",

                    }}
                    onMouseDown={onMouseRightDown}
                  />
                  {/* <div
                    style={{
                      position: "absolute",
                      // width: "120px",
                      // height: "35px",
                      padding: "6px 10px",
                      top: 9,
                      right: 68,

                      zIndex: 100,
                      cursor: "pointer",
                      // backgroundColor: "red" ,
                      border: "1px solid rgba(39, 39, 39, 0.2)",
                      borderRadius: 2,
                    }}
                    onClick={() => {
                      onClose();
                      history.push("/messages-box");
                    }}
                  >
                    Xem tất cả trong chat
                  </div> */}
                  <div
                    style={{
                      marginTop: "-75px",
                      backgroundColor: "#E6E6E6",
                      marginRight: -24,
                      marginLeft: -24,
                      paddingLeft: 4,
                      paddingRight: 4,
                      height: "calc(100% + 75px)",
                      overflowY: "hidden",
                    }}
                  >
                    <MessageModalContent onClose={onClose} handleZoomOut={handleZoomOut} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
