/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './DPost.scss';
import DetailPost from "../../social/components/detail-posts/post/DetailPost";
import { Col, Row } from 'antd';
import LayoutMain from '../../../components/LayoutMain';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, getComments, clearData } from '../../../stores/posts/posts.action';
import Scrollbars from 'react-custom-scrollbars';
import SideBar from '../../../components/sidebar';
import { useHistory } from 'react-router-dom';

const DPost = ({ postId }) => {
  const dispatch = useDispatch();
  const postData = useSelector(state => state.get('posts').targetPost);
  const history = useHistory();

  const [collapseLevel1, setCollapseLevel1] = useState(true)
  const [collapseLevel2, setCollapseLevel2] = useState(true)
  const collapseLeft = useSelector(state => state.get('global').get('expandCollapseLeft'))
  const collapseRight = useSelector(state => state.get('global').get('expandCollapseRight'))

  useEffect(() => {
    if(collapseLeft && collapseRight){
      setCollapseLevel1(true)
      setCollapseLevel2(true)
    }
    else if(collapseLeft || collapseRight){
      setCollapseLevel1(true)
      setCollapseLevel2(false)
    }
    else {
      setCollapseLevel1(false)
      setCollapseLevel2(false)
    }
  }, [collapseLeft, collapseRight])

  useEffect(() => {
    dispatch(getPost(postId));
  }, [history.location.pathname]);

  return <LayoutMain>
    <div className="common--layout">
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
            <SideBar title="Incom" />
        </div>
        <div className={`common--layout__main--full ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <Row>
            <Col span={3}></Col>
            <Col span={18}>
              {JSON.stringify(postData) !== JSON.stringify({}) && <DetailPost post={postData} index={0} />}
            </Col>
            <Col span={3}></Col>
          </Row >
        </div>
    </div>
  </LayoutMain>
};

export default DPost;