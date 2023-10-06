/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Modal, Button, Input } from "antd";
import React, { useState } from "react";
import "./ModalChangeChatName.scss";
import { useDispatch } from 'react-redux';
import  { updateNameGroupChat } from '../message.action'
import { message } from "antd";
import apis from "../../../../../services/api";

const ModalChangeChatName = ({
  isShowModalChangeName,
  setIsShowModalChangeName,
  idGroupChat,
  loadData
}) => {

  const dispatch = useDispatch();
  const [nameGroupChat, setNameGroupChat] = useState("")
  
  const handleOk = () => {
    // var data = {
    //   id: idGroupChat,
    //   name: nameGroupChat
    // }
    // dispatch(updateNameGroupChat(data))
    apis.chat.updateNameGroupChat({name: nameGroupChat}, idGroupChat).then(r => {
      console.log('rrrrrr', r)
      if(r.data.code === 200){
        loadData()
        setIsShowModalChangeName(false)
        setNameGroupChat("")
        message.success("Đổi tên nhóm thành công")
      }
      else{
        setIsShowModalChangeName(false)
        setNameGroupChat("")
        message.error("Đổi tên nhóm thất bại")
      }
    })
    
  };

  const onChange = (e) => {
    setNameGroupChat(e.target.value)
  }

  return (
    <Modal
      title={<span className="title" style={{ color: '#fff' }}>Đổi tên nhóm</span>}
      visible={isShowModalChangeName}
      onCancel={() => setIsShowModalChangeName(false)}
      className="modalCustom"
      bodyStyle={{ padding: "20px" }}
      footer={[
        <Button type="secondary" onClick={() => setIsShowModalChangeName(false)}>Huỷ</Button>,
        <Button type="primary" onClick={handleOk}>
          Lưu
        </Button>,
      ]}
    >
      <span className="subTitle">
        Mọi người đều biết khi tên nhóm chat thay đổi
      </span>
      <Input placeholder="Nhập tên nhóm chat..." onChange={onChange} className="mt--10 input" />
    </Modal>
  );
};

export default ModalChangeChatName;
