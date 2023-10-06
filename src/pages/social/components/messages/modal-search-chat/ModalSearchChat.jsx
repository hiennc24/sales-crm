/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Modal, Button, Input, Avatar, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import "../modal-search-chat/ModalSearchChat.scss";
import { useDispatch } from 'react-redux';
import { message } from "antd";
import closeIcon from "../../../../../assets/new/messenger/close.svg";
import apis from "../../../../../services/api";
import { getUrlImage, formatMinutes } from "../../../../../utils";
import Scrollbars from "react-custom-scrollbars";
import Highlighter from "react-highlight-words";
import ChatPreView from "./ChatPreview/ChatPreview"
import {
  SearchOutlined
} from "@ant-design/icons";
const ModalSearchChat = ({
  visible,
  setIsShowSearchChatModal,
  singleContact,
  nameChat
}) => {
  const [listChat, setListChat] = useState([])
  const [keySearch, setKeySearch] = useState('')
  const [selectedChat, setSelectedChat] = useState(null)
  const dispatch = useDispatch();
  // useEffect(() => {

  let debounceTime = null;
  // }, [singleContact])


  useEffect(() => {
    setListChat([])
    setKeySearch('')
  }, [singleContact])
  const handleSearch = (e) => {
    const key = e.target.value;
    clearTimeout(debounceTime);
    setKeySearch(key)
    if (key === '') {
      setListChat([]);
      return;
    }
    setSelectedChat(null)
    debounceTime = setTimeout(() => {
      apis.chat.searchMessage(singleContact.Id, key, 1, 10).then(rs => {
        if (rs.data.code == 200) {
          setListChat(rs.data.data);
          console.log(rs.data.data)
        }
        else {
          setListChat([]);
        }
      })
    }, 200);
  }
  const getListChat = () => {
    console.log(listChat)
    if (listChat.length === 0) { return <div> Không tìm thấy tin nhắn </div> }
    if (listChat.length > 0) return listChat?.map((chat, index) =>
      <Row style={{ backgroundColor: +selectedChat?.Id == +chat.Id ? "#D9EBEF" : "#ffffff" }} key={index} className="chat-container" onClick={() => setSelectedChat(chat)}>
        <Col span={2} className="col-chat-item__avt">
          <Avatar
            size={35}
            src={getUrlImage(50, 50, chat.Avatar)}
            alt="avatar"
          />
        </Col>
        <Col span={17} className='col-chat-item__content'>
          <div className='chat-item__user'>
            {chat.FullName}
          </div>
          <Highlighter
            highlightClassName="hightlight-custom"
            searchWords={[keySearch]}
            autoEscape={true}
            textToHighlight={chat.Msg}
          />
          {/* <div className='chat-item__content'>
              {chat.Msg}
            </div> */}
        </Col>
        <Col span={5} className="chat-item__time">
          {formatMinutes(chat.CreatedAt)}
        </Col>
      </Row>

    )

  }
  const onCancel = () => {
    setIsShowSearchChatModal(false)
    setListChat([])
    setKeySearch('')
  }



  return (
    <Modal
      title={<span className="title" style={{color:"#272727"}}>Tìm kiếm</span>}
      visible={visible}
      onCancel={() => onCancel()}
      // className="modalCustom search-chat-modal"
      // bodyStyle={{ padding: "20px" }}
      footer={null}
      cancelButtonProps={{ hidden: true }}
      onOk={() => onCancel()}
      closeIcon={<img src={closeIcon} alt="closeIcon" />}
    >
      <div className="search-container">
        <Input
          className="input-search"
          onChange={e => { handleSearch(e) }}
          value={keySearch}
          placeholder="Nhập nội dung cần tìm..."
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="search-result-content">

        {(listChat.length > 0) && <>
          <p style={{marginLeft:"6px"}}>Hiển thị {listChat[0].Total} kết quả trong hội thoại <b>{nameChat}</b> </p>
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={65}
            autoHeightMax={250}
          >
            <div className="header-chat">Messages</div>
            {getListChat()}
          </Scrollbars>
        </>}
      </div>

      {(selectedChat && keySearch !== "") && <>
        <hr className="divider-chat" />
        <ChatPreView selectedChat={selectedChat} keySearch={keySearch} />
      </>}

    </Modal>
  );
};

export default ModalSearchChat;