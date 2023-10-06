import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";
import LayoutMain from "../../components/LayoutMain";
import ResultSearch from "./ResultSearch";
import apis from "../../services/api";
import SideBar from "../../components/sidebar";
import "./styles.scss";
import { Menu, Input, Skeleton, Row, Col, Card } from "antd";
import { useSelector } from "react-redux";
import Search from "../../assets/new/common/tim-kiem.svg";
import {
  EventIcon,
  EventIconActive,
  GroupIcon,
  GroupIconActive,
  IconNews,
  IconNewsActive,
  // IconPoll,
  // IconPollActive,
  PageIcon,
  PageIconActive,
} from "./icon";
import { SEARCH_TYPE } from "./constant";
// icon

const size = 5;

const SearchPage = (props) => {
  const searchParam = new URL(window.location.href);

  const [listPostSearch, setListPostSearch] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("0");
  const [collapseLevel1, setCollapseLevel1] = useState(true);
  const [collapseLevel2, setCollapseLevel2] = useState(true);

  const collapseLeft = useSelector((state) =>
    state.get("global").get("expandCollapseLeft")
  );
  const collapseRight = useSelector((state) =>
    state.get("global").get("expandCollapseRight")
  );
  const [search, setSearch] = useState(
    searchParam.searchParams.get("q") ? searchParam.searchParams.get("q") : ""
  );
  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    const params = qs.parse(location.search.slice(1));
    const keyWord = params.q;
    if (keyWord) {
      if (selectedMenu === SEARCH_TYPE.ALL) {
        setPageIndex(1);
        window.scrollTo(0, 0);
        setIsFull(false);
        setListPostSearch([]);
        getListResultSearch(1, []);
      }
      setSelectedMenu(SEARCH_TYPE.ALL);
    }
    setSearch(keyWord || "");

  }, [location.search]);

  useEffect(() => {
    setPageIndex(1);
    window.scrollTo(0, 0);
    setIsFull(false);
    setListPostSearch([]);
    getListResultSearch(1, []);
  }, [selectedMenu]);

  useEffect(() => {
    if (collapseLeft && collapseRight) {
      setCollapseLevel1(true);
      setCollapseLevel2(true);
    } else if (collapseLeft || collapseRight) {
      setCollapseLevel1(true);
      setCollapseLevel2(false);
    } else {
      setCollapseLevel1(false);
      setCollapseLevel2(false);
    }
  }, [collapseLeft, collapseRight]);

  useEffect(() => {
    window.addEventListener("scroll", handle_scroll);
    return () => window.removeEventListener("scroll", handle_scroll);
  }, [isLoading, listPostSearch.length]);

  const handle_scroll = () => {
    const windowHeight =
      "innerHeight" in window
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
    if (windowBottom >= docHeight) {
      if (!isLoading && !isLoadMore && !isFull) {
        getListResultSearch(pageIndex, listPostSearch);
      }
    }
  };

  function getListResultSearch(page, list) {
    if (page === 1) setLoading(true); else setLoadMore(true);
    let type = selectedMenu;
    let group = "";
    if (type === SEARCH_TYPE.GROUP) {
      group = search;
      type = "";
    }
    apis.posts
      .getListSearch(search, page, size, group, type)
      .then((res) => {
        if (res?.code === 200) {
          console.log("res.data", res);
          if (res.data.length < size) {
            setIsFull(true)
          } else {
            setPageIndex(page + 1);
          }

          if (res.data && res.data.length)
            setListPostSearch(list.concat(res.data));
          // else
          //   alert(
          //     "Chúng tôi không tìm thấy kết quả nào! \nĐảm bảo tất cả các từ đều đúng chính tả hoặc thử từ khóa khác."
          //   );
        }
        setLoading(false);
        setLoadMore(false);

      })
      .catch((err) => {
        setLoading(false);
        setLoadMore(false);
      });
  }

  const onPressEnter = (e) => {
    if (!search.trim()) return;
    setSelectedMenu(SEARCH_TYPE.ALL);
    history.push(`/search-page?q=${search.trim()}`);
  };

  const handleClick = (e) => {
    setSelectedMenu(e.key);
  };

  console.log("search", search);

  return (
    <LayoutMain>
      <div className="common--layout">
        <div
          className={`common--layout__sidebar ${collapseLevel1 ? "level1" : ""
            } ${collapseLevel2 ? "level2" : ""}`}
        >
          <SideBar title="Incom" />
        </div>
        <div
          className={`content-page ${collapseLevel1 ? "level1" : ""} ${collapseLevel2 ? "level2" : ""
            }`}
        >
          <Row gutter={27}>
            <Col lg={8} xl={6} xxl={4} className="search-sidebar">
              <div className="sticky-area">
                <h3>
                  Kết quả tìm kiếm (
                  {listPostSearch && (listPostSearch.length || 0)})
                </h3>
                <div className="search-input">
                  <Input
                    className="search-type__left--search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    suffix={
                      <img
                        src={Search}
                        onClick={onPressEnter}
                        style={{ cursor: "pointer" }}
                      />
                    }
                    onPressEnter={onPressEnter}
                  />
                </div>
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
                    {/* <Menu.Item
                      icon={
                        selectedMenu === SEARCH_TYPE.POLL ? (
                          <IconPollActive />
                        ) : (
                          <IconPoll />
                        )
                      }
                      key={SEARCH_TYPE.POLL}
                    >
                      Khảo sát
                    </Menu.Item> */}
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
              </div>
            </Col>
            <Col xxl={12} xl={16} lg={16} className="search-result-data">
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
                <ResultSearch dataResult={listPostSearch} keySearch={search} />
              )}
              {isLoadMore ? (<div style={{ marginTop: "16px" }}>
                <Card>
                  <Skeleton active />
                </Card>
              </div>) : null}
            </Col>
          </Row>
        </div>
      </div>
    </LayoutMain>
  );
};

SearchPage.propTypes = {
  location: PropTypes.object,
};

export default SearchPage;
