import React, { useState, useRef, useEffect } from 'react';
import { Space, Tooltip, Row, Col } from 'antd';
import TypeofPosts from './TypeofPosts';

import PostIcon from '../../../../assets/new/new-post/post-icon.svg'
import EventIcon from '../../../../assets/new/new-post/event-icon.svg'
import TodoIcon from '../../../../assets/new/new-post/todo-icon.svg'
import CalendarIcon from '../../../../assets/new/new-post/calendar-icon.svg'
import PollIcon from '../../../../assets/new/new-post/poll-icon.svg'
import GroupIcon from '../../../../assets/new/new-post/group-icon.svg'
import PostActiveIcon from '../../../../assets/new/new-post/post-active-icon.svg'
import EventActiveIcon from '../../../../assets/new/new-post/event-active-icon.svg'
import TodoActiveIcon from '../../../../assets/new/new-post/todo-active-icon.svg'
import CalendarActiveIcon from '../../../../assets/new/new-post/calendar-active-icon.svg'
import PollActiveIcon from '../../../../assets/new/new-post/poll-active-icon.svg'
import GroupActiveIcon from '../../../../assets/new/new-post/group-active-icon.svg'
import { setTypeList } from '../../../../stores/global/global.action'

import './NewPost.scss';
import { useDispatch, useSelector } from 'react-redux';

const NewPost = (data) => {
  const dispatch = useDispatch();
  const postRef = useRef()

  // useEffect(() => {
  //   data.changeType('post')
  //   dispatch(setTypeList('post'))
  // }, [])

  const changeType = (type) => {
    postRef.current.clearData(); data.changeType(type)
    dispatch(setTypeList(type))
  }
  

  const colStyles = {
  flexBasis: "20%",
  width: "20%",
  paddingLeft:0,
  paddingRight:0,
};

  return (
    <div className='new-post-container-social'>
      <div className='tabs-wrapperr'>
        {
          !data.isRemoveTab &&
          <Space size={0} style={{ width: '100%' }}>
            <Row type="flex" gutter={16}>
              <Col className="gutter-row" style={colStyles}>
                <div
                  className={`tabs-wrapperr__item ${data.type === 'post' ? 'selected' : ''
                    }`}
                  onClick={() => changeType('post')}
                >
                  <Tooltip title="Tin nội bộ">
                    <div className="tabs-item">
                      <img src={data.type === 'post' ? PostActiveIcon : PostIcon} className={`${data.type === 'post' ? '' : 'w--15'}`} />
                      {data.type !== 'post' ? <span className="tabs-item__title">Tin nội bộ</span>
                        : <span className="tabs-item__title-active">Tin nội bộ</span>}
                    </div>
                  </Tooltip>
                  {data.type !== 'todo' && data.type !== 'post' && <div className="border-right-tabs"></div>}
                </div>
              </Col>
              <Col className="gutter-row" style={colStyles}>
                <div
                  className={`tabs-wrapperr__item ${data.type === 'todo' ? 'selected' : ''
                    }`}
                  onClick={() => changeType('todo')}
                  style={{ borderRight: 'none' }}
                >
                  {/* {data.type !== 'todo' && data.type !== 'post' && <div className="border-left-tabs"></div>} */}
                  <Tooltip title="To Do">
                    <div className="tabs-item">
                      <img src={data.type === 'todo' ? TodoActiveIcon : TodoIcon} className={`${data.type === 'todo' ? '' : 'w--15'}`} />
                      {data.type !== 'todo' ? <span className="tabs-item__title">To do</span>
                        : <span className="tabs-item__title-active">To do</span>}
                    </div>
                  </Tooltip>
                  {data.type !== 'todo' && data.type !== 'event' && <div className="border-right-tabs"></div>}
                </div>
              </Col>
              <Col className="gutter-row" style={colStyles}>
                <div
                  className={`tabs-wrapperr__item ${data.type === 'event' ? 'selected' : ''
                    }`}
                  onClick={() => changeType('event')}
                >
                  {/* {data.type !== 'todo' && data.type !== 'event' && <div className="border-left-tabs"></div>} */}
                  <Tooltip title="Sự kiện">
                    <div className="tabs-item">
                      <img src={data.type === 'event' ? EventActiveIcon : EventIcon} className={`${data.type === 'event' ? '' : 'w--15'}`} />
                      {data.type !== 'event' ? <span className="tabs-item__title">Sự kiện</span>
                        : <span className="tabs-item__title-active">Sự kiện</span>}
                    </div>
                  </Tooltip>
                  {data.type !== 'event' && data.type !== 'calendar' && <div className="border-right-tabs"></div>}
                </div>
              </Col>
              <Col className="gutter-row" style={colStyles}>
                <div
                  className={`tabs-wrapperr__item ${data.type === 'calendar' ? 'selected' : ''
                    }`}
                  onClick={() => changeType('calendar')}
                  style={{ borderRight: 'none' }}
                >
                  {/* {data.type !== 'event' && data.type !== 'calendar' && <div className="border-left-tabs"></div>} */}
                  <Tooltip title="Lịch">
                    <div className="tabs-item">
                      <img src={data.type === 'calendar' ? CalendarActiveIcon : CalendarIcon} className={`${data.type === 'calendar' ? '' : 'w--15'}`} />
                      {data.type !== 'calendar' ? <span className="tabs-item__title">Lịch</span>
                        : <span className="tabs-item__title-active">Lịch</span>}
                    </div>
                  </Tooltip>
                  {data.type !== 'calendar' && data.type !== 'group' && <div className="border-right-tabs"></div>}
                </div>
              </Col>
              <Col className="gutter-row" style={colStyles}>
                <div
                  className={`tabs-wrapperr__item ${data.type === 'group' ? 'selected' : ''
                    }`}
                  onClick={() => changeType('group')}
                  style={{ borderRight: 'none' }}
                >
                  {/* {data.type !== 'calendar' && data.type !== 'group' && <div className="border-left-tabs"></div>} */}
                  <Tooltip title="Nhóm">
                    <div className="tabs-item">
                      <img src={data.type === 'group' ? GroupActiveIcon : GroupIcon} className={`${data.type === 'group' ? '' : 'w--15'}`} />
                      {data.type !== 'group' ? <span className="tabs-item__title">Nhóm</span>
                        : <span className="tabs-item__title-active">Nhóm</span>}
                    </div>
                  </Tooltip>
                  {/* {data.type !== 'group' && data.type !== 'vote' && <div className="border-right-tabs"></div>} */}
                </div>
              </Col>
              {/* <Col className="gutter-row" style={colStyles}>
                <div
                  className={`tabs-wrapperr__item ${data.type === 'vote' ? 'selected' : ''
                    }`}
                  onClick={() => changeType('vote')}
                  style={{ borderRight: 'none' }}
                >
              
                  <Tooltip title="Khảo sát">
                    <div className="tabs-item">
                      <img src={data.type === 'vote' ? PollActiveIcon : PollIcon} className={`${data.type === 'vote' ? '' : 'w--15'}`} />
                      {data.type !== 'vote' ? <span className="tabs-item__title">Khảo sát</span>
                        : <span className="tabs-item__title-active">Khảo sát</span>}
                    </div>
                  </Tooltip>

                </div>
              </Col> */}

            </Row>
          </Space>
        }

      </div>
      <TypeofPosts ref={postRef} type={data.type} changeType={data.changeType} groupId={data.groupId} />
    </div>
  );
};

export default NewPost;
