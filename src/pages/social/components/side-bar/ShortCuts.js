import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CloseOutline } from "@styled-icons/evaicons-outline";
import { Button, Drawer, List } from "antd";
import "./ShortCuts.scss";
import PAGES from "../../../../routes/constants";

import Logo from "../../../..//assets/images/logo.svg";
import FOURDOTS from "../../../../assets/images/4dots.svg";
import { ReactComponent as Group } from "../../../../assets/images/3user.svg";
// import { ReactComponent as CRM } from "../../../../assets/images/crm-icon.svg";
// import { ReactComponent as Document } from "../../../../assets/images/document.svg";
// import { ReactComponent as Calendar } from "../../../../assets/images/calendar.svg";
// import { ReactComponent as TimeCircle } from "../../../../assets/images/time-circle.svg";
// import { ReactComponent as Event } from "../../../../assets/images/event.svg";
import { ReactComponent as Invitation } from "../../../../assets/images/invitation.svg";
import Pin from "../../../../assets/images/pin.svg";
import PinGrey from "../../../../assets/images/pin-grey.svg";

const MyTask = () => {
  const [isShowDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!isShowDrawer);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const dataMenu = [
    // {
    //   id: 1,
    //   title: "Project vs Task",
    //   url: "/",
    //   icon: <Document />,
    //   isPin: true,
    // },
    // { id: 2, title: "CRM", url: "/", icon: <CRM />, isPin: true },
    // { id: 3, title: "Lịch", url: "/", icon: <Calendar />, isPin: true },
    {
      id: 4,
      title: "Nhóm làm việc",
      url: PAGES.groupWork,
      icon: <Group />,
      isPin: false,
    },
    // {
    //   id: 5,
    //   title: "Thời gian báo cáo",
    //   url: "/",
    //   icon: <TimeCircle />,
    //   isPin: false,
    // },
    // { id: 6, title: "Sự kiện", url: "/", icon: <Event />, isPin: false },
    {
      id: 7,
      title: "Mời người dùng",
      url: PAGES.inviteAccount,
      icon: <Invitation />,
      isPin: false,
    },
  ];

  return (
    <div className="short-cuts">
      <h4 className="title">Lối tắt</h4>
      <div className="shortcuts-action-wrapper">
        <div className="shortcuts-action-row">
          <Link to={PAGES.groupWork}>
            <div className="wrapper">
              <div className="shortcuts-action-icon">
                <Group />
              </div>
              <div className="shortcuts-action-text">
                <span>Nhóm làm việc</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="shortcuts-action-row">
          <Link to={PAGES.inviteAccount}>
            <div className="wrapper">
              <div className="shortcuts-action-icon">
                <Invitation />
              </div>
              <div className="shortcuts-action-text">
                <span>Mời người dùng</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="shortcuts-tool">
        <Button className="btn-shortcuts-tool" onClick={toggleDrawer}>
          <span className="shortcuts-tool-icon">
            <img src={FOURDOTS} alt="dots" />
          </span>
          <span className="shortcuts-tool-text">Công cụ</span>
        </Button>
      </div>

      <Drawer
        title={
          <div className="header-drawer">
            <CloseOutline onClick={handleCloseDrawer} />{" "}
            <Link to={PAGES.home}>
              <img src={Logo} alt="logo" />
            </Link>
          </div>
        }
        placement="left"
        closable={false}
        onClose={handleCloseDrawer}
        visible={isShowDrawer}
        className="menu-tool-drawer"
      >
        <List
          dataSource={dataMenu}
          renderItem={(item) => (
            <List.Item>
              <div className="menu-tool-item">
                <Link to={item.url}>
                  <span>
                    {item.icon}
                    <span className="menu-tool-item-text">{item.title}</span>
                  </span>
                </Link>
                <span>
                  {item.isPin ? (
                    <img src={Pin} alt="pin" />
                  ) : (
                    <img src={PinGrey} alt="pin-grey" />
                  )}
                </span>
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
};

MyTask.propTypes = {};

export default MyTask;
