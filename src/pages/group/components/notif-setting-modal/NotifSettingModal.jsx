/* eslint-disable react/prop-types */
import { Modal, Radio, Space, Switch } from 'antd';
import React, { useState } from 'react';
import './NotifSettingModal.scss';
import closeIcon from '../../../../assets/images/close-icon.svg';

const NotifSettingModal = ({ isShowSettingModal, setIsShowSettingModal }) => {
  const [value, setValue] = useState(1);
  const handleOk = () => {

  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return <Modal
    visible={isShowSettingModal}
    onOk={handleOk}
    onCancel={() => setIsShowSettingModal(false)}
    className="setting-modal"
    title={<p className="modal-title">Cài đặt thông báo</p>}
    closeIcon={<img src={closeIcon} alt="closeIcon" />}
  >
    <Radio.Group onChange={handleChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>
          <div className="radio-item">
            <p>Tất cả bài viết</p>
            <small>Mọi bài viết trong nhóm</small>
          </div>
        </Radio>
        <Radio value={2}>
          <div className="radio-item">
            <p>Tin nổi bật</p>
            <small>Bài viết gợi ý- Bài viết có nhắc đến bạn</small>
          </div>
        </Radio>
        <Radio value={3}>
          <div className="radio-item">
            <p>Tắt</p>
            <small>Chỉ những lượt nhắc và cập nhật quan trọng về cài đặt hoặc quyền riêng tư của nhóm</small>
          </div>
        </Radio>
      </Space>
    </Radio.Group>
    <div className="noti-switch">
      <div className="radio-item">
        <p>Thông báo về yêu cầu tham gia</p>
        <small>Nhận thông báo khi có người yêu cầu tham gia</small>
      </div>
      <Switch />
    </div>
  </Modal>;
};

export default NotifSettingModal;