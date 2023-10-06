/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Tooltip } from 'antd';
import { getUrlImage } from '../../../../../utils';

import IconPrev from '../../../../../assets/images/groups/prev-month.svg';
import IconNext from '../../../../../assets/images/groups/next-month.svg';
import '../DetailPosts.scss';
import '../../../../group/components/group-timeline/GroupTimeLine.scss';
import CloseBlack from '../../../../../assets/new/common/delete-img.svg';
import ZoomIn from '../../../../../assets/new/common/zoom_in.svg';
import ZoomOut from '../../../../../assets/new/common/zoom_out.svg';

const ListImageView = ({ listImg, isSearch = false }) => {
  const [isShowBox, showBox] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [zoomSize, setZoomSize] = useState(1);


  const showBoxImg = (index) => {
    setImgIndex(index);
    showBox(true);
  };

  const onChangeImg = (type) => {
    if (type === 'PREV') {
      setImgIndex(imgIndex - 1);
    } else {
      setImgIndex(imgIndex + 1);
    }
  };

  const handleGridColumn = (i) => {
    switch (listImg.slice(0, 4).length) {
      case 1:
        return '1/ span 6';
      case 2: {
        return '1/ span 6';
      }
      case 3: {
        if (i === 0) {
          return '1/ span 6';
        } else {
          return `${i * 3 - 2}/ span 3`;
        }
      }
      case 4: {
        if (i === 0) {
          return '1/ span 6';
        } else {
          return `${i * 2 - 1}/ span 2`;
        }
      }
    }
  };

  const handleGridRow = (i) => {
    if (listImg.length === 1) {
      return '1/ span 2';
    } else {
      if (i === 0) {
        return "1/ span 1";
      } else {
        return '2/ span 1';
      }
    }
  };


  const handleImageGrid = () => {
    return <>
      {
        listImg.slice(0, 4).map((image, i, arr) => {
          if (listImg.length === 1) {

            return <Image className={isSearch? "single-image-search": "single-image"} key={i} preview={false} src={getUrlImage(0, 0, image.Files)} onClick={(e) => showBoxImg(i)} />
          }
          else if (listImg.length === 2 && i < 1) {
            return <>
              <div
                style={{
                  gridArea: '1 / 1 / span 2 / span 3',
                  backgroundImage: `url(${getUrlImage(0, 0, image.Files)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  borderRadius: 15,
                }}
                key={i}
                onClick={() => showBoxImg(i)}
              ></div>
              <div
                style={{
                  gridArea: '1 / 4 / span 2 / span 6',
                  backgroundImage: `url(${getUrlImage(0, 0, arr[i + 1].Files)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  borderRadius: 15,
                  width: isSearch && "60px"
                }}
                key={i + 1}
                onClick={() => showBoxImg(i + 1)}
              ></div></>
          }
          else if (i === 2 && isSearch && listImg.length > 3) {
            return <div
              style={{
                gridColumn: handleGridColumn(i),
                gridRow: handleGridRow(i),
                background: `linear-gradient(180deg, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .5) 100%), url(${getUrlImage(0, 0, image.Files)})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={i}
              onClick={() => showBoxImg(i)}
            >
              <div style={{
                display: "flex",
                justifyContent: 'center',
                height: "50px",
                width: "60px"
              }}>
                <p style={{
                  color: "#fff",
                  fontSize: '30px',
                }}>
                  +{listImg.slice(3).length}
                </p>
              </div>
            </div>;
          }
          else if (i === 3 && !isSearch && listImg.length > 4) {
            return <div
              style={{
                gridColumn: handleGridColumn(i),
                gridRow: handleGridRow(i),
                background: `linear-gradient(180deg, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .5) 100%), url(${getUrlImage(0, 0, image.Files)})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius:15
              }}
              key={i}
              onClick={() => showBoxImg(i)}
            >
              <div>
                <p style={{
                  color: "#fff",
                  fontSize: '50px',
                  marginTop: '10px'
                }}>
                  +{listImg.slice(4).length}
                </p>
              </div>


            </div>;
          }
          else if (listImg.length !== 2 && isSearch && i < 3) return <div
            style={{
              gridColumn: handleGridColumn(i),
              gridRow: handleGridRow(i),
              backgroundImage: `url(${getUrlImage(0, 0, image.Files)})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              cursor: 'pointer',
              borderRadius: 15,
            }}
            key={i}
            onClick={() => showBoxImg(i)}
          ></div>;

          else if (listImg.length !== 2 && !isSearch) return <div
            style={{
              gridColumn: handleGridColumn(i),
              gridRow: handleGridRow(i),
              backgroundImage: `url(${getUrlImage(0, 0, image.Files)})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              cursor: 'pointer',
              borderRadius: 15,
            }}
            key={i}
            onClick={() => showBoxImg(i)}
          ></div>;
        }
        )
      }
    </>;
  };



  const renderImgShotCut = () => {
    return <div style={{
      display: `${isSearch && listImg.length === 1 ?'': listImg.length === 1? 'flex' : 'grid'}`,
      gridTemplateRows: isSearch ? '50px' : '1fr 1fr',
      gridTemplateColumns: isSearch ? listImg.length === 3 ? 'repeat(1, 0.16fr)' : 'repeat(2, 30px)' : 'repeat(6, 1fr)',
      width: '100%',
      height: `${listImg.length === 1 ? 'auto' : isSearch ? '500px' : '500px'}`,
      gap: `2px ${isSearch ? " 1px" : " 2px"}`,
      justifyContent:"center"
    }}
      className={isSearch ? "search-img" : ""}
    >
      {handleImageGrid()}
    </div>;

    // return listImg.map((imgId, index) => {
    //   if (index <= 3) {
    //     if (index === 3 && listImg.length > 4) {
    //       return (
    //         <div className="img-under-last" onClick={() => showBoxImg(index)}>
    //           <img className="image-full" src={getUrlImage(200, 100, imgId.Files)} key={index} data-loading="lazy" />
    //           <div className="view-short">
    //             {'+' + (listImg.length - 3)}
    //           </div>
    //         </div>
    //       );
    //     }
    //     return (
    //       <img onClick={() => showBoxImg(index)} className={index === 0 ? "image-full" : "img-under"} src={getUrlImage(200, 200, imgId.Files)} key={index}
    //         data-loading="lazy" />
    //     );
    //   }
    // });
  };

  const renderImgPreview = () => {
    return <>
      {listImg.filter((i, index) => index < 2).map((item, index) => {
        return <Image key={index} height='300px' width='100%' preview={false} src={getUrlImage(0, 0, item.Files)} onClick={() => showBoxImg(index)} />
      })
      }
    </>
  }

  return (
    <div className="list-img-view list-img-vieww">
      {!!listImg.length && renderImgShotCut()}
      {/* {!!listImg.length && renderImgPreview()} */}
      {isShowBox && <div className="img-box">
        <Tooltip placement='bottom' title={'Thu nhỏ'}>
          <span className="btn-zoom__out" style={zoomSize === 1 ? { opacity: 0.6 } : { opacity: 1 }} onClick={() => { if (zoomSize > 1) { setZoomSize(zoomSize - 0.2) } }}>
            <img src={ZoomOut} />
          </span>
        </Tooltip>
        <Tooltip placement='bottom' title={'Phóng to'}>
          <span className="btn-zoom__in" style={zoomSize >= 1.6 ? { opacity: 0.6 } : { opacity: 1 }} onClick={() => { if (zoomSize < 1.6) { setZoomSize(zoomSize + 0.2) } }}>
            <img src={ZoomIn} />
          </span>
        </Tooltip>
        <div className="box-img">
          {imgIndex !== 0 ? <button className="btn-change-img" onClick={() => onChangeImg('PREV')}><img src={IconPrev} /></button> : <div></div>}
          <div style={{ transform: `scale(${zoomSize})`, position: 'relative' }}>
            <Image preview={false} className="image-full" src={getUrlImage(0, 0, listImg[imgIndex].Files)} />
            <Tooltip placement='bottom' title={'Nhấn để đóng'}>
              <span className="btn-close" style={{ transform: `scale(${1 / zoomSize})` }} onClick={() => { showBox(false); setZoomSize(1); }} >
                <img src={CloseBlack} />
              </span>
            </Tooltip>
          </div>
          {imgIndex !== (listImg.length - 1) ? <button className="btn-change-img" onClick={() => onChangeImg('NEXT')}><img src={IconNext} /></button> : <div></div>}
        </div>
      </div>}
    </div>
  );
};

ListImageView.propTypes = {
  listImg: PropTypes.array,
  isSearch: PropTypes.bool
};
export default ListImageView;