/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import {
  Row,
  Col,
  Input,
  Table,
  Menu,
  Dropdown,
  Spin,
  Card,
  Divider,
  Tooltip,
  Image,
  Modal,
  Avatar,
  Space,
  TimePicker,
  Select,
  Typography,
  Button
} from "antd";
import { SearchOutlined, LoadingOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import localization from "moment/locale/vi";
moment.locale("vi", localization);
import Picker from "emoji-picker-react";
import LayoutMain from "../../components/LayoutMain";
import "./EventDetail.scss";
import { getEvent, clearEvent, editEvent } from "../../stores/event/event.action";
import { selectEvent } from "../../stores/event/event.selector";
import API from "../../services/api";
import toaster from "../../components/toaster";
import PostComments from "./Comments";
import DefaulAvatar from "../../assets/images/avatar_default.jpg";
import IconAdd from '../../assets/new/common/add-icon.svg'
import FormatText2 from "../../utils/FormatText2";
import FormatText3 from "../../utils/FormatText3";
// import API from "../../services/api";
// import { PROCESS_SUCCESS } from "../../constants/strings";
// import BoxLoading from "../../components/box-loading/BoxLoading";
// import { ReactComponent as Flags } from "../../assets/images/flags.svg";
// import { ReactComponent as Ticket } from "../../assets/images/ticket.svg";
import { getUrlFile, getUrlImage, Icons, Images } from "../../utils";
import Background from "../../assets/new/common/event-banner.png";
import iconMore from "../../assets/new/event/iconMore.png";
import iconEdit from "../../assets/new/common/edit-black.svg";
import iconCheck from "../../assets/new/common/tick.svg";
import iconDelete from "../../assets/new/common/delete-black.svg";
import iconJoin from "../../assets/new/event/chua-tham-gia.svg";
import iconJoined from "../../assets/new/event/da-tham-gia-2.svg";
import careBack from "../../assets/new/event/quan-tam-black.svg";
import caredBack from "../../assets/new/event/quan-tam-blue.svg";
import shareBack from "../../assets/new/event/share-black.svg";
import nhomNguoi from "../../assets/new/event/phu-trach.svg";
import oclock from "../../assets/new/event/dong-ho.svg";
import peson from "../../assets/new/event/nguoi-tham-gia.svg";
import locationIcon from "../../assets/new/event/dia-chi.svg";
import wordIcon from "../../assets/images/icon-file/icon_word.svg";
import IconPdf from "../../assets/images/icon-file/icon_pdf.svg";
import IconExcel from "../../assets/images/icon-excel.svg";
import IconZip from "../../assets/images/icon-zip.svg";
import IconRar from "../../assets/images/icon-rar.svg";
import IconOther from "../../assets/images/icon-other-file.svg";
import RemindIcon from "../../assets/images/remind.png";
import Icon from "../../assets/new/common/icon.svg";
import { SharePost } from "../social/components/detail-posts/post/SharePost";
import CloseBlack from "../../assets/new/common/close-black.svg";
import { createPost } from "../../stores/posts/posts.action";
import { postCommentEvent } from "../../stores/event/event.action";
import Scrollbars from "react-custom-scrollbars";
import SideBar from "../../components/sidebar";
import { GGMap } from "../social/components/new-post/components";
import InputComment from '../social/components/detail-posts/post/InputComment';
import { Agendar, Detail, Diary } from "./tabs";
import ModalListMembers from './drawer-list-members';
import backIcon from '../../assets/images/backIcon.svg';
import { setTypeList } from '../../stores/global/global.action'
import { deleteEventSuccess } from '../../stores/posts/posts.action';
import { paths } from "../../services/api/paths";
import apis from '../../services/api';
import { toast } from "react-toastify";

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

const { Title, Text } = Typography;

// eslint-disable-next-line react/prop-types
const IconText = ({ icon, text, boldText }) => (
  <div className="IconText">
    <Image src={icon} preview={false} width={18} height={18} />
    <Text className="IconText__text">{text}<Text style={{ fontWeight: 'bold' }}>{boldText}</Text></Text>
  </div>
)

const EventDetail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const INCOMING = "incoming";
  const MY_EVENT = "myevent";
  const history = useHistory();
  const keySearch = new URL(window.location.href).searchParams.get("q");
  const event = useSelector(selectEvent());
  const [search, setSearch] = useState(keySearch);
  const [tab, setTab] = useState(INCOMING);
  const [isCare, setIsCare] = useState(false);
  const [countCare, setCountCare] = useState(0);
  const [countShare, setCountShare] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [countJoin, setCountJoin] = useState(0);
  const user = useSelector((state) => state.get("userProfile").get("profile"));
  const [isExtend, setIsExtend] = useState(true);
  const [isShowShare, setIsShowShare] = useState(false);
  const [currentTab, setCurentTab] = useState(1);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const [inputComment, setInputComment] = useState(null);
  const [changeComment, setChangeComment] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [isAddRow, setIsAddRow] = useState(false);
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [listTags, setListTag] = useState([]);
  const [optionsUserEvent, setOptionsUserEvent] = useState([]);
  const [employees, setEmployees] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [remindDetail, setRemindDetail] = useState('');

  const { Option } = Select;

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

  useEffect(() => {
    if (user.size == 0) return

    var listItem = [];

    Promise.all([
      API.employee.getListEmployees(),
      API.group.getListGroup({ keySearch: '', index: 1, pageSize: 100000 }),
      API.user.getUserProfile()
    ])
      .then((rs) => {
        if (rs) {
          if (rs[0].code == 200) {
            rs[0].data.forEach((i) => { if (i.UserId != user.Id && i.Email != user.Email) listItem.push({ Id: i.UserId, Email: i.Email, FullName: i.FullName, Avatar: i.Avatar, TagType: 1 }) })
          }
        }

        listItem.sort(function (a, b) {
          if (a.FullName < b.FullName) { return -1; }
          if (a.FullName > b.FullName) { return 1; }
          return 0;
        })

        listItem.unshift({ Id: rs[2]?.data.CompanyId, Email: "", FullName: "Toàn công ty", TagType: 3 });
        listItem.unshift({ Id: user.Id, Email: user.Email, FullName: "Mình tôi", TagType: 4 });
        listItem = listItem.map((item, index) => ({ ...item, index: index.toString() }))

        setListTag(listItem);
      })

  }, [user]);

  useEffect(() => {
    // console.log('event', event)
    if (event && event.Angendars && event.Angendars.length > 0) {
      var list = event.Angendars.map(rs => ({
        ...rs,
        Curator: JSON.parse(rs?.Curator ?? null).map(item => JSON.stringify(item)),
        edit: false,
        dates: [rs.FromDate, rs.ToDate],
        times: [rs.FromTime, rs.ToTime]
      }));
      setCheckList(list)
    }
    if (event && event.Employees) {
      const listEmployees = event.Employees;
      let listEmployeesString = '';
      listEmployees.forEach((item, index) => {
        if (index === 0) listEmployeesString = item.FullName;
        else {
          listEmployeesString += ', ' + item.FullName;
        }
      });
      setEmployees(listEmployeesString);
    }
    if (event && event.Remind) {
      const listRemind = [
        { id: 'd1', detail: '1 ngày' },
        { id: 'd2', detail: '2 ngày' },
        { id: 'd3', detail: '3 ngày' },
        { id: 'd4', detail: '4 ngày' },
        { id: 'd5', detail: '5 ngày' },
        { id: 'd6', detail: '6 ngày' },
        { id: 'd7', detail: '7 ngày' },
        { id: 'm15', detail: '15 phút' },
        { id: 'm30', detail: '30 phút' },
        { id: 'h1', detail: '1 giờ' },
        { id: 'h2', detail: '2 giờ' },
      ];
      const remind = event.Remind.split(',');
      const listRemindDetail = listRemind.filter(item => remind.includes(item.id));
      setRemindDetail(listRemindDetail.length === 1 
        ? listRemindDetail[0].detail 
        : listRemindDetail[0].detail + ' và trước ' + listRemindDetail[1].detail);
    }
  }, [event])

  useEffect(() => {
    setOptionsUserEvent(listTags.map((item, index) => {
      return <Option key={item.Id}>{item.FullName || item.Email}</Option>
    }))

  }, [listTags.length])

  useEffect(() => {
    dispatch(getEvent(id));
    // return () => dispatch(clearEvent());
    document.addEventListener("click", handleShare, true);
    return () => {
      document.removeEventListener("click", handleShare);
      dispatch(clearEvent());
    };
  }, []);

  const handleShare = (event) => {
    const classList =
      typeof event?.target?.className !== "object"
        ? event?.target?.className?.split(" ")
        : [];
    if (classList.length == 0 || classList[0] != "share-wrapper__plugin") {
      setIsShowShare(false);
    }
  };

  const showSharePlugin = (event, _event) => {
    if (isCheckDate(_event?.FromDate)) {
      return
    }
    const classList =
      typeof event?.target?.className !== "object"
        ? event?.target?.className?.split(" ")
        : [];
    const parentClassList = [...event.target?.parentElement?.classList];

    if (
      (classList.length != 0 && classList.find((r) => r == "share-wrapper")) ||
      (parentClassList.length != 0 &&
        parentClassList.find((r) => r == "share-wrapper"))
    ) {
      setIsShowShare(true);
    }
  };

  const handlePushComment = async (data) => {
    // if (inputComment) {
    //   dispatch(
    //     postCommentEvent({
    //       content: inputComment.content,
    //       isPost: 0,
    //       parentId: +event.Id,
    //       tags: [],
    //       employees: [],
    //       file: [],
    //     })
    //   );

    //   setChangeComment(!changeComment);
    //   setInputComment(null);
    // }
    await dispatch(createPost({ ...data, parentId: +event.Id, parentList: [event.Id], isEvent: true }))
    setChangeComment(!changeComment);
    setInputComment(null);
  };

  const handlechangeInputComment = (event, id) => {
    setInputComment({ id, content: event.target.value });
  };

  const onEmojiClick = (id, emojiObject, event) => {
    event.preventDefault();
    setInputComment({
      id,
      content: inputComment?.content
        ? inputComment?.content + emojiObject.emoji
        : emojiObject.emoji,
    });
  };

  useEffect(() => {
    if (event) {
      setCountCare(event.CareDetails?.length ?? 0);
      setCountJoin(event.ParticipantDetais?.length ?? 0);
      setCountShare(event.CountShare ?? 0)
      setIsJoin(event.IsJoin);
      setIsCare(event.IsCare);
    }
  }, [event]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeTab = (value) => {
    setTab(value);
  };

  const onChangeConsider = (id, event) => {
    if (isCheckDate(event?.FromDate)) {
      return
    }
    let data = JSON.parse(JSON.stringify(countCare));
    API.event
      .userConsiderEvent({
        id: id,
        action: 2,
        status: !isCare ? 1 : 0,
      })
      .then((rs) => {
        if (rs.code === 200) console.log("Success", rs);
        setIsCare(!isCare);
        setCountCare(!isCare ? ++data : --data);
      })
      .catch((rs) => {
        console.log("fail", rs);
      });
  };

  const handleShareEvent = () => {
    let data = { id: event.Id, action: 0, status: 1 };
    setLoading(true);
    API.posts
      .reactPost(data)
      .then((res) => {
        if (res?.code !== 200) {
          toaster.error("Đã xảy ra lỗi vui lòng thử lại sau!!!");
        } else {
          toaster.success("Đã chia sẻ sự kiện");
        }
        setLoading(false);
      })
      .catch(() => {
        toaster.error("Đã xảy ra lỗi vui lòng thử lại sau!!!");
        setLoading(false);
      });
  };

  const onChangeJoin = (event) => {
    // if (isCheckDate(event?.FromDate)) {
    //   return
    // }
    let data = JSON.parse(JSON.stringify(countJoin));
    API.event
      .userJoinEvent({
        id: +event.Id,
        isJoin: isJoin ? 0 : 1,
      })
      .then((rs) => {
        if (rs.data) {
          setIsJoin(!isJoin);
          setCountJoin(!isJoin ? ++data : --data);
        };
      })
      .catch((rs) => {
        toaster.error("Đã xảy ra lỗi vui lòng thử lại sau!!!");
        console.log("fail", rs);
      });
  };

  const isOwner = () => {
    return +event?.CreatedBy === +user.Id;
  };

  const getIcon = (item) => {
    if (typeof item === "string") {
      var string = item.split(".");
      var _string = string[string.length - 1];
      if (_string.includes("doc")) {
        return wordIcon;
      } else if (_string.includes("pdf")) {
        return IconPdf;
      } else if (_string.includes("xls")) {
        return IconExcel;
      } else if (_string.includes("rar")) {
        return IconRar;
      } else if (_string.includes("zip")) {
        return IconZip;
      } else return IconOther
    }
    return getIcon(item.Files);
  };
  const getUrl = (item) => {
    if (typeof item === "string") return getUrlFile(item);
    else return getUrlFile(item.Files);
  };

  const getName = (item) => {
    if (typeof item === "string") return item;
    else return item.Name;
  };

  const onEditRowCheckList = (item) => {
    var newList = []
    checkList.forEach(rs => {
      rs.FromDate = moment(rs.FromDate);
      // rs.ToDate = moment(rs.ToDate);
      // rs.dates = [rs.FromDate, rs.ToDate];
      rs.FromTime = moment(rs.FromTime, 'HH:mm:ss').format('HH:mm');
      rs.ToTime = moment(rs.ToTime, 'HH:mm:ss').format('HH:mm');
      rs.times = [rs.FromTime, rs.ToTime];
      if (rs.Id === item.Id) {
        rs.edit = true
        newList.push(rs)
      }
      else newList.push(rs)
    });
    setCheckList(newList)
  }

  const onDeleteRowCheckList = (item) => {
    API.event
      .deleteAgendar({
        eventId: event.Id,
        agendarId: item.Id
      })
      .then((res) => {
        if (res.code === 200) toaster.success('Xóa thành công')
      })
      .catch((err) => {
        toaster.error(err)
      });

    const newList = checkList.filter(listItem => item.Id !== listItem.Id);
    setCheckList(newList);
  }

  const onSaveRowCheckList = (item, index) => {
    if (!item.Content || !item.times || !item.dates || !item.Curator) {
      return
    }

    var newList = []
    checkList.forEach(rs => {
      if (rs.Id === item.Id) {
        rs.edit = false
        newList.push(rs)
      }
      else newList.push(rs)
    });

    const { Content, Curator, FromDate, ToDate, FromTime, ToTime, Id } = item;
    if (item.add === true) {
      API.event
        .createAgendar({
          eventId: event.Id,
          content: Content,
          fromDate: moment(FromDate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
          // toDate: moment(ToDate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
          fromTime: FromTime + ':00',
          toTime: ToTime + ':00',
          curator: Curator.map(item => parseInt(item))
        })
        .then((res) => {
          // if (res.code === 200) toaster.success('Thêm mới thành công')
        })
        .catch(err => console.log('err', err));
    } else {
      API.event
        .updateAgendar({
          id: Id,
          eventId: event.Id,
          content: Content,
          fromDate: moment(FromDate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
          // toDate: moment(ToDate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
          fromTime: FromTime + ':00',
          toTime: ToTime + ':00',
          curator: Curator.map(item => parseInt(item))
        })
        .then((res) => {
          // if (res.code === 200) toaster.success('Cập nhật thành công')
        })
        .catch(err => console.log('err', err));
    }

    var newCheckList = newList.map((rs, idx) => {
      if (idx === index) {
        delete rs.edit
        // rs?.Curator && rs?.Curator?.forEach(rs => curator.push(parseInt(rs)))
        if (rs.Id < 0) {
          delete rs.Id
        }
        var curators = []
        curators = Curator.map(item => listTags.find(el => el.Id === item))
        rs.CuratorDetails = curators

        if (rs.FromTime) {
          rs.FromTime += ':00';
        }
        if (rs.ToTime) {
          rs.ToTime += ':00';
        }

        if (rs.dates) {
          rs.dates = rs.dates.map(item => moment(item, 'DD/MM/YYYY').format('YYYY/MM/DD'))
        }

        if (rs.FromDate) {
          rs.FromDate = moment(rs.FromDate, 'DD/MM/YYYY').format('YYYY/MM/DD')
        }
        if (rs.ToDate) {
          rs.ToDate = moment(rs.ToDate, 'DD/MM/YYYY').format('YYYY/MM/DD')
        }
      }

      return rs
    })

    // dispatch(editEvent({ data: { agendarList: newCheckList }, id: +event.Id }))

    console.log('newCheckList', newCheckList)
    setCheckList(newCheckList)
  }

  const onViewImage = () => {
    setIsVisibleImage(true)
  }

  const onChangeInputRow = (item, e, col) => {
    setCheckList(checkList.map((r) => {
      if (r.Id === item.Id) {
        r[col] = e.target.value
        return r
      }
      return r
    }))
  }

  const addCheckList = () => {
    const lastItem = checkList[checkList.length - 1]
    if (!lastItem.Content || !lastItem.times || !lastItem.dates || !lastItem.Curator) {
      return
    }
    setCheckList([])
    var newList = checkList
    newList.push({
      Id: -(checkList.length + 1),
      Content: '',
      dates: [null, null],
      times: [null, null],
      FromTime: null,
      ToTime: null,
      FromDate: null,
      ToDate: null,
      Curator: [],
      EventId: event?.Id,
      edit: true,
      add: true
    })
    setCheckList([...newList])
  }

  const isCheckDate = (time) => {
    var check = moment(time).diff(moment(Date.now()), 'days')
    if (check < 0) {
      return true
    }
    return false
  }

  const onChangeTime = (e, index) => {
    let newItem = { ...checkList[index] };
    newItem.FromTime = e[0];
    newItem.ToTime = e[1];
    newItem.times = e;
    const newList = checkList.map((item, i) => {
      if (index == i) return newItem;
      return item
    })
    setCheckList(newList);
  }

  const onChangeDate = (date, index) => {
    let newItem = { ...checkList[index] };
    newItem.FromDate = date;
    const newList = checkList.map((item, i) => {
      if (index == i) return newItem;
      return item;
    });
    setCheckList(newList);
  }

  const onChangeCurator = (e, index) => {
    let newItem = { ...checkList[index] };
    newItem.Curator = e ?? null;
    const newList = checkList.map((item, i) => {
      if (index == i) return newItem;
      return item
    })
    setCheckList(newList);
  }
  async function handleMenuClick(e) {
    if (e.key === 'edit') {
      history.replace(`/event/${id}/edit/`);
    } else if (e.key === 'delete') {
      dispatch(deleteEventSuccess(id));
      await apis.posts.deleteEvent(id);
      history.push('/');
      location.reload();
    } else {
      return;
    }
  }

  const menu = () => {
    return (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="edit" icon={<EditOutlined />}>
          Chỉnh sửa sự kiện
        </Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />}>
          Xóa sự kiện
        </Menu.Item>
      </Menu>
    );
  }

  const handleShowParticipants = () => {
    setIsShowModal(true);
  }

  const handleShowInviteModal = () => {
    setIsShowModal(true);
    setIsInvite(true);
  }

  const renderParticipants = () => {
    let Employees = event.ParticipantDetais?.filter((item, index) => item.Avatar && index < 5);
    var listView = [];
    if (Employees) {
      Employees.map((item, index) => {
        var avatar =
          item.Avatar && item.Avatar !== ""
            ? getUrlImage(35, 35, item.Avatar)
            : null;
        if (Employees.length === index + 1) {
          listView.push(
            <img
              className="avt-member avt-first"
              src={avatar}
              alt="recent"
              title={item.FullName}
              key={index}
            />
          );
        } else {
          listView.push(
            <img
              className="avt-member"
              src={avatar}
              alt="recent"
              title={item.FullName}
              key={index}
            />
          );
        }
      });
    }
    return listView;
  };

  return (
    <LayoutMain>
      <div className="common--layout">
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <SideBar title="Incom" />
        </div>
        <div className={`common--layout__main--full event--layout ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <div className="calendar-group-page event-custom">
            <div className="event-detail-page">
              <div className="event-detail-content">
                <div className="event-detail-right-col">
                  <Card
                    // cover={<div style={{ height: '100%' }}><Image alt="example" src={event?.Files?.length === 0 ? Images.eventImage : getUrlImage(600, 1000, typeof event?.Files !== 'undefined' ? event?.Files[0].Files : '')} width={530} height={'100%'} /></div>}
                    cover={
                      <div style={{ height: '100%' }}>
                        <Button className='back-btn' onClick={() => history.replace('/income')}>
                          <img
                            src={backIcon}
                            alt='backIcon'
                            style={{ height: 20, width: 20, marginLeft: '-10px', marginRight: '5px' }} />
                          Trở lại
                        </Button>
                        <Image
                          preview={{ visible: false }}
                          style={{ objectFit: 'cover' }}
                          width={530} height={'100%'}
                          src={event?.Cover?.length > 0 ? getUrlImage(600, 1000, event.Cover[0]) : Images.eventImage}
                          onClick={() => setVisible(true)}
                        />
                        <div style={{ display: 'none' }}>
                          <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                            {event?.Cover?.map((item, index) => (
                              <Image key={index} alt="example" style={{ objectFit: 'cover' }} src={item ? getUrlImage(600, 1000, item) : Images.eventImage} width={530} height={'100%'} />
                            ))}
                          </Image.PreviewGroup>
                        </div>
                        {/* <Image alt="example" style={{ objectFit: 'cover' }} src={event?.Image ? getUrlImage(600, 1000, event.Image) : Images.eventImage} width={530} height={'100%'} /> */}
                      </div>}
                    className="event-detail-right-col-DetailEvent"
                  >
                    <div className="event-detail-right-col-DetailEvent__child">
                      <Title level={3} style={{ marginBottom: 14 }}>{event?.Title}</Title>

                      <Row>
                        <Col span={12}>
                          <IconText
                            icon={Icons.calendar}
                            text={(event?.FromDate ? moment(event?.FromDate).format('DD/MM/YYYY') : '')
                              + (event?.ToDate ? ' - ' + moment(event?.ToDate).format('DD/MM/YYYY') : '')}
                          />
                        </Col>
                        <Col span={12}>
                          <IconText
                            icon={Icons.clock}
                            text={(event?.FromTime ?? '') + ' - ' + (event?.ToTime ?? '')}
                          />
                        </Col>
                      </Row>
                      
                      <IconText
                        icon={Icons.meetingRoom}
                        text={event?.PlaceCompanyId?.includes('https://') || event?.PlaceCompanyId?.includes('http://')
                          ? <a
                            href={event?.PlaceCompanyId}
                            className='event-room-link'
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {event?.PlaceCompanyId}
                          </a>
                          : event?.PlaceCompanyId
                        }
                      />
                      <IconText icon={Icons.location} text={event?.Address} />
                      <div className='list-employees'>
                        <IconText icon={Icons.user} text={`Phụ trách/tổ chức: `} />
                        <div className='employees-detail'>
                          {event?.Employees?.map((item, index) => (
                            <>
                              {index === 0
                                ? <a href={'/income/profile/' + item.UserId}>
                                  <span>{item.FullName}</span>
                                </a>
                                : index < 2
                                  ? <a href={'/income/profile/' + item.UserId}>
                                    <span>, {item.FullName}</span>
                                  </a>
                                  : ''}
                            </>
                          ))}
                          {event?.Employees?.length > 2 && (
                            <>
                              <span className="text-more-people"> và </span>
                              <Dropdown
                                overlay={
                                  <Menu>
                                    {event.Employees.slice(2)?.map((tag, index) => (
                                      <Menu.Item
                                        key={index}
                                        className="sub-tag-group"
                                      >
                                        <a href={'/income/profile/' + tag.UserId}>
                                          {tag.FullName}
                                        </a>
                                      </Menu.Item>
                                    ))}
                                  </Menu>
                                }
                                overlayClassName="name-wrapper__tag tag"
                              >
                                <span className="text-more-people">
                                  {event.Employees.length - 2} Người khác
                                </span>
                              </Dropdown>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="list-avt-member">
                        <IconText icon={Icons.group} text={`Tham gia: ${countJoin} người | `} />
                        <div className="content-avt" onClick={() => handleShowParticipants()}>
                          {renderParticipants()}
                        </div>
                      </div>

                      <Row>
                        <Col span={12}>
                          <IconText icon={Icons.calendarEvent} text={`Phân loại: ${event?.IsPrivate ? 'Sự kiện kín' : 'Sự kiện mở'}`} />
                        </Col>
                        <Col span={12}>
                          <IconText icon={Icons.eventRepeat} text={`Lặp lại: ${event?.RepeatDetails ?? ''}`} />
                        </Col>
                      </Row>

                      <IconText icon={RemindIcon} text={`Nhắc trước: ${remindDetail}`} />

                      <div className="event-detail-right-col-DetailEvent__child-row">
                        <Button
                          className={`DetailEvent__button ${isJoin && 'join'}`}
                          icon={<Image src={isJoin ? Icons.checkWhite : Icons.uncheck} width={18} height={18} preview={false} />}
                          onClick={() => { onChangeJoin(event) }}
                        >Tham gia</Button>
                        <Button
                          className="event-detail-right-col-DetailEvent__button"
                          icon={<Image src={Icons.addUser} width={18} height={18} preview={false} />}
                          onClick={() => handleShowInviteModal()}
                        >Mời tham gia</Button>
                        {user.Id === event?.CreatedBy && (
                          <div className='dropdown-icon' onClick={e => e.stopPropagation()}>
                            <Dropdown overlay={menu} trigger={['click']}>
                              <img
                                src={iconMore}
                                alt='iconMore'
                                onClick={e => e.preventDefault()}
                              />
                            </Dropdown>
                          </div>)}
                      </div>
                    </div>
                  </Card >
                  <div className="event-detail-info" style={{ marginTop: 18, boxShadow: 0 }}>
                    <div className='event-detail-space'>
                      <Space
                        className={`action-wrapper ${+currentTab === 1
                          ? "line-bottom-wrapper-active"
                          : "line-bottom-wrapper"
                          }`}
                        onClick={() => setCurentTab(1)}
                      >
                        <div>
                          <h4
                            className={`title-detail ${+currentTab === 1 ? "active" : ""}`}
                          >
                            Chi tiết
                          </h4>
                        </div>
                      </Space>
                      {currentTab !== 1 && currentTab !== 2 && <div className="border-right"></div>}
                    </div>
                    <div className='event-detail-space'>
                      <Space
                        className={`action-wrapper ${+currentTab === 2
                          ? "line-bottom-wrapper-active"
                          : "line-bottom-wrapper"
                          }`}
                        onClick={() => setCurentTab(2)}
                      >
                        <div>
                          <h4
                            className={`title-detail ${+currentTab === 2 ? "active" : ""
                              }`}
                          >
                            Agendar
                          </h4>
                          <div></div>
                        </div>
                      </Space>
                      {currentTab !== 2 && currentTab !== 3 && <div className="border-right"></div>}
                    </div>
                    <div className='event-detail-space'>
                      <Space
                        className={`action-wrapper ${+currentTab === 3
                          ? "line-bottom-wrapper-active"
                          : "line-bottom-wrapper"
                          }`}
                        onClick={() => setCurentTab(3)}
                      >
                        <div>
                          <h4
                            className={`title-detail ${+currentTab === 3 ? "active" : ""
                              }`}
                          >
                            Nhật ký
                          </h4>
                          <div></div>
                        </div>
                      </Space>
                      {currentTab !== 3 && currentTab !== 4 && <div className="border-right"></div>}
                    </div>
                    <Space
                      className={`action-wrapper ${+currentTab === 4
                        ? "line-bottom-wrapper-active"
                        : "line-bottom-wrapper"
                        }`}
                      onClick={() => setCurentTab(4)}
                    >
                      <div>
                        <h4
                          className={`title-detail ${+currentTab === 4 ? "active" : ""
                            }`}
                        >
                          Tổng kết
                        </h4>
                        <div></div>
                      </div>
                    </Space>
                  </div>
                  {currentTab === 1 && <Detail event={event} />}
                  {currentTab === 2 && <Agendar
                    checkList={checkList}
                    listTags={listTags}
                    onPressAdd={addCheckList}
                    onChangeTime={onChangeTime}
                    onChangeDate={onChangeDate}
                    optionsUser={optionsUserEvent}
                    onChangeCurator={onChangeCurator}
                    onSaveRowCheckList={onSaveRowCheckList}
                    onEditRowCheckList={onEditRowCheckList}
                    onChangeInputRow={onChangeInputRow}
                    onDeleteRowCheckList={onDeleteRowCheckList}
                  />}
                  {currentTab === 3 && <Diary event={event} optionsUser={optionsUserEvent} listTags={listTags} user={user} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalListMembers
        listMember={event?.ParticipantDetais}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        listTags={listTags}
        isInvite={isInvite}
        setIsInvite={setIsInvite}
        countJoin={countJoin}
        setCountJoin={setCountJoin}
      />
    </LayoutMain >
  );
};

EventDetail.propTypes = {};

export default EventDetail;
