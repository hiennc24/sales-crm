/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DatePicker, Tooltip, Dropdown, Menu, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { TagsModal, LocationModal } from './index';

import '../NewPost.scss';

import Image from '../../../../../assets/new/create-post/img.svg';
import File from '../../../../../assets/new/create-post/tai-len.svg';
import Location from '../../../../../assets/new/create-post/place.svg';
import HashTag from '../../../../../assets/new/create-post/tasg.svg';
import PostIcon from '../../../../../assets/new/create-post/post-icon.svg';
import SendMail from '../../../../../assets/new/create-post/send-mail.svg';
import PinIcon from '../../../../../assets/new/create-post/pin.svg';
import Tag from '../../../../../assets/new/create-post/tag.svg';
import Calendar from '../../../../../assets/new/create-post/calendar.svg';
import ClickOutside from '../../../../../components/click-outside/ClickOutside';
import ToolAttachIcon from '../../../../../assets/new/create-post/add-file.svg';
const PostFooter = ({
  handleUploadImages,
  handleUploadFiles,
  setShowLocationModal,
  setPriority,
  priority,
  showLocationModal,
  tags,
  setTags,
  location,
  setLocation,
  isEditType,
  setTimeCreate,
  content,
  imagesPreview,
  filesPreview,
  handleSubmit,
  type,
  isCloseCalendar,
  setIsCloseCalendar,
  timeCreatePost,
  disabled,
  setIsOpenSelectTo,
  handleCancel,
}) => {
  // const [isShowDate, setIsShowDate] = useState(timeCreatePost? true: false)
  // const [publicDate, setPublicDate] = useState();
  const [isHoverSelect, setIsHoverSelect] = useState(false)
  const handleSelectPriority = (value) => {
    if (value === 4) {
      setPriority(null);
    }
    else {
      setPriority(value);
    }
  }
  const [isOpenModalCalendar, setIsOpenModalCalendar] = useState(false);
  // console.log(isShowDate)

  // useEffect(() => {
  //   setIsShowDate(false)
  // }, [isCloseCalendar])
  const priorityMenu = (
    <Menu
    // onClick={(e) => {setPriority(+e.key);}}
    // selectedKeys={[priority]}
    // onClick={(e) => setPrivacy(list_privacy[parseInt(e.key)])}
    >
      <Menu.Item key={0}>
        <a className="item-priority hot">
          <span className="label-priority-post">Quan trọng</span>
        </a>
      </Menu.Item>
      <Menu.Item key={1}>
        <a className="item-priority warn">
          <span className="label-priority-post">Chú ý</span>
        </a>
      </Menu.Item>
      <Menu.Item key={2}>
        <a className="item-priority care">
          <span className="label-priority-post">Lưu tâm</span>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='post-footerr'>
      <div className='button-wrapper'>
        <div className='feature-buttons'>
          <div className='buttons-wrapperr'>
            <>
              {(type !== 'vote' && type !== 'task' && !isEditType) && <><div>
                <label htmlFor='imageInput' style={{ display: 'flex', alignItems: 'center' }}>
                  <Tooltip placement='top' title='Ảnh/Video'>
                    <img src={Image} alt='imageIcon' className="mr--12" />
                  </Tooltip>
                </label>
                <input
                  type='file'
                  name='image'
                  id='imageInput'
                  hidden={true}
                  multiple
                  onChange={handleUploadImages}
                />
              </div>
                <div>
                  <label htmlFor='fileInput'>
                    <Tooltip placement='top' title='Files'>
                      <img src={ToolAttachIcon} alt='fileInput' className="mr--12 mb--3" />
                    </Tooltip>
                  </label>
                  <input
                    type='file'
                    name='file'
                    id='fileInput'
                    multiple
                    onChange={(e) => handleUploadFiles(e)}
                  />
                </div>
              </>}

              {(type !== 'vote' && type !== 'task' && isEditType) && <div>
                <label htmlFor='imageInputEdit'>
                  <Tooltip placement='top' title='Ảnh/Video'>
                    <img src={Image} alt='imageIcon' className="mr--12" />
                  </Tooltip>
                </label>
                <input
                  type='file'
                  name='image'
                  id='imageInputEdit'
                  multiple
                  onChange={handleUploadImages}
                />
              </div>}

              {(type !== 'vote' && type !== 'task' && isEditType) &&
                <div>
                  <label htmlFor='fileInput'>
                    <Tooltip placement='top' title='Files'>
                      <img src={ToolAttachIcon} alt='fileInput' className="mr--12" />
                    </Tooltip>
                  </label>
                  <input
                    type='file'
                    name='file'
                    id='fileInput'
                    multiple
                    onChange={(e) => handleUploadFiles(e)}
                  />
                </div>}

              {/* {(type !== 'vote' && type !== 'task' && !isEditType) &&
                <div>
                  <label htmlFor='fileInputEdit'>
                    <Tooltip placement='top' title='Files'>
                      <img src={File} alt='fileInput' className="mr--35" />
                    </Tooltip>
                  </label>
                  <input
                    type='file'
                    name='file'
                    id='fileInputEdit'
                    multiple
                    onChange={(e) => handleUploadFiles(e)}
                  />
                </div>} */}
            </>
            {/* <Tooltip placement='top' title='Gắn thẻ người khác'>
              <img
                src={Tag}
                alt='addUserIcon'
                onClick={() => setShowTagModal(true)}
                className="mr--35"
              />
            </Tooltip> */}
            {(type !== 'vote' && type !== 'task') && <Tooltip placement='top' title='Check in'>
              <img
                src={Location}
                alt='locationIcon'
                onClick={() => setShowLocationModal(true)}
                className="mr--12"
              />
            </Tooltip>}
            {!isCloseCalendar ? (
              <Tooltip placement="topRight" title="Đặt lịch đăng">
                <img className="footer-icon mr--12" src={Calendar} alt="locationIcon" onClick={() => { setIsCloseCalendar(true); setIsOpenModalCalendar(true) }} />
              </Tooltip>
            ) : (
              <DatePicker
                onChange={(date) => { setTimeCreate(date); setIsOpenModalCalendar(false) }}
                className="schedule-button"
                placeholder="Đặt lich đăng"
                suffixIcon={<img className="footer-icon" src={Calendar} alt="locationIcon" />}
                style={{ marginRight: '10px' }}
                disabledDate={(current) => current && current < moment()}
                format="DD-MM-YYYY"
                value={timeCreatePost}
                autoFocus
                open={isOpenModalCalendar}
                onClick={() => { setIsOpenModalCalendar(true) }}
                onBlur={() => {
                  if (!timeCreatePost) setIsCloseCalendar(false);
                  setIsOpenModalCalendar(false)
                }}
              />
            )
            }
            <Tooltip placement="topRight" title="Gắn thẻ người khác">
              <img className="footer-icon mr--12" src={HashTag} alt="addUserIcon" onClick={() => setIsOpenSelectTo(true)} />
            </Tooltip>
            <Select
              // onClick={() => resizeDropdownBox()}
              value={priority} style={{ borderRadius: '100px' }} className={`priority-select 
              ${priority === 1 ? 'selected-priority hot' : priority === 2 ? 'selected-priority warning' : priority === 3 ? 'selected-priority success' : ''}
              ${isHoverSelect ? "onhover" : ""} `}
              onChange={(e) => { handleSelectPriority(e) }}
              placeholder="Mức ưu tiên"
              onMouseEnter={() => setIsHoverSelect(true)}
              onMouseLeave={() => setIsHoverSelect(false)}
            >
              <Select.Option value={1}>
                <div className='item-dropdown-select'>
                  <div className="square hot"></div>
                  <span className='text-select'>Quan trọng</span>
                </div>
              </Select.Option>
              <Select.Option value={2}>
                <div className='item-dropdown-select'>
                  <div className="square warn"></div>
                  <span className='text-select'>Chú ý</span>
                </div>
              </Select.Option>
              <Select.Option value={3}>
                <div className='item-dropdown-select'>
                  <div className="square success"></div>
                  <span className='text-select'>Lưu tâm</span>
                </div>
              </Select.Option>
              <Select.Option value={4}>
                <div className='item-dropdown-select'>
                  <div className="square blank"></div>
                  <span className='text-select'>Không</span>
                </div>
              </Select.Option>
            </Select>

            <LocationModal
              showLocationModal={showLocationModal}
              setShowLocationModal={setShowLocationModal}
              location={location}
              setLocation={setLocation}
            />
          </div>
        </div>
        <div className="row-reverse">

          {type === 'vote' && disabled &&
            <button
              className='post-button'
              onClick={handleSubmit}
            >
              <img src={PostIcon} />
              Post
            </button>}
            {type === 'vote' && !disabled &&
            <button
              disabled={disabled}
              className='post-button'
              onClick={handleSubmit}
            >
              <img src={PostIcon} />
              Post
            </button>}
          {type !== 'vote' &&
            <button
              disabled={disabled}
              className={`post-button ${disabled
                ? 'disable-post-button'
                : ''
                }`}
              onClick={handleSubmit}
            >
              <img src={PostIcon} />
              Post
            </button>}
          <div className="s-post-button">S-Post</div>
          <div className="send-mail">
            <img src={SendMail} />
            Send Mail
          </div>
          <div className="s-post-button" onClick={handleCancel}>Hủy</div>
          {/* <div className="pin-button">
            <img src={PinIcon} />
            PIN
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
