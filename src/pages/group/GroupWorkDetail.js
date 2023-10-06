import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  Upload,
  Button,
  Dropdown,
  Menu,
  message,
  Tooltip,
  Grid,
  Space,
  Empty,
} from 'antd';
import PropTypes from 'prop-types';
import LayoutMain from '../../components/LayoutMain';
import ListGroupVertical from './components/list-group-vertical/ListGroupVertical';
import { Scrollbars } from 'react-custom-scrollbars';
import './GroupWork.scss';
import GroupInfo from './components/group-info/GroupInfo';
import ListGroupRequest from './components/request-group/ListGroupRequest';
import GroupTimeLineNew from './components/group-timeline/GroupTimeLineNew';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { saveToken } from '../../stores/global/global.action';
import { getGroupDetailAction, clearListGroup, actionGetListUserRequestGroup } from './Group.action';
import { getUrlImage, Images } from '../../utils';
import { selectGroupDetail } from './Group.selector';
import { selectGroupType } from '../../stores/global/global.selector';
import ModalCreateGroup from '../../components/modal-create-group/ModalCreateGroup';

// search modal
import SearchModal from '../search/SearchModal';

import { LoadScript } from '@react-google-maps/api';

import AvtGroup from '../../assets/images/avt-group.png';
import PrivacyLock from '../../assets/images/lock.png';
import RecentImage from '../../assets/images/avatar.svg';
import InviteMember from '../../assets/new/event/inviteUser.png';
import Joined from '../../assets/new/event/joined.png';
import UnCheck from '../../assets/new/event/uncheck.svg';
import MoreIcon from '../../assets/new/event/more.png';
import IconPublic from '../../assets/images/public_privacy.svg';
import SearchIcon from '../../assets/images/searchIcon.svg';
import IconEdit from '../../assets/new/group/ico_edit.svg';

import IconEmpty from '../../assets/new/empty-data/privateGroup.png';
import IconEditGroup from '../../assets/images/groups/icon-edit-group.svg';
import IconLogout from '../../assets/new/group/roi-nhom.svg';
import IconNotification from '../../assets/new/group/quan-ly-thong-bao.svg';
import IconUnfollow from '../../assets/new/group/bo-theo-doi.svg';
import apis from '../../services/api';
import { NavLink } from 'react-router-dom';
import PAGES from '../../routes/constants';
import TaskGroup from './components/task-work/TaskWork';
import EventGroup from './components/event/EventGroup';
import CalendarGroup from './components/calendar/CalendarGroup';
import AlbumGroup from './components/album/AlbumGroup';
import MembersGroup from './components/members/MembersGroup';
import { clearPriorityData } from '../../stores/posts/posts.action';
import SideBar from '../../components/sidebar';

import PostActiveIcon from '../../assets/new/user-profile/post-active-icon.svg'
import PostIcon from '../../assets/new/user-profile/post-icon.svg'
import GroupIcon from '../../assets/new/user-profile/group-icon.svg'
import ImageIcon from '../../assets/new/user-profile/image-icon.svg'
import VoteIcon from '../../assets/new/user-profile/vote-icon.svg'
import EventIcon from '../../assets/new/user-profile/event-icon.svg'
import GroupActiveIcon from '../../assets/new/user-profile/group-active-icon.svg'
import ImageActiveIcon from '../../assets/new/user-profile/image-active-icon.svg'
import VoteActiveIcon from '../../assets/new/user-profile/vote-active-icon.svg'
import EventActiveIcon from '../../assets/new/user-profile/event-active-icon.svg'
import CalendarIcon from '../../assets/new/new-post/calendar-icon.svg'
import CalendarActiveIcon from '../../assets/new/new-post/calendar-active-icon.svg'
import backIcon from '../../assets/images/backIcon.svg';
import featureComming from '../../assets/new/calendar/feature-comming.png'


const ModalSearch = React.lazy(() => import('./components/modal-search'));
const ModalInvite = React.lazy(() => import('./components/modal-invite'));
const ModalNotification = React.lazy(() =>
  import('./components/modal-notification')
);

const API_KEY = 'AIzaSyCpVGd7ftTRbp2ex5FZIEMdpGg03X-K0LQ';
const GroupWorkDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cookies] = useCookies(['abizin_token']);
  const [isShowModalEdit, toggleShowEdit] = useState(false);
  const groupDetail = useSelector(selectGroupDetail());
  const [waitingAccept, setWaitingAccept] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [typeOfTab, setTypeOfTab] = useState('timeline')
  const groupType = useSelector(selectGroupType());
  const [visibleModalSearch, showVisibleModalSearch] = useState(false);
  const [visibleModalInvite, showVisibleModalInvite] = useState(false);
  const [visibleModalNotification, showVisibleModalNotification] =
    useState(false);
  const user = useSelector((state) => state.get('userProfile').get('profile'));
  var isAdminGroup = groupDetail.Admin === user.Id;
  var isHideAllInfo = false;
  groupType.forEach((element) => {
    if (groupDetail.Type === element.Id) {
      if (!isAdminGroup && !groupDetail.IsJoin && element.Code === 'private') {
        isHideAllInfo = true;
      }
    }
  });

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

  const groupId = props?.match?.params?.id || null;

  useEffect(() => {
    // dispatch(saveToken(cookies.abizin_token));
    dispatch(getGroupDetailAction(props.match.params.id));
    setWaitingAccept(groupDetail.IsWaitingAccept);
  }, [props.match.params.id, groupDetail.IsWaitingAccept, isChanged]);

  useEffect(() => {

    return (() => { dispatch(clearListGroup()); dispatch(clearPriorityData()); setIsInvited(false) })
  }, [])

  useEffect(() => {
    var path = history.location.pathname
    if (path.includes('event')) {
      setTypeOfTab('event')
    }
    else if (path.includes('action')) {
      setTypeOfTab('action')
    }
    else if (path.includes('calendar')) {
      setTypeOfTab('calendar')
    }
    else if (path.includes('album')) {
      setTypeOfTab('album')
    }
    else if (path.includes('members')) {
      setTypeOfTab('members')
    }
    else {
      setTypeOfTab('timeline')
    }
  }, [history.location.pathname])

  useEffect(() => {
    apis.group.getListUserRequestGroup({ groupId: groupDetail.Id }).then(rs => {
      if (rs.code === 200) {
        rs.data.forEach(r => {
          if (r.Id === user.Id) {
            setIsInvited(true)
          }
        })
      }
    })
  }, [groupDetail.Id, isChanged])

  const renderPrivacyGroup = () => {
    const countMembers = groupDetail.Employee ? groupDetail.Employee.length : 0;
    var privacy = [];
    groupType.forEach((element) => {
      if (groupDetail.Type === element.Id) {
        privacy.push(
          <div className='item-privacy' key={element.Id}>
            <img src={element.Code === 'public' ? IconPublic : PrivacyLock} />
            <div className='text-privacy'>
              <span>{element.Name} | {countMembers + 1} thành viên</span>
              {/* <span>{countMembers + 1} thành viên</span> */}
            </div>
          </div>
        );
      }
    });
    if (privacy.length === 0) {
      return <div></div>;
    }
    return privacy;
  };

  const propsImg = {
    name: 'files',
    action: 'https://filemanager.crmdemo.net/file/upload/image',
    onChange(info) {
      if (info.file.status === 'done') {
        apis.group.uploadFile({
          name: info.file.name,
          type: 1,
          code: info.file.response.imageId,
        });
        updateImageGroup(info.file.response.imageId);
      } else {
      }
    },
  };

  const updateImageGroup = (imgId) => {
    var data = {
      avatar: imgId,
    };
    apis.group.editGroup(data, groupDetail.Id).then((res) => {
      if (res.code === 200) {
        dispatch(getGroupDetailAction(groupDetail.Id));
        // dispatch(getGroupDetailAction(props.match.params.id))
      }
    });
  };

  const renderMembersShort = () => {
    var listView = [];
    if (groupDetail.Employee) {
      let Employees = groupDetail.Employee;
      Employees = Employees.concat(groupDetail.AccountManager);
      Employees.map((item, index) => {
        var avatar =
          item.Avatar && item.Avatar !== ''
            ? getUrlImage(35, 35, item.Avatar)
            : RecentImage;
        if (index === 0) {
          listView.push(
            <img
              className={Employees.length === 1 ? 'avt-member' : 'avt-member avt-first'}
              src={avatar}
              title={item.FullName}
              key={index}
            />
          );
        } else if (index <= 3) {
          listView.push(
            <img
              className='avt-member'
              src={avatar}
              alt='recent'
              title={item.FullName}
              key={index}
            />
          );
        }
      });
    }
    return listView;
  };

  const onCloseModalSearch = () => {
    showVisibleModalSearch(false);
  };

  const handleShowModalSearch = () => {
    showVisibleModalSearch(true);
  };
  const requestJoinGroup = () => {
    apis.group
      .requestJoinGroup({ groupId: props.match.params.id })
      .then((res) => {
        if (res?.code === 200) {
          dispatch(getGroupDetailAction(props.match.params.id));
          setWaitingAccept(true);
          setIsChanged(!isChanged)
        } else {
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
        }
      });
  };

  const onCloseModalInvite = () => {
    showVisibleModalInvite(false);
  };

  const handleShowModalInvite = () => {
    showVisibleModalInvite(true);
  };

  const onCloseModalNotification = () => {
    showVisibleModalNotification(false);
  };

  const handleShowModalNotification = () => {
    showVisibleModalNotification(true);
  };

  const actionOutGroup = () => {
    let r = confirm('Bạn có chắc muốn rời khỏi nhóm này không?');
    if (r == true) {
      const Id = props.match.params.id;
      var data = {
        groupId: Id,
      };
      apis.group.outGroup(data).then((res) => {
        if (res?.code === 200) {
          dispatch(getGroupDetailAction(Id));
        } else {
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau!!!');
        }
      });
    }
  };

  const acceptJoinGroup = () => {
    var data = {
      groupId: groupDetail.Id,
      isAccept: true
    }
    apis.group.memberApproveJoinGroup(data).then(rs => {
      if (rs.code === 200) {
        setIsChanged(!isChanged)
        message.success('Tham gia nhóm thành công.')
      } else {
        message.error('Đã xảy ra lỗi, vui lòng thử lại sau!!!');
      }
    })
  }

  const menu = (
    <Menu className='menu__group__more' style={{ borderRadius: 10 }}>
      {isAdminGroup ? (
        <Menu.Item onClick={() => toggleShowEdit(true)}>
          <img className='icon-menu' src={IconEditGroup} />
          Thông tin
        </Menu.Item>
      ) : (
        ''
      )}

      {/* {!isAdminGroup && groupDetail.IsJoin ? (
        <Menu.Item>
          <img className='icon-menu' src={IconUnfollow} />
          Bỏ theo dõi
        </Menu.Item>
      ) : (
        ''
      )} */}

      {isAdminGroup || groupDetail.IsJoin ? (
        <Menu.Item onClick={handleShowModalNotification}>
          <img className='icon-menu' src={IconNotification} />
          Quản lý thông báo
        </Menu.Item>
      ) : (
        ''
      )}

      {!isAdminGroup && groupDetail.IsJoin ? (
        <Menu.Item onClick={() => actionOutGroup()}>
          <img className='icon-menu' src={IconLogout} />
          Rời nhóm
        </Menu.Item>
      ) : (
        ''
      )}
    </Menu>
  );

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // console.log('GROUP_DETAILS', groupDetail)

  return (
    <>
      <LayoutMain>
        <div className="common--layout">
          <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
            <SideBar title="Group" />
          </div>
          <div className={`common--layout__main--full ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
            <div className="calendar-group-page common--layout">
              <div className='group--layout__main'>
                <div className='group-header'>
                  <div style={{ position: 'relative', height: 320 }}>
                    <Image
                      className='group-avata-background'
                      width={'100%'}
                      height={'100%'}
                      style={{ objectFit: 'cover' }}
                      src={
                        groupDetail.Avatar && groupDetail.Avatar !== ''
                          ? getUrlImage(820, 320, groupDetail.Avatar)
                          : AvtGroup
                      }
                    />
                    <div>
                      <Button className='back-btn' onClick={() => history.replace('/income')}>
                        <img
                          src={backIcon}
                          alt='backIcon'
                          style={{ height: 20, width: 20, marginLeft: '-10px', marginRight: '5px' }} />
                        Trở lại
                      </Button>
                      {/* <Image alt="example" style={{ objectFit: 'cover' }} src={event?.Image ? getUrlImage(600, 1000, event.Image) : Images.eventImage} width={530} height={'100%'} /> */}
                    </div>
                    {isAdminGroup ? (
                      <Upload
                        className='edit-img-group'
                        {...propsImg}
                        maxCount={1}
                      >
                        Chỉnh sửa ảnh
                      </Upload>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='content-info'>
                    <span className='group-name'>{groupDetail.Name}</span>
                    <div className='group-general-info'>
                      <div className='list-avt-member'>
                        {renderPrivacyGroup()}
                        <div className='content-avt'>
                          {renderMembersShort()}
                        </div>
                      </div>
                      <div className='item-member'>
                        <div className='list-avt-member'>
                          {isAdminGroup ? (
                            <Button block className="btn-joined-members" disabled>
                              <img src={Joined} alt="joined" />
                              <span>Đã tham gia</span>
                            </Button>
                          ) : (
                            ''
                          )}
                          {!isAdminGroup ? (
                            groupDetail.IsJoin ? (
                              <Button className='btn-joined-members' disabled>
                                <img src={Joined} alt='recent' />
                                <span>Đã tham gia</span>
                              </Button>
                            ) : isInvited && waitingAccept ? (
                              <Button className='btn-joined-members' disabled>
                                <span>Chờ phê duyệt</span>
                              </Button>
                            ) : !isInvited && waitingAccept ? (
                              <Button className='btn-joined-members' style={{ width: '180px' }} onClick={() => acceptJoinGroup()}>
                                <span>Chấp nhận tham gia</span>
                              </Button>
                            ) : (
                              <Button
                                className='btn-join'
                                onClick={() => requestJoinGroup()}
                              >
                                <img src={UnCheck} alt='UnCheck'></img>
                                <span>Tham gia</span>
                              </Button>
                            )
                          ) : (
                            ''
                          )}
                          {isAdminGroup || groupDetail.IsJoin ? (
                            <Button
                              className='btn-invite-members'
                              onClick={() => handleShowModalInvite(true)}
                            >
                              <img src={InviteMember} alt='recent' />
                              <span>Mời tham gia</span>
                            </Button>
                          ) : (
                            ''
                          )}
                          {/* {isAdminGroup ? (
                          <Button className='btn-joined-members'>
                            <img src={IconEdit} alt='recent' />
                            <span>Quản lý</span>
                          </Button>
                        ) : (
                          ''
                        )} */}
                          {isAdminGroup ? (
                            <Dropdown overlay={menu}>
                              <a
                                className='btn-more-square'
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  height={15}
                                  width={15}
                                  style={{ objectFit: 'contain' }}
                                  src={MoreIcon}
                                  alt='recent'
                                />
                              </a>
                            </Dropdown>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!isHideAllInfo && (
                  <div className='new-post-container-social'>
                    <div className='tabs-wrapperr'>
                      <Space size={0} style={{ width: '100%' }}>
                        <Row gutter={0}>
                          <Col className="gutter-row" span={4}>
                            <div
                              className={`tabs-wrapperr__item ${typeOfTab === 'timeline' ? 'selected' : ''
                                }`}
                              onClick={() => { setTypeOfTab('timeline'); history.push(`/group-work/${groupDetail.Id}`); }}
                            >
                              <Tooltip title="Tin nội bộ">
                                <div className="tabs-item">
                                  <img src={typeOfTab === 'timeline' ? PostActiveIcon : PostIcon} className={`${typeOfTab === 'timeline' ? '' : 'w--15'}`} />
                                  {typeOfTab !== 'timeline' ? <span className="tabs-item__title">Tin nội bộ</span>
                                    : <span className="tabs-item__title-active">Tin nội bộ</span>}
                                </div>
                              </Tooltip>
                              {typeOfTab !== 'event' && typeOfTab !== 'timeline' && <div className="border-right-gw"></div>}
                            </div>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <div
                              className={`tabs-wrapperr__item ${typeOfTab === 'event' ? 'selected' : ''
                                }`}
                              onClick={() => { setTypeOfTab('event'); history.push(`/group-work/${groupDetail.Id}/event`); }}
                            >
                              {typeOfTab !== 'timeline' && typeOfTab !== 'event' && <div className="border-left-gw"></div>}
                              <Tooltip title="Họp/Sự kiện">
                                <div className="tabs-item">
                                  <img src={typeOfTab === 'event' ? EventActiveIcon : EventIcon} className={`${typeOfTab === 'event' ? '' : 'w--15'}`} />
                                  {typeOfTab !== 'event' ? <span className="tabs-item__title">Sự kiện</span>
                                    : <span className="tabs-item__title-active">Sự kiện</span>}
                                </div>
                              </Tooltip>
                              {typeOfTab !== 'event' && typeOfTab !== 'calendar' && <div className="border-right-gw"></div>}
                            </div>
                          </Col>
                          {/* <Col className="gutter-row" span={4}>
                            <div
                              className={`tabs-wrapperr__item ${typeOfTab === 'action' ? 'selected' : ''
                                }`}
                              onClick={() => { setTypeOfTab('action'); history.push(`/group-work/${groupDetail.Id}/action`); }}
                            >
                              {typeOfTab !== 'event' && typeOfTab !== 'action' && <div className="border-left-gw"></div>}
                              <Tooltip title="Khảo sát">
                                <div className="tabs-item">
                                  <img src={typeOfTab === 'action' ? VoteActiveIcon : VoteIcon} className={`${typeOfTab === 'action' ? '' : 'w--15'}`} />
                                  {typeOfTab !== 'action' ? <span className="tabs-item__title">Khảo sát</span>
                                    : <span className="tabs-item__title-active">Khảo sát</span>}
                                </div>
                              </Tooltip>
                              {typeOfTab !== 'action' && typeOfTab !== 'calendar' && <div className="border-right-gw"></div>}
                            </div>
                          </Col> */}
                          <Col className="gutter-row" span={4}>
                            <div
                              className={`tabs-wrapperr__item ${typeOfTab === 'calendar' ? 'selected' : ''
                                }`}
                              onClick={() => { setTypeOfTab('calendar'); history.push(`/group-work/${groupDetail.Id}/calendar`); }}
                            >
                              {typeOfTab !== 'action' && typeOfTab !== 'calendar' && <div className="border-left-gw"></div>}
                              <Tooltip title="Lịch">
                                <div className="tabs-item">
                                  <img src={typeOfTab === 'calendar' ? CalendarActiveIcon : CalendarIcon} className={`${typeOfTab === 'calendar' ? '' : 'w--15'}`} />
                                  {typeOfTab !== 'calendar' ? <span className="tabs-item__title">Lịch</span>
                                    : <span className="tabs-item__title-active">Lịch</span>}
                                </div>
                              </Tooltip>
                              {typeOfTab !== 'calendar' && typeOfTab !== 'album' && <div className="border-right-gw"></div>}
                            </div>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <div
                              className={`tabs-wrapperr__item ${typeOfTab === 'album' ? 'selected' : ''
                                }`}
                              onClick={() => { setTypeOfTab('album'); history.push(`/group-work/${groupDetail.Id}/album`); }}
                            >
                              {typeOfTab !== 'calendar' && typeOfTab !== 'album' && <div className="border-left-gw"></div>}
                              <Tooltip title="Ảnh">
                                <div className="tabs-item">
                                  <img src={typeOfTab === 'album' ? ImageActiveIcon : ImageIcon} className={`${typeOfTab === 'album' ? '' : 'w--15'}`} />
                                  {typeOfTab !== 'album' ? <span className="tabs-item__title">Ảnh</span>
                                    : <span className="tabs-item__title-active">Ảnh</span>}
                                </div>
                              </Tooltip>
                              {typeOfTab !== 'album' && typeOfTab !== 'members' && <div className="border-right-gw"></div>}
                            </div>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <div
                              className={`tabs-wrapperr__item ${typeOfTab === 'members' ? 'selected' : ''
                                }`}
                              onClick={() => { setTypeOfTab('members'); history.push(`/group-work/${groupDetail.Id}/members`); }}
                            >
                              {typeOfTab !== 'members' && typeOfTab !== 'album' && <div className="border-left-gw"></div>}
                              <Tooltip title="Thành viên">
                                <div className="tabs-item">
                                  <img src={typeOfTab === 'members' ? GroupActiveIcon : GroupIcon} className={`${typeOfTab === 'members' ? '' : 'w--15'}`} />
                                  {typeOfTab !== 'members' ? <span className="tabs-item__title">Thành viên</span>
                                    : <span className="tabs-item__title-active">Thành viên</span>}
                                </div>
                              </Tooltip>
                              {/* {typeOfTab !== 'members' && typeOfTab !== 'after' && <div className="border-right-gw"></div>} */}
                            </div>
                          </Col>


                          <Col span={4}>
                            <SearchModal groupId={groupId} isSearchInGroup groupName={groupDetail ? groupDetail.Name : ''} >
                              <div className="cursor-pointer btn-more-square" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                <Tooltip
                                  placement='topLeft'
                                  title={'Tìm kiếm trong nhóm'}
                                >
                                  <img
                                    height={30}
                                    width={30}
                                    src={SearchIcon}
                                    alt=''
                                    className=''
                                    style={{ position: 'absolute', right: '5px' }}
                                  // onClick={handleShowModalSearch}
                                  />
                                </Tooltip>
                              </div>
                            </SearchModal>
                          </Col>
                        </Row>
                      </Space>
                    </div>
                  </div>)}
                {!isHideAllInfo ? (
                  <Switch>
                    <Route
                      path={`/group-work/:id/action`}
                      component={() => GroupTimeLineNew({ groupId, type: 'vote' })}
                      exact
                    />
                    <Route
                      path={`/group-work/:id/event`}
                      component={() => GroupTimeLineNew({ groupId, type: 'event' })}
                      exact
                    />
                    <Route
                      path={`/group-work/:id/calendar`}
                      component={() => (<div style={{ marginTop: "50px" }}>
                        <Empty
                          image={<img src={featureComming} alt="featureComming" />}
                          description={<div><p style={{ fontSize: "16px", fontWeight: "500" }}>Tính năng sắp ra mắt</p></div>}
                        />
                      </div>)}
                      exact
                    />
                    <Route
                      path={`/group-work/:id/album`}
                      component={AlbumGroup}
                      exact
                    />
                    <Route
                      path={`/group-work/:id/members`}
                      component={MembersGroup}
                      exact
                    />
                    <Route
                      path={`/group-work/:id`}
                      component={() => GroupTimeLineNew({ groupId, type: 'post' })}
                      exact
                    />

                    <Redirect from='*' to={PAGES.groupWork} />
                  </Switch>
                ) : (
                  <div className='empty-data-private-group'>
                    <img className='icon-empty' src={IconEmpty} />
                    {/* <div className='title-empty'>Đây là nhóm riêng tư</div>
                    <span className='text-empty'>
                      Hãy tham gia nhóm này để xem và thảo luận
                    </span> */}
                  </div>
                )}
              </div>
              <div className='group--layout__right'>
                <Scrollbars style={{ height: '100%' }}>
                  <div className='mb--20'>
                    <GroupInfo />
                  </div>
                  {isAdminGroup && (
                    <div className='mb--20'>
                      <ListGroupRequest />
                    </div>
                  )}
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
        {isShowModalEdit && (
          <ModalCreateGroup
            isShow={isShowModalEdit}
            onToggle={() => toggleShowEdit(false)}
            type='EDIT'
            user={user}
          />
        )}
      </LayoutMain>

      <Suspense fallback={<div></div>}>
        <section>
          {visibleModalSearch && (
            <ModalSearch
              onCloseModalSearch={onCloseModalSearch}
              visibleModalSearch={visibleModalSearch}
              groupId={groupId}
            />
          )}
        </section>
      </Suspense>
      <Suspense fallback={<div></div>}>
        <section>
          {visibleModalInvite && (
            <ModalInvite
              onCloseModalInvite={onCloseModalInvite}
              visibleModalInvite={visibleModalInvite}
              groupId={groupId}
            />
          )}
        </section>
      </Suspense>
      <Suspense fallback={<div></div>}>
        <section>
          {visibleModalNotification && (
            <ModalNotification
              onCloseModalNotification={onCloseModalNotification}
              visibleModalNotification={visibleModalNotification}
              groupId={groupId}
            />
          )}
        </section>
      </Suspense>
    </>
  );
};

GroupWorkDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any.isRequired,
    }),
  }),
};

export default GroupWorkDetail;
