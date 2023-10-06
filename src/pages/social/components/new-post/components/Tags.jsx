/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import '../NewPost.scss';
import { Tag, Row, Col, Avatar } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import defaultAvatar from "../../../../../assets/images/avatar_default.jpg";
import addIcon from '../../../../../assets/new/event/add.svg'


const EventTimePicker = ({ startTime, setStartTime, setEndTime, endTime }) => {
  return (
    <Row gutter={10} className="take-care">
      <Col span={3}>
        <div className="take-title">Phụ trách</div>
      </Col>
      <Col span={4}>
        <Tag closable
          onClose={e => {
          }} className="tag-info">
          <div className="tag-content">
            <Avatar src={defaultAvatar} size="small" />
            <div>Granb</div>
          </div>
        </Tag>
      </Col>
      <Col span={4}>
        <Tag className="site-tag-plus">
          <img src={addIcon} alt="" />
          <div>Thêm người</div>
        </Tag>
      </Col>
    </Row>
  )
};

export default EventTimePicker;