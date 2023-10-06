import React from "react";
import { Modal, Switch } from "antd";
import PropTypes from "prop-types";
import "./ModalSettingNotification.scss";
import { ReactComponent as Close } from "../../assets/images/close-icon.svg";

const ModalSettingNotification = ({ isShow, onHideModal }) => {
  const handleOk = () => {
    onHideModal();
  };

  const handleCancel = () => {
    onHideModal();
  };

  const onChangeSwitch = () => {};

  return (
    <Modal
      title="Cài đặt thông báo"
      visible={isShow}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="setting-noti-modal"
      closeIcon={<Close />}
      width={700}
      okText="Lưu"
      cancelText="Hủy"
      cancelButtonProps={{
        type: "text",
        className: "btn-cancel-setting-noti",
      }}
      okButtonProps={{ className: "btn-ok-setting-noti" }}
    >
      <div className="setting-noti-body">
        <div className="setting-noti-item">
          <div className="setting-noti-item-text">
            <p>Bình luận</p>
            <span>Bài viết hoặc bình luận của bạn được trả lời</span>
          </div>
          <div className="setting-noti-item-switch">
            <Switch
              defaultChecked
              onChange={onChangeSwitch}
              className="custom-switch"
            />
          </div>
        </div>

        <div className="setting-noti-item">
          <div className="setting-noti-item-text">
            <p>Thẻ</p>
            <span>Bài viết hoặc bình luận có gán thẻ bạn</span>
          </div>
          <div className="setting-noti-item-switch">
            <Switch
              defaultChecked
              onChange={onChangeSwitch}
              className="custom-switch"
            />
          </div>
        </div>

        <div className="setting-noti-item">
          <div className="setting-noti-item-text">
            <p>Sự kiện</p>
            <span>Thông báo về sự kiện</span>
          </div>
          <div className="setting-noti-item-switch">
            <Switch
              defaultChecked
              onChange={onChangeSwitch}
              className="custom-switch"
            />
          </div>
        </div>

        <div className="setting-noti-item">
          <div className="setting-noti-item-text">
            <p>Nhóm</p>
            <span>
              Đây là các thông báo về hoạt động trong những nhóm bạn đã tham gia
            </span>
          </div>
          <div className="setting-noti-item-switch">
            <Switch
              defaultChecked
              onChange={onChangeSwitch}
              className="custom-switch"
            />
          </div>
        </div>

        <div className="setting-noti-item">
          <div className="setting-noti-item-text">
            <p>Thông báo khác</p>
            <span>Thông báo khác</span>
          </div>
          <div className="setting-noti-item-switch">
            <Switch
              defaultChecked
              onChange={onChangeSwitch}
              className="custom-switch"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalSettingNotification.propTypes = {
  isShow: PropTypes.bool,
  onHideModal: PropTypes.func,
};

export default ModalSettingNotification;
