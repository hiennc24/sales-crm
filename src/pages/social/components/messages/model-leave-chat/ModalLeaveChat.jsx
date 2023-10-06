/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Modal, Button, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "../modal-change-chatname/ModalChangeChatName.scss";
import { message } from "antd";
import apis from "../../../../../services/api";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../../../services/socket";

const ModalLeaveChat = ({
  isModalLeaveChat,
  setIsModalLeaveChat,
  loadData,
  idConversation,
  changeList,
  setChangeList
}) => {

  const user = useSelector((state) => state.get('userProfile').get('profile'));
  const socket = useContext(SocketContext);

  // useEffect(() => {
  //   if (user.Id && user.CompanyId) {
  //     socket.emit('setSocketId', `io_${user.CompanyId}_${user.Id}`);
  //     socket.on('io_conversion_leave', (msg) => {
  //       // setChangeList(!changeList);
  //       console.log('leave', msg)
  //       apis.chat.createChat({
  //         conversionId: idConversation,
  //         msg: msg.user.FullName + " đã rời khỏi nhóm",
  //         showOnlyForSender: "",
  //         file: "",
  //         type: 8,
  //       })
  //         .then((res) => {
  //           console.log("res", res)
  //           setChangeList(!changeList);
  //           window.scroll(0, 100);
  //         });
  //     });
  //   }
  // }, [user]);

  const handleOk = () => {

    let obj = {
      conversionId: Number(idConversation),
    };
    apis.chat.createChat({
      conversionId: idConversation,
      msg: user.FullName + " đã rời khỏi nhóm",
      showOnlyForSender: "",
      file: "",
      type: 8,
      quoteId: 0,
      quoteContent: ""
    })
      .then((res) => {
        apis.chat.leaveConversation(obj).then((res) => {
          if (res.data.code == 200) {
            message.success("Rời nhóm thành công")
            setChangeList(!changeList);
            window.scroll(0, 100);
          }
          else {
            message.success("Rời nhóm thất bại")
          }
        });
      });
    setIsModalLeaveChat(false)
  };

  return (
    <Modal
      title={<span className="title">Rời khỏi nhóm</span>}
      visible={isModalLeaveChat}
      onCancel={() => setIsModalLeaveChat(false)}
      className="modalCustom"
      bodyStyle={{ padding: "20px" }}
      footer={[
        <Button type="secondary" onClick={() => setIsModalLeaveChat(false)}>Huỷ</Button>,
        <Button type="primary" onClick={handleOk}>
          Chấp nhận
        </Button>,
      ]}
    >
      <span className="subTitle">
        Bạn có chắn chắn muốn rời khỏi nhóm này?
      </span>
    </Modal>
  );
};

export default ModalLeaveChat;