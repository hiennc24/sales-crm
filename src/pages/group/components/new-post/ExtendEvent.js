/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Row, Col, Input, Divider, Tooltip } from "antd";
import iconDelete from "../../../../assets/new/common/delete.svg";
import upload from "../../../../assets/new/event/upload.svg";
import imgPost from "../../../../assets/new/event/img-post.svg";
import GGMap from "./gg-map/Map";
import { TagsModal, LocationModal } from '../../../social/components/new-post/components/index';
import FilePreview from '../../../social/components/new-post/components/FilePreview';
import ImagesPreview from '../../../social/components/new-post/components/ImagesPreview';
import "./NewPost.scss";
import Location from '../../../../../src/assets/new/create-post/dia-diem.svg';

const ExtendEvent = ({ setLocation, location, listCheck, setListCheck, content, title, isEditType,handleUploadFile }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [filesEvent, setFilesEvent] = useState([]);
  const [isValidImage, setIsValidImage] = useState(true);
  const [coverImage, setCoverImage] = useState([]);
  const handleDelFile = (fileDel) => {
    const newFilesList = filesEvent.filter((file) => file !== fileDel);
    setFilesEvent(newFilesList);
  }

  const handleUploadFiles = (event) => {
    let fileNew = event.target.files[0]

    fileNew.typeFile = 'document'

    setFilesEvent([...filesEvent, ...[fileNew]]);


  };
  const onChange = (index, type, value) => {
    let newItem = { ...listCheck[index] };
    newItem[type] = value;
    const newList = listCheck.map((item, i) => {
      if (index == i) return newItem;
      return item
    })
    setListCheck(newList);
  }
  const handleUploadImages = (event) => {
    let checkIsValidImages = true;
    let validImage = coverImage.slice();
    for (let image of event.target.files) {
      if (
        !['png', 'jpg', 'jpeg', 'gif'].includes(image.type.split('/')[1]) ||
        image.size > 1024 * 1024 * 5
      ) {
        checkIsValidImages = false;
      } else {
        image.typeFile = 'image'
        validImage.push(image);
      }
    }
    setIsValidImage(checkIsValidImages);
    setCoverImage(validImage);
  };
  const handleDeleteImage = (img, index) => {
    setCoverImage(coverImage.filter((img, i) => i !== index));
  };
  return (
    <div className="extend-event mt--30">
      <h5 className="title">Check list</h5>
      {
        listCheck.length !== 0 &&
        <Row gutter={[18, 10]}>
          <Col span={13}>
            <div className="content-title">Nội dung</div>
          </Col>
          <Col span={5}>
            <div className="content-title">Thời gian</div>
          </Col>
          <Col span={5}>
            <div className="content-title">Phụ trách</div>
          </Col>

        </Row>
      }
      {
        listCheck.length !== 0 &&
        listCheck?.map((item, index) => (
          <Row gutter={[18, 10]} key={index} className="content-checklist">
            <Col span={13}>
              <Input className="input-event" onChange={(e) => onChange(index, 'content', e.target.value)} />
            </Col>
            <Col span={5}>
              <Input className="input-event" onChange={(e) => onChange(index, 'time', e.target.value)} />
            </Col>
            <Col span={5}>
              <Input className="input-event" onChange={(e) => onChange(index, 'curator', e.target.value)} />
            </Col>

            <Col span={1} className="delete-action">
              <img src={iconDelete} alt="" onClick={() => {
                setListCheck(listCheck.filter((v, i) => i != index))
                handleDelFile(index)
              }} />
            </Col>
          </Row>
        ))
      }
      <div style={{ textAlign: 'right', marginTop: '30px', display: 'flex', justifyContent: 'flex-start' }}>
        <button className="btn-add-check-list" onClick={() => setListCheck([...listCheck, { content: '', time: '', curator: '', file: '' }])}>Thêm</button>
      </div>
      <Divider className="divider-space" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <h5 className="title mr--32">Địa chỉ </h5>
        <input
          style={{ flex: 1, backgroundColor: 'rgba(65, 67, 70, 0.05)' }}
          // placeholder='Địa chỉ'
          className="post-input-event event-name-input"
        />
      </div>
      <Divider className="divider-space-after" />
      <h5 className="title">Check in <Tooltip placement='top' title='Check in'>
        <img
          src={Location}
          alt='locationIcon'
          onClick={() => setShowLocationModal(true)}
          className="mr--35"
        />
      </Tooltip></h5>
      {location && (
        <div>
          <Row align='middle' justify='end'>
            <Col>
              <div
                onClick={() => setLocation(null)}
                style={{
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  borderRadius: 5,
                  fontSize: 12,
                }}
                className='cursor--pointer mb--5'
              >
                Xóa bản đồ
              </div>
            </Col>
          </Row>
          <GGMap lat={location?.position?.lat} lng={location?.position?.lng} />
        </div>
      )}
      <Divider className="space-bonus" />
      <h5 className="title">Thông tin bổ sung</h5>
      <textarea
        // placeholder="Thông tin bổ sung"
        className="post-input-event"
        style={{ backgroundColor: 'rgba(65, 67, 70, 0.05)' }}
        rows={3}
        onChange={(e) => {}}
      />
      <Divider className="space-bonus" />
      <Row gutter={30}>
        <Col span={6}>
          <h5 className="title">Ảnh bìa sự kiện</h5>
        </Col>
        <Col span={18}>
          {coverImage.length !== 0 && (
            <div className='images-preview-wrapper'>
              {coverImage.length !== 0 && (
                <ImagesPreview
                  imagesPreview={coverImage}
                  handleDeleteImage={handleDeleteImage}
                  isShowAddImg={false}
                />
              )}
            </div>
          )}
          {coverImage.length === 0 && (
            <div>
              <div className="input-image" onClick={() => document.getElementById('postImage').click()}>
                <img src={imgPost} alt="" />
                <span>Thêm ảnh</span>
              </div>
              <input name="postImage" id="postImage" type="file" hidden onChange={handleUploadImages} />
            </div>
          )}

          {!isValidImage && (
            <p style={{ color: 'red' }}>
              {' '}
              Dung lượng ảnh không vượt quá 5 Mb hoặc định dạng ảnh khác png,
              jpeg, gif.{' '}
            </p>
          )}
        </Col>
      </Row>
      <Divider className="space-final" />
      <Row gutter={30}>
        <Col span={3}><h5 className="title">Tài liệu</h5></Col>
        <Col span={15}>
          <div className="input-file" style={{ marginBottom: '30px' }} onClick={() => document.getElementById(`inputFileEvent`).click()}>
            <img src={upload} alt="" />
          </div>
          <input id="inputFileEvent" hidden type="file" onChange={(event) => { handleUploadFiles(event) }} />
        </Col>
        <Col span={15}>
          {filesEvent.length !== 0 && (
            <FilePreview
              filesPreview={filesEvent}
              handleDeleteFile={handleDelFile}
            />
          )}
        </Col>

      </Row>
      <Divider className="space-final" />
      <div className="final-content">
        <button
          disabled={!content && !title && !coverImage.length && !filesEvent.length && !data.selectedEmployees.length > 0}
          className={`event-button ${!content && !title && !coverImage.length && !filesEvent.length && !data.selectedEmployees.length > 0
            ? 'disable-event-button'
            : ''
            }`}
          onClick={() => handleUploadFile([...coverImage, ...filesEvent])}
        >
          {isEditType ? 'Lưu' : 'Đăng'}
        </button>
      </div>
      <LocationModal
        showLocationModal={showLocationModal}
        setShowLocationModal={setShowLocationModal}
        location={location}
        setLocation={setLocation}
      />
    </div>
  );
};
export default ExtendEvent;
