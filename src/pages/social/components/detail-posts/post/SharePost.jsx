import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";

import '../DetailPosts.scss';

// eslint-disable-next-line react/prop-types
export const SharePost = ({ isShow, setIsShowShare, shareType, id, type }) => {

  const share = () => {
    setIsShowShare(false);
  }

  const url = () => {
    if(shareType == 'post') {
      return `http://kakashi123.devsite.com:3000/detail/${type}/${id}`
    }
    if(shareType == 'event') {
      return `http://kakashi123.devsite.com:3000/event/${id}`
    }
    return `http://kakashi123.devsite.com:3000/detail/${type}/${id}`
  }

  return <div className={`share-wrapper__plugin ${!isShow ? 'hidden' : ''}`}>
    <FacebookShareButton url={url()} onClick={share}>
      <FacebookIcon size={28} round={true} />
      <span className='icon-name'>Facebook</span>
    </FacebookShareButton>
    <TwitterShareButton url={url()} onClick={share}>
      <TwitterIcon size={28} round={true} />
      <span className='icon-name'>Twitter</span>
    </TwitterShareButton>
  </div>
}