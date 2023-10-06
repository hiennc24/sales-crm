// /* eslint-disable react/prop-types */
// import { CaretDownOutlined, CaretUpOutlined, UserOutlined, HomeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
// import {
//   Button,
//   Select,
//   Alert,
//   DatePicker,
//   Dropdown,
//   Menu,
//   message,
//   Tooltip,
//   Row,
//   Col,
//   Tag,
//   Space
// } from 'antd';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectGroupDetail } from '../../Group.selector';
// import API from '../../../../services/api';
// import TagsModal from '../tags-post/ModalTagPost';
// import { LocationModal } from '../../../social/components/new-post/components/index';
// import { selectUser } from '../../../../stores/global/global.selector';
// import './NewPost.scss';
// import { getUrlFile } from '../../../../utils';
// import Calendar from '../../../../assets/new/create-post/lich.svg';
// import PropTypes from 'prop-types';
// import GGMap from "./gg-map/Map";
// import addIcon from '../../../../assets/images/add-icon.svg';
// import addUserIcon from '../../../../assets/images/add-user-icon.svg';
// import avatar from '../../../../assets/images/avatar_default.jpg';
// import calendarIcon from '../../../../assets/new/create-post/lich.svg';
// import closeImageIcon from '../../../../assets/images/close-image-icon.svg';
// import fileInputIcon from '../../../../assets/images/file-input-icon.svg';
// // import down from '../../../../assets/images/down.svg';
// import imageIcon2 from '../../../../assets/images/image-icon-2.svg';
// import locationIcon from '../../../../assets/images/location-icon.svg';
// // import mswordIcon from '../../../../assets/images/msword-icon.svg';
// // import pdfIcon from '../../../../assets/images/pdf-icon.svg';
// // import PrivacyLock from '../../../../assets/images/privacy_lock.svg';
// // import publicIcon from '../../../../assets/images/public-icon.svg';
// import xIcon from '../../../../assets/images/x-icon.svg';

// import wordIcon from "../../../../assets/images/icon-file/icon_word.svg";
// import IconPdf from "../../../../assets/images/icon-file/icon_pdf.svg";
// import IconExcel from "../../../../assets/images/icon-excel.svg";
// import IconZip from "../../../../assets/images/icon-zip.svg";
// import IconRar from "../../../../assets/images/icon-rar.svg";
// import IconOther from "../../../../assets/images/icon-other-file.svg";
// import Icon from "../../../../assets/new/common/icon.svg";
// import IconUploadImage from '../../../../assets/new/create-post/anh.svg';
// import IconLocation from '../../../../assets/new/create-post/dia-diem.svg';
// import IconCalendar from '../../../../assets/new/create-post/lich.svg';
// import IconTag from '../../../../assets/new/create-post/tag.svg';
// import IconUploadFile from '../../../../assets/new/create-post/tai-len.svg';
// import IconDelete from '../../../../assets/new/common/delete.svg';
// import ExtendEvent from './ExtendEvent';
// import { useHistory } from 'react-router-dom';
// import { Title } from 'styled-icons/material';
// import { EventTimePicker } from '../../../social/components/new-post/components';
// import ImagesPreview from '../../../social/components/new-post/components/ImagesPreview';
// import FilePreview from '../../../social/components/new-post/components/FilePreview';
// // const list_privacy = [
// //     {
// //         value: 0,
// //         lable: 'Công khai',
// //         icon: publicIcon
// //     },
// //     {
// //         value: 1,
// //         lable: 'Riêng tư',
// //         icon: PrivacyLock
// //     },
// // ]

// // eslint-disable-next-line react/prop-types
// const TypeofPosts = ({
//   type,
//   refeshData,
//   changeType,
//   isEditType,
//   postData,
//   hideModal,
//   data
// }) => {
//   const [location, setLocation] = useState(null);
//   // const [privacy, setPrivacy] = useState(list_privacy[0]);
//   const groupDetail = useSelector(selectGroupDetail());
//   const [content, setContent] = useState('');
//   // const [content, setContent] = useState('');
//   const [imagesPreview, setImagesPreview] = useState([]);
//   const [isValidImages, setIsValidImages] = useState(true);
//   const [messErr, setMessErr] = useState('');
//   const [listEmployees, setListEmployees] = useState([]);
//   const [title, setTitle] = useState('')
//   const [startTime, setStartTime] = useState(moment());
//   const [endTime, setEndTime] = useState(moment());
//   const [timeCreatePost, setTimeCreatePost] = useState(null);
//   const [publicDate, setPublicDate] = useState();
//   const [isShowAddTags, showAddTags] = useState(false);
//   const [listImagesId, setListImagesId] = useState([]);
//   const [isPublic, setIsPublic] = useState(true);
//   const [listFilesId, setListFilesId] = useState([]);
//   const [filesInEditMode, setFilesInEditMode] = useState(data?.Files || []);
//   const [tags, setTags] = useState([]);
//   const [listTags, setListTag] = useState([]);
//   const [isShowMap, showMap] = useState(false);
//   const [isShowDate, setIsShowDate] = useState(false);
//   const [votes, setVotes] = useState(isEditType ? data?.Details?.Details : []);
//   const [taskItems, setTaskItems] = useState([{}]);
//   const [pollTime, setPollTime] = useState(data?.Details?.Days || 3);
//   const history = useHistory();
//   const [isExtend, setIsExtend] = useState(false);
//   const [showTagModal, setShowTagModal] = useState(false);
//   const [listCheck, setListCheck] = useState([])
//   const [selectedValueTags, setSelectedValueTags] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [optionsUser, setOptionsUser] = useState([]);
//   const [filesPreview, setFilesPreview] = useState([]);
//   const [filesEvent, setFilesEvent] = useState([]);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [optionsEmployees, setOptionsEmployees] = useState([]);
//   const [quantityFileUpload, setQuantityFileUpload] = useState(0)
//   const [selectedPriority, setSelectedPriority] = useState([]);
//   const [isCloseCalendar, setIsCloseCalendar] = useState(false);
//   const [priority, setPriority] = useState(4)
//   let user = useSelector(selectUser());
//   const userJS = user?.toJS ? user.toJS() : user;
//   const userInfo = useSelector(state => state.get('userProfile').get('profile'));
//   useEffect(() => {
//     if (isEditType) {
//       setContent(postData.Content);
//       setListImagesId(postData.Files.filter((item) => item.Type === 1));
//       setListFilesId(postData.Files.filter((item) => item.Type === 3));
//       setLocation({
//         position: {
//           lat: postData.Lat,
//           lng: postData.Lon,
//         },
//         title: postData.Address,
//       });
//       setTags(postData.Tags);
//     }
//   }, [postData.Id, isEditType]);
//   useEffect(() => {
//     setOptionsEmployees(listEmployees.filter(item => item.UserId != userInfo.UserId).map((item, index) => {
//       return (
//         <Select.Option key={index} style={{ width: '100%' }}>
//           <UserOutlined style={{ marginRight: '5px' }} />{item.FullName}
//         </Select.Option>)
//     }))

//   }, [listEmployees.length])
//   useEffect(() => {
//     setOptionsUser(listTags.map((item, index) => {
//       return (
//         <Select.Option key={index} style={{ width: '100%' }}>
//           {
//             item.TagType == 1 &&
//             <UserOutlined style={{ marginRight: '5px' }} />
//           }
//           {
//             item.TagType == 2 &&
//             <UsergroupAddOutlined style={{ marginRight: '5px' }} />
//           }
//           {
//             item.TagType == 3 &&
//             <HomeOutlined style={{ marginRight: '5px' }} />
//           }
//           {item.FullName}
//         </Select.Option>)
//     }))

//   }, [listTags.length])
//   useEffect(() => {
//     console.log(type);
//     const listItem = [];
//     if (type === 'event' && listEmployees.length === 0) {
//       API.employee.getListEmployees().then((resp) => {
//         resp.data.forEach((i) => { listItem.push({ UserId: i.UserId, Email: i.Email, FullName: i.FullName, TagType: 1 }) })
//       })

//       listItem.sort(function (a, b) {
//         if (a.FullName < b.FullName) { return -1; }
//         if (a.FullName > b.FullName) { return 1; }
//         return 0;
//       })
//       setListEmployees(listItem)
//     }
//   }, [type])
//   useEffect(() => {
//     if (userInfo.size == 0) return

//     const listItem = [];

//     Promise.all([
//       API.employee.getListEmployees(),
//       API.group.getAllGroup()
//     ])
//       .then((rs) => {
//         if (rs) {
//           if (rs[0].code == 200) {
//             rs[0].data.forEach((i) => { if (i.UserId != userInfo.Id && i.Email != userInfo.Email) listItem.push({ Id: i.UserId, Email: i.Email, FullName: i.FullName, TagType: 1 }) })
//           }

//           if (rs[1].code == 200) {
//             rs[1].data.forEach((i) => { listItem.push({ Id: i.Id, Email: "", FullName: i.Name, TagType: 2 }) })
//           }
//         }
//         //sort by name here!

//         listItem.sort(function (a, b) {
//           if (a.FullName < b.FullName) { return -1; }
//           if (a.FullName > b.FullName) { return 1; }
//           return 0;
//         })

//         listItem.unshift({ Id: -1, Email: "", FullName: "Toàn công ty", TagType: 3 });
//         listItem.unshift({ Id: userInfo.Id, Email: userInfo.Email, FullName: "Mình tôi", TagType: 1 });

//         setListTag(listItem);
//       })

//   }, [userInfo]);


//   const handleAfterSubmit = () => {
//     setSelectedValueTags([])
//     setTitle('')
//     setContent('')
//     setTags([])
//     setImagesPreview([])
//     setFilesPreview([])
//     setLocation(null)
//     setPriority(null)
//     setTimeCreatePost(null);
//     setIsValidImages(true);
//     setIsExtend(false)
//     setSelectedPriority([])
//     setIsCloseCalendar(!isCloseCalendar)
//     setListCheck([])
//     setPollTime(3)
//     setVotes([])
//     setEmployees([])
//     setSelectedEmployees([])
//     setFilesEvent([])
//     setQuantityFileUpload(0);
//   }

//   const handleSelectPriority = (value) =>{
//     if(value === 4){
//       setPriority(null); 
//       setSelectedPriority(null);
//     }
//     else{
//       setPriority(value); 
//       setSelectedPriority(value)
//     }
//   }
//   useEffect(() => {
//     setIsShowDate(false)
//   }, [isCloseCalendar])
//   function handleChange(value, type = 'Tags') {
//     if (type === 'Tags') {
//       setTags(
//         value.map((rs) => listTags[rs])
//       )
//       setSelectedValueTags(value)
//     }
//     else {
//       setEmployees(
//         value.map((rs) => listTags[rs])
//       )
//       setSelectedEmployees(value)
//     }
//   }

//   const handleChangeContent = (e) => {
//     setContent(e.nativeEvent.target.value);
//   };
//   const handleDeleteFilesModeEdit = (Files) => {
//     const newFilesList = filesInEditMode.filter((file) => file.Files !== Files);
//     setFilesInEditMode(newFilesList);
//   };

//   const handleUploadImages = (event) => {
//     let checkIsValidImages = true;
//     let validImage = imagesPreview.slice();
//     for (const image of event.target.files) {
//       if (image.size > 1024 * 1024 * 5) {
//         setMessErr(
//           'Dung lượng ảnh không vượt quá 5 Mb hoặc định dạng ảnh khác pnf, jpeg, gif.'
//         );
//       } else {
//         validImage.push(image);
//         // handleUploadFile(image, "image");
//       }
//     }
//     setIsValidImages(checkIsValidImages);
//     setImagesPreview(validImage);
//   };
//   const handleUploadFileExtend = (fileList) => {
//     var newFile = []
//     if (fileList.length !== 0) {
//       setQuantityFileUpload(fileList.length)
//       for (const item of fileList) {
//         const formData = new FormData();
//         formData.append("files", item)
//         API.uploadFile.uploadFile(formData, item.typeFile)
//           .then(res => {
//             API.group.uploadFile({
//               code: item.typeFile === 'image' ? res.imageId : res.docsId,
//               type: item.typeFile === 'image' ? 1 : 3,
//               name: item.name,
//             })
//               .then(dataFile => {
//                 newFile.push(dataFile.data)
//               })
//               .catch(() => {
//                 window.alert(`Tải tài liệu ${item.name} thất bại`)
//                 return
//               })
//           })
//       }
//       setFilesEvent(filesEvent.concat(newFile))
//       setTimeout(() => {
//         console.log("NEW FILE ", filesEvent)
//         handleSubmit()
//       }, 1000)

//     }
//     else {
//       handleSubmit()
//     }
//   }
//   const handleUploadFiles = (event) => {
//     for (const file of event.target.files) {
//       // handleUploadFile(file, "document");
//     }
//     setFilesPreview([...filesPreview, ...event.target.files]);
//   };
//   const handleDeleteFile = (file, index) => {
//     setFilesPreview(filesPreview.filter((img, i) => i !== index));
//     // dispatch(deleteFile(file));
//   };
//   const filterOptionTag = (input, option) => {
//     return listTags[option.key].FullName?.toLowerCase().indexOf(input.toLowerCase()) >= 0 || listTags[option.key].Email?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
//   }
//   const handleDeleteImage = (index) => {
//     setListImagesId(listImagesId.filter((img, i) => i !== index));
//   };
//   const onChangeVote = (index, value) => {
//     let newData = { ...votes[index] };
//     newData.Title = value;
//     const newVoteList = votes.map((val, i) => {
//       if (i == index) return newData;
//       return val;
//     });
//     setVotes(newVoteList);
//   }

//   const setTimeCreate = (date) => {
//     if (date) {
//       setTimeCreatePost(moment(date).format('YYYY-MM-DD hh:mm:ss'));
//     } else {
//       setTimeCreatePost(null);
//     }
//   };



//   // const menu = (
//   //     <Menu onClick={(e) => setPrivacy(list_privacy[parseInt(e.key)])}>
//   //         {list_privacy.map((privacy) => (
//   //             <Menu.Item key={privacy.value}>
//   //                 <a className="item-privacy">
//   //                     <img src={privacy.icon} alt="" />
//   //                     <span className="label-privacy-post">{privacy.lable}</span>
//   //                 </a>
//   //             </Menu.Item>
//   //         ))}
//   //     </Menu>
//   // );

//   const addPostView = () => {
//     const configData = {
//       content,
//       title: title,
//       employees,
//       isPost: 1,
//       isPin: 0,
//       isPublic,
//       tags,
//       lat: location?.position ? location.position.lat : 0,
//       lon: location?.position ? location.position.lng : 0,
//       file: filesInEditMode,
//       imagesPreview,
//       filesPreview,
//       priority: priority || 0
//     };
//     if (timeCreatePost) {
//       configData.publicDate = timeCreatePost;
//     }
//     if (content === '') {
//       message.error('Nhập vào nội dung của bài viết!');
//     } else {
//       if (isEditType) {
//         var data = {
//           id: postData.Id,
//           title: title,
//           content: content,
//           employees: [],
//           groupId: groupDetail.Id,
//           isPost: 1,
//           isPin: 0,
//           isPublic: true,
//           filesPreview,
//           tags: tags,
//           lat: location.position ? location.position.lat : 0,
//           lon: location.position ? location.position.lng : 0,
//           address: location.title ? location.title : null,
//         };
//         API.posts.editPost(data).then((res) => {
//           console.log(res);
//           if (res?.code === 200) {
//             setContent('');
//             setPostTitle('');
//             refeshData(res.data);
//             hideModal();
//             message.success('Chỉnh sửa bài viết thành công');
//           } else {
//             message.error('Đã xảy ra lỗi, vui lòng thử lại!');
//           }
//         });
//       } else {
//         switch (type) {
//           case 'post':
//             console.log("POST", configData)
//             dispatch(createPost(configData));
//             handleAfterSubmit()
//             break;
//           case 'event':
//             const dataEvent = {
//               isPublic,
//               title: title,
//               content,
//               fromDate: moment(startTime).format('YYYY-MM-DD'),
//               toDate: moment(endTime).format('YYYY-MM-DD'),
//               isAllDay: true,
//               sMyCalendar: true,
//               repeatType: true,
//               avaiablity: 1,
//               isPrivate: isPublic ? 0 : 1,
//               employees,
//               isPost: true,
//               Date: moment().format('YYYY-MM-DD'),
//               isImportant: 1,
//               file: filesEvent,
//               publicDate: timeCreatePost,
//               checkList: listCheck,
//               priority: priority || 0
//             }
//             console.log("DATA_EVENT", dataEvent)
//             dispatch(
//               createEvent(dataEvent)
//             );
//             handleAfterSubmit()
//             break;
//           case 'task':
//             dispatch(
//               createVote({
//                 isPublic,
//                 title: title,
//                 content,
//                 employees,
//                 groupId: data?.GroupId || 0,
//                 isPost: 1,
//                 isPin: 0,
//                 tags,
//                 file: filesInEditMode,
//                 imagesPreview,
//                 filesPreview,
//                 details: [
//                   {
//                     Title: content,
//                     Order: 1,
//                     IsMultipleAnswer: 1,
//                     Answer: votes,
//                   },
//                 ],
//                 days: pollTime,
//                 publicDate: timeCreatePost,
//                 priority: priority || 0
//               })
//             );
//             handleAfterSubmit()

//             break;
//         }
//       }
//     }
//   };


//   const priorityMenu = (
//     <Menu>
//       <Menu.Item key='Quan trọng'>
//         <div className='item-dropdown-select'>
//           <div className="square hot"></div>
//           <span className='text-select'>Quan trọng</span>
//         </div>
//       </Menu.Item>
//       <Menu.Item key='Chú ý'>
//         <div className='item-dropdown-select'>
//           <span className='label-priority-post'>Chú ý</span>
//         </div>
//       </Menu.Item>
//       <Menu.Item key='Lưu tâm'>
//         <div className='item-dropdown-select'>
//           <span className='label-priority-post'>Lưu tâm</span>
//         </div>
//       </Menu.Item>
//       <Menu.Item key='Blank'>
//         <div className='item-dropdown-select'>
//           <span className='label-priority-post'>Blank</span>
//         </div>
//       </Menu.Item>
//     </Menu>
//   );

//   const renderTagsUser = () => {
//     var firstTag = tags[0];
//     return (
//       <div className='item-horizontal bottom-0'>
//         <span className='tags-with'>{'cùng với'}</span>
//         <span className='tags-with'>
//           <strong>{firstTag.FullName} </strong>
//           {tags.length > 1 ? 'và' : ''}
//         </span>
//         {tags.length > 1 && (
//           <Dropdown overlay={listTags}>
//             <a className='item-privacy' onClick={(e) => e.preventDefault()}>
//               <span className='label-privacy-post'>
//                 {tags.length - 1 + ' người khác'}
//               </span>
//               <CaretDownOutlined />
//             </a>
//           </Dropdown>
//         )}
//       </div>
//     );
//   };

//   const isDocument = (fileName) => {
//     if (fileName) {
//       var arr = fileName.split('.');
//       let type = arr[arr.length - 1];
//       const doc_type = ['doc', 'docx'];
//       return doc_type.indexOf(type) !== -1;
//     }
//   };

//   const isFilePdf = (fileName) => {
//     if (fileName) {
//       var arr = fileName.split('.');
//       let type = arr[arr.length - 1];
//       const doc_type = ['pdf'];
//       return doc_type.indexOf(type) !== -1;
//     }
//   };

//   const isExcel = (fileName) => {
//     if (fileName) {
//       var arr = fileName.split('.');
//       let type = arr[arr.length - 1];
//       const doc_type = ['xlsx', 'xls', 'xlsm'];
//       return doc_type.indexOf(type) !== -1;
//     }
//   };

//   const isRar = (fileName) => {
//     if (fileName) {
//       var arr = fileName.split('.');
//       let type = arr[arr.length - 1];
//       const doc_type = ['rar'];
//       return doc_type.indexOf(type) !== -1;
//     }
//   };

//   const isZip = (fileName) => {
//     if (fileName) {
//       var arr = fileName.split('.');
//       let type = arr[arr.length - 1];
//       const doc_type = ['zip'];
//       return doc_type.indexOf(type) !== -1;
//     }
//   };

//   const renderIconFile = (fileName) => {
//     console.log(isRar(fileName));
//     if (isDocument(fileName)) {
//       return IconWord;
//     } else if (isFilePdf(fileName)) {
//       return IconPdf;
//     } else if (isExcel(fileName)) {
//       return IconExcel;
//     } else if (isRar(fileName)) {
//       return IconRar;
//     } else if (isZip(fileName)) {
//       return IconZip;
//     } else {
//       return IconOther;
//     }
//   };

//   const navigateUserProfile = () => {
//     history.push('/profile');
//   };

//   const getIcon = (item) => {
//     if (typeof item === "string") {
//       var string = item.split(".");
//       var _string = string[string.length - 1];
//       if (_string.includes("doc")) {
//         return wordIcon;
//       } else if (_string.includes("pdf")) {
//         return IconPdf;
//       } else if (_string.includes("xls")) {
//         return IconExcel;
//       } else if (_string.includes("rar")) {
//         return IconRar;
//       } else if (_string.includes("zip")) {
//         return IconZip;
//       } else return IconOther
//     }
//     return getIcon(item.Files);
//   };

//   return (
//     <div className='post-group'>
      
//       <div className='post-content'>
//         {type === 'post' && (
//           <>
//             <div className='post-row'>
//               <div className='post-row-label' style={{ textAlign: 'right', width: 55, color: '#32CA2C9' }}>
//                 <i>Tới:</i>
//               </div>
//               <Select
//                 mode="multiple"
//                 className={'post-input event-name-input select-tags'}
//                 allowClear={true}
//                 value={selectedValueTags}
//                 style={{ width: '100%', border: 'none' }}
//                 filterOption={filterOptionTag}
//                 onChange={(value) => { handleChange(value, 'Tags') }}

//               >
//                 {optionsUser}
//               </Select>
//             </div>
//             <div className='post-row'>
//               <p className='post-row-label' style={{ textAlign: 'right', width: 55, color: '#0498c1' }}>
//                 <i>Chủ đề:</i>
//               </p>
//               <input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 style={{ backgroundColor: '#ffff005e' }}
//                 placeholder=''
//                 className='post-input event-name-input font-weight--bold'
//               />
//             </div>
//             <div className='post-row'>
//               <textarea
//                 value={content}
//                 onChange={(e) => handleChangeContent(e)}
//                 placeholder='Nội dung'
//                 className='post-input'
//                 rows='3'
//               />
//             </div>
//           </>
//         )}

//         {type === 'event' && (
//           <>
//             <div className='post-row'>
//               <p className='post-row-label' style={{ textAlign: 'right', width: 120, color: '#0498c1' }}>
//                 <i>Tên sự kiện:</i>
//               </p>
//               <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ backgroundColor: '#ffff005e' }} placeholder='' className='post-input event-name-input' />
//             </div>
//             <div className='post-row'>
//               <p className='post-row-label' style={{ textAlign: 'right', width: 120, color: '#0498c1' }}>
//                 <i>Mô tả sự kiện:</i>
//               </p>
//               <input
//                 style={{ backgroundColor: '#ffff005e' }}
//                 placeholder=''
//                 className='post-input event-name-input'
//                 onChange={(e) => setContent(e.target.value)}
//               />
//             </div>
//             <div className='post-row event-time-row'>
//               <p className='post-row-label' style={{ textAlign: 'right', width: 120, color: '#0498c1' }}>
//                 <i>Thời gian tổ chức:</i>
//               </p>

//               <EventTimePicker
//                 startTime={startTime}
//                 setStartTime={setStartTime}
//                 setEndTime={setEndTime}
//                 endTime={endTime}
//               />
//             </div>
//             <Row gutter={10} className='take-care'>
//               <Col>
//                 <div className='take-title'>
//                   <b>Phụ trách</b>
//                 </div>
//               </Col>
//               <Col>
//                 <Select
//                   mode="multiple"
//                   className={'post-input event-name-input select-tags'}
//                   allowClear={true}
//                   value={selectedEmployees}
//                   style={{ width: '100%', border: 'none' }}
//                   filterOption={filterOptionTag}
//                   onChange={(value) => handleChange(value, 'Employees')}
//                 >
//                   {optionsEmployees}
//                 </Select>
//               </Col>
//             </Row>
//             <div className='post-row '>
//               <div
//                 className='expandabled mb--16'
//                 onClick={() => setIsExtend(!isExtend)}
//               >
//                 <p className='expanded-text'>
//                   {!isExtend ? 'Mở rộng' : 'Thu gọn'}
//                 </p>
//                 {!isExtend ? <CaretDownOutlined /> : <CaretUpOutlined />}
//               </div>
//             </div>
//             {isExtend && <ExtendEvent selectedEmployees={selectedEmployees} handleUploadFile={handleUploadFileExtend} content={content} title={title} isEditType={isEditType} setLocation={setLocation} listCheck={listCheck} setListCheck={setListCheck} location={location} />}
//           </>
//         )}

//         {type === 'task' && (
//           <>
//             <div className='post-row'>
//               <div className='post-row-label' style={{ textAlign: 'right', width: 55, color: '#0498c1' }}>
//                 <i>Tới:</i>
//               </div>
//               <Select
//                 mode="multiple"
//                 className={'post-input event-name-input select-tags'}
//                 allowClear={true}
//                 value={selectedValueTags}
//                 style={{ width: '100%', border: 'none' }}
//                 filterOption={filterOptionTag}
//                 onChange={(value) => { handleChange(value, 'Tags') }}

//               >
//                 {optionsUser}
//               </Select>
//             </div>
//             <div className='post-row'>
//               <p className='post-row-label' style={{ textAlign: 'right', width: 55, color: '#0498c1' }}>
//                 <i>Chủ đề:</i>
//               </p>
//               <input
//                 value={title} onChange={(e) => setTitle(e.target.value)}
//                 style={{ backgroundColor: '#ffff005e' }}
//                 placeholder=''
//                 className='post-input event-name-input font-weight--bold'
//               />
//             </div>
//             <div className='post-row'>
//               <textarea
//                 value={content}
//                 onChange={(e) => {
//                   handleChangeContent(e);
//                 }}
//                 placeholder='Nội dung câu hỏi'
//                 className='post-input'
//                 rows='3'
//               />
//             </div>
//             <div className='post-row task-row'>
//               <p className='post-row-label mb--10' style={{ width: '100%' }}>
//                 Các lựa chọn:
//               </p>

//               <div className='list-task-options'>
//                 {taskItems.map((_item, index) => (
//                   <div className='task-item' key={index}>
//                     <input
//                       placeholder={`Lựa chọn số ${index}`}
//                       className='task-item-input'
//                       onChange={(e) => onChangeVote(index, e.target.value)}
//                     />
//                     <img
//                       className='delete-icon'
//                       src={IconDelete}
//                       alt='icon delete'
//                       onClick={() => {
//                         setVotes((tasks) =>
//                           tasks.filter((item, tIndex) => tIndex !== index)
//                         );
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className='task-time-wrapper'>
//                 <div className='task-time'>
//                   <div>
//                     <p className='task-time-text'>Thời gian thăm dò ý kiến</p>
//                   </div>
//                   <Select
//                     className='select-task-time'
//                     value={pollTime}
//                     options={[
//                       { label: '2 ngày', value: 2 },
//                       { label: '3 ngày', value: 3 },
//                       { label: '4 ngày', value: 4 },
//                     ]}
//                   />
//                 </div>
//                 <Button
//                   className='btn-add-option'
//                   onClick={() => {
//                     setTaskItems((tasks) => [...tasks, {}]);
//                   }}
//                 >
//                   Thêm lựa chọn
//                 </Button>
//               </div>
//             </div>
//           </>
//         )}
//         {imagesPreview.length !== 0 && (
//           <div className='images-preview-wrapper'>
//             {filesInEditMode
//               .filter((file) => file.Type === 1)
//               .map((image, index) => (
//                 <div className='image-preview-wapper' key={index}>
//                   <img
//                     src={getUrlImage(500, 500, image.Files)}
//                     alt={image.Name}
//                     className='image-preview'
//                   />
//                   <img
//                     src={DeteleImg}
//                     alt='close'
//                     onClick={() => {
//                       handleDeleteFilesModeEdit(image.Files);
//                     }}
//                   />
//                 </div>
//               ))}
//             {imagesPreview.length !== 0 && (
//               <ImagesPreview
//                 imagesPreview={imagesPreview}
//                 handleDeleteImage={handleDeleteImage}
//               />
//             )}
//           </div>
//         )}
//         {!isValidImages && (
//           <p style={{ color: 'red' }}>
//             {' '}
//             Dung lượng ảnh không vượt quá 5 Mb hoặc định dạng ảnh khác png,
//             jpeg, gif.{' '}
//           </p>
//         )}
//         {!!filesInEditMode && (
//           <div className='files-preview-wrapper'>
//             {!!filesInEditMode &&
//               filesInEditMode
//                 .filter((file) => file.Type === 3)
//                 .map((file, index) => (
//                   <div className='file-preview-wrapper' key={index}>
//                     <div style={{ display: 'flex' }}>
//                       <img src={getIcon(file)} alt='pdfIcon' />
//                       <p>{file.Name}</p>
//                     </div>
//                     <img
//                       src={DeteleImg}
//                       alt='x'
//                       onClick={() => handleDeleteFilesModeEdit(file.Files)}
//                     />
//                   </div>
//                 ))}
//           </div>
//         )}
//         {filesPreview.length !== 0 && (
//           <FilePreview
//             filesPreview={filesPreview}
//             handleDeleteFile={handleDeleteFile}
//           />
//         )}

//         {(location && type !== 'event') && (
//           <div>
//             <Row align='middle' justify='end'>
//               <Col>
//                 <div
//                   onClick={() => setLocation(null)}
//                   style={{
//                     padding: '5px 10px',
//                     border: '1px solid #ccc',
//                     borderRadius: 5,
//                     fontSize: 12,
//                   }}
//                   className='cursor--pointer mb--5'
//                 >
//                   Xóa bản đồ
//                 </div>
//               </Col>
//             </Row>
//             <GGMap lat={location.position.lat} lng={location.position.lng} />
//           </div>
//         )}
//       </div>
//       {type !== 'event' && (
//         <div className='post-footer'>
//           {messErr !== '' && (
//             <Alert
//               message={messErr}
//               type='error'
//               style={{ marginBottom: 10 }}
//             />
//           )}
//           <div className='button-wrapper'>
//             <div className='feature-buttons'>
//               <div className='buttons-wrapper'>
//                 {type !== 'task' && <div>
//                   <label htmlFor='imageInput'>
//                     <Tooltip placement='topRight' title='Ảnh'>
//                       <img
//                         className='footer-icon'
//                         src={IconUploadImage}
//                         alt='imageIcon'
//                       />
//                     </Tooltip>
//                   </label>
//                   <input
//                     type='file'
//                     accept='image/*'
//                     name='image'
//                     id='imageInput'
//                     multiple
//                     onChange={handleUploadImages}
//                   />
//                 </div>}
//                 {type !== 'task' && <div>
//                   <label htmlFor='fileInput'>
//                     <Tooltip placement='topRight' title='Files'>
//                       <img
//                         className='footer-icon'
//                         src={IconUploadFile}
//                         alt='fileInput'
//                       />
//                     </Tooltip>
//                   </label>
//                   <input
//                     disabled={listImagesId.length > 0}
//                     type='file'
//                     name='file'
//                     id='fileInput'
//                     multiple
//                     onChange={handleUploadFiles}
//                   />
//                 </div>}
//                 {/* <Tooltip placement="topRight" title="Gắn thẻ người khác">
//                                 <img  className="footer-icon" src={IconTag} alt="addUserIcon" onClick={() => showAddTags(true)} />
//                             </Tooltip> */}
//                 {type !== 'task' && <Tooltip placement='topRight' title='Check in'>
//                   <img
//                     className='footer-icon'
//                     src={IconLocation}
//                     alt='locationIcon'
//                     onClick={() => showMap(true)}
//                   />
//                 </Tooltip>}

//                 {!isShowDate ? (
//                   <Tooltip placement='topRight' title='Đặt lich đăng'>
//                     <img
//                       className='footer-icon'
//                       src={IconCalendar}
//                       alt='locationIcon'
//                       onClick={() => setIsShowDate(true)}
//                     />
//                   </Tooltip>
//                 ) : (
//                   <DatePicker
//                     onChange={(date) =>
//                       setPublicDate(
//                         date ? date.format('YYYY-MM-DD hh:mm:ss') : ''
//                       )
//                     }
//                     className='schedule-button'
//                     placeholder='Đặt lich đăng'
//                     suffixIcon={
//                       <img
//                         className='footer-icon'
//                         src={IconCalendar}
//                         alt='locationIcon'
//                       />
//                     }
//                     disabledDate={(current) => current && current < moment()}
//                     format='DD-MM-YYYY'
//                     autoFocus
//                     onBlur={() => {
//                       if (!publicDate) setIsShowDate(false);
//                     }}
//                   />
//                 )}

//                 <Select value={selectedPriority} style={{ border: 'solid 1px darkgray' }}
//                   onChange={(e) => { handleSelectPriority(e) }} placeholder="Mức ưu tiên" suffixIcon={<CaretDownOutlined />}>

//                   <Select.Option value={1}>
//                     <a className='item-priority hot'>
//                       <span className='label-priority-post'>Quan trọng</span>
//                     </a>
//                   </Select.Option>
//                   <Select.Option value={2}>
//                     <a className='item-priority warn'>
//                       <span className='label-priority-post'>Chú ý</span>
//                     </a>
//                   </Select.Option>
//                   <Select.Option value={3}>
//                     <a className='item-priority care'>
//                       <span className='label-priority-post'>Lưu tâm</span>
//                     </a>
//                   </Select.Option>
//                   <Select.Option value={4}>
//                     <a className='item-priority blank'>
//                       <span className='label-priority-post'>Không</span>
//                     </a>
//                   </Select.Option>
//                 </Select>
//               </div>
//             </div>
//             <button
//               className='post-button'
//               onClick={addPostView}
//               disabled={content === ''}
//             >
//               {isEditType ? 'LƯU' : 'ĐĂNG'}
//             </button>
//           </div>
//         </div>
//       )}
//       <TagsModal
//         showTagModal={showTagModal}
//         setShowTagModal={setShowTagModal}
//         tags={tags}
//         setTags={setTags}
//       />
//       <LocationModal
//         showLocationModal={isShowMap}
//         setShowLocationModal={showMap}
//         location={location}
//         setLocation={setLocation}
//       />

//     </div>
//   );
// };

// TypeofPosts.propTypes = {
//   postData: PropTypes.object,
// };

// export default TypeofPosts;
