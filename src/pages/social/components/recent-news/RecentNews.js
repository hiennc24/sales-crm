import { ArrowsAltOutlined } from "@ant-design/icons";
// import PropTypes from "prop-types";
import { Col, Image, Menu, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecentImage from "../../../../assets/images/recent-image.svg";
import ModalDeleteGroup from "../../../../pages/group/components/modal-confirm-delete/ModalConfirmDelete";
import { getListGroup, getListGroupSuccess } from "../../../../pages/group/Group.action";
import { selectListGroup } from "../../../../pages/group/Group.selector";
import { saveToken } from "../../../../stores/global/global.action";
import { getUrlImage } from "../../../../utils";
import "./RecentNews.scss";

const RecentNews = () => {
  const dispatch = useDispatch();

  const listGroups = useSelector(selectListGroup());
  const [cookies] = useCookies(["abizin_token"]);
  const [isShowConfirm, toggleShowConfirm] = useState(false);
  const [groupIdSelected, selectGroupId] = useState();

  useEffect(() => {
    // dispatch(saveToken(cookies.abizin_token));
    dispatch(getListGroup());
  }, [cookies.abizin_token]);

  const refeshDataDelete = () => {
    var list = listGroups.filter(item => groupIdSelected !== item.Id)
    dispatch(getListGroupSuccess(list))
  }

  const menu = (id) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          toggleShowConfirm(true);
          selectGroupId(id);
        }}
      >
        Xóa nhóm
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="recent-news">
      <div className="section-title">
        <h2>Bảng tin</h2>
      </div>
      <div className="recent-news-title">
        <span className="recent-text">Gần đây</span>
        <Link to={"/group-work"} className="recent-all">
          Xem tất cả nhóm
        </Link>
      </div>
      <div className="recent-news-list">
        {!!listGroups.length &&
          listGroups.slice(0, 4).map((item, key) => (
            <div className="recent-news-item" key={key}>
              <Link to={"/group-work/" + item.Id}>
                <Row>
                  <Col span={4} className="d-flex align-items-center">
                    <Image className="recent-news-image" preview={false}
                      src={item.Avatar && item.Avatar !== "" ? getUrlImage(35, 35, item.Avatar) : RecentImage}
                    />
                  </Col>
                  <Col span={18}>
                    <div className="recent-news-info">
                      <a href={"/group-work/" + item.Id} className="group-name">
                        {item.Name}
                      </a>
                      {/* <p className="truncate">1 bài đăng mới</p> */}
                      <p className="truncate"> {item.Employee?.length + 1} thành viên </p>
                    </div>
                  </Col>
                  <Col span={2}>
                    <div className="recent-news-action">
                      <Tooltip title="Xem nhóm">
                        <ArrowsAltOutlined overlay={() => menu(item.Id)} />
                      </Tooltip>
                    </div>
                  </Col>
                </Row>
              </Link>
            </div>
          ))}
      </div>
      <ModalDeleteGroup
        isShow={isShowConfirm}
        onToggle={() => toggleShowConfirm(false)}
        groupId={groupIdSelected}
        refeshData={refeshDataDelete}
      />
    </div>
  );
};

RecentNews.propTypes = {};

export default RecentNews;
