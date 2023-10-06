import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input, Row, Col, Modal, Drawer } from "antd";
import searchIcon from "../../assets/new/common/tim-kiem.svg";
import SearchComponent from './SearchComponent';
import { SEARCH_TYPE } from "./constant";
import "./styles.scss";

const SearchModal = ({ defaultType, children, groupId, isSearchInGroup, groupName }) => {
  const [search, setSearch] = useState('')
  const [keyWords, setKeyWords] = useState('')
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    setSearch('');
    setKeyWords('');
  }

  const onPressEnter = (e) => {
    if (!search.trim()) return;
    setKeyWords(search.trim());
  };

  const renderTitle = () => (
    <Row gutter={27}>
      <Col lg={8} xl={6} xxl={4} className="search-sidebar">
        <h3>Tìm kiếm</h3>
      </Col>
      <Col xxl={12} xl={16} lg={16} className="search-result-data">
        <Input
          autoFocus
          style={{ width: "300px" }}
          placeholder={isSearchInGroup ? "Tìm kiếm trong nhóm" : "Tìm kiếm"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          suffix={
            <img
              src={searchIcon}
              onClick={onPressEnter}
              style={{ cursor: "pointer" }}
            />
          }
          onPressEnter={onPressEnter}
        />
      </Col>
    </Row>
  );

  const customChildren = React.Children.map(children, child => {
    const cloneChild = React.cloneElement(child, {
      ...child.props,
      onClick: () => setOpen(state => !state)
    });
    return cloneChild;
  })

  return (
    <>
      {customChildren}
      <Drawer
        title={renderTitle()}
        placement="bottom"
        width="100%"
        onClose={onClose}
        visible={open}
        bodyStyle={{ padding: "14px 8px 0px 8px", backgroundColor: "#E9F0F4" }}
        maskStyle={{ backgroundColor: "#272727", opacity: "60%" }}
        className="wrapClassName-search-modal"
        zIndex={20000}
        destroyOnClose
      >
        <SearchComponent keyWords={keyWords} defaultType={defaultType} groupId={groupId} isSearchInGroup={isSearchInGroup} groupName={groupName} />
      </Drawer>
      {/* <Modal
        footer={null}
        destroyOnClose
        title={renderTitle()}
        width="100%"
        visible={open}
        centered
        onCancel={onClose}
        bodyStyle={{ padding: "14px 8px 0px 8px", backgroundColor: "#E9F0F4" }}
        wrapClassName="wrapClassName-search-modal"
        maskStyle={{ backgroundColor: "#272727", opacity: "60%" }}
        zIndex={20000}
      >
        <SearchComponent keyWords={keyWords} defaultType={defaultType} groupId={groupId} isSearchInGroup={isSearchInGroup} groupName={groupName} />
      </Modal> */}
    </>
  );
};

SearchModal.propTypes = {
  defaultType: PropTypes.string,
  children: PropTypes.node,
  groupId: PropTypes.number,
  groupName: PropTypes.string,
  isSearchInGroup: PropTypes.bool
};

SearchModal.defaultProps = {
  defaultType: SEARCH_TYPE.ALL,
  groupId: 0,
  groupName: '',
  isSearchInGroup: false
};

export default SearchModal;
