/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import defaultAvatar from "../../../../assets/images/avatar_default.jpg";
import pdfIcon from "../../../../assets/images/pdf-icon.svg";
import IconPublic from "../../../../assets/images/public_privacy.svg";
import autosize from "autosize";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  DatePicker,
  Select,
  Button,
  Radio,
  Dropdown,
  Menu,
  Avatar,
  Space,
  Tooltip,
  Image,
  Row,
  Col,
  message as messageNoti,
} from "antd";
import moment from "moment";
import {
  createEvent,
  createPost,
  editPost,
  createVote,
  updateVote,
  addAnswer,
  removeAnswer,
} from "../../../../stores/posts/posts.action";
import { TagsModal } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  UserOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import {
  EventTimePicker,
  RangeDatePicker,
  FilePreview,
  PostFooter,
  GGMap,
  Tags,
  ExtendEvent,
} from "./components";
import { TimePicker } from "antd";
import ImagesPreview from "./components/ImagesPreview";
import { getUrlImage } from "../../../../utils";
import { useHistory, useLocation } from "react-router-dom";
import { editEvent } from "../../../../stores/event/event.action";

import World from "../../../../assets/new/common/world.svg";
import IconAdd from "../../../../assets/new/common/add-icon.svg";
import IconDelete from "../../../../assets/new/common/delete.svg";
import DeteleImg from "../../../../assets/new/create-post/close2.svg";
import Calendar from "../../../../assets/new/create-post/lich.svg";
import CalendarIcon from "../../../../assets/new/create-post/calendar.png";
import ClockIcon from "../../../../assets/new/create-post/clock.png";
// import calendarIcon from '../../../../assets/new/create-post/lich.svg';
import addIcon from "../../../../assets/new/event/add.svg";
import API from "../../../../services/api";
import { getCompanyToken } from "../../../../stores/companies/companies.selector";
import AutoResizeTextBox from "../../../../components/auto-resize-textbox";
import MultiSelect from "../../../../components/multi-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import wordIcon from "../../../../assets/new/create-post/word.svg";
import IconPdf from "../../../../assets/new/create-post/pdf.svg";
import IconExcel from "../../../../assets/new/create-post/excel.svg";
import IconZip from "../../../../assets/new/create-post/zip.svg";
import IconRar from "../../../../assets/new/create-post/rar.svg";
import IconOther from "../../../../assets/new/create-post/other.svg";
import AvatarCustom from "../../../../components/avatar-custom";
import CreatePoll from "./components/CreatePoll";
import EditPoll from "./components/EditPoll";

const TypeofPosts = forwardRef(
  (
    {
      type,
      changeType,
      isEditType,
      data,
      isRemoveTab,
      groupId,
      refeshData,
      hideModal,
      setTypeOfContent,
      isGroupEvent,
      afterSubmit = () => {},
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      clearData() {
        setLocation(null);
        setFilesPreview([]);
        setIsCloseCalendar(false);
        setIsFocus(false);
      },
    }));
    const dispatch = useDispatch();
    const history = useHistory();
    const [imagesPreview, setImagesPreview] = useState([]);
    const [filesPreview, setFilesPreview] = useState([]);
    const [content, setContent] = useState(isEditType ? data.Content : "");
    const [timeCreatePost, setTimeCreatePost] = useState(
      isEditType ? moment(data.PublicDate) : null
    );
    const [isValidImages, setIsValidImages] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [enableAddEmployeeInput, setenableAddEmployeeInput] = useState(false);
    const [startDate, setStartDate] = useState(
      isEditType && data ? moment(data.FromDate) : null
    );
    const [startTime, setStartTime] = useState(
      isEditType && data ? moment(data.FromTime, "HH:mm:ss") : null
    );
    const [endDate, setEndDate] = useState(
      isEditType && data?.ToDate ? moment(data.ToDate) : null
    );
    const [endTime, setEndTime] = useState(
      isEditType && data ? moment(data.ToTime, "HH:mm:ss") : null
    );
    const [isPublic, setIsPublic] = useState(true);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [tags, setTags] = useState(isEditType ? data?.Tags : []);
    const [location, setLocation] = useState(
      isEditType && data.Lat != 0 && data.Lon != 0
        ? { position: { lat: data.Lat, lng: data.Lon } }
        : null
    );
    const [isNewVote, setIsNewVote] = useState(false);
    const [votes, setVotes] = useState([]);
    const inputVoteRef = useRef(null);
    const [filesInEditMode, setFilesInEditMode] = useState(
      isEditType && data ? data.Files : []
    );
    const [imagesInEditMode, setImagesInEditMode] = useState(
      isEditType && data ? data.Cover : []
    );
    const [docFilesInEditMode, setDocFilesInEditMode] = useState(
      isEditType && data?.DocFile ? data.DocFile : []
    );

    const [pollTime, setPollTime] = useState(data?.Details?.Days || 3);
    const path = useLocation();
    const [title, setTitle] = useState(isEditType ? data?.Title : "");
    const [isExtend, setIsExtend] = useState(false);
    const [taskItems, setTaskItems] = useState([{}]);
    const [priority, setPriority] = useState(
      isEditType && data?.Priority !== 0 ? data?.Priority : null
    );
    // const [listCheck, setListCheck] = useState(isEditType ? (data?.Details?.CheckList?.map(item => { return { ...item, Curator: item.Curator.split(',') } })) : [{ Content: '', Time: '00:00', Curator: [], File: '' }])
    const [listCheck, setListCheck] = useState(
      isEditType && data
        ? data.Angendars
        : [{ Content: "", Time: "00:00", Curator: [], File: "" }]
    );
    const [listTags, setListTag] = useState([]);
    const [listEmployees, setListEmployees] = useState([]);
    const [optionsUser, setOptionsUser] = useState([]);
    const [optionsUserEvent, setOptionsUserEvent] = useState([]);
    const [optionsEmployees, setOptionsEmployees] = useState([]);
    const [selectedValueTags, setSelectedValueTags] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState([]);
    const [isCloseCalendar, setIsCloseCalendar] = useState(
      data?.PublicDate ? true : false
    );
    const [selectedEmployees, setSelectedEmployees] = useState(
      isEditType && data ? data.Employees?.map((item) => item.UserId) : []
    );
    const [selectedParticipants, setSelectedParticipants] = useState(
      isEditType && data
        ? data.ParticipantDetais?.map((item) => item.Id.toString())
        : []
    );
    const [filesEvent, setFilesEvent] = useState([]);
    const [quantityFileUpload, setQuantityFileUpload] = useState(0);
    const [address, setAddress] = useState(isEditType ? data.Address : "");
    const [additionInfo, setAdditionInfo] = useState(
      isEditType ? data?.Details?.Additional : ""
    );
    const [expiredAt, setExpiredAt] = useState(
      moment(new Date(), "DD/MM/YYYY")
    );
    const currenPara = useRef();
    const txtTitle = useRef();
    const [txtTitleHeight, setTxtTitleHeight] = useState("32px");
    const txtContent = useRef();
    const userInfo = useSelector((state) =>
      state.get("userProfile").get("profile")
    );
    const [isOpenSelectTo, setIsOpenSelectTo] = useState(false);
    const [addressNotFound, setAddressNotFound] = useState(false);
    const [listLoc, setListLoc] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [voteDetails, setVoteDetails] = useState([]);
    const [typeVote, setTypeVote] = useState();
    const [isPrivate, setIsPrivate] = useState(
      isEditType && data ? data.IsPrivate : 0
    );
    const [repeatType, setRepeatType] = useState(
      isEditType && data ? data.RepeatType : 1
    );
    const [room, setRoom] = useState(isEditType ? data.PlaceCompanyId : "");
    const [allDay, setAllDay] = useState(
      isEditType && !data?.ToDate ? true : false
    );
    const [remind, setRemind] = useState(isEditType ? data.Remind : '');

    const comToken = useSelector(getCompanyToken());
    const { Option } = Select;
    useEffect(() => {
      var newTags = [];
      if (listTags && listTags.length > 0 && data?.Tag) {
        var tags = data?.Tags.map((r) => ({ Id: r.Id }));
        tags.forEach((r) => {
          var isExist = listTags.filter((rs) => +rs.Id === +r.Id);
          if (isExist) {
            newTags.push(isExist[0]?.index);
          }
        });
      }
      setSelectedValueTags(data?.Tags?.map((item) => item.index));
    }, [listTags]);

    useEffect(() => {
      if (isEditType) {
        setIsFocus(true);

        // const tagsArr = data?.Tags.map(item => item.FullName)
        // setSelectedValueTags(tagsArr)
      }

      if (
        document.querySelectorAll(
          '[data-placeholder="Viết thông tin mới..."]'
        )[0]
      ) {
        document.querySelectorAll(
          '[data-placeholder="Viết thông tin mới..."]'
        )[0].style.marginTop = "8px";
      }
    }, [isEditType]);

    function handleChange(value, type = "Tags") {
      if (type === "Tags") {
        setTags(value.map((rs) => listTags[rs]));
        setSelectedValueTags(value);
      } else {
        setEmployees(value.map((rs) => listTags[rs]));

        setSelectedEmployees(value);
      }
    }
    function getStartDate() {
      // return moment(!!startDate ? startDate : new Date()).format('YYYY-MM-DD') + " " + (!!startTime ? moment(startTime).format('HH:mm:ss') : '00:00:00');
      return !!startDate ? moment(startDate).format("YYYY-MM-DD") : null;
    }
    function getEndDate() {
      // return moment(!!endDate ? endDate : new Date()).format('YYYY-MM-DD') + " " + (!!endTime ? moment(endTime).format('HH:mm:ss') : '00:00:00');
      return !!endDate ? moment(endDate).format("YYYY-MM-DD") : null;
    }

    const getStartTime = () => {
      return !!startTime ? moment(startTime).format("HH:mm:ss") : null;
    };

    const getEndTime = () => {
      return !!endTime ? moment(endTime).format("HH:mm:ss") : null;
    };

    function placeholder(input, text, onOff) {
      if (!input.current) {
        return;
      }
      if (onOff) {
        input.current.placeholder = text;
      } else {
        input.current.placeholder = "";
      }
    }

    useEffect(() => {
      console.log("data typeofpost", data);
    }, [data]);

    useEffect(async () => {
      const listItem = [];
      if (type === "event" && listEmployees.length === 0) {
        if (isGroupEvent) {
          await API.group.getGroupDetail(groupId).then((resp) => {
            // console.log('group employee', resp)
            var manager = resp.data.AccountManager[0];
            listItem.push({
              UserId: manager.UserId,
              FullName: manager.FullName,
              Avatar: manager.Avatar,
              TagType: 1,
            });
            resp.data.Employee.forEach((i) => {
              listItem.push({
                UserId: i.UserId,
                Email: i.Email,
                FullName: i.FullName,
                Avatar: i.Avatar,
                TagType: 1,
              });
            });
            // var manager = resp.data.AccountManager.map(i => ({ UserId: i.UserId, Email: i.Email, FullName: i.FullName, Avatar: i.Avatar, TagType: 1 }))
            // listItem.push(manager)
            // console.log('list item', listItem)
          });
        } else {
          await API.employee.getListEmployees().then((resp) => {
            resp.data.forEach((i) => {
              listItem.push({
                UserId: i.UserId,
                Email: i.Email,
                FullName: i.FullName,
                Avatar: i.Avatar,
                TagType: 1,
              });
            });
          });
        }

        listItem.sort(function (a, b) {
          if (a.FullName < b.FullName) {
            return -1;
          }
          if (a.FullName > b.FullName) {
            return 1;
          }
          return 0;
        });
        setListEmployees(listItem);
      }

      if (!isEditType) {
        setIsExtend(false);
        // setAddress(type == 'event' ? 'Hà Nội, Việt Nam' : '')
        setLocation(
          type == "event"
            ? { position: { lat: 21.02888, lng: 105.85464 } }
            : null
        );
      }
    }, [type]);

    useEffect(() => {
      setOptionsEmployees(
        listEmployees
          .filter((item) => item.UserId != userInfo.Id)
          .map((item, index) => {
            return (
              <Select.Option
                key={index}
                style={{ width: "100%" }}
                label={item.FullName}
              >
                <Space>
                  {/* <Avatar size={32} src={`https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${item.Avatar}&fit=inside`} /> */}
                  <AvatarCustom
                    className="avatar"
                    src={
                      userInfo.Avatar
                        ? `https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${item.Avatar}&fit=inside`
                        : ""
                    }
                    size={32}
                    fullName={userInfo.FullName}
                  />
                  <span>{item.FullName}</span>
                </Space>
              </Select.Option>
            );
          })
      );

      // if (listEmployees.length !== 0)
      //   setSelectedEmployees(data?.Employee?.filter(item => item.UserId != userInfo.Id).map(e => listEmployees.filter(item => item.UserId != userInfo.Id).findIndex(i => +i.UserId == +e.UserId).toString()))
    }, [listEmployees.length]);

    useEffect(() => {
      if (userInfo.size == 0) return;

      var listItem = [];

      Promise.all([
        API.employee.getListEmployees(),
        API.group.getListGroup({ keySearch: "", index: 1, pageSize: 100000 }),
        API.user.getUserProfile(),
      ]).then((rs) => {
        if (rs) {
          if (rs[0].code == 200) {
            rs[0].data.forEach((i) => {
              if (i.UserId != userInfo.Id && i.Email != userInfo.Email)
                listItem.push({
                  Id: i.UserId,
                  Email: i.Email,
                  FullName: i.FullName,
                  Avatar: i.Avatar,
                  TagType: 1,
                });
            });
          }
          if (rs[1].code == 200) {
            rs[1].data.forEach((i) => {
              listItem.push({
                Id: i.Id,
                Email: "",
                FullName: i.Name,
                Avatar: i.Avatar,
                TagType: 2,
              });
            });
          }
        }
        //sort by name here!

        listItem.sort(function (a, b) {
          if (a.FullName < b.FullName) {
            return -1;
          }
          if (a.FullName > b.FullName) {
            return 1;
          }
          return 0;
        });

        listItem.unshift({
          Id: rs[2]?.data.CompanyId,
          Email: "",
          FullName: "Toàn công ty",
          TagType: 3,
        });
        listItem.unshift({
          Id: userInfo.Id,
          Email: userInfo.Email,
          FullName: "Mình tôi",
          TagType: 4,
        });
        listItem = listItem.map((item, index) => ({
          ...item,
          index: index.toString(),
        }));

        setListTag(listItem);
      });
    }, [userInfo]);

    useEffect(() => {
      setOptionsUser(
        listTags.map((item, index) => {
          return (
            <Select.Option
              key={index}
              style={{ width: "100%" }}
              label={item.FullName}
            >
              <Space>
                {item.TagType == 4 && item.Id === userInfo.Id && (
                  <AvatarCustom
                    size={32}
                    fullName={userInfo.FullName || "Anonymous"}
                    src={`https://filemanager.crmdemo.net/file/image?width=64&height=64&format=png&image_id=${userInfo.Avatar}&fit=inside`}
                  />
                )}
                {item.TagType == 1 && (
                  <AvatarCustom
                    size={32}
                    fullName={item.FullName || "Anonymous"}
                    src={`https://filemanager.crmdemo.net/file/image?width=64&height=64&format=png&image_id=${item.Avatar}&fit=inside`}
                  />
                )}
                {item.TagType == 2 && (
                  <AvatarCustom
                    size={32}
                    fullName={item.FullName || "Anonymous"}
                    src={`https://filemanager.crmdemo.net/file/image?width=64&height=64&format=png&image_id=${item.Avatar}&fit=inside`}
                  />
                )}
                {item.TagType == 3 && (
                  <Avatar
                    size={32}
                    style={{ background: "hsl(220deg 61% 26%)" }}
                    icon={<HomeOutlined />}
                  />
                )}

                <span>{item.FullName || item.Email}</span>
              </Space>
            </Select.Option>
          );
        })
      );
      setOptionsUserEvent(
        listTags
          .filter((r) => r.TagType !== 2)
          .map((item, index) => {
            return <Option key={item.Id}>{item.FullName || item.Email}</Option>;
          })
      );
    }, [listTags.length]);

    const filterOptionTag = (input, option) => {
      return (
        listTags[option.key]?.FullName?.toLowerCase().indexOf(
          input.toLowerCase()
        ) >= 0 ||
        listTags[option.key]?.Email?.toLowerCase().indexOf(
          input.toLowerCase()
        ) >= 0
      );
    };

    //end code tags

    const handleCancel = () => {
      if (hideModal) {
        hideModal();
      }
      setIsFocus(false);
      setFilesPreview([]);
      setContent("");
      setImagesPreview([]);
    };

    const handleAddNewVote = (event) => {
      if (event.type === "keydown") {
        if (event.key === "Enter") {
          handleCreateVote(event.target.value);
          if (isEditType) {
            dispatch(
              addAnswer({
                voteId: data?.Details?.Id,
                order: 1,
                title: event.target.value,
              })
            );
          }
          event.target.value = "";
          setIsNewVote(false);
        }
      } else {
        handleCreateVote(event.current.state.value);
        if (isEditType) {
          dispatch(
            addAnswer({
              voteId: data?.Details?.Id,
              order: 1,
              title: event.current.state.value,
            })
          );
        }
        event.current.state.value = "";
        setIsNewVote(false);
      }
    };
    const onChangeVote = (index, value) => {
      let newData = { ...votes[index] };
      newData.Title = value;
      const newVoteList = votes.map((val, i) => {
        if (i == index) return newData;
        return val;
      });
      setVotes(newVoteList);
    };

    const handleDeleteVote = (index) => {
      setVotes(votes.filter((vote, i) => i !== index));
      const answerId = votes.find((vote, i) => i == index).Id;
      if (isEditType && answerId) {
        dispatch(
          removeAnswer({
            data: {
              voteId: data?.Details?.Id,
              answerId,
            },
            postId: data.Id,
          })
        );
      }
    };

    // useEffect(() => {
    //   if (isEditType && data && data.Type === 2 && data?.Details && data?.Details.Details.length > 0) {
    //     var listVote = data?.Details.Details.map(r => ({ Id: r.Id, Title: r.Title, Order: 1, disable: true, isDeleted: false }))
    //     setVotes(listVote)
    //   }
    //   else setVotes([{ Title: '', Order: 1, disable: false }])
    // }, [])

    const handleCreateVote = (title) => {
      setVotes([...votes, { Title: title, Order: 1, disable: false }]);
    };

    const handleUploadImages = (event) => {
      let checkIsValidImages = true;
      let validImage = imagesPreview.slice();
      for (const image of event.target.files) {
        if (
          ["png", "jpg", "jpeg", "gif"].includes(image.type.split("/")[1]) &&
          image.size <= 1024 * 1024 * 5
        ) {
          checkIsValidImages = true;
        } else if (
          ["x-ms-wmv", "mp4", "avi", "quicktime"].includes(
            image.type.split("/")[1]
          ) &&
          image.size <= 1024 * 1024 * 50
        ) {
          checkIsValidImages = true;
        } else {
          checkIsValidImages = false;
        }
        if (checkIsValidImages) {
          validImage.push(image);
        }
      }
      setIsValidImages(checkIsValidImages);
      setImagesPreview(validImage);
    };

    const handleDeleteImage = (img, index) => {
      setImagesPreview(imagesPreview.filter((img, i) => i !== index));
      // dispatch(deleteFile(img, index));
    };

    const handleUploadFiles = (event) => {
      // for (const file of event.target.files) {
      //   // handleUploadFile(file, "document");
      // }
      setFilesPreview([...filesPreview, ...event.target.files]);
    };

    const handleDeleteFile = (file, index) => {
      setFilesPreview(filesPreview.filter((img, i) => i !== index));
      // dispatch(deleteFile(file));
    };

    const deleteVote = (item, index) => {
      if (!item.isDeleted && item.Id) {
        setVotes((tasks) =>
          tasks.map((r) => {
            var obj = r;
            if (r.Id === item.Id) obj.isDeleted = true;
            return obj;
          })
        );
      } else {
        setVotes((tasks) => tasks.filter((item, tIndex) => tIndex !== index));
      }
    };

    const setTimeCreate = (date) => {
      if (date) {
        setTimeCreatePost(date);
      } else {
        setTimeCreatePost(null);
      }
    };

    const handleChangeContent = (e) => {
      setContent(e.nativeEvent.target.value);
      // txtContent.current.style.height = "0px";
      // const scrollHeight = txtContent.current.scrollHeight;
      // txtContent.current.style.height = scrollHeight + "px";
    };

    const handleAddEmployee = (event) => {
      if (event.key === "Enter") {
        setEmployees([
          ...employees,
          { Id: 99, FullName: event.target.value, Email: "email@email.com" },
        ]);
        event.target.value = "";
        setenableAddEmployeeInput(false);
      }
    };
    const onTitleChange = (e) => {
      // setContent('')
      setTitle(e.target.value);
      // txtTitle.current.style.height = "0px";
      // const scrollHeight = txtTitle.current.scrollHeight;
      // txtTitle.current.style.height = scrollHeight + "px";
    };
    // const handleUploadFile = (image, type) => {
    //   const formData = new FormData();
    //   formData.append("files", image);
    //   dispatch(
    //     uploadFileAction({
    //       data: formData,
    //       type,
    //     })
    //   );
    // };

    const handleDeleteFilesModeEdit = (Files) => {
      const newFilesList = filesInEditMode.filter((file) => file.Files !== Files);
      // const newFilesList = filesInEditMode.filter((file) => file !== Files);
      setFilesInEditMode(newFilesList);
    };

    const handleDeleteImageEditMode = (file) => {
      const newFilesList = imagesInEditMode.filter((image) => image !== file);
      setImagesInEditMode(newFilesList);
    }

    const handleDeleteDocFilesModeEdit = (index) => {
      const newFilesList = docFilesInEditMode.filter((file, i) => i !== index);
      setDocFilesInEditMode(newFilesList);
    };

    const handleAfterSubmit = (data) => {
      if (refeshData) refeshData(data);
      setSelectedValueTags([]);
      setTitle("");
      setContent("");
      setTags([]);
      setImagesPreview([]);
      setFilesPreview([]);
      setLocation(null);
      setPriority(null);
      setTimeCreatePost(null);
      setIsValidImages(true);
      setIsExtend(false);
      setSelectedPriority([]);
      setIsCloseCalendar(false);
      setListCheck([{ Content: "", Time: "00:00", Curator: [], File: "" }]);
      setPollTime(3);
      setVotes([{ Title: "", Order: 1 }]);
      setEmployees([]);
      setSelectedEmployees([]);
      setFilesEvent([]);
      setQuantityFileUpload(0);
      setStartDate(null);
      setEndDate(null);
      setStartTime(null);
      setEndTime(null);
      setRoom("");
      setAddress("");
      setSelectedParticipants([]);
      setRepeatType(1);
      setIsPrivate(0);
      setRemind('');
    };
    // const handleUploadFile = (fileList) => {
    //   var newFile = []
    //   if (fileList.length !== 0) {
    //     setQuantityFileUpload(fileList.length)
    //     for (const item of fileList) {
    //       const formData = new FormData();
    //       formData.append("files", item)
    //       API.uploadFile.uploadFile(formData, item.typeFile)
    //         .then(res => {
    //           API.group.uploadFile({
    //             code: item.typeFile === 'image' ? res.imageId : res.docsId,
    //             type: item.typeFile === 'image' ? 1 : 3,
    //             name: item.name,
    //           })
    //             .then(dataFile => {
    //               newFile.push(dataFile.data)
    //             })
    //             .catch(() => {
    //               window.alert(`Tải tài liệu ${item.name} thất bại`)
    //               return
    //             })
    //         })
    //     }
    //     setFilesEvent(filesEvent.concat(newFile))
    //     setTimeout(() => {
    //       console.log("NEW FILE ", filesEvent)
    //       handleSubmit()
    //     }, 1000)

    //   }
    //   else {
    //     handleSubmit()
    //   }
    // }
    // useEffect(() => {
    //   console.log("LOG_FILESEVENT",filesEvent, quantityFileUpload)
    //   if(filesEvent.length !== 0 && filesEvent.length === quantityFileUpload){
    //     handleSubmit()
    //   }
    //   else{
    //     console.log("Fail",filesEvent, quantityFileUpload)
    //   }
    // }, [filesEvent])
    const menu = (
      <Menu>
        <Menu.Item className="item-privacy" key="1">
          Công khai
        </Menu.Item>
        <Menu.Item className="item-privacy" key="2">
          Bí mật
        </Menu.Item>
      </Menu>
    );

    const disabled = () => {
      if (type == "post") {
        if (groupId) {
          return content.trim() != "" && title.trim() != "";
        } else {
          return content.trim() != "" && title.trim() != "" && tags.length != 0;
        }
      } else if (type == "event") {
        return content.trim() != "" && title.trim() != "";
      } else {
        if (groupId) {
          // return content.trim() != '' && title.trim() != '' && votes.filter(r => !!!r.Id || (r.Id && r.isDeleted)).filter(r => r.Title.trim() != '').length != 0;
          return voteDetails.length > 0;
        } else {
          // return content.trim() != '' && title.trim() != '' && votes.filter(r => !!!r.Id || (r.Id && r.isDeleted)).filter(r => r.Title.trim() != '').length != 0 && tags.length != 0;
          return voteDetails.length > 0 && tags.length != 0;
        }
      }
    };

    const handleSubmit = () => {
      const configData = {
        content,
        title,
        employees,
        isPost: 1,
        isPin: 0,
        isPublic,
        tags,
        address,
        lat: location?.position ? location.position.lat : 0,
        lon: location?.position ? location.position.lng : 0,
        file: filesInEditMode,
        imagesPreview,
        filesPreview,
        priority: priority || 0,
        groupId: +groupId || 0,
      };
      if (timeCreatePost) {
        configData.publicDate = moment(timeCreatePost).format(
          "YYYY-MM-DD hh:mm:ss"
        );
      }

      var _votes = votes
        .filter((r) => !!!r.Id || (r.Id && r.isDeleted))
        .map((r) => {
          var object = {
            Title: r.Title,
            Order: 1,
          };
          if (r.Id) {
            object.Id = r.Id;
          }
          return object;
        });

      var newCheckList = [];
      if (listCheck && listCheck.length > 0 && !isEditType) {
        newCheckList = listCheck.map((rs) => {
          delete rs.edit;
          var curator = [];
          if (rs.Curator) {
            rs.Curator.forEach((rs) => curator.push(parseInt(rs)));
            if (rs.Id && +rs.Id < 0) {
              delete rs.Id;
            }
          }
          rs.Curator = JSON.stringify(curator);

          if (rs.FromTime) {
            rs.FromTime += ":00";
          }
          if (rs.ToTime) {
            rs.ToTime += ":00";
          }

          if (rs.FromDate) {
            rs.FromDate = moment(rs.FromDate, "DD/MM/YYYY").format(
              "YYYY/MM/DD"
            );
          }
          // if (rs.ToDate) {
          //   rs.ToDate = moment(rs.ToDate, 'DD/MM/YYYY').format('YYYY/MM/DD')
          // }

          return rs;
        });
      }

      if (!isEditType) {
        switch (type) {
          case "post":
            dispatch(createPost(configData));
            handleAfterSubmit(configData);
            break;
          case "event":
            const dataEvent = {
              isPublic,
              title,
              content,
              fromDate: getStartDate(),
              toDate: allDay ? null : getEndDate(),
              fromTime: getStartTime(),
              toTime: getEndTime(),
              isAllDay: true,
              isMyCalendar: true,
              repeatType,
              address,
              remind,
              placeCompanyId: room,
              addtional: additionInfo,
              avaiablity: 1,
              isPrivate,
              employees: listEmployees
                .filter((item) => item.UserId != userInfo.Id)
                .filter((item) => selectedEmployees?.includes(item.UserId)),
              participants: selectedParticipants.map((item) => parseInt(item)),
              isPost: true,
              parentId: 0,
              Date: moment().format("YYYY-MM-DD"),
              isImportant: 1,
              file: [],
              docFile: [],
              imagesPreview,
              docFilesPreview: filesPreview,
              publicDate: timeCreatePost,
              agendarList: newCheckList,
              priority: priority || 0,
              lat: location?.position ? location.position.lat : 0,
              lon: location?.position ? location.position.lng : 0,
              groupId: +groupId || 0,
            };

            dispatch(createEvent(dataEvent));
            handleAfterSubmit(dataEvent);
            break;
          case "vote":
            const dataVote = {
              isPublic,
              title,
              content,
              employees,
              typeVote: typeVote,
              groupId: +groupId || 0,
              isPost: 1,
              isPin: 0,
              tags,
              file: filesInEditMode,
              imagesPreview,
              filesPreview,
              // details: [
              //   {
              //     Title: content,
              //     Order: 1,
              //     IsMultipleAnswer: 1,
              //     Answer: _votes,
              //   },
              // ],
              details: [...voteDetails],
              days: pollTime || 3,
              publicDate: timeCreatePost,
              priority: priority || 0,
            };
            if (!voteDetails || voteDetails.length === 0) {
              messageNoti.error("Bạn cần nhập đầy đủ các trường");
            } else {
              dispatch(createVote(dataVote));
              handleCancel();
            }
            handleAfterSubmit(dataVote);
            afterSubmit();
            break;
          case "task":
            const dataTask = {
              isPublic,
              title: title,
              content,
              employees,
              groupId: +groupId || 0,
              isPost: 1,
              isPin: 0,
              tags,
              file: filesInEditMode,
              imagesPreview,
              filesPreview,
              details: [
                {
                  Title: content,
                  Order: 1,
                  IsMultipleAnswer: 1,
                  Answer: _votes,
                },
              ],
              days: pollTime,
              publicDate: timeCreatePost,
              priority: priority || 0,
              ExpiredAt: expiredAt,
            };
            dispatch(createVote(dataTask));
            afterSubmit();
            handleAfterSubmit(dataTask);
            break;
        }
        // if (path.pathname !== '/event') {
        //   changeType('post');
        // }
      } else {
        switch (type) {
          case "post":
            console.log("submitttt ", data);
            dispatch(
              editPost({
                ...configData,
                id: Number(data.Id),
                isPost: data.IsPost,
                groupId: +data.GroupId || 0,
                isPin: data.IsPin,
                isPublic: data.IsPublic,
                file: filesInEditMode,
                imagesPreview,
                filesPreview,
                priority: priority || 0,
                Handled: data.Handled,
              })
            );
            break;
          case "vote":
            {
              dispatch(
                updateVote({
                  isPublic,
                  title: title,
                  content,
                  employees,
                  typeVote: typeVote,
                  groupId: +data.GroupId || 0,
                  isPost: 1,
                  isPin: 0,
                  tags,
                  file: filesInEditMode,
                  imagesPreview,
                  filesPreview,
                  id: data.Id,
                  priority: priority || 0,
                  expiredAt: expiredAt,
                  details: [...voteDetails],
                  days: pollTime || 3,
                })
              );
            }
            break;
          case "task":
            dispatch(
              updateVote({
                isPublic,
                title: title,
                content,
                employees,
                groupId: +data.GroupId || 0,
                isPost: 1,
                isPin: 0,
                tags,
                file: filesInEditMode,
                imagesPreview,
                filesPreview,
                id: data.Id,
                days: pollTime,
                priority: priority || 0,
                expiredAt: expiredAt,
              })
            );
            break;
          case "event":
            dispatch(
              editEvent({
                data: {
                  isPublic,
                  title,
                  content,
                  fromDate: getStartDate(),
                  toDate: allDay ? null : getEndDate(),
                  fromTime: getStartTime(),
                  toTime: getEndTime(),
                  isAllDay: true,
                  isMyCalendar: true,
                  repeatType,
                  placeCompanyId: room,
                  avaiablity: 1,
                  isPrivate,
                  employees: listEmployees
                    ?.filter((item) => item.UserId != userInfo.Id)
                    .filter((item) => selectedEmployees?.includes(item.UserId)),
                  participants: selectedParticipants?.map((item) =>
                    parseInt(item)
                  ),
                  isPost: true,
                  Date: moment().format("YYYY-MM-DD"),
                  isImportant: 1,
                  file: imagesInEditMode,
                  cover: imagesInEditMode,
                  docFile: docFilesInEditMode,
                  imagesPreview,
                  docFilesPreview: filesPreview,
                  publicDate: timeCreatePost,
                  // agendarList: newCheckList,
                  // priority: priority || 0,
                  address,
                  remind,
                  // addtional: additionInfo,
                  // groupId: +groupId || 0,
                  lat: location?.position ? location.position.lat : 0,
                  lon: location?.position ? location.position.lng : 0,
                },
                id: data.Id,
              })
            );
            setTimeout(() => {
              if (path.pathname.includes("event")) {
                history.push(`/event/${data.Id}`);
              }
            }, 1500);
            break;
          default:
            break;
        }
        if (!path.pathname.includes("event")) {
          hideModal();
        }
      }
      handleCancel();
    };

    useEffect(() => {
      if (
        location !== null &&
        typeof location !== "undefined" &&
        location?.address?.label
      ) {
        setAddress(location?.address?.label ?? "null");
      }
    }, [location]);
    useEffect(() => {
      console.log("addressssss", address);
    }, [address]);

    const handleSearchLocation = (e) => {
      let key = e;
      setTimeout(() => {
        searchMapByKey(key).then((res) => {
          if (res.status === 200) {
            console.log("searchMapByKey", rs.data.items);
            // setListLoc(res.data.items);
            // if (res.data.items.length === 0) {
            //   setLocation(null)
            // }
          }
        });
      }, 350);
    };

    useEffect(() => {
      console.log("location", location);
    }, [location]);

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

    const showDropdown = () => {
      setIsOpenSelectTo(true);
      setTimeout(() => {
        const dd = document.getElementsByClassName(
          "user-select__post-hover"
        )[0];
        if (dd) {
          dd.style.top = `${dd.offsetTop - 5}px`;
        }
      }, 400);
    };

    useEffect(() => {
      if (!isEditType) {
        setSelectedValueTags([]);
        setTitle("");
        setContent("");
        setTags([]);
        setImagesPreview([]);
        setFilesPreview([]);
        setLocation(null);
        setPriority(null);
        setTimeCreatePost(null);
        setIsValidImages(true);
        setIsExtend(false);
        setSelectedPriority([]);
        setIsCloseCalendar(false);
        setListCheck([{ Content: "", Time: "00:00", Curator: [], File: "" }]);
        setPollTime(3);
        setVotes([{ Title: "", Order: 1 }]);
        setEmployees([]);
        setSelectedEmployees([]);
        setFilesEvent([]);
        setQuantityFileUpload(0);
      }
    }, [type]);

    console.log("event", type);

    return (
      <div className="post-wrapper">
        {/* <div className={`post-header ${isRemoveTab ? 'hidden-tab' : ''}`}>
        {path.pathname !== '/profile' ? (<Space className='contain__avt-name'>
          <AvatarCustom
            src={userInfo.Avatar ? `https://filemanager.crmdemo.net/file/image?width=200&height=200&format=png&image_id=${userInfo.Avatar}&fit=inside` : ''}
            size={32}
            fullName={userInfo.FullName}
          />
          <div className='name-wrapper'>
            <div style={{ display: 'flex' }}>
              <h4 style={{ color: 'white' }}>{userInfo.FullName || userInfo.Email}</h4>
            </div>
          </div>
        </Space>
        ) :
          (<div className="tabs-wrapperrr">
            <AvatarCustom
              className="avatar-user"
              src={userInfo.Avatar ? `https://filemanager.crmdemo.net/file/image?width=200&height=200&format=png&image_id=${userInfo.Avatar}&fit=inside` : ''}
              size={32}
              fullName={userInfo.FullName}
            />
            <div>
              <p className="user-namex ">
                {userInfo.FullName}
              </p>
            </div>
          </div>)}
      </div> */}
        <div className="post-content">
          {/* NEW */}
          {type === "post" && (
            <>
              {(!groupId || (isEditType && !!data?.Tags.length && !groupId)) &&
                isFocus && (
                  <div className="post-row tag-multiselect-input">
                    <MultiSelect
                      mode="multiple"
                      className={
                        "post-input event-name-input select-tags fix-fontSize"
                      }
                      allowClear={true}
                      value={selectedValueTags}
                      style={{
                        width: "100%",
                        border: "none",
                        minHeight: "32px",
                      }}
                      placeholder="Tới"
                      open={isOpenSelectTo}
                      filterOption={filterOptionTag}
                      onChange={(value) => {
                        handleChange(value, "Tags");
                      }}
                      onInputKeyDown={() => setIsOpenSelectTo(true)}
                      onMouseEnter={() => showDropdown()}
                      onMouseLeave={() => setIsOpenSelectTo(false)}
                      optionFilterProp="label"
                      optionLabelProp="label"
                      dropdownClassName={
                        "user-select__new-post user-select__post-hover"
                      }
                    >
                      {optionsUser}
                    </MultiSelect>
                  </div>
                )}
              {isFocus ? (
                <>
                  <div className="post-row ">
                    <AutoResizeTextBox
                      ref={txtTitle}
                      value={title}
                      onChange={(e) => {
                        onTitleChange(e);
                      }}
                      placeholder="Chủ đề"
                      id="topicPost"
                      className="one-row"
                      row="1"
                    />
                  </div>
                  <div
                    style={{
                      border: "1px solid rgba(39, 39, 39, 0.2)",
                      borderRadius: 2,
                      marginTop: 4,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      className="post-row ckedit-custom"
                      style={{ position: "relative" }}
                    >
                      <CKEditor
                        className="editor-container"
                        editor={ClassicEditor}
                        data={content}
                        config={{
                          placeholder:
                            type === "event"
                              ? "Tạo sự kiện mới..."
                              : "Viết thông tin mới...",
                          toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link",
                            "|",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "insertTable",
                            "blockQuote",
                            "|",
                            "undo",
                            "redo",
                          ],
                          heading: {
                            options: [
                              {
                                model: "paragraph",
                                title: "Normal",
                                class: "ck-heading_normal",
                              },
                              {
                                model: "heading1",
                                view: "h1",
                                title: "Heading 1",
                                class: "ck-heading_heading1",
                              },
                              {
                                model: "heading2",
                                view: "h2",
                                title: "Heading 2",
                                class: "ck-heading_heading2",
                              },
                              {
                                model: "heading3",
                                view: "h3",
                                title: "Heading 3",
                                class: "ck-heading_heading3",
                              },
                            ],
                          },
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setContent(data);
                        }}
                        onReady={(editor) => {
                          const documentView = editor.editing.view.document
                          documentView.on('keydown', (eventInfo, keyEventData) => {
                            if (keyEventData.ctrlKey === true && keyEventData.keyCode === 13) {
                              // keyEventData.domEvent.preventDefault();
                              // console.log('selectedValueTags', selectedValueTags)
                              // console.log('content', content)
                              // console.log('title', title)
                              // console.log('documentView', documentView)
                              // console.log('eventInfo', eventInfo)
                              // console.log('keyEventData', keyEventData)
                              // setIsFocus(false);
                              // handleSubmit();
                            }
                          })
                        }}
                      />
                    </div>
                    {type === "post" &&
                      (filesInEditMode.filter(
                        (file) => file.Type === 1 || file.Type === 2
                      ).length !== 0 ||
                        imagesPreview.length !== 0) && (
                        <PerfectScrollbar
                          style={{
                            width: "100%",
                            overflowX: "auto",
                            display: "flex",
                            padding: "0px 4px 0px 4px",
                          }}
                        >
                          <div className="images-preview-wrapper">
                            {(filesInEditMode.filter(
                              (file) => file.Type === 1 || file.Type === 2
                            ).length !== 0 ||
                              imagesPreview.length !== 0) && (
                              <ImagesPreview
                                imagesPreview={imagesPreview}
                                handleDeleteImage={handleDeleteImage}
                                htmlFor={
                                  isEditType ? "imageInputEdit" : "imageInput"
                                }
                              />
                            )}
                            {filesInEditMode.length > 0 &&
                              filesInEditMode
                                .filter(
                                  (file) => file.Type === 1 || file.Type === 2
                                )
                                .map((image, index) => (
                                  <div
                                    className="image-preview-wapper"
                                    key={index}
                                  >
                                    {image.Type === 1 ? (
                                      <img
                                        src={getUrlImage(500, 500, image.Files)}
                                        alt={image.Name}
                                        className="image-preview"
                                      />
                                    ) : (
                                      <video
                                        width="137"
                                        controls
                                        alt={image.name}
                                      >
                                        <source
                                          src={getUrlImage(
                                            500,
                                            500,
                                            image.Files
                                          )}
                                        />
                                      </video>
                                    )}
                                    <img
                                      src={DeteleImg}
                                      alt="close"
                                      onClick={() => {
                                        handleDeleteFilesModeEdit(image.Files);
                                      }}
                                    />
                                  </div>
                                ))}
                          </div>
                        </PerfectScrollbar>
                      )}
                  </div>
                  <div>
                    {type !== "event" &&
                      filesPreview.length !== 0 &&
                      (type === "vote" || type == "post") && (
                        <FilePreview
                          filesPreview={filesPreview}
                          handleDeleteFile={handleDeleteFile}
                          handleUploadFiles={handleUploadFiles}
                        />
                      )}
                  </div>
                </>
              ) : (
                <textarea
                  className="collapse-form"
                  placeholder={
                    type === "event"
                      ? "Tạo sự kiện mới..."
                      : "Viết thông tin mới ..."
                  }
                  onFocus={() => setIsFocus(true)}
                ></textarea>
              )}
            </>
          )}

          {type === "event" && (
            <>
              {isFocus ? (
                <>
                  {" "}
                  <div className="post-row">
                    <AutoResizeTextBox
                      row="1"
                      ref={txtTitle}
                      value={title}
                      onChange={(e) => onTitleChange(e)}
                      placeholder="Tên sự kiện"
                      className="one-row"
                    />
                  </div>
                  <div
                    style={{
                      border: "1px solid rgba(39, 39, 39, 0.2)",
                      borderRadius: 2,
                      marginTop: 4,
                      marginBottom: 8,
                    }}
                  >
                    <div className="post-row ckedit-custom">
                      <CKEditor
                        className="editor-container"
                        editor={ClassicEditor}
                        data={content}
                        config={{
                          placeholder: "Nội dung mô tả sự kiện",
                          toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link",
                            "|",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "insertTable",
                            "blockQuote",
                            "|",
                            "undo",
                            "redo",
                          ],
                          heading: {
                            options: [
                              {
                                model: "paragraph",
                                title: "Normal",
                                class: "ck-heading_normal",
                              },
                              {
                                model: "heading1",
                                view: "h1",
                                title: "Heading 1",
                                class: "ck-heading_heading1",
                              },
                              {
                                model: "heading2",
                                view: "h2",
                                title: "Heading 2",
                                class: "ck-heading_heading2",
                              },
                              {
                                model: "heading3",
                                view: "h3",
                                title: "Heading 3",
                                class: "ck-heading_heading3",
                              },
                            ],
                          },
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setContent(data);
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <textarea
                  className="collapse-form"
                  placeholder={
                    type === "event"
                      ? "Tạo sự kiện mới..."
                      : "Viết thông tin mới ..."
                  }
                  onFocus={() => setIsFocus(true)}
                ></textarea>
              )}
              {isFocus && (
                <>
                  {/* <Row className='post-row take-care'>
                <Col style={{ width: '100%' }}>
                  <MultiSelect
                    mode="multiple"
                    className={'post-input event-name-input select-tags'}
                    allowClear={true}
                    value={selectedEmployees}
                    style={{ width: '100%', border: 'none', padding: 0, minHeight: 32 }}
                    filterOption={filterOptionTag}
                    onChange={(value) => handleChange(value, 'Employees')}
                    placeholder="Người phụ trách: "
                    optionFilterProp="label"
                    optionLabelProp="label"
                    dropdownClassName={'user-select__new-post'}
                  >
                    {optionsEmployees}
                  </MultiSelect>
                </Col>
              </Row> */}
                  <Row className="post-row event-time-row">
                    {/* <EventTimePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  endTime={endTime}
                  setEndTime={setEndTime}
                /> */}
                    <Col span={18}>
                      <img
                        src={CalendarIcon}
                        alt="CalendarIcon"
                        style={{ marginRight: "10px" }}
                      />
                      Ngày:
                      <Radio
                        className="radio-all-day"
                        checked={allDay}
                        onClick={() => setAllDay(!allDay)}
                      >
                        All day
                      </Radio>
                      {allDay ? (
                        <DatePicker
                          className="date-picker-all-day"
                          format={"DD/MM/YYYY"}
                          disabledDate={current => {
                            return moment().add(-1, 'days')  >= current;
                          }}
                          suffixIcon={false}
                          placeholder={"--/--/--"}
                          value={
                            startDate ? moment(startDate, "DD/MM/YYYY") : null
                          }
                          onChange={(date) => setStartDate(date)}
                        />
                      ) : (
                        <RangeDatePicker
                          startDate={startDate}
                          setStartDate={setStartDate}
                          endDate={endDate}
                          setEndDate={setEndDate}
                        />
                      )}
                    </Col>
                    <Col span={6}>
                      <img src={ClockIcon} alt="ClockIcon" />
                      <TimePicker.RangePicker
                        className="time-picker-event"
                        value={[startTime, endTime]}
                        format="HH:mm"
                        suffixIcon={false}
                        onChange={(times) => {
                          setStartTime(times[0]);
                          setEndTime(times[1]);
                        }}
                        placeholder={["--:--", "--:--"]}
                      />
                    </Col>
                  </Row>
                  <div
                    className="expandabled-event"
                    onClick={() => setIsExtend(!isExtend)}
                  >
                    <p className="expanded-text">
                      {!isExtend ? "Mở rộng" : "Thu gọn"}
                    </p>
                    {!isExtend ? <CaretDownOutlined /> : <CaretUpOutlined />}
                  </div>
                  {isExtend && (
                    <ExtendEvent
                      address={address}
                      startDate={startDate}
                      startTime={startTime}
                      endTime={endTime}
                      optionsUserEvent={optionsUserEvent}
                      selectedEmployees={selectedEmployees}
                      setSelectedEmployees={setSelectedEmployees}
                      selectedParticipants={selectedParticipants}
                      setSelectedParticipants={setSelectedParticipants}
                      repeatType={repeatType}
                      setRepeatType={setRepeatType}
                      room={room}
                      setRoom={setRoom}
                      listEmployees={listEmployees}
                      listTags={listTags}
                      isPrivate={isPrivate}
                      setIsPrivate={setIsPrivate}
                      filterOptionTag={filterOptionTag}
                      setAddress={setAddress}
                      listCheck={listCheck}
                      setListCheck={setListCheck}
                      handleUploadFiles={handleUploadFiles}
                      handleUploadImages={handleUploadImages}
                      isEditType={isEditType}
                      content={content}
                      isValidImage={isValidImages}
                      handleDeleteImage={handleDeleteImage}
                      handleDeleteFile={handleDeleteFile}
                      filesEvent={filesPreview}
                      title={title}
                      coverImage={imagesPreview}
                      handleSubmit={handleSubmit}
                      additionInfo={additionInfo}
                      setAdditionInfo={setAdditionInfo}
                      filesInEditMode={imagesInEditMode}
                      docFilesInEditMode={docFilesInEditMode}
                      handleDeleteFilesModeEdit={handleDeleteImageEditMode}
                      handleDeleteDocFilesModeEdit={
                        handleDeleteDocFilesModeEdit
                      }
                      location={location}
                      setLocation={setLocation}
                      remind={remind}
                      setRemind={setRemind}
                      setIsFocus={setIsFocus}
                      handleAfterSubmit={handleAfterSubmit}
                    />
                  )}
                </>
              )}
            </>
          )}
          {(type === "vote" || type === "task") && (
            <>
              {!groupId && isFocus && (
                <div className="post-row tag-multiselect-input">
                  <MultiSelect
                    mode="multiple"
                    className={"post-input event-name-input select-tags"}
                    allowClear={true}
                    value={selectedValueTags}
                    style={{
                      width: "100%",
                      border: "none",
                      height: "fit-content",
                    }}
                    filterOption={filterOptionTag}
                    onChange={(value) => {
                      handleChange(value, "Tags");
                    }}
                    placeholder="Tới"
                    open={isOpenSelectTo}
                    onInputKeyDown={() => setIsOpenSelectTo(true)}
                    onMouseEnter={() => showDropdown()}
                    onMouseLeave={() => setIsOpenSelectTo(false)}
                    optionFilterProp="label"
                    optionLabelProp="label"
                    dropdownClassName={"user-select__new-post"}
                  >
                    {optionsUser}
                  </MultiSelect>
                </div>
              )}
              {isFocus ? (
                <>
                  <div className="post-row">
                    <AutoResizeTextBox
                      row="1"
                      style={{ height: "32px" }}
                      value={title}
                      ref={txtTitle}
                      onChange={(e) => onTitleChange(e)}
                      placeholder="Chủ đề"
                      className="one-row fix-fontSize"
                      id="topicVote"
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        border: "1px solid rgba(39, 39, 39, 0.2)",
                        margin: "4px 0px 8px 0px",
                      }}
                    >
                      <div className="post-row ckedit-custom">
                        <CKEditor
                          className="editor-container"
                          editor={ClassicEditor}
                          data={content}
                          config={{
                            placeholder: "Nội dung câu hỏi",
                            toolbar: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "link",
                              "|",
                              "bulletedList",
                              "numberedList",
                              "|",
                              "insertTable",
                              "blockQuote",
                              "|",
                              "undo",
                              "redo",
                            ],
                            heading: {
                              options: [
                                {
                                  model: "paragraph",
                                  title: "Normal",
                                  class: "ck-heading_normal",
                                },
                                {
                                  model: "heading1",
                                  view: "h1",
                                  title: "Heading 1",
                                  class: "ck-heading_heading1",
                                },
                                {
                                  model: "heading2",
                                  view: "h2",
                                  title: "Heading 2",
                                  class: "ck-heading_heading2",
                                },
                                {
                                  model: "heading3",
                                  view: "h3",
                                  title: "Heading 3",
                                  class: "ck-heading_heading3",
                                },
                              ],
                            },
                          }}
                          onChange={(event, editor) => {
                            const _data = editor.getData();
                            setContent(_data);
                            console.log("dmmm");
                          }}
                          onFocus={(event, editor) => {
                            setIsFocus(true);
                          }}
                        />
                      </div>
                    </div>

                    {/* <Select placeholder="Chọn loại câu hỏi" 
                className="question-select"
                // onChange={handleChange}
                >
                  <Select.Option value={1}>Một phương án trả lời</Select.Option>
                  <Select.Option value={2}>Nhiều phương án trả lời</Select.Option>
                  <Select.Option value={3}>Trả lời tùy chỉnh</Select.Option>
                </Select> */}
                  </div>
                </>
              ) : (
                <textarea
                  className="collapse-form"
                  placeholder={
                    type === "event"
                      ? "Tạo sự kiện mới..."
                      : "Viết thông tin mới ..."
                  }
                  onFocus={() => setIsFocus(true)}
                ></textarea>
              )}
              {isFocus && !isEditType && (
                <CreatePoll
                  setVoteDetails={setVoteDetails}
                  setTypeVote={setTypeVote}
                />
              )}
              {isFocus && isEditType && (
                <EditPoll
                  setVoteDetails={setVoteDetails}
                  setTypeVote={setTypeVote}
                  isEditType={isEditType}
                  postId={data.Id}
                  setTitle={setTitle}
                  setContent={setContent}
                />
              )}
              {/* {isFocus && <div className='post-row task-row'>
              <p className='post-row-label' style={{ width: '100%' }}>
                Các lựa chọn:
              </p>

              <div className='list-task-options mt--10'>
                {votes.map((_item, index) => (
                  !_item.isDeleted &&
                  <div className='task-item' key={index}>
                    <input
                      value={_item.Title}
                      disabled={_item.disable}
                      placeholder={'Nhập lựa chọn'}
                      className='task-item-input'
                      onChange={(e) => onChangeVote(index, e.target.value)}
                    /><img className='delete-icon'
                      src={IconDelete}
                      alt='icon delete'
                      onClick={() => deleteVote(_item, index)}
                    />
                  </div>
                ))}
                <Tooltip placement="top" title={'Thêm lựa chọn'}>
                  <img className='add-icon'
                    src={IconAdd}
                    alt='icon add'
                    onClick={() => handleCreateVote('')}
                  />
                </Tooltip>
              </div>

              <div className='task-time-wrapper'>
                <div className='task-time'>
                  <div>
                    <p className='post-row-label'>Thời gian thăm dò ý kiến:</p>
                  </div>
                  <Select
                    className='select-task-time'
                    value={pollTime}
                    onChange={(e) => setPollTime(e)}
                    options={[
                      { label: '2 ngày', value: 2 },
                      { label: '3 ngày', value: 3 },
                      { label: '4 ngày', value: 4 },
                    ]}
                  />
                </div>
              </div>
            </div>} */}
            </>
          )}

          {type !== "event" && !isValidImages && (
            <p style={{ color: "red", fontSize: 12 }}>
              {" "}
              Dung lượng ảnh không vượt quá 5Mb hoặc định dạng ảnh khác png,
              jpeg, gif hoặc dung lượng video không vượt quá 50Mb hoặc định dạng
              video khác mp4, avi, wmv, mov.{" "}
            </p>
          )}
          {type !== "event" && !!filesInEditMode && (
            <div
              className="files-preview-wrapper"
              style={{
                marginBottom: !!filesInEditMode ? 0 : 8,
                display: "flex",
              }}
            >
              {!!filesInEditMode &&
                filesInEditMode
                  .filter((file) => file.Type === 3)
                  .map((file, index) => (
                    <div className="file-preview-wrapper" key={index}>
                      <div style={{ display: "flex" }}>
                        <img
                          src={getIcon(file)}
                          alt="pdfIcon"
                          style={{ height: 18 }}
                        />
                        <p>{file.Name}</p>
                      </div>
                      <img
                        src={DeteleImg}
                        alt="x"
                        onClick={() => handleDeleteFilesModeEdit(file.Files)}
                      />
                    </div>
                  ))}
            </div>
          )}

          {type != "event" && location && (
            <div style={{ marginBottom: 16 }}>
              <Row>
                {address !== null && address !== "" && (
                  <AutoResizeTextBox
                    id="inputFindLocationPost"
                    style={{
                      flex: 1,
                      height: 32,
                      padding: "5px 10px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      background: "white",
                    }}
                    placeholder="Địa chỉ"
                    value={address ? `Check in tại: ${address}` : null}
                    onChange={(e) => {
                      e.target.value.trim() == "" && setLocation(null);
                    }}
                    className="one-row"
                  />
                )}
              </Row>
              <GGMap lat={location.position.lat} lng={location.position.lng} />
            </div>
          )}
        </div>
        {type !== "event" &&
        type !== "todo" &&
        type !== "group" &&
        type !== "calendar"
          ? isFocus && (
              <PostFooter
                handleUploadImages={handleUploadImages}
                handleUploadFiles={handleUploadFiles}
                setShowLocationModal={setShowLocationModal}
                setPriority={setPriority}
                priority={priority}
                showLocationModal={showLocationModal}
                tags={tags}
                setTags={setTags}
                location={location}
                setLocation={setLocation}
                isEditType={isEditType}
                setTimeCreate={setTimeCreate}
                timeCreatePost={timeCreatePost}
                content={content}
                imagesPreview={imagesPreview}
                filesPreview={filesPreview}
                handleSubmit={handleSubmit}
                isCloseCalendar={isCloseCalendar}
                setIsCloseCalendar={setIsCloseCalendar}
                type={type}
                disabled={!disabled()}
                setIsOpenSelectTo={setIsOpenSelectTo}
                handleCancel={handleCancel}
              />
            )
          : ""}
      </div>
    );
  }
);

export default TypeofPosts;

TypeofPosts.displayName = "TypeofPosts";
