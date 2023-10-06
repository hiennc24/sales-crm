/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Input, Avatar, Space, Badge, Tooltip } from 'antd';
import './ChatBox.scss';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUrlImage } from '../../../../utils';
import API from '../../../../services/api';
import UnknowUser from '../../../../assets/new/create-post/user.svg';
import Search from '../../../../assets/new/common/tim-kiem.svg';
import NoData from '../../../../assets/new/common/chua-co-lien-he.svg';
import FullScreen from '../../../../assets/new/common/full-screen.svg';

const ChatBox = (props) => {
  let history = useHistory();
  const [listEmp, setListEmp] = useState(props.listMember);
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    // window.addEventListener("click", function (e) {
    //   if (document.getElementById("search-icon")?.contains(e.target)) {
    //     setIsSearch(false);
    //   } else if (document.getElementById("search-input")?.contains(e.target)) {
    //     setIsSearch(true);
    //   } else if (!document.getElementById("search-input")?.contains(e.target)) {
    //     setIsSearch(false);
    //   }
    // });
    setListEmp(props.listMember);
  }, [props.listMember]);
  let timer = null;
  const handleChangeTyping = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      API.employee.getEmployeeByName(e.target.value).then((res) => {
        if (res.code === 200) {
          setListEmp(res.data);
        }
      });
    }, 250);
  };
  const selectContact = (data) => {
    localStorage.setItem('selectContact', JSON.stringify(data));
    handleSelectAll();
  };
  const handleSelectAll = () => {
    history.push('/messages-box');
  };
  return (
    <div className={`chat-box ${listEmp?.length === 0 ? 'nodata' : ''}`}>
      <div className='section-title'>
        <span>
          <h2>Liên hệ</h2>
        </span>
        <Space size={30}>
          {!isSearch ? (
            <Tooltip placement='topRight' title='Tìm kiếm'>
              <img
                src={Search}
                onClick={() => setIsSearch(true)}
                id='search-icon'
                className='cursor--pointer'
              />
            </Tooltip>
          ) : (
            <Input
              type='text'
              bordered={false}
              placeholder='Tìm kiếm'
              className='chat-search'
              onChange={handleChangeTyping}
              id='search-input'
              style={{ padding: 0 }}
            />
          )}
          <Tooltip placement='topRight' title='Xem tất cả trong Messenger'>
            <div className='btn-select-all' onClick={handleSelectAll}>
              <img src={FullScreen} className='w--16' />
            </div>
          </Tooltip>
        </Space>
      </div>

      <div className='chat-box-list'>
        {listEmp?.length === 0 ? (
          <div className='no-task'>
            <img src={NoData} alt='noUser' />
            <p>Chưa có liên hệ nào</p>
          </div>
        ) : (
          listEmp &&
          listEmp.map((item, key) => {
            console.log('item', item)
            
            return (
              <div
                className='chat-box-item'
                key={key}
                onClick={() => selectContact(item)}
              >
                <Space size={12}>
                  <Badge dot color='#31a24c' size={10}>
                    <Avatar size={24} src={!item.Avatar?UnknowUser :getUrlImage(35, 35, item.Avatar)} />
                  </Badge>
                  <div className='chat-box-name'>
                    <h3>{item.FullName || item.Email || 'Anonymous'}</h3>
                  </div>
                </Space>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  listMember: PropTypes.any,
};

export default ChatBox;
