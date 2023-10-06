import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Image } from 'antd';
import { getUrlFile } from '../../../../utils';

import closeIcon from '../../../../assets/images/close-image-icon.svg';
import IconPrev from '../../../../assets/images/groups/prev-month.svg';
import IconNext from '../../../../assets/images/groups/next-month.svg';
const ListImageView = ({ listImg }) => {

    const [isShowBox, showBox] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    const showBoxImg = (index) => {
        setImgIndex(index);
        showBox(true)
    }

    const onChangeImg = (type) => {
        if (type === 'PREV') {
            setImgIndex(imgIndex - 1)
        } else {
            setImgIndex(imgIndex + 1)
        }
    }

    const renderImgShotCut = () => {

        return listImg.map((imgId, index) => {
            if (index <= 3) {
                if (index === 3 && listImg.length > 4) {
                    return (
                        <div className="img-under-last" onClick={() => showBoxImg(index)} key={index}>
                            <img className="image-full" src={getUrlFile(imgId)} key={index} data-loading="lazy" />
                            <div className="view-short">
                                {'+' + (listImg.length - 3)}
                            </div>
                        </div>
                    )
                }
                return (
                    <img
                        onClick={() => showBoxImg(index)}
                        className={(index === 0 || listImg.length === 2) ? "image-full" : (listImg.length === 3 ? "img-under-50" : "img-under")}
                        src={getUrlFile(imgId)}
                        key={index}
                        data-loading="lazy"
                    />
                )
            }
        })
    }

    return (
        <div className="list-img-view">
            {renderImgShotCut()}

            {isShowBox && <div className="img-box">
                <span className="btn-close" onClick={() => showBox(false)} >
                    <img src={closeIcon} />
                </span>
                <div className="box-img">
                    {imgIndex !== 0 ? <button className="btn-change-img" onClick={() => onChangeImg('PREV')}><img src={IconPrev} /></button> : <div></div>}
                    <Image preview={false} className="" src={getUrlFile(listImg[imgIndex])} />
                    {imgIndex !== (listImg.length - 1) ? <button className="btn-change-img" onClick={() => onChangeImg('NEXT')}><img src={IconNext} /></button> : <div></div>}
                </div>
            </div>}
        </div>
    )
}

ListImageView.propTypes = {
    listImg: PropTypes.array
};
export default ListImageView;