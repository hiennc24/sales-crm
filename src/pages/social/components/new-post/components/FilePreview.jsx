/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import '../NewPost.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
// import IconPdf from "../../../../../assets/images/icon-pdf.svg";
// import IconZip from "../../../../../assets/images/icon-zip.svg";
// import IconRar from "../../../../../assets/images/icon-rar.svg";
// import IconExcel from "../../../../../assets/images/icon-excel.svg";
// import IconWord from "../../../../../assets/images/icon-word.svg";
// import IconOther from "../../../../../assets/images/icon-other-file.svg";
// import Delete from '../../../../../assets/new/common/delete.svg';
import Delete from '../../../../../assets/new/create-post/close2.svg';
import DeteleImg from '../../../../../assets/new/common/delete-img.svg';
import IconExcel from '../../../../../assets/new/create-post/excel.svg';
import IconPdf from '../../../../../assets/new/create-post/pdf.svg';
import IconWord from '../../../../../assets/new/create-post/word.svg';
import IconRar from '../../../../../assets/new/create-post/rar.svg';
import IconZip from '../../../../../assets/new/create-post/zip.svg';
import IconOther from '../../../../../assets/new/create-post/other.svg';

const FilePreview = ({ filesPreview, handleDeleteFile, handleUploadFiles, postType, type = 'create' }) => {

  const renderIcon = (file) => {
    const name = file.Name ? file.Name : file.name;
    if (type !== 'create') {
      if (name.includes('pdf')) {
        return <img style={{ height: 18 }} src={IconPdf} alt="pdf" />;
      } else if (name.includes('zip')) {
        return <img style={{ height: 18 }} src={IconZip} alt="zip" />;
      } else if (name.includes('rar')) {
        return <img style={{ height: 18 }} src={IconRar} alt="rar" />;
      } else if (name.includes('xlxs')) {
        return <img style={{ height: 18 }} src={IconExcel} alt="excel" />;
      } else if (name.includes('doc') || name.includes('docx')) {
        return <img style={{ height: 18 }} src={IconWord} alt="word" />;
      } else {
        return <img style={{ height: 18 }} src={IconOther} alt="other" />;
      }
    }

    if (file.type) {
      if (file.type.includes('pdf')) {
        return <img style={{ height: 18 }} src={IconPdf} alt="pdf" />;
      } else if (file.type.includes('zip')) {
        return <img style={{ height: 18 }} src={IconZip} alt="zip" />;
      } else if (file.type.includes('rar')) {
        return <img style={{ height: 18 }} src={IconRar} alt="rar" />;
      } else if (file.type.includes('sheet')) {
        return <img style={{ height: 18 }} src={IconExcel} alt="excel" />;
      } else if (file.type.includes('document') || file.type.includes('msword')) {
        return <img style={{ height: 18 }} src={IconWord} alt="word" />;
      } else {
        return <img style={{ height: 18 }} src={IconOther} alt="other" />;
      }
    }
  };

  return <>
    <PerfectScrollbar style={{ display: 'flex', overflowX: 'auto', width: '100%',flexDirection:'column' }}>

      {/* <div className="add-file__boder">
        <label htmlFor='fileInput'>
          <p style={{ width: '100%', marginBottom: 0, height: '100%', cursor: 'pointer' }}>+ Thêm file</p>
        </label>
        <input
          type='file'
          name='file'
          id='fileInput'
          multiple
          onChange={(e) => handleUploadFiles(e)}
          style={{ display: 'none' }}
        />
      </div> */}
      {filesPreview && filesPreview.map((file, index) => {
        return postType != 'event' ?
          (
            <div className="file-preview-wrapper" key={index} style={{ display: 'flex', marginBottom: 5 }}>
              <div style={{ display: 'flex',width:'100%',justifyContent:'space-between', backgroundColor: 'rgba(39, 39, 39, 0.05)', padding: 10, borderRadius: 2, marginBottom: 2, }}>
               <div style={{display:'flex'}}>
                {renderIcon(file)}
                <p style={{
                  margin: 0, paddingLeft: 6, paddingRight: 10, fontSize: 12,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {type === 'create' && file.name }
                  {type !== 'create' && file.Name }
                  {type !== 'create' && file.name }
                </p>
               </div>
                <img
                  src={Delete}
                  alt="x"
                  onClick={() => handleDeleteFile(file, index)}
                  style={{ cursor: 'pointer' }}
                />
              </div>

            </div>
          ) :
          (
            <div className="file-preview-wrapper" key={index} style={{ display: 'flex', marginBottom: 5 }}>
              <div style={{ display: 'flex', marginRight: '10px', backgroundColor: 'rgba(39, 39, 39, 0.05)', padding: 4, borderRadius: 2, marginBottom: 2, }}>
                {renderIcon(file)}
                <p style={{
                  margin: 0, paddingLeft: 6, paddingRight: 10, fontSize: 12,
                  whiteSpace: 'nowrap',
                  maxWidth: 100,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {type === 'create' && file.name }
                  {type !== 'create' && file.Name }
                  {type !== 'create' && file.name }
                </p>
                <img
                  src={Delete}
                  alt="x"
                  onClick={() => handleDeleteFile(file, index)}
                  style={{ cursor: 'pointer' }}
                />
              </div>

            </div>
          )
      })
      }
    </PerfectScrollbar>
  </>
};

export default FilePreview;