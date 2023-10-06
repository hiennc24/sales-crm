/* eslint-disable react/prop-types */
import React from "react";

import menuAllActive from "./img/ic-menu-all-active.png";
import menuAll from "./img/ic-menu-all.png";
import menuEvent from "./img/ic-menu-event.png";
import menuEventActive from "./img/ic-event-active.png";
import menuGroup from "./img/ic-menu-group.png";
import menuGroupActive from "./img/ic-group-active.png";
import menuNews from "./img/ic-menu-internal-news.png";
import menuNewsActive from "./img/ic-internal-news-active.png";
import menuPoll from "./img/ic-menu-poll.png";
import menuPollActive from "./img/ic-poll-active.png";
import iconAccountCircle from "./img/account_circle.png";

const defaultStyle = {
  width: "15px",
  height: "15px",
  marginRight: "5px",
};

export const PageIcon = ({ style }) => (
  <img src={menuAll} style={style || defaultStyle} alt="menuAll" />
);

export const PageIconActive = ({ style }) => (
  <img src={menuAllActive} style={style || defaultStyle} alt="menuAllActive" />
);

export const EventIcon = ({ style }) => (
  <img src={menuEvent} style={style || defaultStyle} alt="menuEvent" />
);
export const EventIconActive = ({ style }) => (
  <img
    src={menuEventActive}
    style={style || defaultStyle}
    alt="menuEventActive"
  />
);

export const GroupIcon = ({ style }) => (
  <img src={menuGroup} style={style || defaultStyle} alt="menuGroup" />
);
export const GroupIconActive = ({ style }) => (
  <img
    src={menuGroupActive}
    style={style || defaultStyle}
    alt="menuGroupActive"
  />
);

export const IconNews = ({ style }) => (
  <img src={menuNews} style={style || defaultStyle} alt="menuNews" />
);
export const IconNewsActive = ({ style }) => (
  <img
    src={menuNewsActive}
    style={style || defaultStyle}
    alt="menuNewsActive"
  />
);

export const IconPoll = ({ style }) => (
  <img src={menuPoll} style={style || defaultStyle} alt="menuPoll" />
);

export const IconPollActive = ({ style }) => (
  <img
    src={menuPollActive}
    style={style || defaultStyle}
    alt="menuPollActive"
  />
);

export const IconAccountCircle = ({ style }) => (
  <img
    src={iconAccountCircle}
    style={style || defaultStyle}
    alt="iconAccountCircle"
  />
);
