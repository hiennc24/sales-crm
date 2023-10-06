/* eslint-disable react/prop-types */
import React from "react";
import flagIcon from "../img/flagIcon.png";
import personCIcon from "../img/personCIcon.png";
import editIcon from "../img/editIcon.png";
import MoreOutlined from "../img/MoreOutlined.png";
import RectangleIcon from "../img/RectangleIcon.png";
import RectangleSmall from "../img/RectangleSmall.png";
import Star from "../img/star-yellow.png";
import uncheckGroup from "../img/uncheckGroup.png";
import checkGroupRed from "../img/checkGroupRed.png";
import checkGroupYellow from "../img/checkGroupYellow.png";
import icRank from "../img/ic-rank.png";
import assignee from "../img/assignee.png";
import redFlag from "../img/flagIcon.png";
import grayFlag from "../img/gray-flag.png";
import yellowFlag from "../img/yellow-flag.png";
import clock from "../img/clock.png";
import money from "../img/money.png";

export const StarIcon = ({ style }) => (
  <img src={Star} style={style} alt="star" />
);

export const UncheckGroupIcon = ({ style }) => (
  <img src={uncheckGroup} style={style} alt="UncheckGroup" />
);

export const CheckGroupRedIcon = ({ style }) => (
  <img src={checkGroupRed} style={style} alt="CheckGroupRed" />
);

export const CheckGroupYellowIcon = ({ style }) => (
  <img src={checkGroupYellow} style={style} alt="CheckGroupYellow" />
);

export const EditIcon = ({ style }) => (
  <img src={editIcon} style={style} alt="EditIcon" />
);

export const IcRankIcon = ({ style }) => (
  <img src={icRank} style={style} alt="icRank" />
);

export const PersonIcon = ({ style }) => (
  <img src={personCIcon} style={style} alt="personCIcon" />
);

export const AssigneeIcon = ({ style }) => (
  <img src={assignee} style={style} alt="assignee" />
);

export const RedFlagIcon = ({ style }) => (
  <img src={redFlag} style={style} alt="redFlag" />
);

export const GrayFlagIcon = ({ style }) => (
  <img src={grayFlag} style={style} alt="grayFlag" />
);

export const YellowFlagIcon = ({ style }) => (
  <img src={yellowFlag} style={style} alt="yellowFlag" />
);

export const ClockIcon = ({ style }) => (
  <img src={clock} style={style} alt="clock" />
);

export const MoneyIcon = ({ style }) => (
  <img src={money} style={style} alt="money" />
);
