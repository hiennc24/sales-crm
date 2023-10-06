import React, { useState, useRef, useEffect } from "react";
import "../NewPost.scss";
import { Row, Col, Select, Tooltip, TimePicker, Input, Radio, Space, Table, Divider, DatePicker, Checkbox } from "antd";
import iconDelete from "../../../../../assets/new/common/delete.svg";
import iconAdd from "../../../../../assets/new/common/add-icon.svg";
import imgPost from "../../../../../assets/new/event/img.png";
import GGMap from "./gg-map/Map";
import Location from "../../../../../assets/new/create-post/dia-diem.svg";
import DeteleImg from "../../../../../assets/new/common/delete-img.svg";
import DeleteIcon from "../../../../../assets/new/create-post/close2.svg";
import ImagesPreview from "./ImagesPreview";
import FilePreview from "./FilePreview";
import "./styles/ExtendEvent.scss";
import File from "../../../../../assets/new/create-post/tai-len.svg";
import { getUrlImage } from "../../../../../utils";
import pdfIcon from "../../../../../assets/images/pdf-icon.svg";
import autosize from "autosize";
import { searchMapByKey } from "../../../../../services/api/search-map/SearchMap";
import API from "../../../../../services/api";
import AutoResizeTextBox from "../../../../../components/auto-resize-textbox";
import IconWord from "../../../../../assets/new/create-post/word.svg";
import { useHistory, useParams } from "react-router-dom";
import IconPdf from "../../../../../assets/new/create-post/pdf.svg";
import IconExcel from "../../../../../assets/new/create-post/excel.svg";
import IconOther from "../../../../../assets/new/create-post/other.svg";
import RoomIcon from "../../../../../assets/images/meeting-room.png";
import LocationIcon from "../../../../../assets/images/place.png";
import CuratorIcon from "../../../../../assets/images/curator.png";
import ParticipantsIcon from "../../../../../assets/images/group-user.png";
import RepeatIcon from "../../../../../assets/images/event-repeat.png";
import AddUserIcon from "../../../../../assets/images/add-user.png";
import MultiSelect from '../../../../../components/multi-select';
import AvatarCustom from '../../../../../components/avatar-custom';
// import { RangePicker } from '../components';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import iconClock from '../../../../../assets/new/common/clock.png';
import iconPen from '../../../../../assets/new/common/pen.png';
import iconUser from '../../../../../assets/new/common/user.png';
import { useSelector } from 'react-redux';
import moment from "moment";

const ExtendEvent = (data) => {
  const [showListSelect, setShowLocationModal] = useState(false);
  const [isValidFile, setIsValidFile] = useState(true);
  const [addressNotFound, setAddressNotFound] = useState(false);
  const [optionsEmployees, setOptionsEmployees] = useState([]);
  // const [selectedEmployees, setSelectedEmployees] = useState([]);
  // const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isPrivate, setIsPrivate] = useState(data?.isPrivate ? 1 : 0);
  const [iconAddUser, setIconAddUser] = useState(true);
  const [isRemindLeft, setIsRemindLeft] = useState(false);
  const [isRemindRight, setIsRemindRight] = useState(false);
  const [remindLeft, setRemindLeft] = useState('d1');
  const [remindRight, setRemindRight] = useState('m15');

  const userInfo = useSelector((state) => state.get('userProfile').get('profile'));
  const currenPara = useRef();
  const history = useHistory();
  const params = useParams();
  const { Option } = Select;
  const { listEmployees, listTags, filterOptionTag } = data;

  const optionsRemindLeft = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'];
  const optionsRemindRight = ['m15', 'm30', 'h1', 'h2'];

  const onChange = (index, type, value) => {
    let newItem = { ...data.listCheck[index] };
    newItem[type] = value;
    const newList = data.listCheck.map((item, i) => {
      if (index == i) return newItem;
      return item;
    });
    data.setListCheck(newList);
  };

  const [listLoc, setListLoc] = useState([]);

  const handleSearchLocation = (e) => {
    let key = e;
    setTimeout(() => {
      searchMapByKey(key).then((res) => {
        if (res.status === 200) {
          setListLoc(res.data.items);
          if (res.data.items.length === 0) {
            setAddressNotFound(true);
          } else {
            setAddressNotFound(false);
          }
        }
      });
    }, 350);
  };

  const handleSetLocation = (loc) => {
    data.setAddress(loc.address.label);
    data.setLocation(loc);
    setShowLocationModal(false);
  };

  useEffect(() => {
    let remind = data.remind.split(',');
    remind.forEach(item => {
      if (optionsRemindLeft.includes(item)) {
        setIsRemindLeft(true);
        setRemindLeft(item);
      };
      if (optionsRemindRight.includes(item)) {
        setIsRemindRight(true);
        setRemindRight(item);
      };
    })
  }, [data.remind])

  useEffect(() => {
    document.getElementById("fileInput").value = "";
  }, [data.filesEvent.length]);

  useEffect(() => {
    document.getElementById("postImage").value = "";
  }, [data.coverImage.length]);

  useEffect(() => {
    handleSearchLocation(data.address);
  }, [data.address]);

  useEffect(() => {
    // API.event.getListPlace().then(res => {
    //   if (res.code === 200) setListPlace(res.data);
    // });

    document.addEventListener("click", handleClickScreen);
    return () => {
      document.removeEventListener("click", handleClickScreen);
    };
  }, []);

  useEffect(() => {
    setOptionsEmployees(listEmployees.filter(item => item.UserId != userInfo.Id).map((item) => {
      return (
        <Select.Option key={item.UserId} style={{ width: '100%' }} label={item.FullName}>
          <Space>
            <AvatarCustom
              className="avatar"
              src={item.Avatar ? `https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${item.Avatar}&fit=inside` : ''}
              size={32}
              fullName={item.FullName}
            />
            <span>{item.FullName}</span>
          </Space>
        </Select.Option>)
    }))

    // if (listEmployees.length !== 0) {
    //   setSelectedEmployees(data?.Employee?.filter(item => item.UserId != userInfo.Id).map(e => listEmployees.filter(item => item.UserId != userInfo.Id).findIndex(i => +i.UserId == +e.UserId).toString()))
    //   setSelectedParticipants(data?.Employee?.filter(item => item.UserId != userInfo.Id).map(e => listEmployees.filter(item => item.UserId != userInfo.Id).findIndex(i => +i.UserId == +e.UserId).toString()))
    // }

  }, [listEmployees.length])

  const handleClickScreen = (e) => {
    if (e.target.id == "inputFindLocation") {
      setShowLocationModal(true);
    } else {
      setShowLocationModal(false);
    }
  };

  const uploadFile = (e) => {
    if (+(e.target.files[0].size / 1024 / 1024).toFixed(4) > 5) {
      setIsValidFile(false);
    } else {
      setIsValidFile(true);
      data.handleUploadFiles(e);
    }
  };

  const getIconFile = (e) => {
    if (e.includes(".doc")) {
      return IconWord;
    } else if (e.includes(".xlsx")) {
      return IconExcel;
    } else if (e.includes(".pdf")) {
      return IconPdf;
    }
    return IconOther;
  };

  const handleChangeRemind = (value, type) => {
    if (type === 'left' && isRemindLeft) {
      setRemindLeft(value);
      data.setRemind(isRemindRight ? remindRight + ',' + value : value);
    }
    if (type === 'right' && isRemindRight) {
      setRemindRight(value);
      data.setRemind(isRemindLeft ? remindLeft + ',' + value : value);
    }
  }

  const onChangeDate = (date, index) => {
    let newItem = { ...data.listCheck[index] };
    newItem.FromDate = date;
    const newList = data.listCheck.map((item, i) => {
      if (index == i) return newItem;
      return item;
    });
    data.setListCheck(newList);
  }

  // const onChangeDate = (dates, index) => {
  //   let newItem = { ...data.listCheck[index] };
  //   newItem.FromDate = dates[0];
  //   newItem.ToDate = dates[1];
  //   newItem.dates = dates;
  //   const newList = data.listCheck.map((item, i) => {
  //     if (index == i) return newItem;
  //     return item;
  //   });
  //   data.setListCheck(newList);
  // }

  const onChangeTime = (e, index) => {
    let newItem = { ...data.listCheck[index] };
    newItem.FromTime = e[0];
    newItem.ToTime = e[1];
    newItem.times = e;
    const newList = data.listCheck.map((item, i) => {
      if (index == i) return newItem;
      return item;
    });
    data.setListCheck(newList);
  };

  // const onChangeTime = (e, index) => {
  //   let newItem = { ...data.listCheck[index] };
  //   newItem.Time = e !== "" ? e : "00:00";
  //   const newList = data.listCheck.map((item, i) => {
  //     if (index == i) return newItem;
  //     return item;
  //   });
  //   data.setListCheck(newList);
  // };

  const onChangeCurator = (e, index) => {
    let newItem = { ...data.listCheck[index] };
    newItem.Curator = e ?? null;
    const newList = data.listCheck.map((item, i) => {
      if (index == i) return newItem;
      return item;
    });
    data.setListCheck(newList);
  };

  const columns = [
    {
      title: () => <div className='title-header-agendars'> Nội dung </div>,
      dataIndex: 'Content',
      key: 'Content',
      width: '25%',
      render: (text, record, index) => (
        <AutoResizeTextBox
          style={{ marginBottom: "0px" }}
          className="one-row agendar-input-content"
          value={text}
          placeholder="Nội dung nhập ở dây"
          onChange={(e) => onChange(index, "Content", e.target.value)}
        ></AutoResizeTextBox>
      )
    },
    {
      title: () => <div className='title-header-agendars'> Ngày </div>,
      dataIndex: 'FromDate',
      key: 'FromDate',
      width: '19%',
      render: (text, record, index) => (
        <DatePicker
          className='date-picker'
          format={'DD/MM/YYYY'}
          disabledDate={current => {
            return moment().add(-1, 'days')  >= current;
          }}
          suffixIcon={false}
          placeholder={'--/--/--'}
          value={text ? moment(text, 'DD/MM/YYYY') : null}
          onChange={date => onChangeDate(date, index)}
        />
        // <RangePicker
        //   startDate={text?.length > 0 ? moment(text[0], 'DD/MM/YYYY') : null}
        //   endDate={text?.length > 0 ? moment(text[1], 'DD/MM/YYYY') : null}
        //   onChangeDate={dates => onChangeDate(dates, index)}
        // />
      )
    },
    {
      title: () => <div className='title-header-agendars'> Thời gian </div>,
      dataIndex: 'times',
      key: 'times',
      width: '24%',
      render: (text, record, index) => (
        <TimePicker.RangePicker
          className='time-picker-agendar'
          value={[text?.length > 0 ? moment(text[0], "HH:mm") : null, text?.length > 0 ? moment(text[1], "HH:mm") : null]}
          onChange={(times, timesString) => onChangeTime(timesString, index)}
          format="HH:mm"
          suffixIcon={false}
          placeholder={['--:--', '--:--']}
        />
      ),
    },
    {
      title: () => <div className='title-header-agendars'> Phụ trách </div>,
      key: 'Curator',
      dataIndex: 'Curator',
      width: '25%',
      render: (text, record, index) => (
        <div>
          {text.length === 0 ? <img src={AddUserIcon} style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none' }} /> : false}
          <Select
            mode="tags"
            value={text}
            onChange={(e) => onChangeCurator(e, index)}
            className="limit-hight-select agendar-select-curator"
            style={{ width: "100%" }}
          >
            {data.optionsUserEvent}
          </Select>
        </div>
      ),
    },
    {
      render: (text, record, index) => (
        <div>
          {index === 0 ? (
            <></>
          ) : (
            <img
              src={iconDelete}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={() => {
                data.setListCheck(
                  data.listCheck.filter((v, i) => i != index)
                );
              }}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <div className="extend-event mt--10">
      <div className="extend-event-item mb--5">
        <img src={RoomIcon} alt='RoomIcon' height={24} width={24} />
        <div className='extend-item-title'>Phòng / link:</div>
        {/* <Input className='extend-item-input' placeholder='...' onChange={e => data.set}/> */}
        <div className='extend-item-selection post-row room-input'>
          <AutoResizeTextBox
            id="inputFindLocation"
            style={{ flex: 1, height: 32, padding: "5px 10px", width: "100%" }}
            placeholder="..."
            value={data.room}
            onChange={(e) => {
              data.setRoom(e.target.value);
            }}
            className="one-row"
          />
          {/* <Select style={{ marginBottom: '5px' }} bordered={false} onChange={value => data.setRoom(value)}>
            {listPlace?.map(item => (
              <>
                <Option value={item.Id}>{item.Name}</Option>
              </>
            ))}
          </Select>           */}
        </div>
      </div>

      <div className="extend-event-item">
        <img src={LocationIcon} alt='LocationIcon' height={24} width={24} />
        <div className='extend-item-title'>Nhập địa chỉ:</div>
        {/* <Input className='extend-item-input' placeholder='...'/> */}
        <div className="post-row address-input" style={{ display: "block" }}>
          <AutoResizeTextBox
            id="inputFindLocation"
            style={{ flex: 1, height: 32, padding: "5px 10px", width: "100%" }}
            placeholder="..."
            value={data.address}
            onChange={(e) => {
              data.setAddress(e.target.value);
            }}
            className="one-row"
          />

          {listLoc && listLoc.length != 0 && showListSelect && (
            <div className="custom-dropdown">
              <div className="loc-list-container">
                {listLoc.map((loc) => (
                  <div
                    key={loc.id}
                    className={`location-select-wrapper ${location === loc ? "selected" : ""
                      }`}
                    onClick={() => handleSetLocation(loc)}
                  >
                    <div className="location-select">
                      <img
                        src={location === loc ? LocationActive : Location}
                        alt="location"
                      />
                      <div className="ml--10">
                        <p>{loc.title}</p>
                        <small>{loc.address.label}</small>
                      </div>
                    </div>
                    {location === loc && <img src={Check} />}
                  </div>
                ))}
              </div>
            </div>
          )}
          {addressNotFound && (
            <p className={"gmap-info"}>
              Không tìm thấy địa chỉ. Vui lòng chọn vị trí trên bản đồ.
            </p>
          )}
        </div>
      </div>

      <div className="extend-event-item extend-event-curator">
        <img src={CuratorIcon} alt='CuratorIcon' height={24} width={24} />
        <div className='extend-item-title'>Phụ trách / Tổ chức:</div>
        <div className='extend-event-multi-select'>
          {iconAddUser && !data?.isEditType ? <img src={AddUserIcon} style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none' }} /> : false}
          <MultiSelect
            mode="multiple"
            className={'post-input event-name-input select-tags extend-item-multi-select'}
            allowClear={true}
            value={data.selectedEmployees}
            style={{ width: '100%', border: 'none', padding: 0, minHeight: 32 }}
            filterOption={filterOptionTag}
            onChange={value => {
              data.setSelectedEmployees(value);
              setIconAddUser(false);
            }}
            optionFilterProp="label"
            optionLabelProp="label"
            dropdownClassName={'user-select__new-post'}
          >
            {optionsEmployees}
          </MultiSelect>
        </div>
      </div>

      <div className="extend-event-item extend-event-curator">
        <img src={ParticipantsIcon} alt='ParticipantsIcon' height={24} width={24} />
        <div className='extend-item-title'>Tham gia:</div>
        <div className='extend-event-multi-select'>
          <MultiSelect
            mode="multiple"
            className={'post-input event-name-input select-tags extend-item-multi-select'}
            allowClear={true}
            value={data.selectedParticipants}
            style={{ width: '100%', border: 'none', padding: 0, minHeight: 32 }}
            filterOption={filterOptionTag}
            onChange={value => data.setSelectedParticipants(value)}
            optionFilterProp="label"
            optionLabelProp="label"
            dropdownClassName={'user-select__new-post'}
            placeholder='+ Add'
          >
            {optionsEmployees}
          </MultiSelect>
        </div>
      </div>

      <div className="extend-event-item mb--15">
        <Radio.Group
          className='extend-event-radio-group'
          value={isPrivate}
          onChange={e => {
            data.setIsPrivate(e.target.value);
            setIsPrivate(e.target.value);
          }}
        >
          <Radio className='extend-event-radio' value={0}>Sự kiện mở</Radio>
          <Radio className='extend-event-radio' value={1}>Sự kiện kín</Radio>
        </Radio.Group>
      </div>

      <div className="extend-event-item mb--10">
        <img src={RepeatIcon} alt='RepeatIcon' height={24} width={24} />
        <div className='extend-item-title'>Lặp lại:</div>
        <div className='extend-item-selection'>
          <Select
            defaultValue={1}
            style={{ marginBottom: '5px' }}
            bordered={false}
            value={data.repeatType}
            onChange={value => data.setRepeatType(value)}
          >
            <Option value={1}>Không lặp lại</Option>
            <Option value={2}>Hàng ngày</Option>
            <Option value={3}>Hàng tuần</Option>
            <Option value={4}>Hàng tháng</Option>
            <Option value={5}>Hàng năm</Option>
          </Select>
        </div>
      </div>

      <div className="extend-event-item extend-item-remind-group mb--10 ml--3">
        <div className='extend-item-remind'>
          <Checkbox 
            checked={isRemindLeft} 
            onChange={(e) => {
              setIsRemindLeft(!isRemindLeft);
              if (e.target.checked) {
                data.setRemind(isRemindRight ? remindRight + ',' + remindLeft : remindLeft);
              } else {
                data.setRemind(isRemindRight ? remindRight : '');
              }
            }} 
          >
            Nhắc trước:
          </Checkbox>
          <div className='extend-item-selection'>
            <Select
              defaultValue={'d1'}
              style={{ marginBottom: '5px' }}
              bordered={false}
              value={remindLeft}
              onChange={value => handleChangeRemind(value, 'left')}
            >
              <Option value={'d1'}>1 ngày</Option>
              <Option value={'d2'}>2 ngày</Option>
              <Option value={'d3'}>3 ngày</Option>
              <Option value={'d4'}>4 ngày</Option>
              <Option value={'d5'}>5 ngày</Option>
              <Option value={'d6'}>6 ngày</Option>
              <Option value={'d7'}>7 ngày</Option>
            </Select>
          </div>
        </div>
        <div className='extend-item-remind'>
          <Checkbox 
            checked={isRemindRight} 
            onChange={(e) => {
              setIsRemindRight(!isRemindRight);
              if (e.target.checked) {
                data.setRemind(isRemindLeft ? remindLeft + ',' + remindRight : remindRight);
              } else {
                data.setRemind(isRemindLeft ? remindLeft : '');
              }
            }} >
            Nhắc trước:
          </Checkbox>
          <div className='extend-item-selection'>
            <Select
              defaultValue={'m15'}
              style={{ marginBottom: '5px' }}
              bordered={false}
              value={remindRight}
              onChange={value => handleChangeRemind(value, 'right')}
            >
              <Option value={'m15'}>15 phút</Option>
              <Option value={'m30'}>30 phút</Option>
              <Option value={'h1'}>1 giờ</Option>
              <Option value={'h2'}>2 giờ</Option>
            </Select>
          </div>
        </div>
      </div>

      {!data?.isEditType &&
        <>
          <h5 className="title">Agendar:</h5>

          <Table
            className='agendar-table-create'
            columns={columns}
            dataSource={data.listCheck}
            bordered
            rowKey={'Id'}
            pagination={false}
          />

          <Col span={1} className="delete-action">
            <button
              className='add-agendar-button'
              onClick={() =>
                data.setListCheck([
                  ...data.listCheck,
                  { Content: "", Curator: [], File: "" },
                ])
              }
            >
              <span>+ Thêm mới</span>
            </button>
          </Col>
        </>
      }

      {/* {data.listCheck.length !== 0 && (
        <div>
          <Row gutter={[18, 10]} className='agendar-header-row'>
            <Col span={6} className='agendar-header-col'>
              <div className="agendar-header-title">Nội dung</div>
            </Col>
            <Col span={6} className='agendar-header-col'>
              <div className="agendar-header-title">Ngày</div>
            </Col>
            <Col span={5} className='agendar-header-col'>
              <div className="agendar-header-title">Thời gian</div>
            </Col>
            <Col span={6} className='agendar-header-col'>
              <div className="agendar-header-title">Phụ trách</div>
            </Col>
          </Row>
        </div>
      )} */}
      {/* {data.listCheck.length !== 0 &&
        data.listCheck?.map((item, index) => (
          <div key={index}>
            <Row gutter={[18, 10]} className="post-row agendar-body-row">
              <Col className='agendar-body-col' span={6} style={{ display: "flex", alignItems: "center" }}>
                <AutoResizeTextBox
                  style={{ marginBottom: "0px" }}
                  className="one-row agendar-input-content"
                  value={item.Content}
                  placeholder="Nội dung nhập ở dây"
                  onChange={(e) => onChange(index, "Content", e.target.value)}
                ></AutoResizeTextBox>
              </Col>
              <Col className='agendar-body-col' span={6} style={{ display: "flex", alignItems: "center" }}>
                <RangePicker
                  startDate={item.FromDate ? moment(item.FromDate, 'DD/MM/YYYY') : null}
                  endDate={item.ToDate ? moment(item.ToDate, 'DD/MM/YYYY') : null}
                  onChangeDate={dates => onChangeDate(dates, index)}
                />
              </Col>
              <Col className='agendar-body-col' span={5} style={{ display: "flex", alignItems: "center" }}>
                <TimePicker.RangePicker 
                  className='time-picker-agendar' 
                  value={[item.FromTime ? moment(item.FromTime, "HH:mm") : null, item.ToTime ? moment(item.ToTime, "HH:mm") : null]} 
                  onChange={(times, timesString) => onChangeTime(timesString, index)}
                  format="HH:mm" 
                  suffixIcon={false} 
                  placeholder={['--:--', '--:--']}
                />
              </Col>
              <Col className='agendar-body-col' span={6} style={{ display: "flex", alignItems: "center" }}>
                {item.Curator.length === 0 ? <img src={AddUserIcon} style={{position: 'absolute', zIndex: 1, pointerEvents: 'none'}} /> : false}
                <Select
                  mode="tags"
                  value={item.Curator}
                  onChange={(e) => onChangeCurator(e, index)}
                  className="limit-hight-select"
                  style={{ width: "100%" }}
                >
                  {data.optionsUserEvent}
                </Select>
              </Col>
              {index === 0 ? (
                <></>
              ) : (
                <Col span={1} className="delete-action">
                  <img
                    src={iconDelete}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      data.setListCheck(
                        data.listCheck.filter((v, i) => i != index)
                      );
                    }}
                  />
                </Col>
              )}
            </Row>
          </div>
        ))} */}
      {/* <img
          src={iconAdd}
          alt=""
          onClick={() =>
            data.setListCheck([
              ...data.listCheck,
              { Content: "", Time: "00:00", Curator: [], File: "" },
            ])
          }
          style={{ cursor: "pointer" }}
        /> */}
      {/* <div
        style={{
          textAlign: "right",
          marginTop: "30px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      ></div> */}
      {/* <div className="post-row ckedit-custom" style={{ marginTop: "15px" }}>
        <AutoResizeTextBox
          placeholder='Thông tin bổ sung'
          className='post-input__content text-thin'
          value={data.additionInfo}
          ref={currenPara}
          rows='3'
          style={{ marginTop: 20, maxHeight: 'max-content' }}
          onChange={(e) => { data.setAdditionInfo(e.target.value) ; currenPara.current.focus(); autosize(currenPara.current);}}
        />
        <CKEditor
          className="editor-container"
          editor={ClassicEditor}
          data={data.additionInfo}
          config={{
            placeholder: "Thông tin bổ sung",
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "insertTable",
              "blockQuote",
              "|",
              "undo",
              "redo",
            ],
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Normal",
                  class: "ck-heading_normal",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
              ],
            },
          }}
          onChange={(event, editor) => {
            const _data = editor.getData();
            data.setAdditionInfo(_data);
          }}
        />
      </div> */}

      <Row style={{ marginTop: 20 }} gutter={30}>
        <Col span={24}>
          <h5 className="title">Ảnh sự kiện</h5>
        </Col>
      </Row>
      <Row gutter={30}>
        <Col span={24}>
          <div className="images-preview-wrapper">
            <div>
              <div
                className="input-image"
                onClick={() => document.getElementById("postImage").click()}
              >
                <img src={imgPost} alt="" />
                <span>Thêm ảnh</span>
              </div>
              <input
                name="postImage"
                id="postImage"
                type="file"
                hidden
                onChange={(e) => data.handleUploadImages(e)}
              />
            </div>

            {/* {data.filesInEditMode.filter((r) => r.Type === 1).length != 0 && (
              <>
                {data.filesInEditMode
                  .filter((file) => file.Type === 1)
                  .map((image, index) => (
                    <div className="image-preview-wapper" key={index}>
                      <img
                        src={getUrlImage(500, 500, image.Files)}
                        alt={image.Name}
                        className="image-preview"
                      />
                      <img
                        src={DeteleImg}
                        alt="close"
                        onClick={() => {
                          data.handleDeleteFilesModeEdit(image.Files);
                        }}
                      />
                    </div>
                  ))}
              </>
            )} */}

            {data.filesInEditMode.length !== 0 && (
              <>
                {data.filesInEditMode
                  .map((image, index) => (
                    <div className="image-preview-wapper" key={index}>
                      <img
                        src={getUrlImage(500, 500, image)}
                        alt={image}
                        className="image-preview"
                      />
                      <img
                        src={DeleteIcon}
                        alt="close"
                        onClick={() => {
                          data.handleDeleteFilesModeEdit(image);
                        }}
                      />
                    </div>
                  ))}
              </>
            )}

            <ImagesPreview
              imagesPreview={data.coverImage}
              handleDeleteImage={(img, index) =>
                data.handleDeleteImage(img, index)
              }
              isShowAddImg={false}
            />
          </div>
        </Col>
      </Row>
      {!data.isValidImage && (
        <Row gutter={30}>
          <Col span={24}>
            <p style={{ color: "red" }}>
              {" "}
              Dung lượng ảnh không vượt quá 5 Mb hoặc định dạng ảnh khác png,
              jpeg, gif.{" "}
            </p>
          </Col>
        </Row>
      )}
      <Row style={{ marginTop: 20 }} gutter={30}>
        <Col span={24}>
          <h5 className="title">Tài liệu</h5>
        </Col>
      </Row>
      <Row gutter={30} style={{ padding: "10px 0" }}>
        <Col span={24}>
          <div className="images-preview-wrapper">
            <div className="files-preview-wrapper">
              <label htmlFor="fileInput" className="input-file">
                {/* <Tooltip placement="top" title="Files">
                  <img src={File} alt="fileInput" />
                </Tooltip> */}
                <span>+ Thêm file</span>
              </label>
              <input
                type="file"
                name="file"
                id="fileInput"
                accept="application/pdf,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                multiple
                hidden
                onChange={(e) => uploadFile(e)}
              />
            </div>

            {!!data.docFilesInEditMode &&
              data.docFilesInEditMode.map((file, index) => (
                <div className="file-preview-wrapper" key={index} style={{ display: 'flex', marginBottom: 5 }}>
                  <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(39, 39, 39, 0.05)',
                    padding: 10,
                    borderRadius: 2,
                    marginBottom: 2,
                    height: '27px',
                    alignItems: 'center'
                  }}>
                    <img src={getIconFile(file)} alt="pdfIcon" style={{ height: '18px' }} />
                    <p style={{
                      margin: 0,
                      paddingLeft: 6,
                      paddingRight: 10,
                      fontSize: 12,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {file}
                    </p>
                    <img
                      style={{ cursor: 'pointer' }}
                      src={DeleteIcon}
                      alt="x"
                      onClick={() => data.handleDeleteDocFilesModeEdit(index)}
                    />
                  </div>
                </div>
              ))}

            {data.filesEvent.length !== 0 && (
              <FilePreview
                filesPreview={data.filesEvent}
                handleDeleteFile={data.handleDeleteFile}
                postType="event"
              />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {!isValidFile && (
            <p style={{ color: "red" }}>
              {" "}
              Dung lượng file không vượt quá 5 Mb.{" "}
            </p>
          )}
        </Col>
      </Row>
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        {data.address ?
          <GGMap
            lat={data.location?.position?.lat ? data.location?.position?.lat : null}
            lng={data.location?.position?.lng ? data.location?.position?.lng : null}
          />
          : false}
      </div>
      <div className="final-content">
        {data.isEditType ? (
          <button
            disabled={
              !data.content &&
              !data.title &&
              !data.coverImage.length &&
              !data.filesEvent.length &&
              !data.selectedEmployees.length > 0 &&
              !data.selectedParticipants.length > 0
            }
            className={`event-button ${!data.content &&
              !data.title &&
              !data.coverImage.length &&
              !data.filesEvent.length &&
              !data.selectedEmployees.length > 0 &&
              !data.selectedParticipants.length > 0
              ? "disable-event-button"
              : ""
              }`}
            style={{
              backgroundColor: "rgb(170 168 168)",
              marginBottom: 20,
              marginRight: 20,
            }}
            onClick={() => {
              setTimeout(() => {
                history.push(`/event/${params.id}`);
              }, 200);
            }}
          >
            Hủy
          </button>
        ) : (
          <button
            className="event-button"
            style={{
              backgroundColor: "rgb(170 168 168)",
              marginBottom: 20,
              marginRight: 20,
            }}
            onClick={() => {
              data.setIsFocus(false);
              data.handleAfterSubmit();
            }}
          >
            Hủy
          </button>
        )}
        <button
          disabled={
            !data.content ||
            !data.title ||
            !data.startDate ||
            !data.startTime ||
            !data.endTime
            // !data.coverImage.length &&
            // !data.filesEvent.length &&
          }
          className={`event-button ${!data.content ||
            !data.title ||
            !data.startDate ||
            !data.startTime ||
            !data.endTime
            // !data.coverImage.length &&
            // !data.filesEvent.length
            ? "disable-event-button"
            : ""
            }`}
          onClick={() => data.handleSubmit()}
        >
          {data.isEditType ? "Lưu" : "Tạo"}
        </button>
      </div>
    </div>
  );
};
export default ExtendEvent;
