// import PropTypes from "prop-types";
/* eslint-disable react/prop-types */
import { getUrlFile, getUrlImage } from "../../utils";
import React from "react";
import { Row, Col, Tooltip } from "antd";
// import wordIcon from "../../assets/new/event/word.svg";
// import IconPdf from "../../assets/images/icon-file/icon_pdf.svg";
// import IconExcel from "../../assets/images/icon-excel.svg";
// import IconZip from "../../assets/images/icon-zip.svg";
// import IconRar from "../../assets/images/icon-rar.svg";
// import IconOther from "../../assets/images/icon-other-file.svg";
import Delete from "../../assets/new/create-post/close2.svg";
import DeteleImg from "../../assets/new/common/delete-img.svg";
import IconExcel from "../../assets/new/create-post/excel.svg";
import IconPdf from "../../assets/new/create-post/pdf.svg";
import wordIcon from "../../assets/new/create-post/word.svg";
import IconRar from "../../assets/new/create-post/rar.svg";
import IconZip from "../../assets/new/create-post/zip.svg";
import IconOther from "../../assets/new/create-post/other.svg";
import DownloadIcon from "../../assets/images/dowload.svg";
import {Helpers} from '../../utils/helpers'
import "./style.scss";

const RenderFiles = ({ filesList }) => {
  // const getUrl = (item) => {
  //   if (typeof item === "string") return getUrlFile(item);
  //   else return getUrlFile(item.Files);
  // };
  // const getName = (item) => {
  //   if (typeof item === "string") return item;
  //   else return item.Name;
  // };
  // const getIcon = (item) => {
  //   if (typeof item === "string") {
  //     var string = item.split(".");
  //     var _string = string[string.length - 1];
  //     if (_string.includes("doc")) {

  //       return wordIcon;
  //     } else if (_string.includes("pdf")) {
  //       return IconPdf;
  //     } else if (_string.includes("xls")) {
  //       return IconExcel;
  //     }
  //   }
  //   if (typeof item.Name === "string") {
  //     var string = item.Name.split(".");
  //     var _string = string[string.length - 1];
  //     if (_string.includes("doc")) {

  //       return wordIcon;
  //     } else if (_string.includes("pdf")) {
  //       return IconPdf;
  //     } else if (_string.includes("xls")) {
  //       return IconExcel;
  //     }
  //   }

  //   return wordIcon;
  // }

  const getIcon = (item) => {
    if (typeof item === "string") {
      var string = item.split(".");
      var _string = string[string.length - 1];
      if (_string.includes("doc")) {
        return wordIcon;
      } else if (_string.includes("pdf")) {
        return IconPdf;
      } else if (_string.includes("xls")) {
        return IconExcel;
      } else if (_string.includes("rar")) {
        return IconRar;
      } else if (_string.includes("zip")) {
        return IconZip;
      } else return IconOther;
    }
    return getIcon(item.Files);
  };
  const getUrl = (item) => {
    if (typeof item === "string") return getUrlFile(item);
    else return getUrlFile(item.Files);
  };

  const getName = (item) => {
    if (typeof item === "string") return item;
    else return item.Name;
  };

  return (
    // <div>
    //   {filesList.map((f, index) => (
    //     <li key={index}>
    //       <a href={getUrl(f)} target={"_blank"} rel="noreferrer">
    //         <img src={getIcon(f)} alt="" />
    //         {getName(f)}
    //       </a>
    //     </li>
    //   ))}
    // </div>
    <div className="doc-right-content">
      <Row>
        {filesList?.map((f, index) => (
          <div key={index}>
            <div className="doc-right-content-item">
              <img src={getIcon(f)} alt="" style={{ height: 18 }} />
              <div className="doc-right-content-right">
                <p style={{ fontSize: 12 }}>{getName(f)}</p>
              </div>

              <Tooltip  placement='bottom' title={'Tải xuống'}>
                <img
                  src={DownloadIcon}
                  // onClick={() => window.open(getUrl(f), "_blank")}
                  onClick={() => Helpers.downloadURL(getUrl(f),getName(f))}
                  style={{ height: 18, marginLeft: 10 }}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </Row>
    </div>
  );
};
export default RenderFiles;
