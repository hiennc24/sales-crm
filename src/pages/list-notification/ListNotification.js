import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import LayoutMain from '../../components/LayoutMain';
import NotificationItem from '../../components/notification-item/NotificationItem';
import './ListNotification.scss';
import PAGES from '../../routes/constants';
import API from '../../services/api';
import Fil from '../../assets/new/noti/bo-loc.svg';
import Setting from '../../assets/new/noti/setting.png';
import SideBar from '../../components/sidebar';
import { useSelector } from 'react-redux';
import EmptyData from '../social/components/detail-posts/post/EmptyData';
import { Col, Row } from 'antd';

const ListNotification = () => {
  const [listNoti, setListNoti] = useState([]);

  const [collapseLevel1, setCollapseLevel1] = useState(true)
  const [collapseLevel2, setCollapseLevel2] = useState(true)
  const collapseLeft = useSelector(state => state.get('global').get('expandCollapseLeft'))
  const collapseRight = useSelector(state => state.get('global').get('expandCollapseRight'))

  useEffect(() => {
    if (collapseLeft && collapseRight) {
      setCollapseLevel1(true)
      setCollapseLevel2(true)
    }
    else if (collapseLeft || collapseRight) {
      setCollapseLevel1(true)
      setCollapseLevel2(false)
    }
    else {
      setCollapseLevel1(false)
      setCollapseLevel2(false)
    }
  }, [collapseLeft, collapseRight])

  useEffect(() => {
    API.notification.getListNoti().then((res) => {
      if (res.code === 200) {
        setListNoti(res.data);
      }
      // countTemp = res;/?
    });
  }, []);

  return (
    <LayoutMain>
      <div className="common--layout">
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <SideBar title="Incom" />
        </div>
        <div
          className={`content-page ${collapseLevel1 ? "level1" : ""} ${collapseLevel2 ? "level2" : ""
            }`}
        >
          <Row >
            <Col xxl={{ span: 12, offset: 6 }} xl={{ span: 16, offset: 4 }} lg={{ span: 16, offset: 4 }}  >
              <div className='list-notification-page'>
                <div className='noti-dropdown'>
                  <div className='noti-dropdown-header'>
                    <h4>Thông báo</h4>
                    <div className='noti-dropdown-header-icon'>
                      {/* <span>
                    <img src={Fil} />
                  </span> */}
                      <span>
                        <Link to={PAGES.setting}>
                          <img src={Setting} />
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className='noti-dropdown-body'>
                    {listNoti &&
                      listNoti.map((item, index) => {
                        return (
                          <NotificationItem
                            key={index}
                            data={item}
                            inPage
                            isRead
                          />
                        );
                      })}
                    {listNoti.length === 0 && (
                      <div>
                        <br />
                        <EmptyData type={'notification'} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

      </div>
    </LayoutMain>
  );
};

ListNotification.propTypes = {};

export default ListNotification;
