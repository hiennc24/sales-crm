import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import apis from '../../services/api';
import CalendarDetail from './CalendarDetail';
import IconPrev from "../../assets/images/groups/prev-month.svg";
import IconNext from "../../assets/images/groups/next-month.svg";
import * as dateFns from "date-fns";
import moment from "moment";

const Calendar = () => {

    const [detail, setDetail] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [listPost, setListPost] = useState(null);

    async function getData() {
        const res = await apis.event.getListPosts(0, 1, 100000, 3)
        if (res?.code === 200) {
            setListPost(res.data)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    function renderHeader() {
        return (
            <div className="modal-footer-custom">
                <div className="col-start row">
                    <div className="btn-change-month" onClick={prevMonth}>
                        <img src={IconPrev} />
                    </div>
                    <span className="text-time">
                        {(currentMonth.getDay() === 0
                            ? "Chủ nhật"
                            : `Thứ ${currentMonth.getDay() + 1}`) +
                            ", " +
                            "Tháng " +
                            (currentMonth.getMonth() + 1) +
                            ", " +
                            currentMonth.getFullYear()}
                    </span>
                    <div className="btn-change-month" onClick={nextMonth}>
                        <img src={IconNext} />
                    </div>
                </div>
            </div>
        );
    }
    function renderDays() {
        const days = [];
        for (let i = 2; i <= 8; i++) {
            days.push(
                <div className="col text-day" key={i}>
                    {i < 8 ? "T" + i : "CN"}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    }
    function renderCells() {
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        let listDay = []
        let index = 0
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                listDay.push(day)
                day = dateFns.addDays(day, 1);
            }
        }
        listDay.map((el, index) => {

            const sameDay = isSameDay(el)
            console.log('sameDay', sameDay);
            formattedDate = dateFns.format(el, dateFormat);
            days.push(
                <div
                    key={index}
                    style={{
                        margin: 2,
                        textAlign: "center",
                        height: 75,
                        backgroundColor: !dateFns.isSameMonth(el, monthStart)
                            ? "transparent"
                            : "#F6F9FB",
                        overflowY: sameDay.length >= 2 ? 'scroll' : ''
                    }}
                    className={`col scroll-bar cell ${!dateFns.isSameMonth(el, monthStart)
                        ? "disabled"
                        : sameDay
                            ? "selected"
                            : ""
                        }`}
                >
                    {sameDay ? (
                        <span className="number date-active">{formattedDate}</span>
                    ) : (
                        <span className="number">{formattedDate}</span>
                    )}
                    {sameDay ? (
                        (<Row justify="center mt--30">
                            {
                                sameDay.map((ev, index) => (<Col key={index} span={24} className="containerListWork" style={{ marginBottom: "6px" }}>
                                    {" "}
                                    <div className="event" onClick={() => setDetail(ev)}>
                                        <p className="paragraph"> {ev?.Details?.Title}</p>
                                    </div>
                                </Col>))
                            }
                            {/* <Col span={24} className="containerListWork mt--5">
                  {" "}
                  <div className="meeting" onClick={() => setDetail(sameDay)}>
                    Cuộc họp
                      </div>
                </Col> */}
                        </Row>)
                    ) : null}
                </div>
            );
            index += 1;
            if (index % 7 === 0) {
                rows.push(
                    <div className="row dates-in-month" >
                        {days}
                    </div>
                );
                days = [];
            }


        }
        )
        return <div className="body body-calendar">{rows}</div>;
    }

    function isSameDay(day) {
        let listEventPerDay = []
        const DATE_FORMAT = "YYYY-MM-DD";
        if (listPost === null) return false
        let test1 = moment(day, DATE_FORMAT).format(DATE_FORMAT);
        for (let i = 0; i < listPost.length; i++) {
            const element = moment(listPost[i].Details?.FromDate ?? "1/1/1900", DATE_FORMAT).format(DATE_FORMAT);
            const element2 = moment(listPost[i].Details?.ToDate ?? "1/1/1900", DATE_FORMAT).format(DATE_FORMAT);
            if (moment(test1).isSame(element)) {
                listEventPerDay.push(listPost[i])
            }
        }
        return listEventPerDay.length > 0 ? listEventPerDay : false
    }

    const nextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1));
    };
    const prevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1));
    };

    return (
        <>
            <div className="calendar">
                {renderHeader()}
                <div>
                    {renderDays()}
                    {renderCells()}
                </div>
            </div>
            <CalendarDetail visible={detail} setVisible={setDetail} />
        </>
    )
}
export default Calendar