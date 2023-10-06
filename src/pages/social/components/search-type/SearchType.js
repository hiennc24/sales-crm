import React, { useState } from "react"
import { Input } from "antd"
import PropTypes from "prop-types";
import "./search-type.scss"
import Search from '../../../../assets/new/common/tim-kiem.svg';
// import { useHistory } from 'react-router-dom';
import SearchModal from '../../../search/SearchModal';
import { SEARCH_TYPE } from '../../../search/constant';

const convertType = (typeList) => {
  if (typeList === 'group') return SEARCH_TYPE.GROUP;
  if (typeList === 'event') return SEARCH_TYPE.EVENT;
  if (typeList === 'post') return SEARCH_TYPE.INTERNAL_NEW;
  return SEARCH_TYPE.ALL;
}

const SearchType = ({ typeList }) => {

  // const [search, setSearch] = useState("");
  // const history = useHistory();

  // const handleKeyDown = (e) => {
  //   if (!search) return;
  //   history.push(`/search-page?q=${search.trim()}`);
  // };

  return (
    <div className="search-type">
      <SearchModal defaultType={convertType(typeList)}>
        <div className="search-type__left">
          <Input
            className="search-type__left--search"
            placeholder='Search'
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            suffix={<img src={Search} />}
          // onPressEnter={handleKeyDown}
          />
        </div>
      </SearchModal>
      <div className="search-type__right">
        <span className="active">All</span>
        <div className="wall"></div>
        <span>Tin của nhóm</span>
        <div className="wall"></div>
        <span>Đã chuyển Task/ To do</span>
      </div>
    </div>
  )
}

SearchType.propTypes = {
  typeList: PropTypes.string,
};

export default SearchType