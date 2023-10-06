/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useContext, useMemo } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Menu, Button, Dropdown, Input, Badge, Avatar, Tooltip, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CaretDownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Scrollbars from 'react-custom-scrollbars';
import { listConversationUnread } from '../../recoil/chat-atom';

import './HeaderMain.scss';
import PAGES from '../../routes/constants';
import { useCookies } from 'react-cookie';

import ClickOutside from '../click-outside/ClickOutside';
import DefaulAvatar from '../../assets/images/avatar_default.jpg';
import NotificationItem from '../notification-item/NotificationItem';
import LogoIcon from '../../assets/images/logo.svg'
import NotifiIcon from '../../assets/new/header/notification-icon.svg';
import ChatIcon from '../../assets/new/header/chat-icon.svg';
import ActivityIcon from '../../assets/new/header/activity-icon.svg';
import QAIcon from '../../assets/new/header/qa-icon.svg';
import InviteIcon from '../../assets/new/header/invite-icon.svg';
import SearchIcon from '../../assets/new/header/search-icon.svg';
import Setting from '../../assets/new/noti/setting.png';
import ExpandIcon from '../../assets/new/header/expand-icon.svg'
import { setCountChat } from '../../pages/social/components/messages/message.action';
import Search from '../../assets/new/common/tim-kiem.svg';

import Logo2 from '../../assets/new/side-bar/logo2.png';


import {
  getGroupTypeAction,
  setExpandCollapseHeader,
  logout
  // saveToken,
} from '../../stores/global/global.action';
import { getUserProfile } from '../../pages/user-profile/UserProfile.action';
import { SocketContext } from '../../services/socket';
// import { getUser } from './HeaderMain.selector';
// import Logout from "../../assets/images/logout.svg";
import API from '../../services/api';
import NotificationChatItem from '../notification-chat-item/NotificationItem';
import AvatarCustom from '../avatar-custom';
import { getUrlImage } from '../../utils';
import EmptyData from '../../pages/social/components/detail-posts/post/EmptyData';
import { useRecoilState, useRecoilValue } from 'recoil';
import SearchModal from '../../pages/search/SearchModal';
import { openChatModalState } from '../../recoil/chat-atom';

const site = process.env.REACT_APP_FIXED_DOMAIN;

const HeaderMain = () => {
  const [conversationUnread, setConversationUnread] = useRecoilState(listConversationUnread);
  const [listConversation, setListConversation] = useState([]);
  const [listNoti, setListNoti] = useState([]);
  const [listChat, setListChat] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [count, setCount] = useState(0);
  // const [countChat, setCountChat] = useState(0);
  const [change, setChange] = useState(false)
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const block = useRef();
  let user = useSelector((state) => state.get('userProfile').get('profile'));
  let countChat = useSelector((state) => state.get('message').get('countChat'));
  const [preMsg, setPreMsg] = useState([]);
  const [isOpenChatModal, setIsOpenChatModal] = useRecoilState(openChatModalState);

  // eslint-disable-next-line no-unused-vars
  const [userToken, removeUserToken] = useCookies(['user_abizin_token']);
  let countTemp = 0;
  let countChatTemp = 0;

  // useEffect(() => {
  //   var main = document.querySelector(".common--layout__main")
  //   var icon = document.querySelector(".expand-icon")
  //   if(main){
  //     var widthMain = main.offsetWidth
  //     icon.style.left = ((widthMain / 2) - 6) + "px"
  //   }
  // }, [])

  useMemo(() => {
    dispatch(getGroupTypeAction(1));
    dispatch(getUserProfile());
    // setTimeout(() => {
    // 	dispatch(saveToken(userToken.user_abizin_token));
    // 	dispatch(getUserProfile());
    // });
    API.chat.getListConversation().then(rs => {
      // console.log(rs.data);
      setListConversation(rs.data.data)
      const unread = rs.data.data.filter(item => (item.CountNotRead > 0) && (item.IsNotification));
      // console.log(unread)
      setConversationUnread([...unread])
      const countNew = rs.data?.data?.reduce((pre, cur) => {
        if (cur.IsNotification === true)
          return pre++;
        return pre
      }, 0)

      dispatch(setCountChat(countNew))
      // setCountChat(countNew);
    })
    return (() => { dispatch(setCountChat(0)) })
  }, [userToken.user_abizin_token]);

  //8 group 5 like 9 comment

  useEffect(() => {
    API.notification.getListNoti().then((res) => {
      if (res.code === 200) {
        setListNoti(res.data);
        if (res.data.length != 0) {
          var countNotRead = res.data.reduce((pre, cur) => {
            if (cur.IsViewed) {
              return pre
            }
            return pre + 1
          }, 0)
          setCount(countNotRead)
        }
      }
    });
  }, [change]);

  useEffect(() => {
    if (user.Id) {
      socket.emit('setSocketId', `io_183_${user.Id}`);
      socket.on('setSocketId', (msg) => {
      });
    }
  }, [user]);

  useMemo(() => {
    // console.log(countChat);
    if (user.Id) {
      socket.off('io_chat_create');
      socket.on('io_chat_create', (data) => {
        // console.log(data);
        // console.log(conversationUnread);
        // console.log(listConversation);

        if (data.user.Id !== user.Id) {
          if (!conversationUnread.find(item => item.Id === data.conversationId)) {
            // console.log('dmdmdmdm')
            const newUnread = listConversation.find(item => item.Id === data.conversationId);
            setConversationUnread([...conversationUnread, newUnread])
          }
          setListChat((prevMessages) =>
            JSON.parse(JSON.stringify([...prevMessages, data]))
          );

          if (!preMsg.includes(data.conversionId)) {
            setPreMsg([...preMsg, data.conversionId])
            dispatch(setCountChat(countChat + 1));
          }
        }
      });
    }
  }, [user]);

  useEffect(() => {
    // using socket here
    if (user.Id) {
      socket.on('io_post_like', (msg) => {
        countTemp++;
        setCount(countTemp);
        setChange(!change)
      });
      socket.on('io_post_comment', (msg) => {
        countTemp++;
        setCount(countTemp);
        setChange(!change)

      });
      socket.on('io_post_tag', (msg) => {
        setCount(count + 1);
        setChange(!change)

      });
      socket.on('io_post_share', (msg) => {
        setCount(count + 1);

        setChange(!change)
      });
      socket.on('io_group_invite', (msg) => {
        setCount(count + 1);
        setChange(!change)
      });
      socket.on('io_admin_group_invite', (msg => {
        setCount(count + 1);
        setChange(!change)
      }))
      socket.on('io_vote_create', (msg) => {
        setCount(count + 1);
        setChange(!change)

      });
      socket.on('io_member_request_group', (msg) => {
        setCount(count + 1);
        setChange(!change)
      })
      socket.on('io_notifi_send_user', (msg) => {
        setCount(count + 1);
        setChange(!change)
      });
    }
  }, [user]);

  const userJS = user?.toJS ? user.toJS() : user;
  //start check key search in url
  const keySearch = new URL(window.location.href).searchParams.get('q');
  //end check key search in url
  const [search, setSearch] = useState(keySearch);
  const [isShowDropdownNoti, setShowDropdownNoti] = useState(false);
  const [isShowDropdownChat, setShowDropdownChat] = useState(false);
  const [, , removeCookie] = useCookies(['abizin_token']);
  const [cookies, setCookie, removeCookieCompany] = useCookies(['company']);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = () => {
    if (!search) return;
    history.push(`/search-page?q=${search.trim()}`);
  };
  const directToMessagePage = () => {
    dispatch(setCountChat(0))
    // history.push(PAGES.messagesBox);
    setIsOpenChatModal(true)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!searchText) return;
      history.push(`/search-page?q=${searchText.trim()}`);
    } else {
      return;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push(PAGES.login);
  };

  const handleSelectAll = () => {
    history.push('/messages-box');
  };

  const handleRedirectToNewFeed = () => {
    history.replace('/');
  };

  const offDropdownNoti = () => {
    // if (!isModalVisible) {
    if (isShowDropdownNoti) {
      block.current = true;
    } else {
      block.current = false;
    }
    setShowDropdownNoti(false);
    // }
  };
  const offDropdownChat = () => {
    // if (!isModalVisible) {
    if (isShowDropdownChat) {
      block.current = true;
    } else {
      block.current = false;
    }
    setShowDropdownChat(false);
    // }
  };

  // handleExpandChat = () => {
  //   setListChatCollapse(listChat);
  // };

  // console.log('listNoti', listNoti);

  const menuNoti = (
    <ClickOutside onClickOutside={offDropdownNoti}>
      <div className='noti-dropdown'>
        <div className='noti-dropdown-header'>
          <h4>Thông báo</h4>
          <div className='noti-dropdown-header-icon'>
            <span>
              {/* <img src={Fil} /> */}
            </span>
            <span>
              <Link to={PAGES.setting}>
                <img src={Setting} />
              </Link>
            </span>
          </div>
        </div>

        <div className='noti-dropdown-body'>
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={100}
            autoHeightMax={300}
          >
            {listNoti &&
              listNoti.map((item, index) => {
                return <NotificationItem key={index} data={item} setShowDropdownNoti={setShowDropdownNoti} />;
              })}
            {listNoti.length === 0 && (
              <div>
                <EmptyData type={'notification'} />
                <br />
              </div>
            )}
          </Scrollbars>
        </div>
        <div className='noti-dropdown-view-all' onClick={() => history.push('/notifications')}>
          {/* <Link to={'/notifications'}> */}
          <span>Xem tất cả</span>
          {/* </Link> */}
        </div>
      </div>
    </ClickOutside>
  );

  const menuChat = (
    <ClickOutside onClickOutside={offDropdownChat}>
      <div className='noti-dropdown'>
        <div className='noti-dropdown-header'>
          <h4>Tin nhắn</h4>
          <div className='noti-dropdown-header-icon'>
            {/* <span>
              <img src={Fil} />
            </span> */}
            <span>
              <Link to={PAGES.setting}>
                <img src={Setting} />
              </Link>
            </span>
          </div>
        </div>

        <div className='noti-dropdown-body'>
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={100}
            autoHeightMax={300}
          >
            {listChat &&
              listChat.map((item, index) => {
                return <NotificationChatItem key={index} data={item} />;
              })}
          </Scrollbars>
        </div>
      </div>
    </ClickOutside>
  );

  const toggleDropdown = () => {
    if (!block.current) {
      setShowDropdownNoti(true);
    }
    block.current = false;

    // listNoti.forEach(noti => {
    //   if(!noti.IsViewed) {
    //     API.notification.seenNoti({id: noti.Id})
    //   }
    // })
    setCount(0);
  };

  const toggleDropdownChat = () => {
    if (!block.current) {
      setShowDropdownChat(true);
    }
    block.current = false;
    // setCountChat(0);
  };

  const expandCollapseHeader = useSelector(state => state.get('global').get('expandCollapse'))

  const expandCollapse = () => {
    dispatch(setExpandCollapseHeader(!expandCollapseHeader))
  }

  return (
    <header className='header-social'>
      <div className='header-search'>
        <img src={Logo2} style={{ width: '28px' }} />
        <p className="name" style={{ fontFamily: 'Arial', fontSize: "14px", fontWeight: "bold" }} >Tên công ty TNHH Balo Việt</p>
        {/* <div className="line"></div>
        <p className="title">Giải pháp phần mềm danh nghiệp</p> */}
      </div>
      <div className="header-info">
        <div className="header-info--item">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key='0'>
                  <Link to={PAGES.myProfile + '/' + user.Id}>
                    <div className='info-account'>
                      <AvatarCustom
                        src={userJS.Avatar ? getUrlImage(200, 200, userJS.Avatar) : ''}
                        size={32}
                        fullName={userJS?.FullName || 'Anonymous'}
                      />
                      <div>
                        <div className='name-account'>{userJS.FullName}</div>
                        <div className='note-account'>Thông tin tài khoản</div>
                      </div>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item key='1'>
                  <Link to={PAGES.setting}>
                    <div className='item-select'>
                      <SettingOutlined />
                      <div className='item-name'>Cài đặt</div>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item key='2' onClick={handleLogout}>
                  <div className='item-select'>
                    <LogoutOutlined />
                    <div className='item-name'>Đăng xuất</div>
                  </div>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            overlayClassName='header--account'
          >
            <Space size={10} className='cursor--pointer'>
              <AvatarCustom
                src={userJS.Avatar ? getUrlImage(200, 200, userJS.Avatar) : ''}
                size={32}
                fullName={userJS?.FullName || 'Anonymous'}
              />
            </Space>
          </Dropdown>
        </div>
        <div className="header-info--item">
          {/* <img src={NotifiIcon} /> */}
          <Dropdown
            overlay={menuNoti}
            overlayClassName='noti-dropdown-overlay'
            visible={isShowDropdownNoti}
            onClick={toggleDropdown}
            trigger={['click']}
            placement="bottomRight"
          >
            <Tooltip placement='bottom' title={'Thông báo'}>
              <div
                className={`btn--home ${history.location.pathname.includes('notifications')
                  ? 'active'
                  : ''
                  }`}
              // onClick={handleRedirectToNewFeed}
              >
                <Badge
                  count={count > 0 ? count : null}
                  className='cursor--pointer'
                  showZero
                  style={{
                    backgroundColor: '#FD830E',
                    fontSize: 10,
                    minWidth: 14,
                    height: 14,
                    lineHeight: '14px',
                  }}
                >
                  <img
                    src={NotifiIcon}
                  // className="w--18"
                  />
                </Badge>
              </div>
            </Tooltip>
          </Dropdown>
        </div>
        <Tooltip placement='bottom' title="Tin nhắn">
          <div className="header-info--item" onClick={directToMessagePage}>
            <Badge
              count={conversationUnread.length > 0 ? conversationUnread.length : null}
              className='cursor--pointer'
              showZero
              style={{
                backgroundColor: '#FD830E',
                fontSize: 10,
                minWidth: 14,
                height: 14,
                lineHeight: '14px',
              }}
            >
              <img src={ChatIcon} />
            </Badge>

          </div>
        </Tooltip>
        {/* <Tooltip placement='bottom' title="Activity" style={{ width: '79px' }}>
          <div className="header-info--item">
            <img src={ActivityIcon} />
          </div>
        </Tooltip> */}
        <div className="header-info--item">
          <Tooltip title={'Trợ giúp'}>
          <img src={QAIcon} />
          </Tooltip>
        </div>
        <div className="header-info--item">
          <Tooltip title={'Phân quyền'}>
          <img src={InviteIcon} />
          </Tooltip>
        </div>
        {/* {showSearch
          ? <Input
            className="search-type__left--search"
            size='small'
            placeholder='Search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            suffix={<img src={Search} />}
            onKeyDown={handleKeyDown}
          />
          : <div className="header-info--item">
            <img src={SearchIcon} onClick={() => setShowSearch(true)} />
          </div>
        } */}
        <SearchModal>
          <div className="header-info--item">
            <img src={SearchIcon} />
          </div>
        </SearchModal>
      </div>
      {/* <div className="expand-icon">
        <img src={ExpandIcon} onClick={() => expandCollapse()} />
      </div> */}
    </header>
  )

  // return (
  //   <>
  //     <header className='header-social'>
  //       <div className='container-fluid'>
  //         <div className='header-wrapper d-sm-flex d-none'>
  //           <Link className='logo' onClick={handleRedirectToNewFeed}>
  //             <img src={BigLogo} alt='logo' />
  //           </Link>
  //           <div className='header-search'>
  //             <Input
  //               placeholder='Tìm kiếm trên Abizin'
  //               value={search}
  //               onChange={handleChangeSearch}
  //               prefix={<img src={Search} />}
  //               onKeyDown={handleKeyDown}
  //             />
  //           </div>
  //           <div className='ml--auto'>
  //             <Space size={32}>
  //               <Tooltip placement='bottom' title={'Trang chủ'}>
  //                 <div
  //                   className={`btn--home ${
  //                     history.location.pathname.replace('/', '') === ''
  //                       ? 'active'
  //                       : ''
  //                   }`}
  //                   onClick={handleRedirectToNewFeed}
  //                 >
  //                   <img
  //                     src={
  //                       history.location.pathname.replace('/', '') === ''
  //                         ? HomeActive
  //                         : Home
  //                     }
  //                   />
  //                 </div>
  //               </Tooltip>
  //               <Button
  //                 // overlay={menuChat}
  //                 overlayClassName='noti-dropdown-overlay'
  //                 visible={isShowDropdownChat}
  //                 trigger={['click']}
  //                 placement="bottomRight"
  //                 onClick={directToMessagePage}
  //                 className={`btn--message ${
  //                   history.location.pathname.includes('messages-box')
  //                     ? 'active'
  //                     : ''
  //                 }`}
  //               >
  //                 <Tooltip placement='bottom' title={'Messenger'}>
  //                   <Badge
  //                     count={countChat > 0 ? countChat : null}
  //                     className='cursor--pointer'
  //                     showZero
  //                     style={{
  //                       backgroundColor: '#FA6342',
  //                       fontSize: 10,
  //                       minWidth: 14,
  //                       height: 14,
  //                       lineHeight: '14px',
  //                     }}
  //                   >
  //                     <img src={history.location.pathname.includes('messages-box') ? MessageActive : Message} className='w--20' />
  //                   </Badge>
  //                 </Tooltip>
  //               </Button>
  //               <Dropdown
  //                 overlay={menuNoti}
  //                 overlayClassName='noti-dropdown-overlay'
  //                 visible={isShowDropdownNoti}
  //                 onClick={toggleDropdown}
  //                 trigger={['click']}
  //                 placement="bottomRight"
  //               >
  //                 <Tooltip placement='bottom' title={'Thông báo'}>
  //                   <div
  //                     className={`btn--home ${
  //                       history.location.pathname.includes('notifications')
  //                         ? 'active'
  //                         : ''
  //                     }`}
  //                     // onClick={handleRedirectToNewFeed}
  //                   >
  //                     <Badge
  //                       count={count > 0 ? count : null}
  //                       className='cursor--pointer'
  //                       showZero
  //                       style={{
  //                         backgroundColor: '#FD830E',
  //                         fontSize: 10,
  //                         minWidth: 14,
  //                         height: 14,
  //                         lineHeight: '14px',
  //                       }}
  //                     >
  //                       <img
  //                         src={
  //                           history.location.pathname.includes('notifications')
  //                             ? NotiActive
  //                             : Noti
  //                         }
  //                         className="w--18"
  //                       />
  //                     </Badge>
  //                   </div>
  //                 </Tooltip>
  //               </Dropdown>
  //               <Dropdown
  //                 overlay={
  //                   <Menu>
  //                     <Menu.Item key='0'>
  //                       <Link to={PAGES.profile}>
  //                         <div className='info-account'>
  //                           <Avatar
  //                             size={32}
  //                             src={
  //                               userJS && userJS.Avatar
  //                                 ? `https://filemanager.crmdemo.net/file/image?width=320&height=320&format=png&fit=inside&image_id=${userJS.Avatar}`
  //                                 : DefaulAvatar
  //                             }
  //                           />
  //                           <div>
  //                             <div className='name-account'>{userJS.FullName}</div>
  //                             <div className='note-account'>Thông tin tài khoản</div>
  //                           </div>
  //                         </div>
  //                       </Link>
  //                     </Menu.Item>
  //                     <Menu.Item key='1'>
  //                       <Link to={PAGES.setting}>
  //                         <div className='item-select'>
  //                           <SettingOutlined />
  //                           <div className='item-name'>Cài đặt</div>
  //                         </div>
  //                       </Link>
  //                     </Menu.Item>
  //                     <Menu.Item key='2' onClick={handleLogout}>
  //                     <div className='item-select'>
  //                     <LogoutOutlined />
  //                           <div className='item-name'>Đăng xuất</div>
  //                         </div>
  //                     </Menu.Item>
  //                   </Menu>
  //                 }
  //                 trigger={['click']}
  //                 overlayClassName='header--account'
  //               >
  //                 <Space size={10} className='cursor--pointer'>
  //                   <Avatar
  //                     size={32}
  //                     src={
  //                       userJS && userJS.Avatar
  //                         ? `https://filemanager.crmdemo.net/file/image?width=200&height=200&format=png&fit=inside&image_id=${userJS.Avatar}`
  //                         : DefaulAvatar
  //                     }
  //                   />
  //                   <div className='user-name'>
  //                     <span>
  //                       {userJS ? userJS.FullName || userJS.Email : 'Anonymous'}{' '}
  //                       <CaretDownOutlined />
  //                     </span>
  //                   </div>
  //                 </Space>
  //               </Dropdown>
  //             </Space>
  //           </div>
  //         </div>
  //       </div>
  //       {/* <ModalSettingNotification isShow={true} /> */}
  //     </header>
  //   </>
  // );
};

HeaderMain.propTypes = {};

export default HeaderMain;
