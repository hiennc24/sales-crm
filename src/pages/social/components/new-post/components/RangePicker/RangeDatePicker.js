import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import './styles.scss';

const { RangePicker } = DatePicker;

const RangeDatePicker = ({ startDate, endDate, onChangeDate }) => {
  return (
    <Space>
      <RangePicker
        className='range-picker'
        defaultValue={null}
        disabledDate={current => {
          return moment().add(-1, 'days')  >= current;
        }}
        value={[startDate, endDate]}
        format={'DD/MM/YYYY'}
        suffixIcon={false}
        onChange={(dates, datesString) => onChangeDate(datesString)}
        placeholder={['--/--/--', '--/--/--']}
      />
    </Space>
  )
};

RangeDatePicker.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onChangeDate: PropTypes.func,
};

export default RangeDatePicker;