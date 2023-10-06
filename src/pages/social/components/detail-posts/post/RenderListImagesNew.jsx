/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Tooltip, Row, Col } from 'antd';
import { getUrlImage } from '../../../../../utils';

const ListImageViewNew = ({ listImg, isSearch = false }) => {

  const [isVisibleImage, setIsVisibleImage] = useState(false)
  const [number, setNumber] = useState(5)

  const getPercentImg = (index) => {
    if (listImg.length === 1) {
      return "50%"
    } else if (listImg.length === 3) {
      if (index < 2) {
        return "50%"
      }
      return "100%"
    }
    else if (listImg.length === 4) {
      return "50%"
    }
    else if (listImg.length > 4) {
      if (index < 2) {
        return "50%"
      }
      return 100 / 3 + '%'
    }
    var percent = 100 / listImg.length + '%'
    return percent
  }

  const onViewImgMore = () => {
    console.log('view more')
    setIsVisibleImage(true)
  }

  const getMaxHeight = (length, index) => {
    if (!isSearch) {
      if (length === 1) {
        return '';
      }
      return 300;
    }
    else {
      if (length === 1 || length === 2) {
        return 150
      } else if (length === 3) {
        if (index < 2) {
          return 75
        }
        return 75
      }
      else if (length === 4) {
        return 75
      }
      else if (length > 4) {
        if (index < 2) {
          return 75
        }
        return 50
      }
    }
  }

  const getImageWidth = (length, index) => {
    if (!isSearch) {
      if (length === 1) {
        return '';
      }
      else {
        return getPercentImg(index);
      }
    }
    else {
      if (length === 1 || length === 2) {
        return 150
      } else if (length === 3) {
        if (index < 2) {
          return 75
        }
        return 150
      }
      else if (length === 4) {
        return 75
      }
      else if (length > 4) {
        if (index < 2) {
          return 75
        }
        return 50
      }
    }
  }

  return (
    // <div className={`image-preview-group-render ${listImg.length === 1 ||listImg.length === 2  ? 'content-center-img' : ''}`} style={ isSearch ? { width: 150 }: {}}>
    //   <Image.PreviewGroup >
    //     {listImg && listImg.length > 0 && listImg.map((item, index) => {
    //       return <Image
    //         key={index}
    //         className="image-item"
    //         style={{ objectFit: 'cover' }}
    //         hidden={index > 4 ? true : false}
    //         height={listImg.length === 5 ? '' : 300}
    //         width={listImg.length === 5 ? '' : getPercentImg(index)}
    //         src={getUrlImage(0, 0, item.Files)}
    //       />
    //     })}
    //   </Image.PreviewGroup>
    //   {listImg && listImg.length > 5 && <div className="overlay-image" onClick={onViewImgMore}>
    //     <p className='overlay-text'>+{listImg.length - 5}</p>
    //   </div>}
    // </div>


    <div>

      {listImg.length === 1 &&
        <>
          <Image.PreviewGroup >
            <Row gutter={[1, 1]} className="post-img-list" style={{ justifyContent: 'center', display: 'flex' }}>
              <Col span={24} >

                <Image style={{ width: '100%',height: 300, objectFit: 'contain' }} src={getUrlImage(0, 0, listImg[0].Files)} />

              </Col>
            </Row>
          </Image.PreviewGroup>
        </>
      }


      {listImg.length === 2 &&
        <>
          <Image.PreviewGroup >
            <Row gutter={[1, 1]} className="post-img-list">
              <Col span={12} style={{ justifyContent: 'center', display: 'flex', }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[0].Files)} />
              </Col>
              <Col span={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[1].Files)} />
              </Col>
            </Row>
          </Image.PreviewGroup>
        </>
      }

      {listImg.length === 3 &&
        <>
          <Image.PreviewGroup >
            <Row gutter={[1, 1]} className="post-img-list">
              <Col span={12} style={{ justifyContent: 'center', display: 'flex', }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[0].Files)} />
              </Col>
              <Col span={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[1].Files)} />
              </Col>
              <Col span={24} style={{ justifyContent: 'center', display: 'flex' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[2].Files)} />
              </Col>
            </Row>
          </Image.PreviewGroup>
        </>
      }

      {listImg.length === 4 &&
        <>
          <Image.PreviewGroup >
            <Row gutter={[1, 1]} className="post-img-list">
              <Col span={12} style={{ justifyContent: 'center', display: 'flex', }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[0].Files)} />
              </Col>
              <Col span={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[1].Files)} />
              </Col>
              <Col span={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[2].Files)} />
              </Col>
              <Col span={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[3].Files)} />
              </Col>
            </Row>
          </Image.PreviewGroup>
        </>
      }

      {listImg.length >= 5 &&
        <>
          <Image.PreviewGroup >
            <Row gutter={[1, 1]} className="post-img-list">
              <Col span={12} style={{ justifyContent: 'center', display: 'flex', }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[0].Files)} />
              </Col>
              <Col span={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[1].Files)} />
              </Col>
              <Col span={8} style={{ justifyContent: 'center', display: 'flex' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[2].Files)} />
              </Col>
              <Col span={8} style={{ justifyContent: 'center', display: 'flex' }} className="img-container">
                <Image className="img-inner" style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[3].Files)} />
              </Col>
              <Col span={8} style={{ justifyContent: 'center', display: 'flex', position:'relative' }}>
                <Image style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[4].Files)} />
                <div 
                style={{
                  fontSize:40,
                  display: 'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  position:'absolute', 
                  width:'calc(100% - 8px)', height:300, 
                  bottom:0, zIndex:99, 
                  right: 4,
                  backgroundColor:'#000000', 
                  opacity:'0.4',
                  color: '#fff',
                  pointerEvents:'none'
                  }}>+{listImg.length - 5}</div>
              </Col>
              {listImg.map((img, index) => {
                if (index > 4) {
                  return <Image key={index} hidden={true} style={{ width: '100%', height: 300, objectFit: 'cover' }} src={getUrlImage(0, 0, listImg[index].Files)} />
                }
              })}
            </Row>
          </Image.PreviewGroup>
          {/* {listImg && listImg.length > 5 && <div className="overlay-image" onClick={onViewImgMore}>
            <p className='overlay-text'>+{listImg.length - 5}</p>
          </div>} */}
        </>
      }


    </div>
  );
};

ListImageViewNew.propTypes = {
  listImg: PropTypes.array,
  isSearch: PropTypes.bool
};
export default ListImageViewNew;