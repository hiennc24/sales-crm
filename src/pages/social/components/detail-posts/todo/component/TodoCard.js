/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import {
  StarIcon,
  CheckGroupRedIcon,
  CheckGroupYellowIcon,
  UncheckGroupIcon,
  EditIcon,
  IcRankIcon,
  PersonIcon,
  AssigneeIcon,
  RedFlagIcon,
  YellowFlagIcon,
  GrayFlagIcon,
  ClockIcon,
  MoneyIcon,
} from "../Icon/Icon";

const HeadDivider = ({ type }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "2px",
        backgroundColor:
          type === 1 ? "#C4C4C4" : type === 2 ? "#FEA800" : "#2FCE00",
      }}
    />
  );
};

const TodoCard = ({ data }) => {
  const { type, name, rank, price, time } = data;
  return (
    <div className="todo-card">
      <HeadDivider type={type} />
      <div className="todo-card-body">
        <Row gutter={[12, 18]}>
          <Col>
            <StarIcon />
          </Col>
          <Col>
            {type === 1 ? (
              <UncheckGroupIcon />
            ) : type === 2 ? (
              <CheckGroupYellowIcon />
            ) : (
              <CheckGroupRedIcon />
            )}
          </Col>
          <Col>
            <span className={`task-name ${type === 3 ? "type3" : ""}`}>
              {name}
            </span>
            <span className="editIcon">
              <EditIcon />
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={5}>
            <IcRankIcon />
            <span className="text-icon">{rank}</span>
          </Col>
          <Col span={4}>
            {type !== 3 ? (
              <PersonIcon style={{ width: "15px", height: "15px" }} />
            ) : (
              <AssigneeIcon />
            )}
          </Col>
          <Col span={4}>
            {type === 1 ? (
              <YellowFlagIcon />
            ) : type === 2 ? (
              <RedFlagIcon style={{ width: "12px", height: "12px" }} />
            ) : (
              <GrayFlagIcon />
            )}
          </Col>
          <Col span={5}>
            <ClockIcon />
            <span className="text-icon">{time}</span>
          </Col>
          <Col span={6}>
            <MoneyIcon />
            <span className="text-icon">{price}</span>
          </Col>
        </Row>
      </div>
    </div>
  );
};

TodoCard.propTypes = {
  data: PropTypes.object,
};

TodoCard.defaultProps = {
  data: {},
};

export default TodoCard;
