import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";

import LayoutSetting from "../../components/LayoutSetting";
import "./Setting.scss";
import { getMenuSetting } from "../../utils";
import { getSetting } from "./Setting.action";
import { selectSettings, selectLoading } from "./Setting.selector";
import API from "../../services/api";
import toaster from "../../components/toaster";
import { PROCESS_SUCCESS } from "../../constants/strings";
import BoxLoading from "../../components/box-loading/BoxLoading";
import { Row, Col, Card, Space, Divider } from "antd";

import Noti from "../../assets/new/setting/notification.png";
import Comment from "../../assets/new/setting/comment.png";
import Chat from "../../assets/new/setting/chat.png";
import Tag from "../../assets/new/setting/tag.png";
import Event from "../../assets/new/setting/event.png";
import Group from "../../assets/new/setting/group.png";
import LayoutMain from "../../components/LayoutMain";
import Scrollbars from "react-custom-scrollbars";
import SideBar from "../../components/sidebar";
;

const Setting = () => {
  const dispatch = useDispatch();
  const setting = useSelector(selectSettings());
  const loading = useSelector(selectLoading());

  const [noti, setNoti] = useState(true);
  const [comment, setComment] = useState(true);
  const [message, setMessage] = useState(true);
  const [tag, setTag] = useState(true);
  const [event, setEvent] = useState(true);
  const [group, setGroup] = useState(true);

  const [collapseLevel1, setCollapseLevel1] = useState(true)
  const [collapseLevel2, setCollapseLevel2] = useState(true)
  const collapseLeft = useSelector(state => state.get('global').get('expandCollapseLeft'))
  const collapseRight = useSelector(state => state.get('global').get('expandCollapseRight'))

  useEffect(() => {
    if (collapseLeft && collapseRight) {
      setCollapseLevel1(true)
      setCollapseLevel2(true)
    }
    else if (collapseLeft || collapseRight) {
      setCollapseLevel1(true)
      setCollapseLevel2(false)
    }
    else {
      setCollapseLevel1(false)
      setCollapseLevel2(false)
    }
  }, [collapseLeft, collapseRight])

  const menu = getMenuSetting("setting");
  const mapType = {
    noti: 1,
    comment: 2,
    message: 3,
    tag: 4,
    event: 5,
    group: 6,
  };

  useEffect(() => {
    dispatch(getSetting());
  }, []);

  useEffect(() => {
    if (setting) {
      setNoti(setting.Notification || false);
      setComment(setting.Comment || false);
      setMessage(setting.Message || false);
      setTag(setting.Tag || false);
      setEvent(setting.Event || false);
      setGroup(setting.Groups || false);
    }
  }, [setting]);

  const handleUpdateSetting = (type, status) => {
    API.setting
      .updateSetting({
        type: mapType[type],
        status,
      })
      .then((result) => {
        if (result?.code === 200 && result?.message === PROCESS_SUCCESS) {
          switch (type) {
            case "noti":
              setNoti(result?.data.Notification);
              break;
            case "comment":
              setComment(result?.data.Comment);
              break;
            case "message":
              setMessage(result?.data.Message);
              break;
            case "tag":
              setTag(result?.data.Tag);
              break;
            case "event":
              setEvent(result?.data.Event);
              break;
            case "group":
              setGroup(result?.data.Groups);
              break;
            default:
              break;
          }
        } else {
          toaster.error("Thất bại");
        }
      })
      .catch((e) => {
        toaster.error(e);
      });
  };

  const handleChangeSettingNoti = () => {
    handleUpdateSetting("noti", !noti);
  };

  const handleChangeSettingComment = () => {
    handleUpdateSetting("comment", !comment);
  };

  const handleChangeSettingMessage = () => {
    handleUpdateSetting("message", !message);
  };

  const handleChangeSettingTag = () => {
    handleUpdateSetting("tag", !tag);
  };

  const handleChangeSettingEvent = () => {
    handleUpdateSetting("event", !event);
  };

  const handleChangeSettingGroup = () => {
    handleUpdateSetting("group", !group);
  };

  return (
    <LayoutMain>
      <div className="common--layout">
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <SideBar title="Incom" />
        </div>
        <div className={`common--layout__main--full ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <div className="calendar-group-page">
            <LayoutSetting menu={menu}>
              <Card
                title={<span className="title">Cài đặt thông báo</span>}
                bordered={false}
                style={{ width: "100%", borderRadius: "2px" }}
                bodyStyle={{ padding: 0 }}
              >
                {loading ? (
                  <div className="loading-box">
                    <BoxLoading size={40} />
                  </div>
                ) : (
                  <>
                    <Row
                      justify="space-between"
                      align="middle"
                      style={{ padding: "15px" }}
                    >
                      <Col>
                        <Space size="middle">
                          <img src={Noti} alt="notification" />
                          <span className='title-setting-noti'>Thông báo</span>
                        </Space>
                      </Col>
                      <Col>
                        <Switch
                          checked={noti}
                          onChange={handleChangeSettingNoti}
                          className="custom-switch"
                        />
                      </Col>
                    </Row>
                    <Divider style={{ margin: 0 }}></Divider>
                    <Row
                      justify="space-between"
                      align="middle"
                      style={{ padding: "15px" }}
                    >
                      <Col>
                        <Space size="middle">
                          <img src={Comment} alt="comment" />
                          <span className='title-setting-noti'>Bình luận</span>
                        </Space>
                      </Col>
                      <Col>
                        <Switch
                          checked={comment}
                          onChange={handleChangeSettingComment}
                          className="custom-switch"
                        />
                      </Col>
                    </Row>
                    <Divider style={{ margin: 0 }}></Divider>

                    <Row
                      justify="space-between"
                      align="middle"
                      style={{ padding: "15px" }}
                    >
                      <Col>
                        <Space size="middle">
                          <img src={Chat} alt="message" />
                          <span className='title-setting-noti'>Tin nhắn</span>
                        </Space>
                      </Col>
                      <Col>
                        <Switch
                          checked={message}
                          onChange={handleChangeSettingMessage}
                          className="custom-switch"
                        />
                      </Col>
                    </Row>
                    <Divider style={{ margin: 0 }}></Divider>
                    <Row
                      justify="space-between"
                      align="middle"
                      style={{ padding: "15px" }}
                    >
                      <Col>
                        <Space size="middle">
                          <img src={Group} alt="group" />
                          <span className='title-setting-noti'>Nhóm</span>
                        </Space>
                      </Col>
                      <Col>
                        <Switch
                          checked={group}
                          onChange={handleChangeSettingGroup}
                          className="custom-switch"
                        />
                      </Col>
                    </Row>
                    <Divider style={{ margin: 0 }}></Divider>
                    <Row
                      justify="space-between"
                      align="middle"
                      style={{ padding: "15px" }}
                    >
                      <Col>
                        <Space size="middle">
                          <img src={Tag} alt="tag" />
                          <span className='title-setting-noti'>Gắn thẻ</span>
                        </Space>
                      </Col>
                      <Col>
                        <Switch
                          checked={tag}
                          onChange={handleChangeSettingTag}
                          className="custom-switch"
                        />
                      </Col>
                    </Row>
                    <Divider style={{ margin: 0 }}></Divider>
                    <Row
                      justify="space-between"
                      align="middle"
                      style={{ padding: "15px" }}
                    >
                      <Col>
                        <Space size="middle">
                          <img src={Event} alt="event" />
                          <span className='title-setting-noti'>Sự kiện</span>
                        </Space>
                      </Col>
                      <Col>
                        <Switch
                          checked={event}
                          onChange={handleChangeSettingEvent}
                          className="custom-switch"
                        />
                      </Col>
                    </Row>
                    <Divider style={{ margin: 0 }}></Divider>
                  </>
                )}
              </Card>
            </LayoutSetting>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
};

Setting.propTypes = {};

export default Setting;
