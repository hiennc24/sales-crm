import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, Menu, Dropdown, Image, Tooltip } from 'antd';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { selectListGroup } from '../../Group.selector';
import ModalCreateGroup from '../../../../components/modal-create-group/ModalCreateGroup';
import BoxLoading from '../../../../components/box-loading/BoxLoading';
import { useCookies } from 'react-cookie';
import { saveToken } from '../../../../stores/global/global.action';
import { getListGroupSuccess } from '../../Group.action';
import ModalDeleteGroup from '../modal-confirm-delete/ModalConfirmDelete';
// import { Scrollbars } from 'react-custom-scrollbars';
import './ListGroupVertical.scss';

import Search from '../../../../assets/new/common/tim-kiem.svg'

import RecentImage from '../../../../assets/images/recent-image.svg';
import { getUrlImage } from '../../../../utils';
import API from '../../../../services/api';
const size = 15;
const ListGroupVertical = (props) => {
  const dispatch = useDispatch();
  const [isShowCreate, toggleShowCreate] = useState(false);
  const [isShowConfirm, toggleShowConfirm] = useState(false);
  const [groupIdSelected, selectGroupId] = useState();
  const listGroups = useSelector(selectListGroup());
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [keySearch, setKeySearch] = useState('');
  const history = useHistory();
  const [cookies] = useCookies(['abizin_token']);
  // const user = useSelector((state) => state.get('userProfile').get('profile'));

  useEffect(() => {
    setKeySearch(props.keySearch || '');
  }, [props.keySearch]);

  useEffect(() => {
    // dispatch(saveToken(cookies.abizin_token));
    setLoading(true);
    API.group.getListGroup({ keySearch: '', index: 1, pageSize: size }).then((res) => {
      if (res?.code === 200) {
        if (res.data.length < size) {
          setLoadMore(false);
        } else {
          setPageIndex(pageIndex + 1);
          setLoadMore(true);
        }
        dispatch(getListGroupSuccess(res.data));
      }

      setLoading(false);
    });
  }, [cookies.abizin_token]);

  const loadMoreData = () => {
    setLoading(true);
    API.group.getListGroup({ keySearch: '', index: pageIndex, pageSize: size }).then((res) => {
      if (res?.code === 200) {
        if (res.data.length < size) {
          setLoadMore(false);
        } else {
          setPageIndex(pageIndex + 1);
        }
        dispatch(getListGroupSuccess(listGroups.concat(res.data)));
      }
      setLoading(false);
    });
  };

  const searchGroup = () => {
    console.log('search');
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

  const refeshDataDelete = () => {
    var list = listGroups.filter((item) => groupIdSelected !== item.Id);
    dispatch(getListGroupSuccess(list));
  };

  const refeshDataAdd = (item) => {
    console.log(item);
    if (!isLoadMore) {
      dispatch(getListGroupSuccess(listGroups.concat([item])));
    }
  };

  const menu = (id) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          toggleShowConfirm(true);
          selectGroupId(id);
        }}
      >
        Xóa nhóm
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='list-group-vertical'>
      <Input
        className='group-input'
        placeholder='Tìm kiếm'
        onChange={(e) => setKeySearch(e.target.value)}
        onKeyDown={handleEnterKey}
        value={keySearch}
        prefix={
          <Tooltip title='Tìm kiếm'>
            <img src={Search} onClick={() => searchGroup()} />
          </Tooltip>
        }
      />
      {/* <Button className="btn-add-group-work" type="primary" block onClick={() => toggleShowCreate(true)}>
                Tạo nhóm mới
            </Button> */}
      <div className='recent-news-title'>
        <span className='recent-text'>Nhóm làm việc</span>
        <NavLink to={'/group-work'} className='recent-all'>
          Xem tất cả
        </NavLink>
      </div>
      <div className='recent-news-list'>
        {listGroups.map((item, key) => (
          <div className='recent-news-item' key={key}>
            <Row>
              <Col span={22}>
                <NavLink to={'/group-work/' + item.Id}>
                  <Row>
                    <Col span={5} className='d-flex align-items-center'>
                      <Image
                        className='recent-news-image'
                        preview={false}
                        src={
                          item.Avatar && item.Avatar !== ''
                            ? getUrlImage(35, 35, item.Avatar)
                            : RecentImage
                        }
                      />
                    </Col>
                    <Col span={19}>
                      <div className='recent-news-info'>
                        <a
                          href={'/group-work/' + item.Id}
                          className='group-name'
                        >
                          {item.Name}
                        </a>
                        {/* <p className="truncate">{item.Employee?.length + 1} thành viên</p> */}
                        <p className='new-post'>1 bài đăng mới</p>
                      </div>
                    </Col>
                  </Row>
                </NavLink>
              </Col>
              {props.user.Id === item.Admin && (
                <Col span={2}>
                  <div className='recent-news-action'>
                    <Dropdown overlay={() => menu(item.Id)}>
                      <a className='btn-more-square'>
                        <EllipsisOutlined />
                      </a>
                    </Dropdown>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        ))}
        {isLoading && (
          <div className='loading'>
            <BoxLoading />
          </div>
        )}
        {isLoadMore && (
          <div className='see-more' onClick={loadMoreData}>
            <button className='btn-see-more'>Xem thêm</button>
          </div>
        )}
      </div>
      {
        isShowCreate && 
        <ModalCreateGroup
        isShow={isShowCreate}
        onToggle={() => toggleShowCreate(false)}
        refeshData={refeshDataAdd}
        user={props.user}
      />
      }
     
      <ModalDeleteGroup
        isShow={isShowConfirm}
        onToggle={() => toggleShowConfirm(false)}
        groupId={groupIdSelected}
        refeshData={refeshDataDelete}
      />
    </div>
  );
};

ListGroupVertical.propTypes = {
  keySearch: PropTypes.string,
  user: PropTypes.object
};

export default ListGroupVertical;
