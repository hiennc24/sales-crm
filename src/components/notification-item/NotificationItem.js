import React, { useEffect, useState } from "react";
import { Row, Col, Menu, Dropdown, Avatar } from "antd";
import PropTypes from "prop-types";
import "./NotificationItem.scss";
// import Group from "../../assets/images/groups/group-join.svg";
// import Close from "../../assets/images/close-icon.svg";
import { EllipsisOutlined } from "@ant-design/icons";
import AvatarCustom from '../avatar-custom';
import { getUrlImage } from "../../utils";
import DefaulAvatar from "../../assets/images/avatar_default.jpg";
import Like from "../../assets/new/noti/like.png";
import Comment from "../../assets/new/noti/comment.png";
import Share from "../../assets/new/noti/share.png";
import Group from "../../assets/new/noti/group.png";
import Check from "../../assets/new/noti/danh-dau-da-doc.svg";
import CloseNoti from "../../assets/new/noti/tat-thong-bao.svg";
import RemoveNoti from "../../assets/new/noti/go-thong-bao.svg";
import eventNoti from "../../assets/new/noti/event-noti.png";
import notiPoll from "../../assets/new/noti/noti-poll.png";
import eventIncomingNoti from "../../assets/new/noti/event-incoming-noti.png";
import notiDefault from "../../assets/new/noti/noti-default.png";
import Tag from "../../assets/new/noti/tag.png";
import { FORMAT_DATE_TIME } from "../../constants/config";
import moment from "moment";
import { NavLink, useHistory } from "react-router-dom";
import API from "../../services/api";

// POST : 1,
// TASK : 2,
// EVENT:3,
// VOTE:4,
// LIKE:5,
// SHARED:6,
// CHAT:7,
// INVITE_GROUP:8,
// COMMENT:9,
// TAG:11,
// APPROVE_GROUP:12

const getPostType = type => {
  switch (type) {
    case 3:
      return 3;
    case 4:
      return 2;
    case 8:
    case 12:
      return 4;
    default:
      return 1;

  }
}

const NotificationItem = ({ inPage, isRead, data, setShowDropdownNoti }) => {
  const history = useHistory();

  const handleIconNoti = (type) => {
    switch (type) {
      case 3:
        return eventNoti;
      case 4:
        return notiPoll;
      case 5:
        return Like;
      case 6:
        return Share;
      case 9:
        return Comment;
      case 11:
        return Tag;
      case 8:
      case 12:
        return Group;
      default:
        return notiDefault;
    }
  };

  const onClick = () => {
    if (data.Type === 8) {
      API.notification.seenNoti({ id: data.Id }).then(() => {
        history.push(`/group-work/${data.RefId}`)
        data.IsViewed = true
        setShowDropdownNoti(false)
      })
    } else {
      API.notification.seenNoti({ id: data.Id }).then(() => {
        if (data.Type === 3) {
          history.push(`/event/${data.RefId}`);
        } else {
          history.push(`/detail/${getPostType(data.Type)}/${data.RefId}`);
        }
        data.IsViewed = true;
        setShowDropdownNoti(false)
      });
    }
  };

  const menu = (
    <div className="noti-item-dropdown">
      <Menu>
        <Menu.Item key="0">
          <span className="noti-item-dropdown-icon">
            <img src={Check} alt="check" />
          </span>
          <span className="noti-item-dropdown-text">Đánh dấu đã đọc </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <span className="noti-item-dropdown-icon">
            <img src={RemoveNoti} alt="check" className="pg--5" />
          </span>
          <span className="noti-item-dropdown-text">Gỡ thông báo này</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <span className="noti-item-dropdown-icon">
            <img src={CloseNoti} alt="check" />
          </span>
          <span className="noti-item-dropdown-text">
            Tắt thông báo từ {data?.FullName}
          </span>
        </Menu.Item>
      </Menu>
    </div>
  );

  const getMsg = () => {
    if (data.Type === 8 && data.Msg && data.Msg.includes('có người xin vào group')) {
      return " đã yêu cầu tham gia"
    }
    return data.Msg
  }

  const getContent = () => {
    if (data.Details) {
      const detail = data.Details;
      if (detail.Title) {
        return ": " + detail.Title;
      } else if (detail.Content) {
        var text = detail.Content;
        if (text.length < 20) return ": " + text;
        return ": " + text.substring(0, 20) + "...";
      }
    }
    return "";
  };
  
  return (
    <div className={`notification-item ${isRead ? "read" : ""} ${data.IsViewed ? "item-viewed" : ""}`}>
      <Row gutter={[16, 32]} onClick={onClick}>
        <Col span={2} className="notification-item-avatar-col">
          <div className="notification-item-avatar">
            {/* <Avatar size={32}
              src={
                data && data.Avatar
                  ? getUrlImage(200, 200, data.Avatar)
                  : DefaulAvatar
              }
              alt="avatar"
            /> */}
            <AvatarCustom
              src={data && data.Avatar ? getUrlImage(200, 200, data.Avatar) : ''}
              size={32}
              fullName={data?.FullName || 'Anonymous'}
            />
            <span className="span-type">
              {/* Change Icon Type of Noti Here */}
              {/* {handleIconNoti(data?.type)} */}
              <img src={handleIconNoti(data?.Type)} />
            </span>
          </div>
        </Col>
        <Col span={22} className="notification-item-info-col">
          <div className="notification-item-name">
            <span className="full-name">{data?.FullName}</span>
            <span style={{ wordBreak: 'break-all' }}> {getMsg()}<span className='content'>{getContent()}</span></span>
          </div>
          <div className="notification-item-info">
            <span className='time'>{moment(data?.CreatedAt, FORMAT_DATE_TIME).startOf('minute').fromNow()}</span>
            {/* <span className={`${data.IsViewed ? '' : 'time'}`}>{moment(data?.CreatedAt, FORMAT_DATE_TIME).startOf('minute').fromNow()}</span> */}
          </div>
        </Col>
      </Row>
      <div className="notification-item-more">
        {data.IsViewed ? null : (
          // <Dropdown
          //   overlay={menu}
          //   trigger={["click"]}
          //   overlayClassName="noti-item-dropdown-overlay"
          //   placement="bottomRight"
          // >
          //   <EllipsisOutlined />
          // </Dropdown>
          <div className="circle"></div>
        )}
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  inPage: PropTypes.bool,
  isRead: PropTypes.bool,
  data: PropTypes.any,
  setShowDropdownNoti: PropTypes.func
};

NotificationItem.defaultProps = {
  inPage: false,
  isRead: false,
  data: {},
  setShowDropdownNoti: () => { }
};

export default NotificationItem;
