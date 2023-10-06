import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Menu, Dropdown, Tooltip, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectListGroup, selectIsLoadMore } from '../../Group.selector';
import ModalCreateGroup from '../../../../components/modal-create-group/ModalCreateGroup';
// import BoxLoading from "../../../../components/box-loading/BoxLoading";
import { DownOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { saveToken } from '../../../../stores/global/global.action';
import { getListGroupSuccess, getListGroup, clearListGroup } from '../../Group.action';
// import ModalDeleteGroup from "../modal-confirm-delete/ModalConfirmDelete";
// import { Scrollbars } from 'react-custom-scrollbars';
import './ListGroupSearch.scss';
import Search from '../../../../assets/new/common/tim-kiem.svg'

// import RecentImage from "../../../../assets/images/recent-image.svg";
// import { getUrlImage } from "../../../../utils";
import API from '../../../../services/api';

const ListGroupVertical = (props) => {
  const dispatch = useDispatch();
  const [isShowCreate, toggleShowCreate] = useState(false);
  //   const [isShowConfirm, toggleShowConfirm] = useState(false);
  //   const [groupIdSelected, selectGroupId] = useState();
  // const listGroups = useSelector(selectListGroup());
  //   const [isLoading, setLoading] = useState(false);
  // const [isLoadMore, setLoadMore] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [keySearch, setKeySearch] = useState('');
  const [sortBy, setSortBy] = useState(0);
  const history = useHistory();
  const [cookies] = useCookies(['abizin_token']);
  const user = useSelector((state) => state.get("userProfile").get("profile"));
  const list_sort_by = [
    {
      value: 0,
      label: 'Thứ tự ABC',
    },
  ];

  const [index, setIndex] = useState(1);
  const listGroups = useSelector(selectListGroup());
  const isLoadMore = useSelector(selectIsLoadMore());

  useEffect(() => {
    dispatch(getListGroup({keySearch: '', index: 1, pageSize: 12}));
    setIndex(index + 1);
    return () => {
      dispatch(clearListGroup());
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handle_scroll);
    return () => window.removeEventListener("scroll", handle_scroll);
  }, [listGroups.length]);

  const handle_scroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    // console.log(isLoadMore)
    if (windowBottom + 10 >= docHeight) {
      if (isLoadMore) {
        // console.log('index', index)
        dispatch(getListGroup({keySearch: '', index, pageSize: 12}));
        setIndex(index + 1);
      }
    } else {
    }
  };

  useEffect(() => {
    setKeySearch(props.keySearch || '');
  }, [props.keySearch]);

  // useEffect(() => {
  //   dispatch(saveToken(cookies.abizin_token));
  //   // setLoading(true);
  //   API.group.getListGroup({keySearch: '', index: 1, pageSize: 12}).then((res) => {
  //     if (res?.code === 200) {
  //       if (res.data.length < size) {
  //         setLoadMore(false);
  //       } else {
  //         setPageIndex(pageIndex + 1);
  //         setLoadMore(true);
  //       }
  //       dispatch(getListGroupSuccess(res.data));
  //     }

  //     //   setLoading(false);
  //   });
  // }, [cookies.abizin_token]);

  //   const loadMoreData = () => {
  //     setLoading(true);
  //     API.group.getListGroup("", pageIndex, size).then((res) => {
  //       if (res?.code === 200) {
  //         if (res.data.length < size) {
  //           setLoadMore(false);
  //         } else {
  //           setPageIndex(pageIndex + 1);
  //         }
  //         dispatch(getListGroupSuccess(listGroups.concat(res.data)));
  //       }
  //       setLoading(false);
  //     });
  //   };

  const searchGroup = () => {
    // console.log('search');
    if (keySearch.trim() !== '') {
      history.push(`/group-work?${keySearch.trim()}`);
    } else {
      history.push(`/group-work`);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      searchGroup();
    }
  };

  //   const refeshDataDelete = () => {
  //     var list = listGroups.filter((item) => groupIdSelected !== item.Id);
  //     dispatch(getListGroupSuccess(list));
  //   };

  const refeshDataAdd = (item) => {
    // console.log(item);
    if (!isLoadMore) {
      dispatch(getListGroupSuccess(listGroups.concat([item])));
    }
  };

  //   const menu = (id) => (
  //     <Menu>
  //       <Menu.Item
  //         onClick={() => {
  //           toggleShowConfirm(true);
  //           selectGroupId(id);
  //         }}
  //       >
  //         Xóa nhóm
  //       </Menu.Item>
  //     </Menu>
  //   );

  const menu = (
    <Menu onClick={(e) => setSortBy(e.key)}>
      {list_sort_by.map((item) => (
        <Menu.Item
          icon={parseInt(sortBy) === item.value && <DownOutlined />}
          key={item.value}
        >
          <a>{item.label}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  var lableSelected = list_sort_by[parseInt(sortBy)].label;

  return (
    <div style={{ paddingRight: 20 }}>
      {props.isShowSearch && <Row align="middle" className="mb--10">
        <Col span={24} md={12}>
          <Input
            className='group-input-search'
            placeholder='Tìm kiếm nhóm'
            onChange={(e) => setKeySearch(e.target.value)}
            onKeyDown={handleEnterKey}
            value={keySearch}
            suffix={
              <Tooltip title='Tìm kiếm'>
                <img src={Search} />
              </Tooltip>
            }
          />
        </Col>
        <Col span={24} md={12}>
          <div className='fillter-group'>
            {props.isSearchPage && (
              <Dropdown overlay={menu} overlayClassName='name-wrapper__tag'>
                <a
                  className='sort-by-dropdown'
                  onClick={(e) => e.preventDefault()}
                >
                  SẮP XẾP THEO: {lableSelected} <CaretDownOutlined />
                </a>
              </Dropdown>
            )}
            {/* <Button
              className='btn-add-group-work'
              type='primary'
              block
              size="small"
              onClick={() => toggleShowCreate(true)}
            >
              + Thêm nhóm
            </Button> */}
            {/* <button
              className='btn-add-group-work'
              size="small"
              onClick={() => toggleShowCreate(true)}
            >
              + Thêm nhóm
            </button> */}
          </div>
        </Col>
      </Row>}

      {/* <div className="recent-news-title">
                <span className="recent-text">Cập nhật mới nhất</span>
                <NavLink to={'/group-work'} className="recent-all">Xem tất cả nhóm</NavLink>
            </div> */}
      {/* <div className="recent-news-list">

                {listGroups.map((item, key) => (
                    <div className="recent-news-item" key={key}>
                        <Row>
                            <Col span={22}>
                                <NavLink to={"/group-work/" + item.Id} >
                                    <Row>
                                        <Col span={5} className="d-flex align-items-center">
                                            <Image className="recent-news-image" preview={false}
                                                src={item.Avatar && item.Avatar !== "" ? getUrlImage(35, 35, item.Avatar) : RecentImage}
                                            />
                                        </Col>
                                        <Col span={19}>
                                            <div className="recent-news-info">
                                                <a href={"/group-work/" + item.Id} className="group-name">{item.Name}</a>
                                                <p className="truncate">{item.Employee?.length + 1} thành viên</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </NavLink>
                            </Col>
                            {user.Id === item.Admin && <Col span={2}>
                                <div className="recent-news-action">
                                    <Dropdown overlay={() => menu(item.Id)}>
                                        <a className="btn-more-square">
                                            <EllipsisOutlined />
                                        </a>
                                    </Dropdown>
                                </div>
                            </Col>}
                        </Row>
                    </div>
                ))}
                {isLoading &&
                    <div className="loading">
                        <BoxLoading />
                    </div>}
                {isLoadMore &&
                    <div className="see-more" onClick={loadMoreData}>
                        <button className="btn-see-more">Xem thêm</button>
                    </div>}
                    
            </div>
             */}
      {/* {
        isShowCreate &&
        <ModalCreateGroup
          isShow={isShowCreate}
          onToggle={() => toggleShowCreate(false)}
          refeshData={refeshDataAdd}
          user={user}
        />
      } */}
      
      {/* <ModalDeleteGroup
        isShow={isShowConfirm}
        onToggle={() => toggleShowConfirm(false)}
        groupId={groupIdSelected}
        refeshData={refeshDataDelete}
      /> */}
    </div>
  );
};

ListGroupVertical.propTypes = {
  keySearch: PropTypes.string,
  isSearchPage: PropTypes.boolean,
  isShowSearch: PropTypes.boolean,
};
ListGroupVertical.defaultProps = {
  isShowSearch: true,
}
export default ListGroupVertical;
