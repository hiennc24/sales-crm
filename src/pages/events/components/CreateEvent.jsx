/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Spin, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { clearEvent, getEvent } from '../../../stores/event/event.action';
import {
  selectEvent,
  selectLoading,
} from '../../../stores/event/event.selector';
import API from '../../../services/api';
import TypeofPosts from '../../social/components/new-post/TypeofPosts';
import EventActive from '../../../assets/new/common/hop-su-kien-active.svg';

//props contain isEditType: boolean(, return true if u want to edit,) and data: data get from backend, if create new, props is null
const CreateEvent = (props) => {
  const location = useLocation();
  const { id } = useParams();
  // const dispatch = useDispatch();
  // const eventData = useSelector(selectEvent());
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    setLoading(true);
    API.posts.getPostEvent(id)
      .then(res => {
        if (res.code === 200) {
          setEvent(res.data);
          setLoading(false);
        }
      })
      .catch(err => console.log('err', err))
  }, []);

  return (
    <div className='create-event-container'>
      {loading ? (
        <Spin style={{ marginBottom: '50px' }} />
      ) : (
        <>
          {/* <div className='tabs-wrapperr'> */}
            {/* <Space size={0}> */}
                {/* <Space>
                  <img src={EventActive} className='w--15' />
                  <span>Họp/Sự kiện</span>
                </Space> */}
            {/* </Space> */}
          {/* </div> */}

          <div 
            className='tabs-wrapperr' 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '40px' 
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 700, opacity: 0.9 }}>
              Chỉnh sửa sự kiện
            </span>
          </div>
          {location.pathname.includes('edit') ? (
            <TypeofPosts
              type='event'
              {...props}
              isEditType={true}
              data={event}
            />
          ) : (
            <TypeofPosts type='event' {...props} />
          )}
        </>
      )}
    </div>
  );
};

export default CreateEvent;
