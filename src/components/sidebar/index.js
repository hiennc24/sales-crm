import { Divider, Image, Tooltip } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BtnCollapse from "../../assets/new/side-bar/btn-collapse.svg";
import CategoryIcon from "../../assets/new/side-bar/category-icon.svg";
import WorkappIcon from "../../assets/new/side-bar/dashbroad.png";
import DropboxIcon from "../../assets/new/side-bar/dropbox-icon.svg";
import EmailIcon from "../../assets/new/side-bar/email-icon.svg";
import ExitIcon from "../../assets/new/side-bar/exit-icon.png";
import AppIcon from "../../assets/new/side-bar/app.svg";
import BizcoreIcon from "../../assets/new/side-bar/bizcore.png";
import BusinessIcon from "../../assets/new/side-bar/businessIcon.png";
import HrmIcon from "../../assets/new/side-bar/HRM.png";
import FinanceIcon from "../../assets/new/side-bar/hrm-icon.svg";
import CoreIcon from "../../assets/new/side-bar/financy-icon.svg";
import LanguageIcon from "../../assets/new/side-bar/language-icon.svg";
import Logo2 from "../../assets/new/side-bar/logo2.png";
import SettingIcon from "../../assets/new/side-bar/setting-icon.svg";
import TaskIcon from "../../assets/new/side-bar/task-icon.svg";
import IncomIcon from "../../assets/new/side-bar/media.png";
import IncomIconAvtive from "../../assets/new/side-bar/incomActive.png";
import ThreeDot from "../../assets/new/side-bar/three-dot.svg";
import Logo from "../../assets/new/common/logo.png";
import LogoMini from "../../assets/new/common/logo-mini.png";
import {
  setExpandCollapseSideBarLeft,
  setExpandCollapseSideBarRight,
} from "../../stores/global/global.action";
import SidebarRight from "./sidebar-right.js";
import "./styles.scss";

const SideBar = ({ title = "", isExpand = false, setIsExpand = () => {} }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [collapseLevel1, setCollapseLevel1] = useState(false);
  const [collapseLevel2, setCollapseLevel2] = useState(false);
  const collapseLeft = useSelector((state) =>
    state.get("global").get("expandCollapseLeft")
  );
  const collapseRight = useSelector((state) =>
    state.get("global").get("expandCollapseRight")
  );

  useEffect(() => {
    if (collapseLeft && collapseRight) {
      setCollapseLevel1(true);
      setCollapseLevel2(true);
    } else if (collapseLeft || collapseRight) {
      setCollapseLevel1(true);
      setCollapseLevel2(false);
    } else {
      setCollapseLevel1(false);
      setCollapseLevel2(false);
    }
  }, [collapseLeft, collapseRight]);

  const gotoLink = () => {
    history.push("/");
    location.reload();
  };

  const expandLeft = () => {
    dispatch(setExpandCollapseSideBarLeft(!collapseLeft));
  };

  const expandRight = () => {
    dispatch(setExpandCollapseSideBarRight(!collapseRight));
  };

  return (
    <div className="sidebar">
      {/* <div className={`sidebar--main-top ${collapseLevel1 ? 'collapsed-level1' : ''} ${collapseLevel2 ? 'collapsed-level2' : ''}`}>
        <div className="logo">
          <img src={Logo2} />
        </div>
        <div className="info" style={collapseLevel2 ? { display: 'none' } : {}}>
          <p className="name">Tên công ty TNHH Balo Việt</p>
          <div className="description">Dòng trạng thái chung. Dòng trạng thái chung.</div>
        </div>
      </div> */}
      <div className="sidebar--layout">
        <div
          className={`sidebar--layout__left ${collapseLeft ? "collapsed" : ""}`}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={`name-module ${collapseLeft && "center"}`}>
              <p style={collapseLeft ? { display: "none" } : {}}>CHỌN MODULE</p>
              <img
                src={collapseLeft ? AppIcon : ExitIcon}
                style={{ width: 24, height: 24, objectFit: "cover" }}
                onClick={expandLeft}
              />
            </div>
            {collapseLeft ? (
              <>
                <a href="/core">
                  <div className="module center">
                    <Tooltip placement="right" title="Bizcore">
                      <img src={BizcoreIcon} width={24} height={24} />
                    </Tooltip>
                  </div>
                </a>
                <a href="#">
                  <div className="module center">
                    <Tooltip placement="right" title="Business">
                      <img src={BusinessIcon} width={24} height={24} />
                    </Tooltip>
                  </div>
                </a>
                <a href="/hcm">
                  <div className="module center">
                    <Tooltip placement="right" title="HCM">
                      <img src={HrmIcon} width={24} height={24} />
                    </Tooltip>
                  </div>
                </a>
                {/* <a href="/workapp">
                  <div className="module center">
                    <Tooltip placement="right" title="Work app">
                      <img src={WorkappIcon} width={24} height={24} />
                    </Tooltip>
                  </div>
                </a> */}
                <div className="module active center">
                  <Tooltip placement="right" title="Incom">
                    <img src={IncomIconAvtive} width={24} height={24} />
                  </Tooltip>
                </div>
              </>
            ) : (
              <>
                <a href="/core">
                  <div className="module">
                    <img
                      className="logo"
                      src={BizcoreIcon}
                      width={24}
                      height={24}
                      style={{ objectFit: "cover", padding: "0px" }}
                    />
                    <div className="title">Bizcore</div>
                  </div>
                </a>
                <a href="#">
                  <div className="module">
                    <img
                      className="logo"
                      src={BusinessIcon}
                      width={24}
                      height={24}
                      style={{ objectFit: "cover", padding: "0px" }}
                    />
                    <div className="title">Business</div>
                  </div>
                </a>
                <a href="/hcm">
                  <div className="module">
                    <img
                      className="logo"
                      src={HrmIcon}
                      width={24}
                      height={24}
                      style={{ objectFit: "cover", padding: "0px" }}
                    />
                    <div className="title">HCM</div>
                  </div>
                </a>
                {/* <a href="/workapp">
                  <div className="module">
                    <img
                      className="logo"
                      src={WorkappIcon}
                      width={24}
                      height={24}
                      style={{ objectFit: "cover", padding: "0px" }}
                    />
                    <div className="title">Work app</div>
                  </div>
                </a> */}
                <a href="/income">
                  <div className="module active">
                    <img
                      className="logo"
                      src={IncomIconAvtive}
                      width={24}
                      height={24}
                      style={{ objectFit: "cover", padding: "0px" }}
                    />
                    <div className="title" style={{color:'#fff'}}>Incom</div>
                  </div>
                </a>
                {/* <div className="module active">
                  <img
                    className="logo"
                    src={IncomIcon}
                    width={24}
                    height={24}
                    style={{ objectFit: "cover", padding: "0px" }}
                  />
                  <div className="title active">Truyền thông</div>
                </div> */}
                {/* <div className="module">
                  <img
                    className="logo"
                    src={WorkappIcon}
                    width={24}
                    height={24}
                    style={{ objectFit: "cover", padding: "0px" }}
                  />
                  <div className="title">Work app</div>
                </div> */}
                {/* <div className="module">
                  <img
                    className="logo"
                    src={FinanceIcon}
                    width={24}
                    height={24}
                    style={{ objectFit: "cover", padding: "0px" }}
                  />
                  <div className="title">Tài chính</div>
                </div> */}
              </>
            )}
          </div>
          <div className="sidebar--layout__left--bottom">
          <div
              className={`sidebar--layout__left--bottom-icon ${
                collapseLeft && "center"
              }`}
            >
              <Tooltip placement="right" title="Công việc của tôi">
                <img src={WorkappIcon} width={24} height={24} />
              </Tooltip>
              {!collapseLeft && (
                <div className="sidebar--layout__left--bottom-icon-title">
                  Công việc của tôi
                </div>
              )}
            </div>         
            <div
              className={`sidebar--layout__left--bottom-icon ${
                collapseLeft && "center"
              }`}
            >
              <Tooltip placement="right" title="Cloud">
                <img src={DropboxIcon} width={24} height={24} />
              </Tooltip>
              {!collapseLeft && (
                <div className="sidebar--layout__left--bottom-icon-title">
                  Cloud
                </div>
              )}
            </div>
            <div
              className={`sidebar--layout__left--bottom-icon ${
                collapseLeft && "center"
              }`}
            >
              <Tooltip placement="right" title="Email">
                <img src={EmailIcon} width={24} height={24} />
              </Tooltip>
              {!collapseLeft && (
                <div className="sidebar--layout__left--bottom-icon-title">
                  Email
                </div>
              )}
            </div>
            <div
              className={`sidebar--layout__left--bottom-icon ${
                collapseLeft && "center"
              }`}
            >
              <Tooltip placement="right" title="Settings">
                <img src={SettingIcon} width={24} height={24} />
              </Tooltip>
              {!collapseLeft && (
                <div className="sidebar--layout__left--bottom-icon-title">
                  Cài đặt
                </div>
              )}
            </div>
            <div
              className={`sidebar--layout__left--bottom-icon ${
                collapseLeft && "center"
              }`}
            >
              <Tooltip placement="right" title="Ngôn ngữ">
                <img src={LanguageIcon} width={24} height={24} />
              </Tooltip>
              {!collapseLeft && (
                <div className="sidebar--layout__left--bottom-icon-title">
                  Thiết lập ngôn ngữ
                </div>
              )}
            </div>
            <Divider style={{ margin: 0, width: "100%" }} />
            <div className="sidebar--layout__left--bottom-logo center">
              {collapseLeft ? (
                <Image src={LogoMini} preview={false} />
              ) : (
                <Image src={Logo} preview={false} />
              )}
            </div>
          </div>
        </div>
        <div
          className={`sidebar--layout__right ${
            collapseRight ? "collapsed" : ""
          } ${collapseLeft ? "left-collapsed" : ""}`}
        >
          <div>
            <div
              className="sidebar--layout__right--title"
              style={
                collapseRight
                  ? { marginRight: 0, marginLeft: 0, justifyContent: "center" }
                  : {}
              }
            >
              <span
                style={collapseRight ? { display: "none" } : {}}
                onClick={() => gotoLink()}
              >
                InCom
              </span>
              <img src={ThreeDot} width={24} height={24} />
            </div>
            <SidebarRight />
          </div>
        </div>
        <div
          className={`exit-icon ${collapseRight ? "rotate-180" : ""}`}
          onClick={expandRight}
          style={{ width: 24 }}
        >
          <img src={ExitIcon} style={{ width: 24, height: 24 }} />
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  title: PropTypes.string,
  isExpand: PropTypes.bool,
  setIsExpand: PropTypes.Function,
};

export default SideBar;
