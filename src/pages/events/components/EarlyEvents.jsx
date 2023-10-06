/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import DetailEvent from '../../social/components/detail-posts/event/DetailEvent';
import './_index.scss';
import noTaskImg from '../../../assets/images/no-task-img.svg';
import BoxLoading from '../../../components/box-loading/BoxLoading';
import { useDispatch, useSelector } from 'react-redux';
import { selectEventByTime } from '../../../stores/event/event.selector';
import { getEventByTime, clearEvent } from '../../../stores/event/event.action'
import NoData from '../../../assets/new/common/no-data.svg';

const size = 10;
const EarlyEvents = ({ typeOfContent, option, textSearch, isSearch }) => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const posts = useSelector(selectEventByTime);
  const loading = useSelector(state => state.get('event').loading);
  const isLoadMore = useSelector(state => state.get('event').isLoadMore);

  useEffect(() => {
    dispatch(getEventByTime({ key: textSearch, groupId: 0, index: 1, pageSize: size, type: 3, option }));
    setPageIndex(2);
    return () => {
      dispatch(clearEvent());
    };
  }, [option, isSearch]);

  useEffect(() => {
    window.addEventListener("scroll", handle_scroll);
    return () => window.removeEventListener("scroll", handle_scroll);
  }, [loading, posts.length]);

  const handle_scroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom + 10 >= docHeight) {
      if (isLoadMore) {
        dispatch(getEventByTime({ key: textSearch, groupId: 0, index: pageIndex, pageSize: size, type: 3, option }));
        setPageIndex(pageIndex + 1);
      }
    } else {
    }
  };

  return <div>
    { !posts.length || posts.length == 0 ? 
      <div className='no-task' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 450 }}>
        <div style={{ textAlign: 'center' }}>
          <img src={NoData} alt='noTask' />
          <p style={{ color: '#414346' }}>Chưa có hoạt động nào</p>
        </div>
      </div>:
        posts.map((item, index) => <DetailEvent key={index} data={item} />)
    }
    {loading &&
      <div className="loading">
        <BoxLoading />
      </div>
    }
  </div>;
};

export default EarlyEvents;