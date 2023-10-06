/* eslint-disable no-unused-vars */
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import { clearData, getListPosts, getPinPost } from '../../../../stores/posts/posts.action';
import { selectListPosts,
         selectInternalPosts,
         selectTodoPosts,
         selectEventPosts,
         selectVotePosts,
       } from '../../../../stores/posts/posts.selector';
import { saveToken } from '../../../../stores/global/global.action';
import DetailEvent from './event/DetailEvent';
import DetailPost from './post/DetailPost';
import NoData from '../../../../assets/new/common/no-data.svg';
import './DetailPosts.scss';
import { useLocation, useParams } from 'react-router-dom';
// import { Spin } from 'antd';
import Skeleton from './post/Skeleton';
import EmptyData from './post/EmptyData';

const DetailPosts = forwardRef((data, ref) => {
  const userInfo = useSelector(state => state.get('userProfile').get('profile'))
  useImperativeHandle(
    ref,
    () => ({
      getData() {
        // dispatch(saveToken(cookies.abizin_token));
        // let payload = {};
        // if (location.pathname === '/profile') {
        //   payload = { groupId: 0, index: 1, pageSize: 5, type: 0, inProfile: true };
        // } else {
        //   payload = { groupId: 0, index: 1, pageSize: 5, type: 0 };
        // }
        // dispatch(getListPosts(payload));
        // setOffset(offset + 1);

        return () => {
          dispatch(clearData());
        };
      }
    }
    )
  )

  const dispatch = useDispatch();
  const { id } = useParams();
  const posts = useSelector(selectListPosts);
  const internalPosts = useSelector(selectInternalPosts);
  const todoPosts = useSelector(selectTodoPosts);
  const eventPosts = useSelector(selectEventPosts);
  const votePosts = useSelector(selectVotePosts);
  const isLoadMore = useSelector((state) => state.get('posts').isLoadMore);
  const isLoading = useSelector((state) => state.get('posts').loadingPosts);
  const [cookies] = useCookies(['abizin_token']);
  const [offset, setOffset] = useState(1);
  const location = useLocation();

  const handleGetListOfPosts = () => {
    const groupId = data.groupId ? data.groupId : 0;
    var index = offset + 1;
    let type = 0
    switch (data.type) {
      case 'post': {
        type = 1;
        break;
      }
      case 'event': {
        type = 3;
        break;
      }
      case 'vote': {
        type = 2;
        break;
      }
    }
    let payload = {};
    if (location.pathname.includes('/profile')) {
      payload = {
        groupId: groupId,
        index: index,
        pageSize: 5,
        type: type,
        key: data.searchKey,
        inProfile: true,
        userId: id,
      };
    } else {
      payload = { groupId: groupId, index: index, pageSize: 5, type: type};
    }
    dispatch(getListPosts(payload));
    setOffset(offset + 1);
  };

  //Update here
  useEffect(() => {
    if (userInfo.Id) {
      dispatch(clearData());

      let type = 0
      switch (data.type) {
        case 'post': {
          type = 1;
          break;
        }
        case 'event': {
          type = 3;
          break;
        }
        case 'vote': {
          type = 2;
          break;
        }
      }

      window.scrollTo(0, 0);
      const groupId = data.groupId ? data.groupId : 0;
      // dispatch(saveToken(cookies.abizin_token));
      let payload = {};
      if (location.pathname.includes('/profile')) {
        payload = { groupId, index: 1, pageSize: 5, type: type, key: data.searchKey, inProfile: true, userId: id, };
      } else {
        payload = { groupId, index: 1, pageSize: 5, type: type };
      }
      setTimeout(function () {
        dispatch(getListPosts(payload));
        setOffset(1);
      }, 200);


      return () => {
        dispatch(clearData());
      };
    }
  }, [location.key, userInfo, data.searchKey]);

  useEffect(() => {
    window.addEventListener('scroll', handle_scroll);
    // const type = (data.type == 'post') ? 1 : ((data.type == 'event') ? 2 : 3);
    return () => window.removeEventListener('scroll', handle_scroll);
  }, [posts.length]);
  useEffect(() => {
  }, [JSON.stringify(posts)]);
  useEffect(() => {
    dispatch(clearData([]));

    let type = 0;
    let loaded = false;
    switch (data.type) {
      case 'todo': {
        type = 0;
        if (todoPosts.length > 0) loaded = true;
        break;
      }
      case 'post': {
        type = 1;
        if (internalPosts.length > 0) loaded = true;
        break;
      }
      case 'event': {
        type = 3;
        if (eventPosts.length > 0) loaded = true;
        break;
      }
      case 'vote': {
        type = 2;
        if (votePosts.length > 0) loaded = true;
        break;
      }
    }

    window.scrollTo(0, 0);
    // dispatch(saveToken(cookies.abizin_token));
    let payload = {};
    const groupId = data.groupId ? data.groupId : 0;
    
    if (location.pathname.includes('/profile')) {
      payload = { groupId, index: 1, pageSize: 5, type: type, key: data.searchKey, inProfile: true, userId: id, loaded };
    } else {
      payload = { groupId, index: 1, pageSize: 5, type: type, loaded };
    }
    dispatch(getListPosts(payload));
    dispatch(getPinPost());

    setOffset(1);
  }, [data.type])

  useEffect(() => {
    return (() => setOffset(1))
  }, [])

  const handle_scroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom + 10 >= docHeight) {
      if (isLoadMore && posts.length > 0) {
        handleGetListOfPosts();
      }
    } else {
    }
  };

  const afterSubmit = () => {
    console.log('ccccc')
    // dispatch(clearData());
    // let payload = {};
    // if (location.pathname === '/profile') {
    //   payload = { groupId: data.groupId, index: 1, pageSize: 5, type: 'vote', inProfile: true };
    // } else {
    //   payload = { groupId: data.groupId, index: 1, pageSize: 5, type: 'vote' };
    // }
    // dispatch(getListPosts(payload));
    // setOffset(2);
  }

  return (
    <>
      {isLoading && posts.length === 0 ? (
        // <Spin size='large' />
        <Skeleton />
      ) : (
        <>
          {posts.length === 0 ? (
            <EmptyData type={data.type} />
          ) : (
            <div>
              {posts.map((post, index) => (
                <div key={index}>
                  {post?.Type == 3 ? (
                    <DetailEvent data={post} />
                  ) : (
                    <DetailPost post={post} index={index} isGroupPage={data.isGroupPage} afterSubmit={afterSubmit} groupId={data.groupId} />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
});

export default DetailPosts;

DetailPosts.displayName = 'DetailPosts'
