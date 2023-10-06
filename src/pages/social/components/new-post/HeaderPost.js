import React, { useState, useEffect } from 'react';
import "./header-post.styles.scss"
import GoalIcon from "../../../../assets/new/header-post/goal-icon.svg"
import KeyCamPaignIcon from "../../../../assets/new/header-post/key-campaign-icon.svg"
import PriorityIcon from "../../../../assets/new/header-post/priority-mission-icon.svg"
import SpeakIcon from "../../../../assets/new/header-post/speak-icon.svg"
import CloseIcon from "../../../../assets/new/header-post/close-icon.svg"
import NextIcon from "../../../../assets/new/header-post/next-icon.svg"
import BackIcon from "../../../../assets/new/header-post/back-icon.svg"
import ImageEx from "../../../../assets/new/header-post/image.png"
import ArrowLeft from "../../../../assets/new/header-post/arrow-left.svg"
import ArrowRight from "../../../../assets/new/header-post/arrow-right.svg"
import Close from "../../../../assets/new/header-post/close.svg"
import Setting from "../../../../assets/new/header-post/setting1.svg"
import PropTypes from 'prop-types';

const HeaderPost = ({
    onCloseClick
}) => {

    return (
        <div className="header-post">
            <div className="header-post__item">
                <div className="header-post__item--title" id="green">Tên dự án trọng điểm</div>
                <div className="header-post__item--sub">Lorem ipsum dolor sit amet, sectetuer adipiscing elit,</div>
            </div>
            <div className="line"></div>
            <div className="header-post__item">
                <div className="header-post__item--title" id="red">Tên chiến dịch chủ chốt</div>
                <div className="header-post__item--sub">Lorem ipsum dolor sit amet, sectetuer adipiscing elit,</div>
            </div>
            <div className="line"></div>
            <div className="header-post__item">
                <div className="header-post__item--title" id="yellow">Tên sự kiện nổi bật</div>
                <div className="header-post__item--sub">Lorem ipsum dolor sit amet, sectetuer adipiscing elit,</div>
            </div>

            <div className="arrow-left"><img src={ArrowLeft} /></div>
            <div className="arrow-right"><img src={ArrowRight} /></div>
            <div className="close-icon" onClick={onCloseClick}><img src={Close} /></div>
            <div className="setting-icon"><img src={Setting} /></div>
            {/* <div className="header-post__item">
                <div className="header-post__item--header" id="green">
                    <img src={GoalIcon} />
                    <span>Dự án trọng điểm</span>
                    <img className="header-post__item--header-close" src={CloseIcon} />
                    <div className="header-post__item--header-pagination">
                        <img src={BackIcon} />
                        <div className="ellipse">2</div>
                        <img src={NextIcon} />
                    </div>
                </div>
                <div className="header-post__item--body">
                    <div className="header-post__item--body__left">
                        <img scr={ImageEx} />
                        <span>Details</span>
                    </div>
                    <div className="header-post__item--body__right">
                        <div className="header-post__item--body__right--title">LOREM IPSUM</div>
                        <div className="header-post__item--body__right--des">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
                        <div className="header-post__item--body__right--sub">...Phase | Status... | % Done |</div>
                    </div>
                </div>
            </div>
            <div className="header-post__item">
                <div className="header-post__item--header" id="red">
                    <img src={KeyCamPaignIcon} />
                    <span>Chiến dịch chủ chốt</span>
                    <img className="header-post__item--header-close" src={CloseIcon} />
                </div>
                <div className="header-post__item--body">
                    <div className="header-post__item--body__left">
                        <img scr={ImageEx} />
                        <span>Details</span>
                    </div>
                    <div className="header-post__item--body__right">
                        <div className="header-post__item--body__right--title">LOREM IPSUM</div>
                        <div className="header-post__item--body__right--des">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
                        <div className="header-post__item--body__right--sub">...Phase | Status... | % Done |</div>
                    </div>
                </div>
            </div>
            <div className="header-post__item">
                <div className="header-post__item--header" id="yellow">
                    <img src={PriorityIcon} />
                    <span>Nhiệm vụ ưu tiên</span>
                    <img className="header-post__item--header-close" src={CloseIcon} />
                </div>
                <div className="header-post__item--body">
                    <ul>
                        <li>Nhiệm vụ 1 <span>... Deadline |</span></li>
                        <li>Nhiệm vụ 2 <span>... Deadline |</span></li>
                        <li>Nhiệm vụ 3 <span>... Deadline |</span></li>
                    </ul>
                </div>
            </div>
            <div className="header-post__item">
                <div className="header-post__item--header" id="blue">
                    <img src={SpeakIcon} />
                    <span>Sự kiện nổi bật</span>
                    <img className="header-post__item--header-close" src={CloseIcon} />
                </div>
                <div className="header-post__item--body">
                    <ul>
                        <li>Sự kiện 1 <span>... Date |</span></li>
                        <li>Sự kiện 2 <span>... Date |</span></li>
                        <li>Sự kiện 3 <span>... Date |</span></li>
                    </ul>
                </div>
            </div> */}
        </div>
    )
}

HeaderPost.propTypes = {
    onCloseClick: PropTypes.func,
}

export default HeaderPost;