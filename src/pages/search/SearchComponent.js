import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ResultSearch from "./ResultSearch";
import apis from "../../services/api";
import { Menu, Input, Skeleton, Row, Col, Card } from "antd";
import {
  EventIcon,
  EventIconActive,
  GroupIcon,
  GroupIconActive,
  IconNews,
  IconNewsActive,
  PageIcon,
  PageIconActive,
} from "./icon";
import { SEARCH_TYPE } from "./constant";
import "./styles.scss";

const size = 10;

const SearchComponent = ({ defaultType, keyWords, groupId, isSearchInGroup, groupName }) => {

  const contentRef = useRef();

  const [listPostSearch, setListPostSearch] = useState([]);
  const [totalRow, setTotalRow] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(defaultType || SEARCH_TYPE.ALL);

  useEffect(() => {
    if (keyWords) {
      getListResultSearch(1, []);
    }
  }, [keyWords, selectedMenu])

  useEffect(() => {
    if (keyWords) {
      setPageIndex(1);
      window.scrollTo(0, 0);
      setIsFull(false);
      setListPostSearch([]);
      setTotalRow(0);
    }
  }, [keyWords]);

  useEffect(() => {
    setPageIndex(1);
    window.scrollTo(0, 0);
    setIsFull(false);
    setListPostSearch([]);
    setTotalRow(0);
  }, [selectedMenu]);

  useEffect(() => {
    if (!isLoading && !loadingMore && isLoadMore && !isFull && keyWords) {
      getListResultSearch(pageIndex, listPostSearch);
    }
  }, [isLoadMore]);


  useEffect(() => {
    const contentDiv = contentRef.current;
    const handle_scroll = (event) => {
      if (contentDiv.scrollTop + contentDiv.clientHeight === contentDiv.scrollHeight) {
        setLoadMore(true);
      }
    };
    if (contentDiv) {
      contentDiv.addEventListener("scroll", handle_scroll);
    }
    return () => contentDiv.removeEventListener("scroll", handle_scroll);
  }, [contentRef]);

  function getListResultSearch(page, list) {
    if (keyWords) {
      if (page === 1) setLoading(true); else setLoadingMore(true)
      let type = selectedMenu;
      let group = "";
      if (type === SEARCH_TYPE.GROUP) {
        group = keyWords;
        type = "";
      }
      if (groupId) {
        group = '';
        type = "";
      }
      apis.posts
        .getListSearch(keyWords, page, size, group, type, groupId)
        .then((res) => {
          if (res?.code === 200) {
            console.log("res.data", res);
            if (res.data.length < size) {
              setIsFull(true)
            } else {
              setPageIndex(page + 1);
            }

            if (res.data && res.data.length) {
              setListPostSearch(list.concat(res.data));
              const data1 = res.data[0];
              const total = data1 ? data1.TotalRow || 0 : 0
              setTotalRow(total)
            }
          }
          setLoading(false);
          setLoadMore(false);
          setLoadingMore(false)

        })
        .catch((err) => {
          setLoading(false);
          setLoadMore(false);
          setLoadingMore(false)
        });
    }
  }


  const handleClick = (e) => {
    setSelectedMenu(e.key);
  };


  return (
    <div className="search-modal">
      <Row gutter={27}>
        <Col lg={8} xl={6} xxl={4} className="search-sidebar">
          <div className="sticky-area">
            <h3>
              Kết quả tìm kiếm {isSearchInGroup ? `trong nhóm "${groupName}"` : ''} (
              {totalRow})
            </h3>
            {!isSearchInGroup ?
              <div className="menu">
                <Menu
                  theme={"light"}
                  onClick={handleClick}
                  style={{ width: "100%" }}
                  selectedKeys={[selectedMenu]}
                  mode="inline"
                >
                  <Menu.Item
                    icon={
                      selectedMenu === SEARCH_TYPE.ALL ? (
                        <PageIconActive />
                      ) : (
                        <PageIcon />
                      )
                    }
                    key={SEARCH_TYPE.ALL}
                  >
                    Tất cả
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      selectedMenu === SEARCH_TYPE.INTERNAL_NEW ? (
                        <IconNewsActive />
                      ) : (
                        <IconNews />
                      )
                    }
                    key={SEARCH_TYPE.INTERNAL_NEW}
                  >
                    Tin nội bộ
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      selectedMenu === SEARCH_TYPE.EVENT ? (
                        <EventIconActive />
                      ) : (
                        <EventIcon />
                      )
                    }
                    key={SEARCH_TYPE.EVENT}
                  >
                    Sự kiện
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      selectedMenu === SEARCH_TYPE.GROUP ? (
                        <GroupIconActive />
                      ) : (
                        <GroupIcon />
                      )
                    }
                    key={SEARCH_TYPE.GROUP}
                  >
                    Nhóm
                  </Menu.Item>
                </Menu>
              </div>
              : null}
          </div>
        </Col>
        <Col xxl={12} xl={16} lg={16} className="search-result-data" ref={contentRef}>
          {isLoading ? (
            <>
              <div style={{ marginTop: "16px" }}>
                <Card>
                  <Skeleton active />
                </Card>
              </div>
              <div style={{ marginTop: "16px" }}>
                <Card>
                  <Skeleton active />
                </Card>
              </div>
              <div style={{ marginTop: "16px" }}>
                <Card>
                  <Skeleton active />
                </Card>
              </div>
            </>
          ) : (
            <ResultSearch dataResult={listPostSearch} keySearch={keyWords} />
          )}
          {loadingMore ? (<div style={{ marginTop: "16px" }} >
            <Card>
              <Skeleton active />
            </Card>
          </div>) : null}
        </Col>
      </Row >
    </div >
  );
};

SearchComponent.propTypes = {
  defaultType: PropTypes.string,
  keyWords: PropTypes.string,
  groupId: PropTypes.number,
  groupName: PropTypes.string,
  isSearchInGroup: PropTypes.bool
};

export default SearchComponent;
