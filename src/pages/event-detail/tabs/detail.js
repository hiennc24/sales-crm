import { Card, Col, Row } from 'antd'
import React, { useState, useEffect } from 'react'
import FormatText3 from '../../../utils/FormatText3'
import { GGMap } from '../../social/components/new-post/components';
import IconWord from "../../../assets/images/icon-word.svg";
import IconPdf from "../../../assets/images/icon-pdf.svg";
import IconExcel from "../../../assets/images/icon-excel.svg";
import IconOther from "../../../assets/images/icon-other-file.svg";
import DownloadIcon from "../../../assets/new/common/download.png";
import PropTypes from 'prop-types';
import '../EventDetail.scss';

export const Detail = ({
  event,
}) => {
  const [docFiles, setDocFiles] = useState(event?.DocFile);

  useEffect(() => {
    setDocFiles(event.DocFile)
  }, [event.DocFile])

  const getIconFile = (e) => {
    if (e.includes(".doc")) {
      return IconWord;
    } else if (e.includes(".xlsx")) {
      return IconExcel;
    } else if (e.includes(".pdf")) {
      return IconPdf;
    }
    return IconOther;
  };

  return (
    <Card>
      <div className="content-detail-event">
        <div>
          <p className="title-content m--0">Mô tả sự kiện</p>
          <div className='content-format-description'>
            <FormatText3 content={event?.Content}></FormatText3>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <p className="title-content m--0">Địa chỉ chi tiết: <span className='address-detail'>{event?.Address}</span></p>
        </div>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap' }}>
          {docFiles?.map((file, index) => (
            <button className="file-preview-wrapper-event" key={index}>
              <div className="file-icon">
                <img src={getIconFile(file)} alt="pdfIcon" />
              </div>
              <p className="file-name">{file}</p>
              <a href={'https://filemanager.crmdemo.net/uploads/' + file}>
                <img
                  className="file-download-icon"
                  src={DownloadIcon}
                  alt="x"
                />
              </a>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          {event?.Lat && event?.Lon && <GGMap lat={event?.Lat ? event?.Lat : null} lng={event?.Lon ? event?.Lon : null} />}
        </div>
      </div>
    </Card>
  )
}

Detail.propTypes = {
  event: PropTypes.object,
}
