/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Col,
  Image,
  Row,
  Popover,
  message,
  Spin,
  Avatar,
  Tooltip,
  Card,
  Typography,
  Button,
  Dropdown,
  Menu,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./DetailEvent.scss";
import starIcon from "../../../../../assets/images/star-icon.svg";
import shareIcon2 from "../../../../../assets/images/share-icon2.svg";
import share1 from "../../../../../assets/images/share-1.svg";
import usersIcon from "../../../../../assets/images/3-user.svg";
import moment from "moment";
import { getUrlImage, Icons } from "../../../../../utils";
import apis from "../../../../../services/api";
import toaster from "../../../../../components/toaster";
import BoxLoading from "../../../../../components/box-loading/BoxLoading";
import avatar from "../../../../../assets/images/avatar.svg";
import iconJoin from "../../../../../assets/new/event/chua-tham-gia.svg";
import iconJoined from "../../../../../assets/new/event/da-tham-gia-2.svg";
import teamPerson from "../../../../../assets/new/event/nhom-nguoi.svg";
import iconMore from "../../../../../assets/new/event/iconMore.png";
import eventImage from "../../../../../assets/images/event-image.jpg";
import oclock from "../../../../../assets/new/event/dong-ho.svg";
import care from "../../../../../assets/new/event/quan-tam.svg";
import peson from "../../../../../assets/new/event/nguoi-tham-gia.svg";
import location from "../../../../../assets/new/event/dia-chi.svg";
import careBack from "../../../../../assets/new/event/quan-tam-black.svg";
import caredBack from "../../../../../assets/new/event/quan-tam-blue.svg";
import shareBack from "../../../../../assets/new/event/share-black.svg";
import arrowRight from "../../../../../assets/new/common/arrow-right.svg";
import { FORMAT_DATE_TIME } from "../../../../../constants/config";
import { useLocation } from "react-router-dom";
import { SharePost } from "../post/SharePost";
import Share from "../../../../../assets/new/common/share.svg";
// import
import API from "../../../../../services/api";
import { deleteEventSuccess } from "../../../../../stores/posts/posts.action";
import FormatText2 from "../../../../../utils/FormatText2";
import FormatText3 from "../../../../../utils/FormatText3";

import { SearchOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

const IconText = ({ icon, text, boldText }) => (
  <div className="IconText">
    <Image src={icon} preview={false} width={18} height={18} />
    <Text className="IconText__text">
      {text}
      <Text style={{ fontWeight: "bold" }}>{boldText}</Text>
    </Text>
  </div>
);

const DetailEvent = ({ data }) => {
  const details = data.Details;
  const user = useSelector((state) => state.get("userProfile").get("profile"));
  const dispatch = useDispatch();
  const [countCare, setCountCare] = useState(data?.CountCare ?? 0);
  const [loading, setLoading] = useState(false);
  const [isShowShare, setIsShowShare] = useState(false);
  const history = useHistory();
  const [isJoin, setIsJoin] = useState(false);
  const [isCare, setIsCare] = useState(false);
  const [countJoin, setCountJoin] = useState(
    data?.ParticipantDetais?.length ?? 0
  );
  const [keySearch, setKeySearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  document.addEventListener(
    "click",
    (event) => {
      const classList =
        typeof event?.target?.className !== "object"
          ? event?.target?.className?.split(" ")
          : [];
      if (classList.length == 0 || classList[0] != "share-wrapper__plugin") {
        setIsShowShare(false);
      }
    },
    true
  );

  const location = useLocation();
  useEffect(() => {
    setKeySearch(location.search.substring(3, location.search.length));
  }, [location]);

  const showSharePlugin = (event) => {
    const classList =
      typeof event?.target?.className !== "object"
        ? event?.target?.className?.split(" ")
        : [];
    const parentClassList = [...event.target?.parentElement?.classList];

    if (
      (classList.length != 0 && classList.find((r) => r == "share-wrapper")) ||
      (parentClassList.length != 0 &&
        parentClassList.find((r) => r == "share-wrapper"))
    ) {
      setIsShowShare(true);
    }
  };

  const handleShareEvent = () => {
    if (!loading) {
      let dataRequest = { id: details.PostId, action: 0, status: 1 };
      setLoading(true);
      apis.posts
        .reactPost(dataRequest)
        .then((res) => {
          if (res?.code !== 200) {
            toaster.error("Đã xảy ra lỗi vui lòng thử lại sau!!!");
          } else {
            toaster.success("Đã chia sẻ sự kiện");
          }
          setLoading(false);
        })
        .catch(() => {
          toaster.error("Đã xảy ra lỗi vui lòng thử lại sau!!!");
          setLoading(false);
        });
    }
  };

  const directToEventDetailPage = (data) => {
    const id = data.Details.Id;
    history.push(`/event/${id}`);
  };
  const onChangeConsider = (e, id) => {
    e.stopPropagation();
    let care = JSON.parse(JSON.stringify(countCare));
    API.event
      .userConsiderEvent({
        id: id,
        action: 2,
        status: !isCare ? 1 : 0,
      })
      .then((rs) => {
        if (rs.code === 200) {
          console.log("Success", rs);
          setIsCare(!isCare);
          setCountCare(!isCare ? ++care : --care);
        }
      })
      .catch((rs) => {
        toaster.error("Đã xảy ra lỗi vui lòng thử lại sau!!!");
        console.log("fail", rs);
      });
  };
  const onChangeJoin = (e, id) => {
    e.stopPropagation();
    // let join = JSON.parse(JSON.stringify(countJoin))
    let join = countJoin;
    API.event
      .userJoinEvent({
        id: id,
        isJoin: isJoin ? 0 : 1,
      })
      .then((rs) => {
        if (rs.data) {
          console.log("Success", rs);
          setIsJoin(!isJoin);
          setCountJoin(!isJoin ? ++join : --join);
        }
      })
      .catch((rs) => {
        toaster.error("Đã xảy ra lỗi vui lòng thử lại sau!!!");
        console.log("fail", rs);
      });
  };

  useEffect(() => {
    if (data) {
      setCountCare(data.CountCare);
      setCountJoin(data.ParticipantDetais?.length);
      setIsJoin(data.IsJoin);
      setIsCare(data.IsCare);
      // let listEmployees = '';
      let Employees = data.Details?.Employees;
      if (Employees) Employees = JSON.parse(Employees);
      else Employees = [];
      // Employees.forEach((item, index) => {
      //   if (index === 0) listEmployees = item.FullName;
      //   else {
      //     listEmployees += ', ' + item.FullName;
      //   }
      // });
      setEmployees(Employees);
    }
  }, [data]);

  const isCheckDate = (time) => {
    var check = moment(time).diff(moment(Date.now()), "days");
    if (check < 0) {
      return true;
    }
    return false;
  };
  const handleMenuClick = (e) => {
    if (e.key === "edit") {
      history.replace(`/event/${data?.Details?.Id}/edit/`);
    } else if (e.key === "delete") {
      dispatch(deleteEventSuccess(data?.Details?.Id));
      apis.posts.deleteEvent(data?.Details?.Id);
    } else {
      return;
    }
  };
  const menu = () => {
    return (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="edit" icon={<EditOutlined />}>
          Chỉnh sửa sự kiện
        </Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />}>
          Xóa sự kiện
        </Menu.Item>
      </Menu>
    );
  };

  const renderParticipants = () => {
    let Employees = data?.ParticipantDetais?.filter(
      (item, index) => item.Avatar && index < 5
    );
    var listView = [];
    if (Employees) {
      Employees.map((item, index) => {
        var avatar =
          item.Avatar && item.Avatar !== ""
            ? getUrlImage(35, 35, item.Avatar)
            : null;
        if (Employees.length === index + 1) {
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
      });
    }
    return listView;
  };

  return (
    <Card
      hoverable
      cover={<div style={{ height: '100%' }}><Image preview={false} alt="example" src={data?.Cover?.length > 0 ? getUrlImage(600, 1000, data.Cover[0]) : eventImage} width={200} height={200} style={{ objectFit: 'cover' }} /></div>}
      className="DetailEvent"
      onClick={() => {
        directToEventDetailPage(data);
      }}
    >
      <div className="DetailEvent__child">
        <Tooltip title={data?.Details?.Title} placement="bottom">
          <Title
            className="event-title"
            level={4}
            style={{ marginBottom: 14, fontSize: 18 }}
          >
            {data?.Details?.Title}{" "}
          </Title>
        </Tooltip>
        {user.Id === data.CreatedBy && (
          <div className="dropdown-icon" onClick={(e) => e.stopPropagation()}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <img
                src={iconMore}
                alt="iconMore"
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
          </div>
        )}
        <IconText
          icon={Icons.calendar}
          text={
            (data?.Details?.FromDate
              ? moment(data?.Details?.FromDate).format("DD/MM/YYYY")
              : "") +
            (data?.Details?.ToDate
              ? " - " + moment(data?.Details?.ToDate).format("DD/MM/YYYY")
              : "")
          }
        />
        <IconText
          icon={Icons.clock}
          text={
            (data?.Details?.FromTime ?? "") +
            " - " +
            (data?.Details?.ToTime ?? "")
          }
        />
        {/* <IconText icon={Icons.user} text={`Phụ trách/tổ chức: `} boldText={employees} /> */}
        <div className="list-employees">
          <IconText icon={Icons.user} text={`Phụ trách/tổ chức: `} />
          {employees?.length > 0 && (
            <div className="employees-detail">
              {employees?.map((item, index) => (
                <>
                  {index === 0 ? (
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={"/income/profile/" + item.UserId}
                    >
                      <span>{item.FullName}</span>
                    </a>
                  ) : index < 2 ? (
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={"/income/profile/" + item.UserId}
                    >
                      <span>, {item.FullName}</span>
                    </a>
                  ) : (
                    ""
                  )}
                </>
              ))}
              {employees?.length > 2 && (
                <>
                  <span className="text-more-people"> và </span>
                  <Dropdown
                    overlay={
                      <Menu>
                        {employees.slice(2)?.map((tag, index) => (
                          <Menu.Item key={index} className="sub-tag-group">
                            <a
                              onClick={(e) => e.stopPropagation()}
                              href={"/income/profile/" + tag.UserId}
                            >
                              {tag.FullName}
                            </a>
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                    overlayClassName="name-wrapper__tag tag"
                  >
                    <span className="text-more-people">
                      {employees.length - 2} Người khác
                    </span>
                  </Dropdown>
                </>
              )}
            </div>
          )}
        </div>

        <div className="list-avt-member">
          <IconText
            icon={Icons.group}
            text={`Tham gia: ${countJoin} người | `}
          />
          <div className="content-avt">{renderParticipants()}</div>
        </div>

        <div className="DetailEvent__child-row">
          <Button
            className={`DetailEvent__button ${isJoin && "join"}`}
            icon={
              <Image
                src={isJoin ? Icons.checkWhite : Icons.uncheck}
                width={18}
                height={18}
                preview={false}
              />
            }
            onClick={(e) => {
              onChangeJoin(e, data?.Details?.Id);
            }}
          >
            Tham gia
          </Button>
          <Button
            className="DetailEvent__button"
            icon={
              <Image
                src={Icons.addUser}
                width={18}
                height={18}
                preview={false}
              />
            }
            onClick={(e) => e.stopPropagation()}
          >
            Mời tham gia
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DetailEvent;
