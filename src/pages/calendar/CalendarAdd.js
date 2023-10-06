import React, { useState } from "react";
import {
  Divider,
  Row,
  Col,
  Modal,
  Space,
  Input,
  DatePicker,
  TimePicker,
  Button,
} from "antd";
import PropTypes from "prop-types";
import "./CalendarGroup.scss";

import Calendar from "../../assets/new/calendar/calendar.svg";
import Check from "../../assets/new/calendar/check.svg";
import ArrowDown from "../../assets/new/calendar/arrow-down.svg";

const CalendarGroup = ({ visible, setVisible }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("meeting");
  const [color, setColor] = useState("blue");
  return (
    <Modal
      closable={false}
      visible={visible}
      footer={null}
      className="modalCustom"
      bodyStyle={{ padding: "20px 0px" }}
    >
      <span className="titleAdd">Thêm lịch</span>
      <Divider className="divider" />
      <div className="px--20">
        <Space>
          <span className="titleTheme">Chủ đề:</span>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="theme-name"
          />
        </Space>
      </div>
      <Divider className="divider" />
      <Row className="px--20">
        <Col span={24}>
          <Space>
            <div
              className={`radioButton ${
                type === "meeting" ? "activeType" : ""
              }`}
              onClick={() => setType("meeting")}
            >
              Cuộc họp
            </div>
            <div
              className={`radioButton ${type === "event" ? "activeType" : ""}`}
              onClick={() => setType("event")}
            >
              Sự kiện
            </div>
          </Space>
        </Col>
        <Col span={24} className="mt--20">
          <Space>
            <span className="titleTheme">Màu sắc:</span>
            <div className={"color black"} onClick={() => setColor("black")}>
              {color === "black" && (
                <img src={Check} alt="check" className="checkColor" />
              )}
            </div>
            <div className={"color red"} onClick={() => setColor("red")}>
              {color === "red" && (
                <img src={Check} alt="check" className="checkColor" />
              )}
            </div>
            <div className={"color blue"} onClick={() => setColor("blue")}>
              {color === "blue" && (
                <img src={Check} alt="check" className="checkColor" />
              )}
            </div>
          </Space>
        </Col>
        <Col span={24} className="mt--20">
          <span className="titleTheme">Ngày tháng:</span>
          <div>
            <DatePicker
              placeholder=""
              className="calendarPicker"
              suffixIcon={<img src={Calendar} alt="calendar" />}
              format={(value) =>
                `Ngày ${value.format("DD")} tháng ${value.format(
                  "MM"
                )} năm ${value.format("yyyy")}`
              }
            />
          </div>
          <Row gutter={30}>
            <Col span={12}>
              <TimePicker
                placeholder=""
                className="calendarPicker"
                format="HH:mm"
                suffixIcon={
                  <img src={ArrowDown} alt="arrow" className="mt--5" />
                }
              />
            </Col>
            <Col span={12}>
              <TimePicker
                placeholder=""
                className="calendarPicker"
                format="HH:mm"
                suffixIcon={
                  <img src={ArrowDown} alt="arrow" className="mt--5" />
                }
              />
            </Col>
          </Row>
        </Col>
        <Col className="mt--20">
          <Space>
            <span className="titleTheme">Địa chỉ:</span>
            <Input
              // value={name}
              // onChange={(e) => {
              //   setName(e.target.value);
              // }}
              className="theme-name"
            />
          </Space>
        </Col>
        <Divider className="divider" />
      </Row>
      <Row justify="end" className="px--18">
        <Col>
          <Space>
            <Button className="btn-cancle" onClick={() => setVisible(false)}>
              Hủy
            </Button>
            <Button className="btn-submit" onClick={() => setVisible(false)}>
              Tạo
            </Button>
          </Space>
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
