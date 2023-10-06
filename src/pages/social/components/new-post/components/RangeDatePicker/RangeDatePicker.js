import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import './styles.scss';

const { RangePicker } = DatePicker;

const RangeDatePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <Space>
      <RangePicker
        className='range-date-picker'
        defaultValue={[moment(), moment()]}
        disabledDate={current => {
          return moment().add(-1, 'days')  >= current;
        }}
        value={[startDate, endDate]}
        format={'DD/MM/YYYY'}
        suffixIcon={false}
        onChange={(dates) => {
          setStartDate(dates[0]);
          setEndDate(dates[1]);
        }}
        placeholder={['--/--/--', '--/--/--']}
      />
    </Space>
  )
};

RangeDatePicker.propTypes = {
  startDate: PropTypes.string,
  setStartDate: PropTypes.func,
  endDate: PropTypes.string,
  setEndDate: PropTypes.func,
};

export default RangeDatePicker;