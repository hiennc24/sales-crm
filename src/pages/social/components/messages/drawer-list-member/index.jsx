/* eslint-disable react/prop-types */
import {
  Drawer,
  Button,
  Input,
  Row,
  Col,
  Space,
  Avatar,
  Dropdown,
  Menu,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import defaultAvatar from "../../../../../assets/images/avatar_default.jpg";
import { getUrlImage } from "../../../../../utils";
import {
  SearchOutlined,
  UserOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import Close from "../../../../../assets/new/messenger/close2.svg";
import AddUser from "../../../../../assets/new/messenger/add-user.svg";
import Key from "../../../../../assets/new/messenger/key.svg";
import More from "../../../../../assets/new/common/more.svg";
import AvatarCustom from "../../../../../components/avatar-custom";
import API from "../../../../../services/api";
import { toString } from "lodash";
import { useSelector } from "react-redux";

const ModalChangeChatName = ({
  visible,
  setVisible,
  currentConversation,
  setIsShowAddUsersModal,
  setchangeList,
  changeList,
}) => {
  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );
  const [listContact, setListContact] = useState(
    currentConversation?.Employee ?? []
  );
  const [showMoreOptionPopupId, setShowMoreOptionPopupId] = useState(null);

  useEffect(() => {
    setListContact(currentConversation?.Employee ?? []);
  }, [currentConversation]);

  const onChange = (e) => {
    if (e.target.value === "") {
      setListContact(currentConversation?.Employee ?? []);
      return;
    }
    setListContact(
      currentConversation?.Employee?.filter((r) =>
        r.FullName.trim()
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim())
      ) ?? []
    );
  };

  const handleShowMoreOptionPopup = (index) => {
    setShowMoreOptionPopupId(showMoreOptionPopupId === index ? null : index);
  };

  const handleRemoveMember = (id) => {
    API.chat
      .removeMember({
        conversionId: Number(currentConversation.Id),
        memberId: id,
      })
      .then((res) => {
        if (res.data.code === 200) {
          const removedUser = listContact.find((item) => item.UserId === id);
          const newListContact = listContact.filter(
            (item) => item.UserId !== id
          );
          setListContact(newListContact);

          API.chat
            .createChat({
              conversionId: Number(currentConversation.Id),
              msg:
                userInfo.FullName +
                " đã xóa " +
                removedUser.FullName +
                " khỏi nhóm",
              showOnlyForSender: "",
              file: "",
              type: 8,
              quoteId: 0,
              quoteContent: "",
            })
            .then(() => {
              window.scroll(0, 100);
            });
            setchangeList(!changeList);
          return;
        } else {
          message.error("Đã xảy ra lỗi, vui lòng thử lại sau!!!");
          console.log("error", res.message);
          return;
        }
      })
      .catch((error) => {
        message.error("Đã xảy ra lỗi, vui lòng thử lại sau!!!");
        console.log("error", res.message);
      });
  };

  return (
    <Drawer
      title={
        <Row align="middle">
          <Col
            span={3}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <img
              style={{ transform: "rotate(180deg)", cursor: "pointer" }}
              src={Close}
              alt="arrow"
              onClick={() => setVisible(false)}
            ></img>
          </Col>
          <Col
            span={16}
            className="title"
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            Thành viên ({listContact?.length ?? "0"})
          </Col>
          <Col span={5}></Col>
        </Row>
      }
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      width={380}
      style={{ marginTop: 40 }}
    >
      <Button
        className="customButton"
        // icon={
        //   <img
        //     src={AddUser}
        //     alt="addUser"
        //     style={{ marginRight: "15px" }}
        //   ></img>
        // }
        style={{ borderRadius: 2 }}
        onClick={() => {
          setIsShowAddUsersModal(true);
          setVisible(false);
        }}
      >
        + Thêm thành viên
      </Button>

      {/* <Row className="member">Thành viên ({listContact?.length ?? '0'})</Row> */}
      <Row>
        <Input
          style={{ borderRadius: 2 }}
          className="input"
          onChange={(e) => onChange(e)}
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined style={{ color: "rgba(39, 39, 39, 0.6)" }} />}
        />
      </Row>
      <Row style={{ marginTop: "20px" }}>
        {listContact?.map((contact, index) => {
          if (Number(currentConversation.CreatedBy) === contact.UserId)
            return (
              <Col key={index} span={24}>
                <Row justify="space-between" className="list">
                  <Col>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AvatarCustom
                        className="avatar-user"
                        src={
                          contact.UserId && contact.Avatar
                            ? getUrlImage(35, 35, contact.Avatar)
                            : ""
                        }
                        size={32}
                        fullName={contact.FullName}
                      />
                      <span style={{ marginLeft: 8 }}>{contact.FullName}</span>
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <img src={Key} alt="key"></img>
                  </Col>
                </Row>
              </Col>
            );
        })}
        {listContact?.map((contact, index) => {
          if (Number(currentConversation.CreatedBy) !== contact.UserId)
            return (
              <Col key={index} span={24}>
                <Row justify="space-between" className="list">
                  <Col>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AvatarCustom
                        className="avatar-user"
                        src={
                          contact.UserId && contact.Avatar
                            ? getUrlImage(35, 35, contact.Avatar)
                            : ""
                        }
                        size={32}
                        fullName={contact.FullName}
                      />
                      <span style={{ marginLeft: 8 }}>{contact.FullName}</span>
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    {/* <img src={More} alt="key"></img> */}
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="1"
                            onClick={() => handleRemoveMember(contact.UserId)}
                            // icon={<img src={Delete} />}
                          >
                            Mời ra khỏi nhóm
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                      visible={showMoreOptionPopupId === index}
                      onVisibleChange={() => handleShowMoreOptionPopup(index)}
                    >
                      <img src={More} alt="key"></img>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            );
        })}
      </Row>
    </Drawer>
  );
};

export default ModalChangeChatName;
