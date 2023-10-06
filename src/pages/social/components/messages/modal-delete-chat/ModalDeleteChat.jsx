/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Modal, Button, Input } from "antd";
import React, { useState } from "react";
import "../modal-change-chatname/ModalChangeChatName.scss";
import { useDispatch } from 'react-redux';
import { message } from "antd";
import apis from "../../../../../services/api";
import "./modal-delete-chat.scss";
import DeleteImg from "../../../../../assets/new/common/delete-chat-img.svg";

const ModalDeleteChat = ({
  isModalDeleteChat,
  setIsModalDeleteChat,
  loadData,
  idDelete,
  isConversation
}) => {

  const dispatch = useDispatch();

  const handleOk = () => {
    if (isConversation) {
      apis.chat.deleteConversation(+idDelete).then(r => {
        if (r.data.code == 200) {
          message.success("Xóa thành công")
          loadData()
        }
        else {
          message.success("Xóa thất bại")
        }
      })
    }
    else {
      apis.chat.deleteChat(+idDelete).then(r => {
        if (r.data.code === 200) {
          message.success("Xóa thành công")
        }
        else {
          message.success("Xóa thất bại")
        }
      })
    }
    setIsModalDeleteChat(false)

    // setIsModalDeleteChat(false)
    // message.success("Xóa thành công")
  };

  return (
    <Modal
      title={<span className="title">Xóa tin nhắn</span>}
      visible={isModalDeleteChat}
      onCancel={() => setIsModalDeleteChat(false)}
      className="modalCustom delete-chat-modal"
      bodyStyle={{ padding: "20px" }}
      footer={[
        <Button type="text" style={{ width:160}} onClick={() => setIsModalDeleteChat(false)}>Huỷ bỏ</Button>,
        <Button type="primary" danger style={{borderRadius:2, width:160}} onClick={handleOk}>
          Đồng ý
        </Button>,
      ]}
    >
      <div className="delete-modal-content">
        <img src={DeleteImg} />
        <span className="subTitle" style={{marginTop:28, marginBottom:8}}>
        Bạn có chắc chắn muốn xóa?
      </span>
      <span style={{color:'#7D7D7D', marginBottom:28}}>
        Toàn bộ nội dung trò chuyện sẽ bị xóa vĩnh viễn
      </span>
      </div>

    </Modal>
  );
};

export default ModalDeleteChat;