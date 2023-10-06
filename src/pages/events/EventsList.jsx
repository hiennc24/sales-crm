import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './EventsList.scss';
import { Row, Col, Button, Input, Select } from 'antd';
import EarlyEvents from './components/EarlyEvents';
import OwnEvents from './components/OwnEvents';
import LayoutMain from '../../components/LayoutMain';
import SideBar from '../../components/sidebar';
import CreateEvent from './components/CreateEvent';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../../assets/new/common/tim-kiem.svg';
import ArrowDown from '../../assets/new/common/arrow-down.svg';

const EventsList = () => {
  const location = useLocation();
  const [typeOfContent, setTypeOfContent] = useState(
    location.pathname.includes('edit') ? 'create' : 'early'
  );
  const [selected, setSelected] = useState('all')
  const [textSearch, setTextSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [isExpand, setIsExpand] = useState(false);

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
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    var sideBar = document.querySelector(".common--layout__sidebar")
    var sideBarRight = document.querySelector(".sidebar--layout__right")
    var header = document.querySelector(".header-social")
    var exitIcon = document.querySelector(".exit-icon")
    if (isExpand) {
      sideBar.classList.add("common--layout__sidebar-new")
      sideBarRight.classList.add("sidebar--layout__right-new")
      header.classList.add("header-social-new")
      exitIcon.classList.add("exit-icon-new")
    }
    else {
      sideBar.classList.remove("common--layout__sidebar-new")
      sideBarRight.classList.remove("sidebar--layout__right-new")
      header.classList.remove("header-social-new")
      exitIcon.classList.remove("exit-icon-new")
    }
  }, [isExpand])

  const optionEvent = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Hôm nay', value: 'day' },
    { label: 'Tuần này', value: 'week' },
    { label: 'Tháng này', value: 'month' },
    { label: 'Tháng tới', value: 'nextmonth' },
    { label: 'Sắp diễn ra', value: 'upcoming' },
    { label: 'Sẽ tham gia', value: 'joined' },
    { label: 'Quan tâm', value: 'cared' },
  ];

  const onChange = (e) => {
    setSelected(e)
  }
  const onChangeTextSearch = (e) => {
    setTextSearch(e.target.value)
  }

  return (
    <LayoutMain>
      <div className='common--layout'>
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <SideBar title="Incom" />
        </div>
        <div className={`common--layout__main ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <div className='events-list-content'>
            {['early', 'own'].includes(typeOfContent) && (
              <Row className='search-wrapper'>
                <Col span={4} className='add-event'>
                  <button
                    className='btn-add-group-work'
                    size="small"
                    onClick={() => setTypeOfContent('create')}
                  >
                    + Thêm sự kiện
                  </button>
                </Col>
                <Col span={10} className="event-filter-select">
                  <div className='event-filter'>Bộ lọc</div>
                  <div className='event-select' id='id--select'>
                    <Select
                      getPopupContainer={() =>
                        document.getElementById('id--select')
                      }
                      onChange={onChange}
                      options={optionEvent}
                      defaultValue='all'
                      suffixIcon={<img src={ArrowDown} />}
                    />
                  </div>
                </Col>
                <Col span={10}>
                  <Input
                    className="btn-search"
                    placeholder='Tìm kiếm sự kiện'
                    value={textSearch}
                    onChange={onChangeTextSearch}
                    onPressEnter={() => setIsSearch(!isSearch)}
                    suffix={<img src={Search} />}
                  />
                </Col>
              </Row>
            )}

            {(() => {
              switch (typeOfContent) {
                case 'early':
                  return <EarlyEvents typeOfContent={typeOfContent} option={selected} textSearch={textSearch} isSearch={isSearch} />;

                case 'own':
                  return <OwnEvents typeOfContent={typeOfContent} />;

                case 'create':
                  return <CreateEvent setTypeOfContent={setTypeOfContent} />;

                default:
                  return <EarlyEvents typeOfContent={typeOfContent} option={selected} textSearch={textSearch} isSearch={isSearch} />;
              }
            })()}
          </div>
        </div>
        {['early', 'own'].includes(typeOfContent) && (
          <div className='common--layout__right'>
            <Scrollbars style={{ height: '100%' }}>
              {/* <div className='add-event'>
                <button
                className='btn-add-group-work'
                size="small"
                onClick={() => setTypeOfContent('create')}
              >
                + Thêm sự kiện
              </button>
              </div>
              <div className='event-filter'>Bộ lọc</div>
              <div className='event-select' id='id--select'>
                <Select
                  getPopupContainer={() =>
                    document.getElementById('id--select')
                  }
                  onChange={onChange}
                  options={optionEvent}
                  defaultValue='all'
                  suffixIcon={<img src={ArrowDown} />}
                />
              </div> */}
            </Scrollbars>
          </div>
        )}
      </div>
    </LayoutMain>
  );
};

export default EventsList;
