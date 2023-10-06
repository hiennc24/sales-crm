import React, { useEffect, useState } from "react";
import './ChatDocument.scss'
import { ArrowLeftOutlined } from "@ant-design/icons";
import API from "../../../../../services/api";
import PropTypes from "prop-types";
import {
  getUrlImage,
  getUrlFile
} from "../../../../../utils";
import { Tooltip, Image } from "antd";
import MediaPreview from './MediaPreview'
import IconPdf from "../../../../../assets/images/icon-pdf.svg";
import IconExcel from "../../../../../assets/images/icon-excel.svg";
import IconOther from "../../../../../assets/images/icon-other-file.svg";
import IconWord from "../../../../../assets/images/icon-word.svg";

const ChatDocument = ({conversationId, backHandle}) => {
  const [files, setFiles] = useState([])
  const [key, setKey] = useState(0)
  const [isPreview, setIsPreview] = useState(false)
  const [indexFile, setIndexFile] = useState(0)

  useEffect(() => {
    if (conversationId) {
      API.chat.getFile(+conversationId).then(rs => {
        console.log(rs)
        if(rs.data.code == 200) {
          setFiles(rs.data.data)
        }
      })
    }
  }, [conversationId])

  const getFiles = () => {
    return files.filter(r => {
      if(key == 0) {
        return r.Type != 3
      }
      return r.Type == 3
    })
  }

  const getSrcFileType = (name) => {
    if(name.split(".")[name.split(".").length - 1] == 'pdf') {
      return IconPdf;
    } else if(name.split(".")[name.split(".").length - 1] == 'doc' || name.split(".")[name.split(".").length - 1] == 'docx') {
      return IconWord;
    } else if(name.split(".")[name.split(".").length - 1] == 'xls' || name.split(".")[name.split(".").length - 1] == 'xlsx') {
      return IconExcel;
    }

    return IconOther
  }

  const dataFileRender = () => {
    return <>
      {
        getFiles().map((r, i) => {
          return <div key={i} className={key == 0 ? 'data-item' : 'data-item__document'}>
            {
              r.Type == 1 ? 
                <Image src={getUrlImage(0, 0, r.Files ?? "")} width="100%" height="100%"/>
              : 
              (r.Type == 2 ? 
                <video controls>
                  <source src={getUrlFile(r.Files ?? "")}></source>
                </video>:
              <div className='con-file'>
                <img src={getSrcFileType(r.Files)}/>
                    <a
                      href={getUrlFile(r.Files)}
                      target={"_blank"}
                      rel="noreferrer"
                      className='file-name'
                    >
                      {r.Files}
                    </a>
              </div>)
            }
          </div>
        })
      }
    </>
  }

  return <div className='body-container'>
    <div className='document-header'>
      <Tooltip title="Quay lại">
        <div className='back-btn' onClick={() => backHandle()}><ArrowLeftOutlined /></div>
      </Tooltip>
        <div className='tab-title'>
          <div className={`tab-title__item ${key == 0 ? 'active': ''}`} onClick={() => setKey(0)}>Ảnh/Video</div>
          <div className={`tab-title__item  ${key == 1 ? 'active': ''}`} onClick={() => setKey(1)}>File</div>
        </div>
    </div>
    <div className='document-content'>
      <div className={key != 0 ? 'content-show document': 'content-show'}>
        {dataFileRender()}
      </div>
    </div>
    {
      isPreview &&
      <MediaPreview listMedia={getFiles()} index={indexFile} close={() => setIsPreview(false)}/>
    }
  </div>
}

ChatDocument.propTypes = {
  conversationId: PropTypes.any,
  backHandle: PropTypes.func
};

export default ChatDocument;