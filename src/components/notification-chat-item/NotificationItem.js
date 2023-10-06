import React, { useEffect } from "react";
import { Row, Col, Menu, Dropdown } from "antd";
import PropTypes from "prop-types";
import "./NotificationItem.scss";
import Group from "../../assets/images/groups/group-join.svg";
import Close from "../../assets/images/close-icon.svg";
import Check from "../../assets/images/check.svg";
import { EllipsisOutlined } from "@ant-design/icons";
import { getUrlImage } from "../../utils";
import { useHistory } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";

const NotificationChatItem = ({ inPage, isRead, data }) => {
  let history = useHistory();
  const diff_hours = (time) => {
    let current = new Date().getTime();
    let tm = new Date(time).getTime();
    var diff = (current - tm) / 1000;
    if (diff >= 3600) {
      diff /= 3600;
      return `${Math.abs(Math.round(diff))} giờ trước`;
    } else if (60 <= diff && diff < 3600) {
      diff /= 60;
      return `${Math.abs(Math.round(diff))} phút trước`;
    } else {
      return `${Math.abs(Math.round(diff))} giây trước`;
    }
  };

  useEffect(() => {
    
  }, [])

  const menu = (
    <div className="noti-item-dropdown">
      <Menu>
        <Menu.Item key="0">
          <span className="noti-item-dropdown-icon">
            <img src={Check} alt="check" />
          </span>
          <span className="noti-item-dropdown-text">Đánh dấu đã đọc</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span className="noti-item-dropdown-icon">
            <img src={Close} alt="check" />
          </span>
          <span className="noti-item-dropdown-text">Gỡ thông báo này</span>
        </Menu.Item>
        <Menu.Item key="3">
          <span className="noti-item-dropdown-icon">
            <img src={Close} alt="check" />
          </span>
          <span className="noti-item-dropdown-text">
            Tắt thông báo từ {data.FullName}
          </span>
        </Menu.Item>
      </Menu>
    </div>
  );
  const selectContact = (data) => {
    localStorage.setItem("selectContact", JSON.stringify(data));
    handleSelectAll();
  };
  const handleSelectAll = () => {
    history.push("/messages-box");
  };
  return (
    <div className={`notification-item ${isRead ? "read" : ""}`}>
      <Row gutter={[16]} onClick={() => selectContact(data.user)}>
        <Col span={2} className="notification-item-avatar-col">
          <div className="notification-item-avatar">
            <Avatar
              src={
                data.user.Avatar !== ""
                  ? getUrlImage(200, 200, data.user.Avatar)
                  : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              }
              alt="avatar"
            />
            <span className="span-type">
              {/* Change Icon Type of Noti Here */}
              <img src={Group} />
            </span>
          </div>
        </Col>
        <Col span={22} className="notification-item-info-col">
          <div className="notification-item-name">
            <span className="name">{data.user.FullName}</span>
            <span className="time">{diff_hours(data.time)}</span>
          </div>
          <div className="notification-item-info">
            <span>Đã nhắn tin cho bạn</span>
          </div>
        </Col>
      </Row>
      <div className="notification-item-more">
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          overlayClassName="noti-item-dropdown-overlay"
        >
          <EllipsisOutlined />
        </Dropdown>
      </div>
    </div>
  );
};

NotificationChatItem.propTypes = {
  inPage: PropTypes.bool,
  isRead: PropTypes.bool,
  data: PropTypes.any,
};

export default NotificationChatItem;
