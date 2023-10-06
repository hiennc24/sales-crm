import React from "react";
// import PropTypes from "prop-types";
import { Row, Col } from "antd";
import "./MyTask.scss";

import Filter from "../../../../assets/images/filter.svg";
import Union from "../../../../assets/images/union.svg";

const MyTask = () => {
  return (
    <div className="my-task">
      <div className="my-task-inner">
        <div className="my-task-header">
          <Row>
            <Col span={16}>
              <span className="my-task-title">Tác vụ của tôi</span>
            </Col>
            <Col
              span={4}
              className="d-flex align-items-center justify-content-end"
            >
              <span className="btn-union">
                <img src={Union} alt="union" />
              </span>
            </Col>
            <Col
              span={4}
              className="d-flex align-items-center justify-content-end"
            >
              <span className="btn-filter">
                <img src={Filter} alt="union" />
              </span>
            </Col>
          </Row>
        </div>
        <div className="my-task-body">
          {[1, 2, 3].map((item, key) => (
            <div className="my-task-item" key={key}>
              <Row className="align-items-center">
                <Col span={16}>
                  <span className="task-detail">Đang thực hiện</span>
                </Col>
                <Col
                  span={4}
                  className="d-flex align-items-center justify-content-end"
                >
                  <span className="task-statistic">
                    <span className="task-number">3</span>
                  </span>
                </Col>
                <Col
                  span={4}
                  className="d-flex align-items-center justify-content-end"
                >
                  <span className="task-statistic">
                    <span className="task-filter">0</span>
                  </span>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MyTask.propTypes = {};

export default MyTask;
