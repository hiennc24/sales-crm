import { Card, Input, TimePicker, Tooltip, Table, Tag, Space, Select, Button, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';
import IconAdd from '../../../assets/new/common/add-icon.svg';
import iconClock from '../../../assets/new/common/clock.png';
import iconPen from '../../../assets/new/common/pen.png';
import iconUser from '../../../assets/new/common/user.png';
import moment from 'moment';
import { Icons } from '../../../utils';
// import { RangePicker } from '../../social/components/new-post/components'

export const Agendar = ({
  checkList, listTags, onPressAdd, optionsUser,
  onChangeCurator,
  onChangeDate,
  onChangeTime,
  onSaveRowCheckList,
  onEditRowCheckList,
  onChangeInputRow,
  onDeleteRowCheckList,
}) => {

  const getCurator = (item) => {
    var name = ""
    // if (typeof item.Curators === "string") {
    //   var _item = item.Curators.split(",");
    //   _item.forEach((rs, index) => {
    //     var tag = listTags.filter(r => rs == r.Id)[0]
    //     var _name = tag ? tag.FullName || tag.Email : ""
    //     if (index === 0) {
    //       name = _name
    //     }
    //     else name += ", " + _name
    //   })
    // } else {
    item?.CuratorDetails?.forEach((rs, index) => {
      // var tag = listTags.filter(r => rs == r.Id)[0]
      // var _name = tag ? tag.FullName || tag.Email : ""
      var _name = rs.FullName ?? rs.Email;
      if (index === 0) {
        name = _name
      }
      else name += ", " + _name
    })
    // }
    return name
  }

  const columns = [
    {
      title: () => <div className='title-columns-agendars'> <img src={Icons.calendar} className='icon-title' /> Ngày </div>,
      dataIndex: 'FromDate',
      key: 'FromDate',
      width: '20%',
      render: (text, record, index) => (
        record.edit
          ? <DatePicker
            className='date-picker'
            format={'DD/MM/YYYY'}
            disabledDate={current => {
              return moment().add(-1, 'days')  >= current;
            }}
            suffixIcon={false}
            placeholder={'--/--/--'}
            value={text ? moment(text, 'DD/MM/YYYY') : null}
            onChange={date => onChangeDate(date, index)}
          />
          : moment(text).format('DD/MM/YYYY')
      )
    },
    {
      // eslint-disable-next-line react/display-name
      title: () => <div className='title-columns-agendars'> <img src={iconClock} className='icon-title' /> Thời gian </div>,
      dataIndex: 'times',
      key: 'times',
      width: '20%',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        record.edit ? <TimePicker.RangePicker
          // defaultValue={moment(text ?? '00:00', 'HH:mm')}
          suffixIcon={false}
          value={[text[0] ? moment(text[0], 'HH:mm') : null, text[1] ? moment(text[1], 'HH:mm') : null]}
          onChange={(e, a) => onChangeTime(a, index)}
          format={'HH:mm'}
          style={{ backgroundColor: 'transparent' }}
          placeholder={['--:--', '--:--']}
        />
          : moment(text[0], 'HH:mm').format('HH:mm') + ' - ' + moment(text[1], 'HH:mm').format('HH:mm')
      )
    },
    {
      // eslint-disable-next-line react/display-name
      title: () => <div className='title-columns-agendars'> <img src={iconPen} className='icon-title icon-content' /> Nội dung </div>,
      dataIndex: 'Content',
      key: 'Content',
      width: '35%',
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        record.edit ? <Input.TextArea
          className="input-check-list"
          value={text}
          autoSize={{ minRows: 1, maxRows: 5 }}
          onChange={(e) => onChangeInputRow(record, e, 'Content')}
        />
          : text
      ),
    },
    {
      // eslint-disable-next-line react/display-name
      title: () => <div className='title-columns-agendars'> <img src={iconUser} className='icon-title' /> Phụ trách </div>,
      key: 'Curator',
      dataIndex: 'Curator',
      width: '25%',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        record.edit ?
          <Select
            mode="multiple"
            bordered
            className="select"
            value={text}
            onChange={(e) => onChangeCurator(e, index)}
            style={{ width: '100%' }}
            placeholder="Phụ trách...">{optionsUser}</Select>
          : <div style={{ fontWeight: 700 }}> {getCurator(record)} </div>
      ),
    },
    {
      title: '',
      key: 'action',
      width: '5%',
      // eslint-disable-next-line react/display-name
      render: (_text, record, index) => (
        record.edit
          ? <Tooltip title="Lưu">
            <img src={Icons.check} className="iconEdit agendar-image-button" onClick={() => onSaveRowCheckList(record, index)} />
          </Tooltip>
          : <Space>
            <Tooltip title="Chỉnh sửa">
              <img src={Icons.write} className="iconEdit agendar-image-button" onClick={() => onEditRowCheckList(record, index)} />
            </Tooltip>
            <Tooltip title="Xoá">
              <img src={Icons.cancel} className="iconEdit agendar-image-button" onClick={() => onDeleteRowCheckList(record, index)} />
            </Tooltip>
          </Space>
      ),
    },
  ];

  // console.log(checkList);

  return (
    <Card className="Agendar">
      <Table
        columns={columns}
        dataSource={checkList}
        rowKey={'Id'}
        pagination={false}
      />

      <Button
        type="dashed"
        className="Agendar__button"
        style={{ marginTop: 16 }}
        onClick={onPressAdd}
      >+ Thêm mới</Button>
    </Card>
  )
}

Agendar.propTypes = {
  checkList: PropTypes.array,
  listTags: PropTypes.array,
  onPressAdd: PropTypes.func,
  optionsUser: PropTypes.any,
  onChangeCurator: PropTypes.func,
  onChangeDate: PropTypes.func,
  onChangeTime: PropTypes.func,
  onSaveRowCheckList: PropTypes.func,
  onEditRowCheckList: PropTypes.func,
  onChangeInputRow: PropTypes.func,
  onDeleteRowCheckList: PropTypes.func,
}
