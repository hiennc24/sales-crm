/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import DetailEvent from '../../social/components/detail-posts/event/DetailEvent';
import './_index.scss';
import noTaskImg from '../../../assets/images/no-task-img.svg';
import BoxLoading from '../../../components/box-loading/BoxLoading';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, getListPosts } from '../../../stores/posts/posts.action';
import NoData from '../../../assets/new/common/no-data.svg';

const size = 10;
const OwnEvents = ({ typeOfContent }) => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const posts = useSelector(state => state.get('posts').posts);
  const loading = useSelector(state => state.get('posts').loading);
  const isLoadMore = useSelector(state => state.get('posts').isLoadMore);

  useEffect(() => {
    if (typeOfContent === 'own') {
      dispatch(getListPosts({ groupId: 0, index: 1, pageSize: size, type: 3, inProfile: true }));
      setPageIndex(pageIndex + 1);
    }
    return () => {
      dispatch(clearData([]));
    };
  }, []);

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
        dispatch(getListPosts({ groupId: 0, index: pageIndex, pageSize: size, type: 3, inProfile: true }));
        setPageIndex(pageIndex + 1);
      }
    } else {
    }
  };
  return <div>
    
    {posts.length == 0 ?
      <div className='no-task' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 450}}>
        <div style={{ textAlign: 'center' }}>
          <img src={NoData} alt='noTask' />
          <p style={{ color: '#414346' }}>Chưa có hoạt động nào</p>
        </div>
      </div> :
      posts.map((item, index) => <DetailEvent key={index} data={item} />)
    }
    {loading &&
      <div className="loading">
        <BoxLoading />
      </div>
    }
  </div>;
};

export default OwnEvents;