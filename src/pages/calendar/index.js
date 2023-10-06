import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import * as dateFns from "date-fns";
import { Button, Row, Col } from "antd";
import moment from "moment";
import "./CalendarGroup.scss";
import { Scrollbars } from "react-custom-scrollbars";
import CalendarDetail from "./CalendarDetail";
import Calendar from "./Calendar";
import LayoutMain from "../../components/LayoutMain";
import SideBar from "../../components/sidebar";
import IconPrev from "../../assets/images/groups/prev-month.svg";
import IconNext from "../../assets/images/groups/next-month.svg";
import API from '../../services/api';
import { useHistory, useLocation } from 'react-router-dom';

const CalendarGroup = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate] = useState(new Date());
  const [detail, setDetail] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [listPost, setListPost] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const path = useLocation();
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
  

  useEffect(() => {
    const listPath = path.pathname.split('/')
    setGroupId(listPath[1] === 'group-work' ? +listPath[2] : 0)
  }, [path.key]);
  
  return (
    <LayoutMain>
      <div className="common--layout">
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
            <SideBar title="InCom" />
        </div>
        <div className={`common--layout__main--full ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <div className="calendar-group-page">
            <div className="containerHeader">
              <div>
                <div className="text-topic">Lịch</div>
              </div>
            </div>
            <Calendar />
            {/* <div className="calendar">
              {renderHeader()}
              <div>
                {renderDays()}
                {renderCells()}
              </div>
            </div>
            <CalendarDetail visible={detail} setVisible={setDetail} /> */}
            {/* <CalendarAdd visible={modalAdd} setVisible={setModalAdd} /> */}
          </div>
        </div>
      </div>
    </LayoutMain>
  );
};
export default CalendarGroup;
