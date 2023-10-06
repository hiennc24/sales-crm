import React, { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from 'react';
import {
  Row,
  Col,
  Input,
  Avatar,
  Space,
  Divider,
  Badge,
  Typography,
  Tooltip,
} from "antd";
import {
  // EllipsisOutlined,
  SearchOutlined,
  BellOutlined,
  SelectOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import Scrollbars from "react-custom-scrollbars";
import "./ChatList.scss";
import PropTypes from "prop-types";
import { getUrlImage,Icons } from "../../../../../utils";
import Add from "../../../../../assets/new/messenger/add.svg";
import Bell from "../../../../../assets/new/messenger/bell.svg";
import AddYellow from "../../../../../assets/new/messenger/add-yellow.svg";
import Dots from "../../../../../assets/new/messenger/dots.svg";
import { useSelector } from "react-redux";
import API from "../../../../../services/api";
import moment from 'moment';
import { FORMAT_DATE_TIME } from '../../../../../constants/config'
import NoNotify from '../../../../../assets/new/messenger/bat-thong-bao.svg'
import Post from '../../../../../assets/new/common/tin-noi-bo.svg'

import Chat2 from '../../../../../assets/new/messenger/mess-1.svg'
import Chat1 from '../../../../../assets/new/messenger/mess-1.svg'
import Chat3 from '../../../../../assets/new/messenger/mess-2.svg'
import Group1 from '../../../../../assets/new/messenger/group-1.svg'
import Group2 from '../../../../../assets/new/messenger/group-1.svg'
import Group3 from '../../../../../assets/new/messenger/group-2.svg'
import Message from '../../../../../assets/new/messenger/message.svg'
import Contact1 from '../../../../../assets/new/messenger/contact-1.svg'
import Contact2 from '../../../../../assets/new/messenger/contact-1.svg'
import Contact3 from '../../../../../assets/new/messenger/contact-2.svg'
import AddGroup from '../../../../../assets/new/messenger/add-group.svg'
import { Chat1Dimensions } from "@styled-icons/remix-fill/Chat1";
import { useRecoilState } from "recoil";
import { listConversationUnread } from "../../../../../recoil/chat-atom";
import AvatarCustom from "../../../../../components/avatar-custom";


// eslint-disable-next-line react/display-name
const ChatList = forwardRef((props, ref) => {
  // const [listEmp, setListEmp] = useState(props.listMember);
  useImperativeHandle(
    ref,
    () => ({
      reloadContact() {
        API.chat.getContract().then(rs => {
          setListContact(rs)
        })
      }
    }),
  )

  const [listConver, setListConver] = useState(props.listConversation);
  const [listChatUser, setListChatUser] = useState([]);
  const [listChatGroup, setListChatGroup] = useState([]);
  const [listContact, setListContact] = useState([]);
  const userInfo = useSelector(state => state.get('userProfile').get('profile'))
  // let timer = null;
  const { setSingleContact, setIsMultiContact, idSelected, setIsCreateGroup, setNewContact } = props;
  const [listChatSearch, setListChatSearch] = useState([]);
  const [isShowListSearch, setIsShowListSearch] = useState(false);
  const [selectedType, setSelectedType] = useState(1)

  const [isHoverChat, setIsHoverChat] = useState(false)
  const [isHoverGroup, setHoverGroup] = useState(false)
  const [isHoverContact, setHoverContact] = useState(false)
  const [conversationUnread, setConversationUnread] = useRecoilState(listConversationUnread);

  useEffect(() => {
    setListConver(props.listConversation);
    var listUser = props.listConversation.filter(r => r.IsGroup === false)
    var listGroup = props.listConversation.filter(r => r.IsGroup === true)
    setListChatUser(listUser)
    setListChatGroup(listGroup)
    const unread = props.listConversation.filter(item => item.CountNotRead > 0);
    // console.log(unread)
    setConversationUnread([...unread])
  }, [props.listConversation]);
  const handleChangeContact = (id) => {
    props.swapEmployee(id);
    const unread = conversationUnread.filter(item => item.Id == id); 
    setConversationUnread([...unread])
  };
  useEffect(() => {
    // console.log(listContact)
    // console.log(listChatUser)
  }, [listContact])
  useEffect(() => {
    if (selectedType == 3) {
      API.chat.getContract().then(rs => {
        setListContact(rs)
      })
    }
  }, [selectedType])

  const handleChangeSearchContact = (item) => {
    // console.log("search", item)
    if (!props.listConversation.find(itemInList => itemInList.ChatKey === item.ChatKey)) {
      setNewContact(item);
    }
    else {
      handleChangeContact(item.Id)
    }
  };

  useEffect(() => {
    API.chat.getContract().then(rs => {
      setListContact(rs)
    })
    document.addEventListener('click', handleClickSearch);
    return (() => {
      document.removeEventListener('click', handleClickSearch);
    })
  }, [])

  useEffect(() => {
    console.log(props.listConversation)
  }, [props.listConversation])

  let debounceTime = null;

  const handleClickSearch = (e) => {
    if (e.target.id == 'searchName') {
      handleSearchByName(e);
      setIsShowListSearch(true)
    }
    else {
      setIsShowListSearch(false)
    }
  }

  const selectContact = (data) => {

    if (data.IsCouple) {
      props.swapEmployee(+data.ConversationId);
    }
    else {
      props.setNewContact({
        name: data.FullName,
        msg: "",
        Employee: [{ UserId: data.UserId, FullName: data.FullName, Avatar: data.Avatar }],
        parentId: 0,
        targetId: data.UserId,
        didNotCreate: true
      })
    }

    // console.log(data)

    // localStorage.setItem('selectContact', JSON.stringify(data));
    // props.selectContact()
    // handleSelectAll();
  };

  const handleSearchByName = (e) => {
    const name = e.target.value;
    clearTimeout(debounceTime);
    debounceTime = setTimeout(() => {
      API.chat.searchConversationsByName(name, userInfo.Id).then(rs => {
        if (rs.data.code == 200) {
          setListChatSearch(rs.data.data);
        }
        else {
          setListChatSearch([]);
        }
      })
    }, 200);
  }

  const getListGroups = () => {
    return listChatGroup
      .map((item, index) => {
        return (
          <div key={index}>
            <Row
              className={` chat-list-item ${index % 2 === 0 ? "chat-list-item-stripe" : ""} ${idSelected == item.Id ? 'selected-chat' : ''}`}
              key={index}
              onClick={() => handleChangeContact(item.Id)}
              align="middle"
              justify="space-between"
            >
              <Col className="group-chat-avatar">
                <Badge
                  color="rgb(49, 162, 76)"
                  offset={[-6, 30]}
                  style={{ width: "9px", height: "9px" }}
                >
                  <Avatar.Group maxCount={2} maxStyle={{ color: 'white', backgroundColor: '#32A1C8' }}>
                    <AvatarCustom src={getUrlImage(200, 200, item.Employee[0]?.Avatar)} fullName={item.Employee[0]?.FullName}/>
                    <AvatarCustom src={getUrlImage(200, 200, item.Employee[1]?.Avatar)} fullName={item.Employee[1]?.FullName}/>
                    <Tooltip title="Ant User" placement="top">
                      {item.Employee.filter((r, index) => index === 2).map((r, index) =>
                        <AvatarCustom key={index} src={getUrlImage(0, 0, r?.Avatar)} fullName={r?.FullName}/>)}
                    </Tooltip>
                    {item.Employee.filter((r, index) => index > 2).map((r, index) =>
                      <AvatarCustom key={index} src={getUrlImage(0, 0, r?.Avatar)} fullName={r?.FullName}/>)}
                  </Avatar.Group>
                </Badge>
              </Col>
              <Col span="17" style={{ marginLeft: '10px', paddingRight:10 }}>
                <Row justify="space-between">
                  <Col span="17">
                    <div>
                      <div className="group-chat-title">
                        {item.Name}
                      </div>
                      <div className="group-chat-subTitle">
                        <Typography.Text
                          ellipsis
                          style={item.CountNotRead > 0 ? { maxWidth: 105, marginRight: 15, color: '#32A1C8', height: 16,fontStyle:'italic' } : { maxWidth: 105, marginRight: 15, height: 16 }}
                        >
                          {item?.LastMessage?.length != 0 ? item?.LastMessage : 'Đã gửi một tệp'}
                        </Typography.Text>
                        
                      </div>
                    </div>
                  </Col>
                  <Col span="7" style={{ display: 'flex', flexDirection:'column',alignItems: 'flex-end',justifyContent:'space-between' }} className='badge-count'>
                      <Typography.Text
                              className="chat-format-time"
                            >
                        {item.UpdatedAt && moment(item.UpdatedAt, FORMAT_DATE_TIME)
                          .startOf("minutes")
                          .fromNow()}
                      </Typography.Text>
                      <div className="mute-noti">
                      <Badge
                        count={item.CountNotRead > 0 ? item.CountNotRead : null}
                        style={{ backgroundColor: "#FD830E"}}
                        size="small"
                      />
                      {
                        !item.IsNotification &&
                        <img width={15} height={15} src={Bell} />
                      }
                    </div>
                  </Col>
                </Row>
              </Col>

            </Row>

          </div>
        );
      })
  }

  const getListUsers = () => {
    // console.log('User as das',listChatUser);
    return listChatUser
      .map((item, index) => {
        return (
          <div key={index}>
            <Row
              className={`${idSelected == item.Id ? 'selected-chat' : ''} chat-list-item ${index % 2 === 0 ? "chat-list-item-stripe" : ""}`}
              onClick={() => handleChangeContact(item.Id)}
              align="middle"
              justify="space-between"
            >
              <Col span="3" className="group-chat-avatar">
                <Badge
                  color="rgb(49, 162, 76)"
                  offset={[-7, 33]}
                  style={{ width: "9px", height: "9px" }}
                  dot
                >
                  <AvatarCustom
                    size={40}
                    src={getUrlImage(50, 50, +item.Employee[0].UserId === +userInfo.Id ? item.Employee[1]?.Avatar : item.Employee[0]?.Avatar)}
                    alt="avatar"
                    fullName={+item.Employee[0].UserId === +userInfo.Id ? item.Employee[1]?.FullName : item.Employee[0]?.FullName}
                  />
                </Badge>
              </Col>
              <Col span="20">
                <Row justify="space-between">
                  <Col span="17">
                    <div>
                      <div className="group-chat-title">
                        {+item.Employee[0].UserId === +userInfo.Id ? item.Employee[1]?.FullName : item.Employee[0]?.FullName} 
                      </div>
                      <div className="group-chat-subTitle">
                        <Typography.Text
                          ellipsis
                          style={item.CountNotRead > 0 ? { maxWidth: "100%", color: '#32A1C8', height: 16,fontStyle:'italic' } : { maxWidth: "100%", height: 16 }}
                        >
                          {item?.LastMessage?.length != 0 ? item?.LastMessage : 'Đã gửi một tệp'}
                        </Typography.Text>
                        {/* <Typography.Text
                          ellipsis
                          style={{ lineHeight: 'normal' }}
                        >
                          {item.UpdatedAt && moment(item.UpdatedAt, FORMAT_DATE_TIME)
                            .startOf("minutes")
                            .fromNow()}
                        </Typography.Text> */}
                      </div>
                    </div>
                  </Col>
                  <Col span="7" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end',justifyContent:'space-between' }} className='badge-count'>
                    <Typography.Text
                      className="chat-format-time"
                    >
                      {item.UpdatedAt && moment(item.UpdatedAt, FORMAT_DATE_TIME)
                        .startOf("minutes")
                        .fromNow()}
                    </Typography.Text>
                    <div className="mute-noti">
                      <Badge
                        count={item.CountNotRead}
                        style={{ backgroundColor: "#FD830E"}}
                        size="small"
                      />
                      {
                        !item.IsNotification &&
                        <img width={15} height={15} src={Bell} />
                      }
                    </div>

                  </Col>
                </Row>
              </Col>
            </Row>
            {/* <Divider className="chatDivider" /> */}
          </div>
        );
      })
  }

  const getListUsersOnline = () => {
    // console.log('User Online ',listContact);
    return listContact
      .map((item, index) => {
        return (
          <div key={index} className='container-contact container-online'>{
            item.value.map((user, idx) => {
              return (
                <div key={idx}>
                  <div className='contact-item' onClick={() => selectContact(user)}>
                    <div className='contact-item__avt'>

                       <Badge
                          color="rgb(49, 162, 76)"
                          offset={[-6, 30]}
                          style={{ width: "9px", height: "9px" }}
                          dot
                        >
                          <AvatarCustom
                            size={35}
                            src={getUrlImage(50, 50, user.Avatar)}
                            alt="avatar"
                            fullName={user.FullName}
                          />
                        </Badge>
                    </div>
                    <div className='contact-item__name'>
                      {user.FullName}
                    </div>
                  </div>
                </div>
              )
            })
          }</div>
        )
      })
  }

  const getListContact = () => {
    return listContact.map((item, index) => {
      return (
        <div key={index} className='container-contact'>
          {/* <div className='contact-key'>
            {item.key}
          </div> */}
          {
            item.value.map((user, idx) => {
              return (
                <div key={idx}>
                  <div className='contact-item' onClick={() => selectContact(user)}>
                    <div className='contact-item__avt'>
                      <AvatarCustom
                        size={35}
                        src={getUrlImage(50, 50, user.Avatar)}
                        alt="avatar"
                        fullName={user.FullName}
                      />
                    </div>
                    <div className='contact-item__name'>
                      {user.FullName}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    })
  }

  return (
    <div className="chat-list-box" style={{position:'absolute', zIndex:100, boxShadow:'2px 0px 15px rgba(39, 39, 39, 0.1)'}}>
      <div className='search-box'>
        <Input
          id='searchName'
          type="text"
          bordered={false}
          addonAfter={null}
          placeholder="Tìm kiếm"
          className="chat-search"
          onChange={handleSearchByName}
          suffix={<img src={Icons.search} />}
        />
        {
          isShowListSearch &&

          <div className='search-box__content'>
            {
              listChatSearch.length == 0 &&
              <div className='empty-data'>Không tìm thấy tên phù hợp</div>
            }
            {listChatSearch.length != 0 &&
              listChatSearch.map((item, index) => {
                return (
                  <div key={index}>

                    <Row
                      className={` chat-list-item ${index % 2 === 0 ? "chat-list-item-stripe" : ""}`}
                      onClick={() => handleChangeSearchContact(item)}
                      align="middle"
                      justify="space-between"
                    >
                      <Col className="group-chat-avatar-wrapper">
                        <Badge
                          color="rgb(49, 162, 76)"
                          offset={[-6, 30]}
                          style={{ width: "9px", height: "9px" }}
                        >
                          <AvatarCustom
                            size={40}
                            src={getUrlImage(50, 50, +item.Employee[0].UserId === +userInfo.Id ? item.Employee[1].Avatar : item.Employee[0].Avatar)}
                            alt="avatar"
                            fullName={+item.Employee[0].UserId === +userInfo.Id ? item.Employee[1].FullName : item.Employee[0].FullName}
                          />
                        </Badge>
                        <Row justify="space-between">
                          <Col>
                            <div>
                              <div className="group-chat-title">
                                {item.didNotCreate ? (item.name ? item.name : 'Anonymous') : (item.IsGroup ? item.Name : (+item.Employee[0].UserId === +userInfo.Id ? item.Employee[1].FullName : item.Employee[0].FullName))}
                              </div>
                              <div className="group-chat-subTitle">
                                <Typography.Text
                                  ellipsis
                                  style={item.CountNotRead > 0 ? { width: 100, color: '#32A1C8',fontStyle:'italic' } : { width: 100 }}
                                >
                                  {item?.LastMessage?.length != 0 ? item?.LastMessage : 'Đã gửi một tệp'}
                                </Typography.Text>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col span="20">

                      </Col>
                    </Row>

                  </div>
                );
              })
            }
          </div>
        }
      </div>
      <div className='list-conv__container'>
        <div className='type-conv__select'>

          <div className={`type-conv__option ${selectedType == 1 ? "type-conv__option-active" : ""}`} onClick={() => setSelectedType(1)} onMouseEnter={() => setIsHoverChat(true)} onMouseLeave={() => setIsHoverChat(false)} >
            <img src={selectedType == 1 ?  Icons.chatWhite : Icons.chat} alt="chat"  />  
            <Badge
                  count={conversationUnread.filter(item => !item.IsGroup).length > 0 ? conversationUnread.filter(item => !item.IsGroup).length : null}
                  className='cursor--pointer'
                  showZero
                  style={{
                    backgroundColor: '#FD830E',
                    fontSize: 10,
                    minWidth: 14,
                    height: 14,
                    lineHeight: '14px',
                    top:-8
                  }}
                >
            <div className={`type-conv__option-name${selectedType == 1 ? " active-option" : ""}`}>Tin nhắn</div>
                  </Badge>
            {/* <div className={`type-conv__option-name${selectedType == 1 ? " active-option" : ""}`}>Tin nhắn</div> */}
          </div>
          {/* <div className={`type-conv__option ${selectedType == 3 ? "type-conv__option-active" : ""}`} onClick={() => setSelectedType(3)} onMouseEnter={() => setHoverContact(true)} onMouseLeave={() => setHoverContact(false)}>
            <img src={selectedType == 3 ? Icons.contactWhite : Icons.contact} alt="contact" /> 
            <div className={`type-conv__option-name${selectedType == 3 ? " active-option" : ""}`}>Danh bạ</div>
          </div> */}
          <div 
          style={{marginleft:5}}
          className={`type-conv__option ${selectedType == 2 ? "type-conv__option-active" : ""}`} onClick={() => setSelectedType(2)} onMouseEnter={() => setHoverGroup(true)} onMouseLeave={() => setHoverGroup(false)}>
            <img src={selectedType == 2 ? Icons.groupWhite : Icons.groupBlack } alt="group"  /> 
            
            <Badge
                  count={conversationUnread.filter(item => item.IsGroup).length > 0 ? conversationUnread.filter(item => item.IsGroup).length : null}
                  className='cursor--pointer'
                  showZero
                  style={{
                    backgroundColor: '#FD830E',
                    fontSize: 10,
                    minWidth: 14,
                    height: 14,
                    lineHeight: '14px',
                    top:-8
                  }}
                >
            <div className={`type-conv__option-name${selectedType == 2 ? " active-option" : ""}`}>Nhóm</div>
                  </Badge>
          </div>
        </div>


        <div className='content-list__conv'>
          {/* <hr className="divine-top" /> */}
          <Scrollbars
            autoHide
            autoHeight={false}
            autoHeightMax='80%'
          >
            <div className="recent-chat-add-group ">
              <div className="recent-chat">Trò chuyện gần đây</div>
              {
                selectedType == 2 && <div className='add-group'>
                  <div className='btn-create-group' onClick={() => { setIsCreateGroup() }}>
                    + Thêm nhóm mới
                  </div>
                </div>
              }
            </div>

            <div className="chat-list">


              <Scrollbars
                renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
                className="chat-list__recent"
                autoHide
                autoHeight={false}
                autoHeightMax='80%'
              >
                {
                  selectedType == 1 ? getListUsers() :
                    selectedType == 2 ? getListGroups() :
                      getListContact()
                }
              </Scrollbars>
              {/* <Scrollbars
                // className="chat-list__recent"
                // autoHide
                // autoHeight={false}
                // autoHeightMax='80%'
              >
              <div className="recent-chat-add-group ">
              <div className="recent-chat">Bạn bè đang trực tuyến</div>
              </div>
              </Scrollbars> */}
 
              {/* <hr className="divine-bottom" /> */}
              {/* <div className="recent-chat">Friends online</div> */}
              {/* <Scrollbars
                renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
                className="chat-list__recent"
                autoHide
                autoHeight={false}
                autoHeightMax='80%'
              >
                {
                  getListUsersOnline()
                }
              </Scrollbars> */}
            </div>

            <div className="recent-chat-add-group ">
              <div className="recent-chat" style={{marginTop:'20px'}}>Bạn bè đang trực tuyến</div>
            </div>
            <div className="chat-list">
              <Scrollbars
                renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
                className="chat-list__recent"
                autoHide
                autoHeight={false}
                autoHeightMax='80%'
              >
                {
                  selectedType == 1 ? getListUsers() :
                    selectedType == 2 ? getListGroups() :
                      getListContact()
                }
              </Scrollbars>
              {/* <Scrollbars
                // className="chat-list__recent"
                // autoHide
                // autoHeight={false}
                // autoHeightMax='80%'
              >
              <div className="recent-chat-add-group ">
              <div className="recent-chat">Bạn bè đang trực tuyến</div>
              </div>
              </Scrollbars> */}

              {/* <hr className="divine-bottom" /> */}
              {/* <div className="recent-chat">Friends online</div> */}
              {/* <Scrollbars
                renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
                className="chat-list__recent"
                autoHide
                autoHeight={false}
                autoHeightMax='80%'
              >
                {
                  getListUsersOnline()
                }
              </Scrollbars> */}
              </div>
          </Scrollbars>

        </div>

      </div>
    </div>
  );
});

ChatList.propTypes = {
  listMember: PropTypes.any,
  setIsMultiContact: PropTypes.any,
  swapEmployee: PropTypes.any,
  listConversation: PropTypes.any,
  userInfo: PropTypes.any,
  setSingleContact: PropTypes.any,
  idSelected: PropTypes.any,
  setIsCreateGroup: PropTypes.any,
  setNewContact: PropTypes.any,
  selectContact: PropTypes.any
};

export default ChatList;
