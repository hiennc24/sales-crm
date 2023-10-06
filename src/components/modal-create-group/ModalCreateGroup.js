import React, { useEffect, useState } from "react";
import {
  Menu,
  Dropdown,
  Modal,
  Button,
  Input,
  Row,
  Col,
  Upload,
  Tag,
  Select,
  Alert,
  Image,
  message,
  Space,
  Avatar,
  Tooltip,
} from "antd";
import PropTypes from "prop-types";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import "./ModalCreateGroup.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupDetailAction,
  getListGroup,
} from "../../pages/group/Group.action";
import API from "../../services/api";
import BoxLoading from "../box-loading/BoxLoading";
import { selectGroupDetail } from "../../pages/group/Group.selector";
import apis from "../../services/api";
import { selectGroupType } from "../../stores/global/global.selector";
import { getUrlImage, getUrlFile } from "../../utils";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import RecentImage from "../../assets/images/recent-image.svg";
import ImageInput from "../../assets/new/event/imageInput.png";
import PlusMember from "../../assets/images/icon-add-member.svg";
import IconRemoveImg from "../../assets/images/icon_remove_img.svg";
import Close from "../../assets/new/common/close.png";
import { useHistory } from "react-router-dom";
import AutoResizeTextBox from '../../components/auto-resize-textbox';
import MultiSelect from '../../components/multi-select';

const { TextArea } = Input;

const ModalCreateGroup = ({ isShow, onToggle, type, refeshData, user }) => {
  const history = useHistory();
  const groupType = useSelector(selectGroupType());
  const [privacy, setPrivacy] = useState({});
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [imgId, setImgId] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [isShowInputSearch, showInputSearch] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [messageValidName, setMessageValidName] = useState("");
  const [selectedValueTags, setSelectedValueTags] = useState([]);
  const [listTags, setListTag] = useState([]);
  const [privacyNew, setPrivacyNew] = useState({});

  const dispatch = useDispatch();
  const groupDetail = useSelector(selectGroupDetail());


  useEffect(() => {
    if (type === "EDIT") {
      setGroupName(groupDetail.Name);
      setDescription(groupDetail.Desc);
      setImgId(groupDetail.Avatar);
    } else {
      setGroupName("");
      setDescription("");
      setImgId("");
    }
    setListEmployee([]);
    setSelectedItems([]);
    // setLoading(false)
  }, [groupDetail.Id, isShow]);

  useEffect(() => {
    if (type === "EDIT") {
      var arr = groupType.filter((item) => item.Id === groupDetail.Type);
      setPrivacyNew(arr[0].Id || {});
    } else {
      setPrivacyNew(groupType[0].Id || {});
    }
  }, [groupType.length]);

  useEffect(() => {
    addMember();
  }, [])

  const menu = (
    <Menu onClick={(e) => setPrivacy(groupType[parseInt(e.key)])}>
      {groupType.map((item, i) => (
        <Menu.Item className="item-privacy" key={i}>
          {item.Name}
        </Menu.Item>
      ))}
    </Menu>
  );

  // const formatDateTime = (date) => {
  //     const day = date.getDate();
  //     const month = date.getMonth();
  //     const year = date.getFullYear();
  //     return year + '-' + month + '-' + day;
  // }

  const props = {
    name: "files",
    action: "https://filemanager.crmdemo.net/file/upload/image",
    onChange(info) {
      if (info.file.status === "done") {
        setImgId(info.file.response.imageId);
        apis.group.uploadFile({
          name: info.file.name,
          type: 1,
          code: info.file.response.imageId,
        });
      } else {
      }
    },
  };

  const addNewGroup = () => {
    if (groupName === "") {
      setMessageValidName("Tên nhóm không được để trống.");
      return;
    }
    var employees = [];
    listEmployee.forEach((employee) => {
      if (selectedItems.includes(employee.UserId)) {
        employees.push({
          UserId: employee.UserId,
          FullName: employee.FullName,
        });
      }
    });
    var data = {
      name: groupName,
      avatar: imgId,
      desc: description,
      isProject: false,
      groupType: +privacyNew, // default
      admin: 0,
      employees: employees,
      inviteContent: [],
      accountManager: [],
      openEmployees: [],
      accountInviteAllow: "",
    };
    setLoading(true);
    API.group
      .createGroup(data)
      .then((res) => {
        if (res.code === 200) {
          refeshData(res.data);
          history.push(`/group-work/${res.data.Id}`);
          onToggle();
          location.reload();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const editGroup = () => {
    if (groupName === "") {
      setMessageValidName("Tên nhóm không được để trống.");
      return;
    }
    var employees = [];
    listEmployee.forEach((employee) => {
      if (selectedItems.includes(employee.UserId)) {
        employees.push({
          UserId: employee.UserId,
          FullName: employee.FullName,
        });
      }
    });
    var data = {
      name: groupName,
      avatar: imgId,
      desc: description,
      groupType: +privacyNew,
      employees: employees,
      inviteContent: [],
      openEmployees: [],
    };
    setLoading(true);
    API.group
      .editGroup(data, groupDetail.Id)
      .then((res) => {
        if (res.code === 200) {
          onToggle();
          dispatch(getGroupDetailAction(groupDetail.Id));
          dispatch(getListGroup());
        } else {
          message.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const filteredOptions = listEmployee.filter((o) => {
    if (user.Id != o.UserId) {
      return true;
    }
    return false;
  });
  const getListEmployeeAddMember = () => {
    if (type === "EDIT") {
      apis.employee.getListEmployeesSuggestGroup(groupDetail.Id).then((res) => {
        if (res.code === 200) {
          setListEmployee(res.data);
        }
      });
    } else {
      apis.employee.getListEmployeesSuggestGroup(groupDetail.Id).then((res) => {
        if (res.code === 200) {
          setListEmployee(res.data);
        }
      });
    }
  };

  const addMember = () => {
    getListEmployeeAddMember();
    showInputSearch(true);
  };

  const removeMember = (id) => {
    var arr = selectedItems.filter((userId) => userId !== id);
    setSelectedItems(arr);
  };
  var employees = [];
  listEmployee.forEach((employee) => {
    if (selectedItems.includes(employee.UserId)) {
      employees.push({
        UserId: employee.UserId,
        FullName: employee.FullName,
        Avatar: employee.Avatar,
      });
    }
  });

  return (
    <Modal
      className="modal-create-group"
      centered
      footer={null}
      visible={isShow}
      onCancel={onToggle}
    >
      <p
        className="modal-create-group-header"
      // style={{ color: "white", fontSize: 18 }}
      >
        {type === "EDIT" ? "Thông tin nhóm" : "Tạo nhóm"}
        <Tooltip title="Đóng" className="button-close">
          <img src={Close} alt="close" onClick={() => onToggle()}></img>
        </Tooltip>
      </p>

      <div className="modal__body">
        <div className='post-row '>
          <AutoResizeTextBox
            value={groupName}
            onChange={(e) => { setGroupName(e.target.value); setMessageValidName("") }}
            placeholder='Tên nhóm'
            className='group-name-input one-row'
            row='1'
          />
        </div>
        {messageValidName !== "" && (
          <Alert message={messageValidName} type="error" />
        )}
        <div className='post-row ck-editor-container'>
          {/* <AutoResizeTextBox
            id="txtTest"
            className="content-share multiline text-thin"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả nhóm"
            rows='3'
          /> */}
          <CKEditor
            className="editor-container"
            editor={ClassicEditor}
            data={type === 'EDIT' ? groupDetail.Desc : description}
            config={{
              placeholder: 'Mô tả nhóm',
              toolbar: [
                'heading', '|',
                'bold', 'italic', 'link', '|',
                'bulletedList', 'numberedList', '|',
                'insertTable', 'blockQuote', '|',
                'undo', 'redo'],
              heading: {
                options: [
                  { model: 'paragraph', title: 'Normal', class: 'ck-heading_normal' },
                  { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                  { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                  { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                ]
              },
              style: { height: '100px' }
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>
        <div className='post-row '>
          <MultiSelect
            mode="multiple"
            className={'post-input event-name-input select-tags'}
            allowClear={true}
            // value={[...selectedItems.map(r => filteredOptions.findIndex(e => +e.UserId === +r))]}
            style={{ width: '100%', border: 'none', minHeight: '32px' }}
            placeholder="Tới:"
            placeholderStyle={{ color: '#32A1C8', zIndex: 1, marginTop: '-5px' }}
            onChange={(items) => {
              setSelectedItems(items);
            }}
            optionFilterProp="label"
            optionLabelProp="label"
          >
            {filteredOptions.map((item) => (
              <Select.Option key={item.id} value={item.UserId} label={item.FullName}>
                <Space>
                  <Avatar
                    size={32}
                    src={getUrlImage(35, 35, item.Avatar)}
                  />
                  <span>{item?.FullName || "anonymus"}</span>
                </Space>
              </Select.Option>
            ))}
          </MultiSelect>
        </div>
        <div className="modal-section">
          <p className="modal-label-text" style={{ paddingTop: 0, fontSize: 14 }}>Chọn quyền nhóm:</p>
          <Row className="item-add-feild" style={{ display: 'flex', alignItems: 'center' }}>
            <Col flex="auto" style={{ display: 'flex', alignItems: 'center' }}>
              {groupType.length != 0 &&
                groupType.map((privacy, index) => {
                  return (<div key={index} className='privacy-container'>
                    <input id={privacy.Name} className='privacy-button' type='radio' name='privacy' value={privacy.Id} checked={privacyNew == privacy.Id} onChange={(e) => { setPrivacyNew(e.target.value) }} />
                    <label htmlFor={privacy.Name} className='privacy-content'>
                      <div className='custom-checkbox'>
                        <div className='checked'></div>
                      </div>
                      {privacy.Name}</label>
                  </div>);
                }
                )
              }
            </Col>
          </Row>
        </div>
        <div className="modal-section modal-group-avatar" style={{ borderBottom: "none" }}>
          <p className="modal-label-text" style={{ paddingTop: 0, fontSize: 14 }}>Ảnh đại diện nhóm:</p>
          <Row className="item-add-feild item-add-feild-image">
            <Col flex="auto">
              {imgId !== "" ? (
                <div style={{ position: "relative", width: 100 }}>
                  <Image
                    width={"100"}
                    height={126}
                    preview={true}
                    src={getUrlImage(0, 0, imgId)}
                    style={{ objectFit: 'contain' }}
                  ></Image>
                  <Button
                    className="btn-remove-img"
                    onClick={() => setImgId("")}
                  >
                    <img src={IconRemoveImg} alt="recent" />
                  </Button>
                </div>
              ) : (
                <Upload {...props} maxCount={1} className="upload-group-avatar">
                  <img src={ImageInput} alt="recent" />
                  <p>Thêm ảnh</p>
                </Upload>
              )}
            </Col>
          </Row>
        </div>

        <div className="modal-under">
          {type !== "EDIT" ? (
            <Button
              disabled={isLoading || groupName.length === 0}
              onClick={addNewGroup}
              className="btn-create"
              block
            >
              {isLoading ? <BoxLoading /> : "Tạo nhóm"}
            </Button>
          ) : (
            <Button
              disabled={isLoading || groupName.length === 0}
              onClick={editGroup}
              className="btn-save"
              block
            >
              {isLoading ? <BoxLoading /> : "Cập nhật"}
            </Button>
            // <div style={{ textAlign: "right" }}>
            //   <Button
            //     disabled={isLoading}
            //     onClick={onToggle}
            //     className="btn-cancel"
            //   >
            //     Hủy
            //   </Button>
            //   <Button
            //     disabled={isLoading || groupName.length === 0}
            //     onClick={editGroup}
            //     className="btn-save"
            //   >
            //     {isLoading ? <BoxLoading /> : "Lưu"}
            //   </Button>
            // </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

ModalCreateGroup.propTypes = {
  isShow: PropTypes.bool,
  onToggle: PropTypes.func,
  type: PropTypes.string,
  refeshData: PropTypes.func,
  user: PropTypes.object
};

export default ModalCreateGroup;