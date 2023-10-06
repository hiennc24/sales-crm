import React, { useState } from 'react';
import PropTypes from "prop-types";

import avatar from '../../../../assets/images/avatar_default.jpg';
import IconPublic from '../../../../assets/images/public_privacy.svg';
// import inputImage from '../../../../assets/images/image.svg';
// import closeIcon from '../../../../assets/images/close-icon.svg';
import IconPost from '../../../../assets/new/common/tin-noi-bo.svg';
import IconPostActive from '../../../../assets/new/common/tin-noi-bo-active.svg';
import IconSurvey from '../../../../assets/new/common/khao-sat.svg';
import IconSurveyActive from '../../../../assets/new/common/khao-sat-active.svg';
import IconEvent from '../../../../assets/new/common/hop-su-kien.svg';
import IconEventActive from '../../../../assets/new/common/hop-su-kien-active.svg';
import { Row, Col, Tooltip, Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './NewPost.scss';
import TypeofPosts from '../../../social/components/new-post/TypeofPosts';
import { useSelector } from "react-redux";
import { getUrlImage } from '../../../../utils';
// import { selectGroupType } from '../../../../stores/global/global.selector';

const NewPost = ({ refeshData }) => {
  // type: <'post' | 'event' | 'task'>
  const [type, changeType] = useState('post');
  const userInfo = useSelector(state => state.get('userProfile').get('profile'));
  // const groupType = useSelector(selectGroupType());
  const groupType = [
  ]

  const menu = (
    <Menu>
      <Menu.Item className="item-privacy" key="1">
        Công khai
      </Menu.Item>
      <Menu.Item className="item-privacy" key="2">
        Bí mật
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="new-post-container">
      <div>Thịnh</div>
      <div className="tabs-wrapper">
        <div className="type-post-wrapper">
          <div
            className={`type-post-tab ${type === 'post' ? 'selected' : ''}`}
            onClick={() => changeType('post')}
          >
            <img className="type-post-img" src={type === 'post' ? IconPostActive : IconPost} style={{ marginRight: 8 }} />

            Tin nội bộ
          </div>
          <div
            className={`type-post-tab ${type === 'event' ? 'selected' : ''}`}
            onClick={() => changeType('event')}
          >
            <img className="type-post-img" src={type === 'event' ? IconEventActive : IconEvent} style={{ marginRight: 8 }} />
            Họp/Sự kiện
          </div>
          <div
            className={`type-post-tab ${type === 'task' ? 'selected' : ''}`}
            onClick={() => changeType('task')}
          >
            <img className="type-post-img" src={type === 'task' ? IconSurveyActive : IconSurvey} style={{ marginRight: 8 }} />
            Khảo sát
          </div>
        </div>
      </div>
      <TypeofPosts type={type} refeshData={refeshData} changeType={(type) => changeType(type)} postData={{}} />
      {/* </>
      )} */}
    </div>
  );
};

NewPost.propTypes = {
  refeshData: PropTypes.func
};

export default NewPost;
