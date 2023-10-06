/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input, Select, Avatar, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../NewPost.scss';
import API from '../../../../../services/api';
import { getUrlImage } from '../../../../../utils';

import Search from '../../../../../assets/new/common/tim-kiem.svg';

const TagsModal = ({ showTagModal, setShowTagModal, tags, setTags }) => {
  const [children, setChildren] = useState([]);
  const userInfo = useSelector((state) =>
    state.get('userProfile').get('profile')
  );

  useEffect(() => {
    API.employee.getListEmployees().then((res) => {
      const newChildren = res.data.filter(
        (item) =>
          item.UserId != userInfo.Id &&
          !tags.map((i) => i.UserId).includes(item.UserId)
      );
      setChildren(newChildren);
    });
  }, []);

  const handleAddTags = (value) => {
    setTags([...tags, value]);
    const newChildren = children.filter((item) => item.UserId != value.UserId);
    setChildren(newChildren);
  };

  const handleAddTagsByAntdSelect = (value) => {
    let newTags = JSON.parse(JSON.stringify(tags));
    for (let index of value) {
      newTags.push(children[index]);
    }

    setTags(newTags);
    let newChildren = JSON.parse(JSON.stringify(children));
    for (const i of value) {
      newChildren = newChildren.filter((item, index) => index != i);
    }
    setChildren(newChildren);
  };

  const handleDeleteTagsByAntdSelect = (value) => {
    const newTags = tags.filter(
      (tag) => tag.FullName !== value && tag.Email !== value
    );
    setTags(newTags);
    const newChildren = JSON.parse(JSON.stringify(children));
    newChildren.unshift(
      tags.find((tag) => tag.FullName == value || tag.Email == value)
    );
    setChildren(newChildren);
  };
  return (
    <Modal
      visible={showTagModal}
      onCancel={() => setShowTagModal(false)}
      title={
        <div className='tag-modal-title'>
          <h4>Gắn thẻ</h4>
          <Input
            prefix={<img src={Search} />}
            className='tag-search'
            placeholder='Tìm kiếm tên'
          />
        </div>
      }
      closeIcon={'Xong'}
      footer={false}
      className='tag-modal__new'
    >
      <h5>
        <b>Đã gắn thẻ</b>
      </h5>
      <Select
        mode='multiple'
        allowClear
        placeholder='Tìm theo tên'
        style={{ width: '100%' }}
        value={tags.map((a) => a.FullName || a.Email)}
        onClear={() => setTags([])}
        onSelect={handleAddTagsByAntdSelect}
        onDeselect={handleDeleteTagsByAntdSelect}
        dropdownClassName='post-status__dropdown'
      >
        {children.map((employee, index) => (
          <Select.Option key={index}>
            {employee.FullName || employee.Email}
          </Select.Option>
        ))}
      </Select>
      <h5 className="mt--10">
        <b>Gợi ý:</b>
      </h5>
      {children.map((employee, index) => (
        <div key={index} className='my--10'>
          <Space>
            <Avatar size={32} src={getUrlImage(35, 35, employee.Avatar)} />
            <div
              className='tag-select'
              key={index}
              onClick={() => handleAddTags(employee)}
            >
              {employee.FullName || employee.Email}
            </div>
          </Space>
        </div>
      ))}
    </Modal>
  );
};

export default TagsModal;
