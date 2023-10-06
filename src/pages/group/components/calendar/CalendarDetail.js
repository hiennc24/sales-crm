import React from "react";
import { Divider, Row, Col, Modal, Space } from "antd";
import PropTypes from "prop-types";
import "./CalendarGroup.scss";

import Calendar from "../../../../assets/new/calendar/calendar.svg";
import Time from "../../../../assets/new/calendar/time.svg";
import Location from "../../../../assets/new/calendar/location.svg";

const CalendarGroup = ({ visible, setVisible }) => {
  return (
    <Modal
      closable={false}
      visible={visible}
      footer={null}
      className="modalCustom"
      bodyStyle={{ padding: "20px 0px" }}
    >
      <span className="titleDetail">Họp tổng thể chống dịch</span>
      <Divider className="divider" />
      <Row className="px--20">
        <Col span={24}>
          <Space>
            <img src={Calendar} alt="calendar" />
            <span className="textCalendar">15/06/2021</span>
          </Space>
        </Col>
        <Col span={24} className="mt--20">
          <Space>
            <img src={Time} alt="time" />
            <span className="textCalendar">9:00 - 11:00</span>
          </Space>
        </Col>
        <Col span={24} className="mt--20">
          <Space>
            <img src={Location} alt="location" />
            <span className="textCalendar">P102 Kinh doanh</span>
          </Space>
        </Col>
        <Col span={24} className="mt--20">
          <span className="roomCalendar">
            Hoạt động mới của phòng marketing - CHIA SẺ KIẾN THỨC - phòng chống
            dịch
          </span>
        </Col>
        <Col span={24} className="mt--20">
          <div className="buttonCalendar" onClick={() => setVisible(false)}>
            Đóng
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

CalendarGroup.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default CalendarGroup;
