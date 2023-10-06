/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DatePicker, Space, TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import Calendar from '../../../../../assets/new/create-post/lich.svg';
import '../NewPost.scss';
import { useLocation } from 'react-router-dom';
const EventTimePicker = ({ startDate, setStartDate, startTime, setStartTime, endDate, setEndDate, endTime, setEndTime }) => {
  const location = useLocation();
  return (
    <div className='event-time-creation'>
      <div className='event-start-time '>
        <p className='title-datepicker'>Thời gian bắt đầu</p>
        <Space className='schedule-button' size={0}>
          <img src={Calendar} alt='calendarIcon' className='mr--0' />
          <DatePicker
            defaultValue={null}
            value={startDate}
            placeholder="Chọn ngày"
            format={'DD/MM/YYYY'}
            suffixIcon={false}
            onChange={(date) => {
              const data = date?date:moment();
              setStartDate(data);
              if(!moment(data).isBefore(moment(endDate)))
              setEndDate(data);
            }}
            disabledDate={(current) => current < moment() || current > moment(endDate)}
          />
          <TimePicker placeholder="Chọn giờ" value={startTime} format="HH:mm" suffixIcon={false} onChange={ (time) => { 
            setStartTime(time) 
          } }/>
        </Space>
      </div>
      <div className={location.pathname === '/profile'?'event-end-time event-end-time-profile':'event-end-time'} >
        <p className='title-datepicker'>Thời gian kết thúc</p>
        <Space className='schedule-button' size={0}>
          <img src={Calendar} alt='calendarIcon' className='mr--0' />
          <DatePicker
            defaultValue={null}
            value={endDate}
            format={'DD/MM/YYYY'}
            placeholder="Chọn ngày"
            suffixIcon={false}
            onChange={(date) => { 
              const data = date?date:moment();
              setEndDate(data) 
            }}
            disabledDate={(current) => current < moment(startDate)}
          />
          <TimePicker placeholder="Chọn giờ" value={endTime} format="HH:mm" suffixIcon={false} onChange={ (time) => { 
            setEndTime(time) 
          } }/>
        </Space>
      </div>
    </div>
  );
};

export default EventTimePicker;
