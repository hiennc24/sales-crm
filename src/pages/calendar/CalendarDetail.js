import React, { useEffect, useState } from "react";
import { Divider, Row, Col, Modal, Space, Button } from "antd";
import PropTypes from "prop-types";
import "./CalendarGroup.scss";
import moment from "moment";
import Calendar from "../../assets/new/calendar/calendar.svg";
import Time from "../../assets/new/calendar/time.svg";
import Location from "../../assets/new/calendar/location.svg";
import API from '../../services/api';
import FormatText3 from "../../utils/FormatText3";
import Avatar from "antd/lib/avatar/avatar";
import {
  CalendarOutlined, ClockCircleOutlined, UserOutlined, TeamOutlined
} from '@ant-design/icons';
import background from '../../assets/images/Rectangle.png';

const CalendarGroup = ({ visible, setVisible }) => {
  const [DATE_FORMAT2, setDATE_FORMAT2] = useState('YYYY-MM-DD');
  const [DATE_FORMAT, setDATE_FORMAT] = useState('DD-MM-YYYY');
  const [DATETIME_FORMAT2, setDATETIME_FORMAT2] = useState('YYYY-MM-DD HH:mm:ss');
  const [DATETIME_FORMAT, setDATETIME_FORMAT] = useState('YYYY-MM-DD HH:mm:ss');
  const [DATETIME_FORMAT3, setDATETIME_FORMAT3] = useState('DD/MM/YYYY HH:mm:ss');

  // console.log(888888888, visible)

  return (
    <Modal
      closable={false}
      visible={visible}
      footer={null}
      className="modalCustom"
    >
      <div className="header">
        <span className="titleDetail">{visible?.Details?.Title ?? ""}</span>
      </div>
      {/* <Divider className="divider" /> */}
      <div className="body">
        <Row>
          <Col span={8}>
            <img src={background} className="side-img" />
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24}>
                <p className="title-row">Mô tả:</p>
                <FormatText3 content={visible?.Details?.Content ?? ""} />
              </Col>
            </Row>
            <Row>
              <Col span={24} className="mt--20">
                <Space>
                  {/* <p className="title-row">Thời gian:</p> */}
                  <CalendarOutlined />
                  {/* <span className="textCalendar">{moment(visible?.Details?.FromDate ?? "1/1/1900", DATETIME_FORMAT).format(DATETIME_FORMAT)} đến {moment(visible?.Details?.ToDate ?? "1/1/1900", DATETIME_FORMAT).format(DATETIME_FORMAT)}</span>
               */}
                  <span className="textCalendar">{moment(visible?.Details?.FromDate ?? "1/1/1900").format('DD/MM/YYYY')}</span>
                  <ClockCircleOutlined />
                  <span className="textCalendar">{moment(visible?.Details?.FromTime ?? "00:00:00", "HH:mm:ss").format("HH:MM")}</span>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="mt--20">
                {/* <Space style={{ alignItems: 'start' }} className="w-100"> */}
                <Row>
                  <Col>
                    <span className="organization">
                      <UserOutlined />
                      <span className="textCalendar" style={{ paddingLeft: "10px" }}>Phụ trách/ Tổ chức:</span>
                    </span>
                  </Col>
                  <Col>
                    <div className="w-100">
                      {visible?.Employee && visible?.Employee.length > 0 && visible?.Employee.map((item, index, arr) =>
                        // <div key={index}>
                        //   <Avatar size={32} key={index} src={`https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${item.Avatar}&fit=inside`} />
                        //   <span className="textCalendar"> {item.FullName ??""}</span>
                        // </div>
                        index % 2 == 0 && <Row key={index} gutter={[16, 32]} className="mb-10">
                          <Col span={12}>
                            {/* <Avatar size={32} key={index} src={`https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${item.Avatar}&fit=inside`} /> */}
                            <span className="textCalendar"> {item?.FullName ?? ""}</span>
                          </Col>
                          {index < arr.length - 1 && <Col span={12}>
                            {/* <Avatar size={32} key={index} src={`https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${arr[index + 1].Avatar}&fit=inside`} /> */}
                            <span className="textCalendar"> {arr[index + 1]?.FullName ?? ""}</span>
                          </Col>}
                        </Row>
                      )}
                    </div>
                  </Col>
                </Row>
                {/* </Space> */}
              </Col>
            </Row>
            <Row>
              <Col span={12} className="mt--20">
                <TeamOutlined />
                <span className="textCalendar" style={{ paddingLeft: "10px" }}>Địa điểm :</span>
                {/* <img src={Location} alt="location" /> */}
                <span className="textCalendar"> {visible?.Address ?? ""}</span>
              </Col>
              <Col span={12} className="mt--10" style={{ justifyContent: 'right', display: 'flex' }}>
                <Button className="buttonCalendar" onClick={() => setVisible(null)}>
                  Đóng
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

      </div>
    </Modal>
  );
};
CalendarGroup.propTypes = {
  visible: PropTypes.object,
  setVisible: PropTypes.func,
};
export default CalendarGroup;
