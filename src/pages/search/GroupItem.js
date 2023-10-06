import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Row, Col, Typography, Card, Button, message, Tooltip } from "antd";
import API from '../../services/api';
import FormatText from "./FormatText";
import { selectGroupType } from "../../stores/global/global.selector";
import RecentImage from "../../assets/images/recent-image.svg";
import AddGroup from "../../assets/images/avatar-add-group.jpg";
import publicGroup from "../../assets/images/groups/publicGroup.png";
import privateGroup from "../../assets/images/groups/privateGroup.png";
import { getUrlImage } from "../../utils";
import iconGroupJoin from "./img/ic-group-join.png";
import iconGroupJoined from "./img/ic-group-joined.png";

const { Paragraph } = Typography;

const GroupItem = ({ data, keySearch }) => {

  const [loadingRequestJoin, setLoadingRequestJoin] = useState(false);

  const groupType = useSelector(selectGroupType());

  const getEmployees = item => {
    if (!item) return [];
    if (!item.Employee) return [];
    let employee = [];
    try {
      employee = JSON.parse(item.Employee) || [];
    } catch (error) {
      console.log(error);
    }
    return employee;
  }

  const renderMembersShort = (item) => {
    let employees = getEmployees(item)
    let accountManager = [];
    if (item.AccountManager) {
      try {
        accountManager = JSON.parse(item.AccountManager);
      } catch (error) {
        console.log(error);
      }
    }
    employees = employees.concat(accountManager);

    var listView = [];
    if (employees) {
      employees.forEach((item, index) => {
        if (item) {
          var avatar =
            item && item.Avatar && item.Avatar !== ""
              ? getUrlImage(35, 35, item.Avatar)
              : RecentImage;
          if (employees.length === index + 1) {
            listView.push(
              <img
                className="avt-member avt-first"
                src={avatar}
                alt="recent"
                title={item.FullName}
                key={index}
              />
            );
          } else {
            listView.push(
              <img
                className="avt-member"
                src={avatar}
                alt="recent"
                title={item.FullName}
                key={index}
              />
            );
          }
        }
      });
    }
    return listView;
  };

  const convertGroupType = (type) => {
    const group = groupType?.find((group) => group.Code === type);
    return group?.Name || type;
  };

  const onRequestJoinGroup = (groupId) => {
    setLoadingRequestJoin(true);
    API.group.requestJoinGroup({
      "groupId": groupId
    }).then(res => {
      if (res?.code === 200 || res?.code === 500) {
        message.success("Đã gửi yêu cầu, chờ phê duyệt!")
      } else {
        message.error("Đã xảy ra lỗi vui lòng thử lại sau!")
      }
      setLoadingRequestJoin(false);
    }).catch(err => setLoadingRequestJoin(false))
  }

  if (!data) return null;
  const { Id, Avatar, GroupTypeCode, Name, Desc, IsJoin } = data;

  const formatedName = FormatText(Name, keySearch);
  const formatedDesc = FormatText(Desc, keySearch);
  return (
    <Card hoverable bodyStyle={{ padding: "0px" }} className="group-item" >
      <Row>
        <Col className="avt-group">
          <NavLink to={"/group-work/" + Id}>
            <img
              className="group-avatar"
              draggable={false}
              src={
                Avatar && Avatar !== ""
                  ? getUrlImage(300, 175, Avatar)
                  : AddGroup
              }
            />
          </NavLink>
        </Col>
        <Col className="group-content">
          <NavLink to={"/group-work/" + Id}>
            <div className="group-type">
              <img
                className="group-type-icon"
                src={
                  GroupTypeCode === "public" ? publicGroup : privateGroup
                }
                alt="groupType"
              />
              <span className="group-type-name">
                {convertGroupType(GroupTypeCode)}
              </span>
              <div className="list-avt-member">
                <div className="content-avt">{renderMembersShort(data)}</div>
                <p className="text-count-member">
                  {(getEmployees(data).length) + 1} thành viên
                </p>
              </div>
            </div>

            <Typography.Paragraph ellipsis className="group-name">
              <p
                dangerouslySetInnerHTML={{
                  __html: formatedName,
                }}
              />
            </Typography.Paragraph>
            <Paragraph
              ellipsis={{ rows: 2, expandable: false, symbol: "" }}
              className="text-description-group"
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: formatedDesc.replaceAll("\n", "<br/>")
                    .split("<p>&nbsp;</p>")
                    .join(""),
                }}
              ></p>
            </Paragraph>
          </NavLink>
        </Col>
        <Col className="join-btn-area">
          {IsJoin ? (
            <NavLink to={"/group-work/" + Id}>
              <Button className='join-btn active'>
                <Tooltip title='Truy cập nhóm' color="#32A1C8" zIndex={30000}>
                  <img src={iconGroupJoined} alt="iconGroupJoined" />
                </Tooltip>
              </Button>
            </NavLink>) :
            (<Button className='join-btn' onClick={() => { onRequestJoinGroup(Id); }} loading={loadingRequestJoin}>
              <Tooltip title={`Tham gia nhóm ${Name}`} color="#32A1C8" zIndex={30000} >
                <img src={iconGroupJoin} alt="iconGroupJoin" />
              </Tooltip>
            </Button>)}
        </Col>
      </Row>
    </Card>
  );
};

GroupItem.propTypes = {
  data: PropTypes.object.isRequired,
  keySearch: PropTypes.object.isRequired
};

export default GroupItem;
