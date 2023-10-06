import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Checkbox, Button, message, Input, Row, Tooltip } from "antd";
import CloseButton from "../../../../assets/images/close.png";
import IconDefaultAvatar from "../../../../assets/images/defaultAvatar.svg";
// import Vector from '../../../../assets/images/Vector.svg';
import IconSearch from "../../../../assets/new/group/search.png";

import IconX from "../../../../assets/images/btnX.png";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetListUserInviteGroup,
  actionSaveListUserInviteGroup,
  actionSubmitListUserInviteGroup,
} from "../../Group.action";
import { selectListUserInviteGroup } from "../../Group.selector";
import { getUrlImage } from "../../../../utils";
import _ from "lodash";
import "./modal-invite.scss";
import Scrollbars from 'react-custom-scrollbars';

const formRef = React.createRef();

const ModalInvite = ({ visibleModalInvite, onCloseModalInvite, groupId }) => {
  const dispatch = useDispatch();
  const listUserInviteGroup = useSelector(selectListUserInviteGroup());
  const [listUserAddGroups, setListUserAddGroups] = useState([]);
  const [keyword, setKeyword] = useState([]);

  // console.log("aaaaaaaaaa", listUserInviteGroup)

  useEffect(() => {
    dispatch(actionGetListUserInviteGroup({ groupId, name: "" }));
  }, [dispatch]);

  const renderListUserInviteRequest = () => {
    return listUserInviteGroup && listUserInviteGroup.length > 0
      ? listUserInviteGroup.map((it, idx) => {
          return (
            <div
              className="mb--19 rowy-center"
              key={`renderListUserInviteRequest_${it.UserId}`}
            >
              <Checkbox
                className="group__invite--checkbox"
                onChange={(e) => handleChangeCheckBox(e.target.checked, idx)}
                checked={it?.isChecked}
              ></Checkbox>
              <img
                src={
                  it.Avatar ? getUrlImage(30, 30, it.Avatar) : IconDefaultAvatar
                }
                alt=""
                className="customAvatarCircle mr--14"
                style={{ marginLeft: "15.5px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = IconDefaultAvatar;
                }}
              />
              <div className="fs--14 lh--16 c-4E596F b--500">
                {it?.FullName || it?.Email || "Daisy"}{" "}
              </div>
            </div>
          );
        })
      : null;
  };

  const handleChangeCheckBox = async (isChecked, index) => {
    const newListUserInviteGroup = [...listUserInviteGroup];
    newListUserInviteGroup[index].isChecked = isChecked;
    let newListUserAddGroups = Array.from(listUserAddGroups);

    if (isChecked) {
      newListUserAddGroups.push(newListUserInviteGroup[index]);
    } else {
      newListUserAddGroups = newListUserAddGroups.filter(
        (it) => it.UserId !== newListUserInviteGroup[index].UserId
      );
    }

    setListUserAddGroups(newListUserAddGroups);
    await dispatch(actionSaveListUserInviteGroup(newListUserInviteGroup));
  };

  const handleSearchUserInviteGroup = (value) => {
    dispatch(
      actionGetListUserInviteGroup({ groupId, name: value, listUserAddGroups })
    );
  };

  const handleSearchUserInviteGroupDelayed = (value) => {
    _.debounce(() => handleSearchUserInviteGroup(value), 300)();
  };

  const onSubmit = async () => {
    if (listUserAddGroups.length === 0)
      return message.error("Mời bạn chọn thành viên");
    const dataSubmit = {
      userIds: listUserAddGroups.map((it) => it.UserId),
      groupId,
    };

    const res = await dispatch(actionSubmitListUserInviteGroup(dataSubmit));
    if (res) {
      message.success("Mời thành viên vào nhóm thành công");
      onCloseModalInvite();
    }
  };

  const onDeleteUserAddGroups = async (item) => {
    setListUserAddGroups(
      listUserAddGroups.filter((it) => it.UserId !== item.UserId)
    );
    const newListUserInviteGroup = [...listUserInviteGroup];

    const index = newListUserInviteGroup.findIndex(
      (it) => it.UserId === item.UserId
    );
    if (index === -1) return;
    newListUserInviteGroup[index].isChecked = false;
    await dispatch(actionSaveListUserInviteGroup(newListUserInviteGroup));
  };

  const renderListAddGroup = () => {
    return listUserAddGroups.length > 0
      ? listUserAddGroups.map((it) => {
          return (
            <div
              key={`renderListAddGroup_${it.value}`}
              className={`h--30 rowy-center px--7 py--5 item-user-add-group mr--10 ${
                listUserAddGroups.length > 3 ? "mb--16" : ""
              }`}
            >
              <img
                className="mr--6 w--20 h--20"
                style={{ borderRadius: "50%" }}
                src={
                  it?.Avatar
                    ? getUrlImage(30, 30, it?.Avatar)
                    : IconDefaultAvatar
                }
                alt=""
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = IconDefaultAvatar;
                }}
              />
              <div className="fs--14 lh--16 c-4E596F b--500 mr--15">
                {it?.label}
              </div>
              <div className="w--15 h--22 div-x">
                <img
                  src={IconX}
                  alt=""
                  className="c-p"
                  onClick={() => onDeleteUserAddGroups(it)}
                />
              </div>
            </div>
          );
        })
      : null;
  };

  return (
    <Form ref={formRef}>
      <Modal
        visible={visibleModalInvite}
        closable={false}
        centered
        width={500}
        destroyOnClosef
        bodyStyle={{ position: "relative" }}
        onCancel={onCloseModalInvite}
        className="customModalSearch"
        title={[
          <div
            key="123"
            className="row-sb-center header-search-modal font-weight--bold"
          >
            <span className="left">Mời thành viên vào nhóm</span>
            <Tooltip title="Đóng">
              <img
                src={CloseButton}
                alt=""
                className="modal-icon"
                onClick={onCloseModalInvite}
              />
            </Tooltip>
          </div>,
        ]}
        footer={[<>
          <Button style={{
            color:"#27272799"
          }}
           type="text" onClick={onCloseModalInvite}>
            Huỷ
          </Button>
          <Button
            style={{
              borderRadius: "2px",
              fontWeight: 700,
              backgroundColor:"#32A1C8",
              color:"#ffffff",
              width: '100px',
              height: '35px',
            }}
            onClick={onSubmit}
          >
            Xong
          </Button></>
        ]}
      >
        <div className="pt--17 px--23 pb--21">
          {/* <div className="fs--14 lh--16 c-262B32">Mời thêm bạn vào nhóm</div> */}
          <Row
            className=""
            style={{ marginBottom: '10px' }}
          >
            Mời thêm bạn vào nhóm
          </Row>
          <Row
            className=""
            style={{ border: "1px solid rgba(110, 123, 148, 0.1)", height: '40px', alignItems: 'center' }}
          >
            <div className="rowy-center">
              <img src={IconSearch} alt="" className="mr--16 ml--16" />
            </div>
            {renderListAddGroup()}

            <Input
              className="input-in-search mr--10"
              style={{ width: "13.3rem", borderColor: "transparent" }}
              placeholder={listUserAddGroups.length > 0 ? '' : "Nhập từ khóa..."}
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                handleSearchUserInviteGroupDelayed(e.target.value);
              }}
            />
          </Row>
          <div className="mt--22 mb--21">
            <div 
              className="fs--16 lh--18 font-weight--bold"
              style={{ color: '#272727CC' }}>
              Tất cả
            </div>
          </div>
          <Scrollbars id="scroll-bar-add-user"   autoHide >
            {renderListUserInviteRequest()}
          </Scrollbars>
          {/* <div className="row-end">
            <Button
              onClick={onCloseModalInvite}
              className="btn-cancel mr--16 c-414346"
              style={{ width: "80px", boxShadow: "none" }}
            >
              Hủy
            </Button>
            <Button onClick={onSubmit} className="group__btn--invite">
              Lưu
            </Button>
          </div> */}
        </div>
      </Modal>
    </Form>
  );
};

ModalInvite.propTypes = {
  visibleModalInvite: PropTypes.visibleModalInvite,
  onCloseModalInvite: PropTypes.onCloseModalInvite,
  groupId: PropTypes.groupId,
};

export default withRouter(ModalInvite);
