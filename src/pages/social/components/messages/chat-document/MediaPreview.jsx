import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import './ChatDocument.scss'
import {
  getUrlImage,
  getUrlFile
} from "../../../../../utils";
import {
  Tooltip,
} from "antd";
import CloseBlack from '../../../../../assets/new/common/delete-img.svg';

const MediaPreview = ({ listMedia, index, close }) => {

  return <div className='preview-media__container'>
    <div className='preview-media__container-content'>
      <div className='box-contain'>
      <span className="btn-close" onClick={() => close()}>
            <img src={CloseBlack} />
          </span>
        <img src={getUrlImage(0, 0, listMedia[index].Files || "")} />
      </div>
    </div>
  </div>
}

MediaPreview.propTypes = {
  listMedia: PropTypes.array,
  index: PropTypes.number,
  close: PropTypes.func
};

export default MediaPreview;