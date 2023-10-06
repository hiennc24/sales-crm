import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
// import PropTypes from "prop-types";
import { Row, Col, Card } from "antd";
import LayoutSetting from "../../components/LayoutSetting";
import "./About.scss";
import { getMenuSetting } from "../../utils";

import Media from "../../assets/images/media.svg";
import Task from "../../assets/images/task.svg";
import CRM from "../../assets/images/crm.svg";
import CallCenter from "../../assets/images/callcenter.svg";
import LayoutMain from "../../components/LayoutMain";
import Scrollbars from "react-custom-scrollbars";
import SideBar from "../../components/sidebar";


const About = () => {

  const [collapseLevel1, setCollapseLevel1] = useState(true)
  const [collapseLevel2, setCollapseLevel2] = useState(true)
  const collapseLeft = useSelector(state => state.get('global').get('expandCollapseLeft'))
  const collapseRight = useSelector(state => state.get('global').get('expandCollapseRight'))

  useEffect(() => {
    if(collapseLeft && collapseRight){
      setCollapseLevel1(true)
      setCollapseLevel2(true)
    }
    else if(collapseLeft || collapseRight){
      setCollapseLevel1(true)
      setCollapseLevel2(false)
    }
    else {
      setCollapseLevel1(false)
      setCollapseLevel2(false)
    }
  }, [collapseLeft, collapseRight])

  const menu = getMenuSetting("about");
  const abouts = [
    {
      title: "Truyền thông",
      desc: `Công ty của bạn. Thống nhất.<br/>
    Dòng hoạt động, trò chuyện nhóm, lịch trình, nhóm làm việc và các công cụ hợp tác khác mà bạn có thể sử dụng.`,
      image: Media,
    },
    {
      title: "Tác vụ và dự án",
      desc: `Làm được nhiều hơn.<br/>
    Gantt, Kanban, theo dõi thời gian, lập kế hoạch công việc, người dùng bên ngoài, v.v...`,
      image: Task,
    },
    {
      title: "CRM",
      desc: `Tăng trưởng doanh số của bạn.<br/>Task
    Cải thiện tỷ lệ chuyển đổi, tự động hóa tiếp thị và phục vụ khách hàng tốt hơn với CRM miễn phí của chúng tôi`,
      image: CRM,
    },
    {
      title: "Trung tâm Liên hệ",
      desc: `Yêu thích khách hàng của bạn<br/>
    Cung cấp hỗ trợ trong thời gian thực thông qua các kênh giao tiếp phổ biến.<br/> Mạng xã hội, trình nhắn tin, telephony, email hoặc trò chuyện trực tiếp.`,
      image: CallCenter,
    },
  ];

  return (
    <LayoutMain>
      <div className="common--layout">
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
            <SideBar title="Incom" />
        </div>
        <div className={`common--layout__main--full ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <div className="calendar-group-page">
            <LayoutSetting menu={menu}>
              <Card
                title={<span className="title">Về chúng tôi</span>}
                bordered={false}
                style={{ width: "100%", borderRadius: "10px" }}
              >
                {abouts.map((item, key) => (
                  <Row
                    gutter={32}
                    className="main-row"
                    style={{ marginBottom: "20px" }}
                    key={key}
                  >
                    <Col span={4} className="left-col">
                      <img src={item.image} alt="about" />
                    </Col>
                    <Col span={20} className="right-col">
                      <Row>
                        <span className="title">{item.title}</span>
                      </Row>
                      <Row>
                        <div className="desc-wrapper">
                          <p
                            className="desc"
                            dangerouslySetInnerHTML={{ __html: item.desc }}
                          ></p>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Card>
            </LayoutSetting>
          </div>
        </div>
      </div>
    </LayoutMain>

  );
};

About.propTypes = {};

export default About;
