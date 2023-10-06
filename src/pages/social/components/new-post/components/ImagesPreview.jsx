/* eslint-disable react/prop-types */
import React from 'react';
// import AddImg from '../../../../../assets/new/common/them-anh.svg';
// import DeteleImg from '../../../../../assets/new/common/delete-img.svg';
import DeteleImg from '../../../../../assets/new/create-post/close2.svg';
import AddImg from '../../../../../assets/new/create-post/img-active.svg';


import '../NewPost.scss';
import { Tooltip } from 'antd';

const ImagesPreview = ({ imagesPreview, handleDeleteImage, isShowAddImg = true, htmlFor = 'imageInput' }) => {

  return (
    <>
      {isShowAddImg && <label htmlFor={htmlFor} className='add-more-image-btn'>
        <img src={AddImg} alt='Icon' />
        <p style={{ fontSize: 12, marginTop: 6, color: '#32A1C8' }}>Thêm ảnh</p>
      </label>}
      {imagesPreview.map((img, index) => (
        <div className='image-preview-wapper' key={index}>
          {img.type.includes('image') ? <img
            src={URL.createObjectURL(img)}
            alt={img.name}
            className='image-preview'
          />
            : <video width="137" controls alt={img.name} type={img.type}>
              <source src={URL.createObjectURL(img)} />
            </video>
          }
          <Tooltip placement='top' title={'Xóa'} className="emoji-control">
            <img
              src={DeteleImg}
              alt='close'
              onClick={() => {
                handleDeleteImage(img, index);
              }}
            />
          </Tooltip>

        </div>
      ))}

    </>
  );
};

export default ImagesPreview;
