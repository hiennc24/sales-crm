import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import LayoutMain from '../../components/LayoutMain';
import ListGroupGrid from './components/list-group-grid/ListGroupGrid';
import ListGroupSearch from './components/list-group-search/ListGroupSearch';

// import Scrollbars from "react-custom-scrollbars";
// import ChatBox from "../social/components/chat-box/ChatBox";
// import { DownOutlined } from "@ant-design/icons";
import './GroupWork.scss';
import SearchGroup from './components/group-search/SearchGroup';
import SideBar from '../../components/sidebar';
// import apis from "../../services/api";

const GroupWork = (props) => {
  const keySearch = props.location.search.substring(
    1,
    props.location.search.length
  );

  let isSearchPage = !keySearch || keySearch.length === 0;

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

  return (
    <LayoutMain>
      <div className='common--layout'>
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
            <SideBar title="Group" />
        </div>
        <div className={`common--layout__main--full ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <div className='group-work'>
            <ListGroupSearch
              isSearchPage={isSearchPage}
              keySearch={keySearch}
            />
            {isSearchPage ? (
              <ListGroupGrid />
            ) : (
              <SearchGroup keySearch={keySearch} />
            )}
          </div>
        </div>
      </div>
    </LayoutMain>
  );
};

GroupWork.propTypes = {
  location: PropTypes.object,
};

export default GroupWork;
