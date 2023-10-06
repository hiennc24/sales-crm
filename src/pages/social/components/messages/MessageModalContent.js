/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SocketContext } from "../../../../services/socket/index";
import LayoutMain from "../../../../components/LayoutMain";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import {
  Row,
  Col,
  Select,
  Upload,
  Modal,
  Popover,
  Form,
  Button,
  Avatar,
  Space,
  Divider,
  Badge,
  Input,
  Tooltip,
  Image,
} from "antd";
import { message as messageNoti, Dropdown, Menu } from "antd";
import Scrollbars from "react-custom-scrollbars";
import ChatList from "./chat-list/ChatListChatModal";
import { FileOutlined, LeftOutlined, SendOutlined } from "@ant-design/icons";
import "./messages.scss";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../../services/api";
import {
  beforeUpload,
  beforeUploadDoc,
  getUrlFile,
  getUrlImage,
} from "../../../../utils";
import { toast } from "react-toastify";
import Picker from "emoji-picker-react";
import ModalAddUsers from "./modal-add-users/ModalAddUsers";
import DrawerListMember from "./drawer-list-member";
import ModalChangeChatName from "./modal-change-chatname/ModalChangeChatName";
import closeIcon from "../../../../assets/new/messenger/close.svg";
import moment from "moment";
import { FORMAT_DATE_TIME } from "../../../../constants/config";
import CircleX from "../../../../assets/new/messenger/circle_x.svg";

import ToolEmoji from "../../../../assets/new/messenger/tool-emoji.svg";
import ToolEmoji2 from "../../../../assets/new/messenger/tool-emoji-2.svg";
import ToolCamera from "../../../../assets/new/messenger/tool-camera.svg";
import ToolCamera2 from "../../../../assets/new/messenger/tool-camera-2.svg";
import ToolFile from "../../../../assets/new/messenger/tool-file.svg";
import ToolFile2 from "../../../../assets/new/messenger/tool-file-2.svg";
import ToolMapMarker from "../../../../assets/new/messenger/tool-mapmarker.svg";
import ToolMapMarker2 from "../../../../assets/new/messenger/tool-mapmarker-2.svg";
import ToolPlus from "../../../../assets/new/messenger/tool-plus.svg";
import ToolPlus2 from "../../../../assets/new/messenger/tool-plus-2.svg";

import ToolImage from "../../../../assets/new/messenger/tool-image.svg";
import ToolImage2 from "../../../../assets/new/messenger/tool-image-2.svg";
import Pencil from "../../../../assets/new/messenger/pencil.svg";
import Check from "../../../../assets/new/messenger/check.svg";
import Download from "../../../../assets/new/messenger/download.svg";
import Share from "../../../../assets/new/messenger/share.svg";
import Share2 from "../../../../assets/new/messenger/share-2.svg";
import Copy from "../../../../assets/new/messenger/copy.svg";
import Smile2 from "../../../../assets/new/messenger/smile-2.svg";
import CloseIcon from "../../../../assets/new/messenger/close2.svg";
import MoreIcon from "../../../../assets/new/messenger/more.svg";
import ContactIcon from "../../../../assets/new/messenger/contact.svg";
import VideoIcon from "../../../../assets/new/messenger/video-cam.svg";
import PhoneIcon from "../../../../assets/new/messenger/phone2.svg";

import ModalDeleteChat from "./modal-delete-chat/ModalDeleteChat";
import AutoResizeTextBox from "../../../../components/auto-resize-textbox/index2";

import { LinkPreview } from "@dhaiwat10/react-link-preview";
import ModalLeaveChat from "./model-leave-chat/ModalLeaveChat";
import DeleteBlack from "../../../../assets/new/common/delete-black.svg";
import EditBlack from "../../../../assets/new/common/edit-black.svg";
import ZoomIn from "../../../../assets/new/common/zoom_in.png";
import ZoomOut from "../../../../assets/new/common/zoom_out.png";

import ChatDocument from "./chat-document/ChatDocument";

import ModalSearchChat from "./modal-search-chat/ModalSearchChat";

import { Icons } from "../../../../utils";
import AvatarCustom from "../../../../components/avatar-custom";
import { useRecoilState } from "recoil";
import { listConversationUnread } from "../../../../recoil/chat-atom";
import { useHistory } from 'react-router-dom';

export const MessageModalContent = (props) => {
  const chatListRef = useRef();
  const history = useHistory()

  const [reload, setReload] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  const [isMultiContact, setIsMultiContact] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [singleContact, setSingleContact] = useState([]);
  const [message, setMessage] = useState("");
  const [conversationDetail, setConversationDetail] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );
  const [selectedList, setSelectedList] = useState([]);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const [newMessages, setNewMessages] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowModalChangeName, setIsShowModalChangeName] = useState(false);
  const [isShowAddUsersModal, setIsShowAddUsersModal] = useState(false);
  const [isModalDeleteChat, setIsModalDeleteChat] = useState(false);
  const [isModalLeaveChat, setIsModalLeaveChat] = useState(false);
  const [form] = Form.useForm();
  const [isShowCreateGroupForm, setIsShowCreateGroupForm] = useState(false);
  const [listConversation, setListConversation] = useState([]);
  const [changeList, setChangeList] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [listClipBoard, setListClipBoard] = useState([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(true);
  const [showMoreOptionPopupId, setShowMoreOptionPopupId] = useState(null);
  const [showMoreOptionPopupIdEmoji, setShowMoreOptionPopupIdEmoji] =
    useState(null);
  const [isModalDeleteMsg, setIsModalDeleteMsg] = useState(false);
  const [msgSelect, setMsgSelect] = useState(null);
  const [isUpdateMsg, setIsUpdateMsg] = useState(false);
  const [isViewDocument, setIsViewDocument] = useState(false);
  const [nameGroupChat, setNameGroupChat] = useState("");
  const [isReactMsg, setIsReactMsg] = useState(false);
  const [emojiModal, setEmojiModal] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [isShowSearchChatModal, setIsShowSearchChatModal] = useState(false);
  const [isFocusNameInput, setIsFocusNameInput] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [conversationUnread, setConversationUnread] = useRecoilState(
    listConversationUnread
  );

  const showModal = () => {
    setIsModalVisible(true);
  };
  const [isLoadData, setIsLoadData] = useState(false);

  const [keyInput, setKeyInput] = useState(true);

  const [collapseLevel1, setCollapseLevel1] = useState(true);
  const [collapseLevel2, setCollapseLevel2] = useState(true);
  const collapseLeft = useSelector((state) =>
    state.get("global").get("expandCollapseLeft")
  );
  const collapseRight = useSelector((state) =>
    state.get("global").get("expandCollapseRight")
  );

  const isShowTime = (time1, time2) => {
    const a = moment(time1); //now
    const b = moment(time2);

    console.log(a.diff(b, "minutes"));
    return a.diff(b, "minutes") <= 5 ? false : true;
  };

  useEffect(() => {
    history.listen(() => {
      props.onClose();
    })
  }, [])

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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onEmojiClick = (event, emojiObject) => {
    const text = message.concat(emojiObject.emoji);
    setMessage(text);
  };
  const inputEl = useRef(null);
  const messEl = useRef(null);

  const loadData = () => {
    //Set default
    API.chat.getListConversation().then((res) => {
      if (res.data.code === 200) {
        res.data.data.forEach((item) => {
          socket.emit("joinRoom", {
            user: userInfo,
            roomId: item.Id,
          });
          socket.on("userJoin", (msg) => {
            // console.log("joinRoom", msg);
          });
        });

        setListConversation(
          res.data.data.sort((a, b) => {
            if (
              moment
                .utc(a.UpdatedAt ? a.UpdatedAt : a.CreatedAt)
                .isBefore(b.UpdatedAt ? b.UpdatedAt : b.CreatedAt)
            ) {
              return 1;
            }
            return -1;
          })
        );
        const conversationArr = [
          ...res.data.data.sort((a, b) => {
            if (
              moment
                .utc(a.UpdatedAt ? a.UpdatedAt : a.CreatedAt)
                .isBefore(b.UpdatedAt ? b.UpdatedAt : b.CreatedAt)
            ) {
              return 1;
            }
            return -1;
          }),
        ];

        let selectContact = JSON.parse(localStorage.getItem("selectContact"));
        if (selectContact) {
          localStorage.removeItem("selectContact");
          if (!selectContact.IsCouple) {
            setNewContact({
              name: selectContact.FullName,
              msg: "",
              Employee: [
                {
                  UserId: selectContact.UserId,
                  FullName: selectContact.FullName,
                  Avatar: selectContact.Avatar,
                },
              ],
              parentId: 0,
              targetId: selectContact.UserId,
              didNotCreate: true,
            });
            setIsCreateGroup(false);
            setIsMultiContact(false);
          } else {
            const singleC = res.data.data.find(
              (r) => r.Id == selectContact.ConversationId
            );
            setSingleContact(singleC);
            API.chat.detailConversation(singleC.Id).then((rs) => {
              setCurrentConversation(rs.data.data);
              setConversationDetail((conversationDetail) => [
                ...conversationDetail,
                rs.data.data.Employee,
              ]);
              console.log("1");
              setNewMessages(rs.data.data.Details.reverse());
            });
          }
        } else {
          if (res.data.data.length > 0) {
            let singleC = [];
            if (!isMultiContact) {
              singleC = res.data.data.find((r) => !r.IsGroup);
              if (!singleC) {
                singleC = res.data.data.find((r) => r.IsGroup);
              }
            } else {
              setIsCreateGroup(false);
              singleC = res.data.data.find((r) => r.IsGroup);
            }

            setSelectedList([]);

            setNewContact(singleC);
            setIsMultiContact(singleC.IsGroup);
            swapEmployee(singleC.Id, conversationArr);
            // API.chat
            //   .detailConversation(singleC.Id)
            //   .then((rs) => {
            //     setCurrentConversation(rs.data.data);
            //     setConversationDetail((conversationDetail) => [
            //       ...conversationDetail,
            //       rs.data.data.Employee,
            //     ]);

            //     setNewMessages(rs.data.data.Details.reverse());
            //   })
            //   .then(() => swapEmployee(singleC.Id));
          } else {
            setSingleContact([]);
          }
        }
      }
    });
  };

  useEffect(() => {
    if (userInfo.Id) {
      loadData();
    }
  }, [changeList, userInfo?.Id, isLoadData]);

  useEffect(() => {
    if (userInfo.Id) {
      API.employee.getEmployeeByName("").then((res) => {
        if (res.code === 200) {
          setListEmployee(res.data);
        }
      });
    }
  }, [isReload, userInfo]);

  useEffect(() => {
    if (userInfo.Id) {
      socket.emit("setSocketId", `io_183_${userInfo.Id}`);
      socket.on("setSocketId", (msg) => {
        // console.log("setSocket", msg);
      });
    }
  }, [userInfo]);

  useEffect(() => {
    socket.off("io_chat_create");
    socket.on("io_chat_create", (data) => {
      handleNewMess(data);
    });
    countMessage();
  }, [singleContact, listConversation.length, newMessages.length]);

  const setNewContact = (selectContact) => {
    setCurrentConversation([]);
    setNewMessages([]);
    setConversationDetail([]);
    setIsCreateGroup(false);
    setIsMultiContact(false);
    setSingleContact(selectContact);
  };

  const countMessage = () => {
    let count = 0;
    listConversation.forEach((el) => el.CountNotRead > 0 && count++);
  };

  const handleNewMess = async (data) => {
    // console.log(data.msg)
    if (+data.conversationId == +singleContact.Id) {
      if (+newMessages[newMessages.length - 1]?.Id != +data.msg.chatId) {
        let mess = {
          Avatar: data.user.Avatar,
          ConversionId: +data.conversationId,
          CreatedAt: moment(data.time).add(7, "hours"),
          CreatedBy: Number(data.user.Id),
          Files: data.msg.file,
          FullName: data.user.FullName,
          Msg: data.msg.msg,
          Type: data.msg.type,
          Id: +data.msg.chatId,
        };

        setNewMessages((prevMessages) =>
          JSON.parse(JSON.stringify([...prevMessages, mess]))
        );
        const newMess = {
          ...listConversation.find((r) => +r.Id == +data.conversationId),
          LastSenderUser: data.user.Id,
          LastSenderName: data.user.Fullname,
          LastMessage: data.msg.msg,
          UpdatedAt: data.time,
        };
        setListConversation([
          newMess,
          ...listConversation.filter((r) => +r.Id != +data.conversationId),
        ]);
      }
    } else {
      const res = await API.chat.getListConversation();
      setListConversation(res.data.data);
    }
  };
  useEffect(() => {
    if (isCreateGroup) {
      setNewMessages([]);
    }
  }, [isCreateGroup]);

  useEffect(() => {
    if (!isViewDocument) {
      try {
        scrollToBottom();
      } catch (e) {}
    }
  }, [isViewDocument]);

  const swapEmployee = (id, listChat) => {
    const conversationArr = listChat || listConversation;
    setIsQuote(false);
    setMsgSelect(null);
    setListClipBoard([]);
    setIsViewDocument(false);
    setIsShowCreateGroupForm(false);
    setSelectedList([]);
    setIsCreateGroup(false);
    setIsShowModalChangeName(false);
    if (conversationArr.length > 0) {
      localStorage.removeItem("selectContact");
    }

    const item = conversationArr.find((r) => r.Id == id);
    if (item) {
      if (item.IsGroup) {
        setIsMultiContact(true);
      } else {
        setIsMultiContact(false);
      }
      socket.emit("joinRoom", {
        user: userInfo,
        roomId: item.Id,
      });
      socket.on("userJoin", (msg) => {
        // console.log("joinRoom", msg);
      });
      setSingleContact(item);
      let mess = [];
      API.chat.detailConversation(item.Id).then((res) => {
        if (item.CountNotRead != 0) {
          const newConversationUnread = conversationUnread.filter(
            (conversation) => item.Id !== conversation.Id
          );
          setConversationUnread(newConversationUnread);
          API.chat.viewLastMemberChat(res?.data?.data?.Details[0].Id);
          // item.CountNotRead = 0;
        }

        setCurrentConversation(res.data.data);
        setConversationDetail((conversationDetail) => [
          ...conversationDetail,
          res.data.data.Employee,
        ]);
        res.data.data.Details.forEach((item) => {
          mess.push(item);
        });
        setNewMessages(JSON.parse(JSON.stringify(mess.reverse())));
        // console.log(newMessages);
      });
      setReload(!reload);
    } else {
      setIsMultiContact(false);
    }
    setKeyInput(!keyInput);
    setMessage("");
  };

  const resetMultiContact = () => {
    setNewMessages([]);
    setIsMultiContact(true);
    setSelectedList([]);
    setIsShowCreateGroupForm(true);
  };

  const handleChangeContact = (data) => {
    setSelectedList(data);
  };
  const handleChangeTyping = (e) => {
    if (e.target.value.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
    setMessage(e.target.value);
  };
  const handleShowMoreOptionPopup = (index) => {
    setShowMoreOptionPopupId(showMoreOptionPopupId === index ? null : index);
  };
  const handleShowMoreOptionPopupEmoji = (index) => {
    setShowMoreOptionPopupIdEmoji(
      showMoreOptionPopupIdEmoji === index ? null : index
    );
  };

  const handleDeleteMessage = (mess) => {
    API.chat
      .deleteChat({
        conversationId: mess.ConversionId,
        chatIds: [{ ChatId: mess.Id }],
      })
      .then((rs) => {
        if (rs.data.code == 200) {
          setNewMessages(newMessages.filter((e) => e.Id != mess.Id));
          setMsgSelect(null);
        }
      });
  };

  const handleUpdateMsg = (msg) => {
    API.chat
      .updateChat({
        chatId: msgSelect.Id,
        conversionId: msgSelect.ConversionId,
        msg: msg,
      })
      .then((rs) => {
        if (rs.data.code == 200) {
          setNewMessages(
            newMessages.map((e) => {
              if (e.Id == msgSelect.Id) {
                return { ...e, Msg: msg, updateBy: true };
              }
              return e;
            })
          );
          setMessage("");
          setMsgSelect(null);
        }
      });
  };
  useMemo(() => {
    if (
      quoteData &&
      newMessages.find((item) => item.Id === Number(quoteData.Id))
    ) {
      console.log(quoteData);
      console.log(newMessages);

      const messArr = [...newMessages];
      const messRepArr = messArr.map((item, index) => {
        if (index === messArr.length - 1) {
          return {
            ...item,
            QuoteContent: quoteData.QuoteContent,
            QuoteCreateAt: quoteData.QuoteCreateAt,
            QuoteFile: quoteData.QuoteFile,
            QuoteId: Number(quoteData.QuoteId),
            QuoteName: quoteData.quoteName,
            IsLastConversion: true,
          };
        } else return { ...item, IsLastConversion: false };
      });
      setNewMessages([...messRepArr]);
      console.log(messRepArr);
      setQuoteData(null);
    }
  }, [newMessages.length]);

  // useMemo(()=>{
  //   console.log(newMessages);
  // }, [newMessages])

  const handleQuoteMsg = (msg) => {
    // setMessage("");
    setIsQuote(false);
    setMsgSelect(null);
    API.chat
      .quoteChat({
        quoteId: msgSelect.chatId,
        conversionId: msgSelect.conservationId,
        msg: msg,
        type: 0,
        quoteContent: msgSelect.msg,
        file: "",
      })
      .then((res) => {
        // console.log(res)
        setQuoteData(res.data.data);
        window.scroll(0, 100);
      });
  };
  const handleKeyDown = (e, type) => {
    if (type === "sendMessage") {
      if (e.keyCode == 13 && e.shiftKey) {
        return;
      } else if (e.key === "Enter") {
        if (!disableButton) {
          sendMessage();
        }
      } else {
        return;
      }
    } else if (type === "changeTitle") {
      if (e.key === "Enter") {
        setChatTitle(e.target.value);
      } else {
        return;
      }
    }
  };
  useEffect(() => {
    if (!isModalDeleteMsg && !isUpdateMsg && !isReactMsg) {
      if (messEl.current) {
        messEl.current.scrollTop = messEl.current.scrollHeight + 10;
        scrollToBottom();
      }
    } else if (isUpdateMsg) {
      setIsUpdateMsg(false);
      setListClipBoard([]);
    } else if (isReactMsg) {
      setIsReactMsg(false);
    } else {
      setIsModalDeleteMsg(false);
    }
    setKeyInput(!keyInput);
  }, [newMessages]);

  useState(() => {}, [messEl]);
  const deleteConversation = () => {
    setNewMessages([]);
  };
  const leaveConversation = (id) => {
    let obj = {
      conversionId: Number(id),
    };

    API.chat.leaveConversation(obj).then((res) => {
      setChangeList(!changeList);
    });
  };
  const sendMessage = async () => {
    if (isCreateGroup) {
      onFinish();
      return;
    }

    // return console.log(message)

    const isSend =
      message?.split("").findIndex((i) => i != " " && i != "\n") >= 0
        ? true
        : false;
    const isSendImg = listClipBoard.length > 0;
    if (!isSend && !isSendImg) {
      setMessage("");
      setKeyInput(!keyInput);
      return;
    }
    if (isSend) {
      if (!isUpdateMsg && !isQuote) {
        if (singleContact.didNotCreate) {
          const newConversation = {
            name: singleContact.name,
            msg: message.trim(),
            employees: singleContact.Employee.map((e) => {
              return {
                UserId: e.UserId,
                FullName: e.FullName,
              };
            }),
            parentId: 0,
            targetId: singleContact.targetId,
          };
          API.chat.createSingleConversation(newConversation).then((rs) => {
            if (rs.data.code == 200) {
              setIsMultiContact(false);
              chatListRef.current.reloadContact();
              API.chat
                .createChat({
                  conversionId: rs.data.data.Id,
                  msg: message.trim(),
                  showOnlyForSender: "",
                  file: "",
                  type: 0,
                  quoteId: 0,
                  quoteContent: "",
                })
                .then((res) => {
                  setChangeList(!changeList);
                  window.scroll(0, 100);
                });
            }
          });
        } else {
          API.chat
            .createChat({
              conversionId: singleContact.Id,
              msg: message.trim(),
              showOnlyForSender: "",
              file: "",
              type: 0,
              quoteId: 0,
              quoteContent: "",
            })
            .then((res) => {
              window.scroll(0, 100);
            });
        }

        // inputEl.current.row = 1;
        setMessage("");
        setKeyInput(!keyInput);
        setDisableButton(true);
        // }
      } else if (isQuote) {
        handleQuoteMsg(message.trim());
        setMessage("");
        setKeyInput(!keyInput);
        setDisableButton(true);
      } else {
        handleUpdateMsg(message.trim());
      }
    }
    if (isSendImg && isQuote) {
      listClipBoard.forEach((e) => handleChangeImageClipBoard(e, true));
    } else if (isSendImg) {
      listClipBoard.forEach((e) => handleChangeImageClipBoard(e));
    }
    setListClipBoard([]);
    setMessage("");
  };
  const handleChangeImageClipBoard = (info, isQuoteMsg = false) => {
    if (!beforeUpload(info)) {
      return;
    }
    const formData = new FormData();
    formData.append("files", info);
    let fileType = "document";
    if (info) {
      if (info.type.includes("image")) {
        fileType = "image";
      } else if (info.type.includes("video")) {
        fileType = "video";
      }
    }

    API.uploadFile.uploadFile(formData, fileType).then((res) => {
      if (singleContact.Id && !isQuote) {
        API.chat
          .createChat({
            conversionId: singleContact.Id,
            msg: "",
            showOnlyForSender: "",
            file:
              fileType === "image"
                ? res.imageId
                : fileType === "video"
                ? res.videoId
                : docsId,
            type: fileType === "image" ? 1 : fileType === "video" ? 2 : 3,
            quoteId: 0,
            quoteContent: "",
          })
          .then(() => {
            setChangeList(!changeList);
            window.scroll(0, 200);
          });
      } else if (isQuoteMsg) {
        API.chat
          .createChat({
            conversionId: msgSelect.conservationId,
            msg: "",
            showOnlyForSender: "",
            file:
              fileType === "image"
                ? res.imageId
                : fileType === "video"
                ? res.videoId
                : docsId,
            type: fileType === "image" ? 1 : fileType === "video" ? 2 : 3,
            quoteId: msgSelect.chatId,
            quoteContent: msgSelect.msg,
          })
          .then(() => {
            setChangeList(!changeList);
            window.scroll(0, 200);
            setMessage("");
            setIsQuote(false);
            setMsgSelect(null);
          })
          .catch(() => {
            setMessage("");
            setIsQuote(false);
            setMsgSelect(null);
          });
      } else {
        toast("can not send image in the first meet");
      }
    });
    setMessage("");
    setKeyInput(!keyInput);
    setDisableButton(true);
  };
  const handleChangeImage = (info) => {
    // console.log("handleChangeImage", info.file);
    if (info.file.status === "uploading") {
      return;
    }

    const isFile =
      info.file.type.includes("image") ||
      info.file.type.includes("video") ||
      info.file.type.includes("document");
    if (info.file.size > 1024 * 1024 * 100 || !isFile) {
      messageNoti.error(
        "You can only upload document, image, video and must smaller than 100MB!"
      );
      return;
    }

    const formData = new FormData();
    formData.append("files", info.file.originFileObj);

    let fileType = "document";
    if (info) {
      if (info.file.originFileObj?.type.includes("image")) {
        fileType = "image";
      } else if (info.file.originFileObj?.type.includes("video")) {
        fileType = "video";
      }
    }

    API.uploadFile.uploadFile(formData, fileType).then((res) => {
      if (singleContact.Id) {
        API.chat
          .createChat({
            conversionId: singleContact.Id,
            msg: "",
            showOnlyForSender: "",
            file:
              fileType === "image"
                ? res.imageId
                : fileType === "video"
                ? res.videoId
                : res.docsId,
            type: fileType === "image" ? 1 : fileType === "video" ? 2 : 3,
            quoteId: 0,
            quoteContent: "",
          })
          .then(() => {
            setChangeList(!changeList);
            scrollToBottom();
          });
      } else {
        toast("can not send image in the first meet");
      }
    });
  };

  const onFinish = (value) => {
    if (selectedList.length < 2 || !isCreatingGroup) {
      messageNoti.error("Nhóm trò chuyện cần ít nhất 3 thành viên", 3);
    } else {
      setIsCreatingGroup(false);
      setNameGroupChat("");

      let contacts = [...selectedList.map((item) => listEmployee[item])];
      let chatName = [userInfo, ...contacts]
        ?.map((item) => item?.FullName || "")
        .toString();
      API.chat
        .createConversation({
          name: nameGroupChat === "" ? chatName : nameGroupChat,
          msg: "",
          employees: contacts,
          showOnlyForSender: "",
          parentId: "",
          isGroup: true,
        })
        .then((res) => {
          setIsCreatingGroup(true);

          if (res.data.message === "DUPLICATE_CONVERSION") {
            messageNoti.error("Nhóm trò chuyện cần ít nhất 3 thành viên");
          }

          if (res.data.code == 200) {
            form.resetFields();

            if (message.trim() != "") {
              socket.emit("joinRoom", {
                user: userInfo,
                roomId: res.data.data.Id,
              });
              socket.on("userJoin", (msg) => {
                // console.log("joinRoom", msg);
              });

              setSelectedList([]);

              API.chat
                .createChat({
                  conversionId: res.data.data.Id,
                  msg: message.trim(),
                  showOnlyForSender: "",
                  file: "",
                  type: 0,
                  quoteId: 0,
                  quoteContent: "",
                })
                .then((res) => {
                  setMessage("");
                  setChangeList(!changeList);
                  window.scroll(0, 100);
                });
            } else {
              setMessage("");
              setChangeList(!changeList);
              window.scroll(0, 100);
            }
          }
        });
    }
  };
  const getImageChat = (item) => {
    if (item && item.Employee && item.Employee.length > 0) {
      if (+item.Employee[0].UserId === +userInfo.Id) {
        return item.Employee[1].Avatar;
      }
      return item.Employee[0].Avatar;
    }
  };
  const getNameChat = (item) => {
    if (item.IsGroup) {
      return item.Name;
    }
    if (item && item.Employee && item.Employee.length > 0) {
      if (+item.Employee[0].UserId === +userInfo.Id) {
        return item.Employee[1].FullName;
      }
      return item.Employee[0].FullName;
    }
    if (item.name) {
      return item.name;
    }
    return "Anonymous";
  };

  const onChangeNotify = (item) => {
    API.chat
      .updateNotify({
        conversionId: item.Id,
        status: item.IsNotification ? 0 : 1,
      })
      .then((rs) => {
        if (rs.data.code == 200) {
          if (item.IsNotification) {
            messageNoti.success("Tắt thông báo thành công");
          } else {
            messageNoti.success("Bật thông báo thành công");
          }

          setListConversation(
            listConversation.map((e) => {
              if (e.Id == item.Id) {
                e.IsNotification = !e.IsNotification;
              }
              return e;
            })
          );
        }
      });
  };

  const handleUploadImages = (e) => {
    for (const image of e.target.files) {
      if (!beforeUploadDoc(image)) {
        return;
      } else {
        setListClipBoard([...listClipBoard, ...e.target.files]);
      }
    }
    // console.log(listClipBoard, "123");
  };

  const getPureImage = (id) => {
    return newMessages.find((item) => item.Id === id)?.Files;
  };

  const handleUpdateReactMessage = (msg, emoji) => {
    let converEmoji = emoji.emoji.codePointAt(0).toString(16);
    let data = getEmojis(msg);
    let pos = data.findIndex((e) => e.Avatar == userInfo.Avatar);
    if (pos !== -1 && data[pos].Emoji === converEmoji) converEmoji = "";

    API.chat
      .updateChatReact({
        conversionId: msg.ConversionId,
        emoji: converEmoji,
        chatId: msg.Id,
      })
      .then((rs) => {
        if (rs.data.code == 200) {
          setNewMessages(
            newMessages.map((e) => {
              if (e.Id == msg.Id) {
                setIsReactMsg(true);
                return { ...e, Emoji: JSON.stringify(rs.data.data.Emoji) };
              }
              return e;
            })
          );
        }
      });
  };

  // useMemo(() => {
  //   console.log(newMessages)
  // }, [newMessages])

  const handleRenderFiles = (message, index) => {
    const imagesList = [];
    const filesList = [];
    const videoList = [];
    const [Emoji, count] = getEmojiSorted(message);
    if (message.Type === 1) {
      imagesList.push(message);
    } else if (message.Type === 2) {
      videoList.push(message);
    } else {
      filesList.push(message);
    }
    const isOwnMessage = message.CreatedBy === +userInfo.Id;
    const quoteName = message?.QuoteName?.trim().split(" ").pop() ?? "";
    const isQuoteOwnMsg = message.QuoteName == userInfo.FullName;

    return (
      <div className="file-wrapper">
        {message.QuoteId !== 0 && typeof message.QuoteId !== "undefined" && (
          <>
            <div className="quote-title-msg">
              <img src={Share}></img>
              <div style={{ marginLeft: "2px", fontSize: "12px" }}>
                {isOwnMessage
                  ? "Bạn đã trả lời "
                  : message.FullName + "đã trả lời"}
              </div>
            </div>
            <div className="quote-wrapper">
              <div className="quote-content-msg">{message.QuoteContent}</div>
            </div>
          </>
        )}
        <div className="file-type">
          {videoList.length > 0 && (
            <div style={{ margin: "20px 0" }}>
              {videoList.map((r, index) => (
                <video key={index} width="400" controls alt={r.Name}>
                  <source
                    src={`https://filemanager.crmdemo.net/uploads/${r.Files}`}
                  />
                </video>
              ))}
            </div>
          )}
          {imagesList.length > 0 && (
            <div style={{ margin: "20px 0" }}>
              <Image
                id={imagesList[0].Id}
                className="image-message"
                src={getUrlImage(0, 0, imagesList[0].Files)}
              />
            </div>
          )}
          {filesList.length > 0 && (
            <a
              href={getUrlFile(message.Files)}
              target={"_blank"}
              rel="noreferrer"
            >
              {message.Files}
            </a>
          )}
          {Emoji.length > 0 && (
            <span
              className="react-message"
              onClick={() => {
                setMsgSelect(message);
                setEmojiModal(true);
              }}
            >
              {Emoji.map((emoji, index) => (
                <span key={index}>
                  <img
                    src={Icons["icon" + String(emoji.Emoji)]}
                    width={20}
                    alt=""
                  />
                </span>
              ))}
              <p style={{ marginTop: "2px" }}>{count > 0 ? count : ""}</p>
            </span>
          )}
          {controlMessage(message, index)}
        </div>
      </div>
    );
  };
  const getEmojis = (message) => {
    try {
      let listEmoji = null;
      let data = message.Emoji.replace("\\", "");
      listEmoji = JSON.parse(data);
      return listEmoji;
    } catch {
      return [];
    }
  };

  const getEmojiSorted = (message) => {
    let count = 0;
    let listEmoji = getEmojis(message);
    let Emoji = [];
    listEmoji.forEach((emoji, index) => {
      let pos = Emoji.findIndex((e) => e.Emoji === emoji.Emoji);
      if (pos !== -1) {
        Emoji[pos].count++;
        count++;
      } else {
        if (emoji.Emoji !== "") {
          Emoji.push({ Emoji: emoji.Emoji, count: 1 });
          count++;
        }
      }
    });
    return [Emoji.sort((a, b) => (a.count < b.count ? 1 : -1)), count];
  };

  const messageBoxAction = (message, index) => {
    const [Emoji, count] = getEmojiSorted(message);
    const isOwnMessage = message.CreatedBy === +userInfo.Id;
    const senderName = message.FullName?.trim().split(" ").pop() ?? "";
    const isSenderSameQuoter = message.FullName === message.QuoteName;
    const quoteName = message?.QuoteName?.trim().split(" ").pop() ?? "";
    const isQuoteOwnMsg = message.QuoteName == userInfo.FullName;

    return (
      <div className="message-box-action">
        {/* {message.CreatedBy !== Number(userInfo.Id) &&
          newMessages[index].CreatedBy !==
            newMessages[index - 1]?.CreatedBy && (
            <div className="userchat">{message.FullName}</div>
          )} */}
        {isMultiContact &&
          message.CreatedBy !== Number(userInfo.Id) &&
          (index === 0 ||
            newMessages[index - 1].CreatedBy !==
              newMessages[index].CreatedBy) && (
            <div className="userchat">{message.FullName}</div>
          )}

        <div className="message-content-wrapper">
          {controlMessage(message, index)}
          <pre style={{ marginBottom: Emoji.length > 0 ? "0px" : "0px" }}>
            <div className="chat-box">
              {message.QuoteId !== 0 && typeof message.QuoteId !== "undefined" && (
                <>
                  {/* <div className="quote-title-msg">
              <img src={Share}></img>
              <div style={{ marginLeft: "2px" }}>
              {isOwnMessage
                  ? "Bạn đã trả lời "
                  : message.FullName + "đã trả lời"}
              </div>
            </div> */}
                  <div className="quote-wrapper" style={{ width: "100%" }}>
                    {message.QuoteContent !== "Hình ảnh" && (
                      <div className="quote-content" style={{ radius: 2 }}>
                        {/* {message.CreatedBy !== Number(userInfo.Id) &&
                    newMessages[index].CreatedBy !==
                      newMessages[index - 1]?.CreatedBy && ( */}
                        {/* )} */}
                        {message?.QuoteName && (
                          <p
                            style={{
                              borderLeft: "2px solid #2727274D",
                              color: "#272727CC",
                              marginBottom: "2px",
                              paddingLeft: "2px",
                            }}
                          >
                            {message?.QuoteName}
                          </p>
                        )}
                        <p style={{ margin: "0", fontSize: 12 }}>
                          {message.QuoteContent}
                        </p>
                      </div>
                    )}
                    {message.QuoteContent === "Hình ảnh" && (
                      <div className="quote-content-msg">
                        <Image
                          id={message.Id}
                          className="image-message"
                          src={getUrlImage(0, 0, getPureImage(message.QuoteId))}
                        />
                        {/* {message.QuoteContent} dat { getPureImage(message.QuoteId) } */}
                      </div>
                    )}
                  </div>
                </>
              )}
              {/* {getTextMessage(message.Msg).map((r, i) => {
                if (r.type == "url")
                  return (
                    <a
                      key={i}
                      target="_blank"
                      rel="noreferrer"
                      className="access-link"
                      href={r.msg}
                    >
                      {r.msg}
                    </a>
                  );
                return (
                  <span key={i} className="msg">
                    {r.msg}
                  </span>
                );

              })} */}
              <span className="msg">{message.Msg}</span>

              {Emoji.length > 0 && (
                <span
                  className="react-message"
                  onClick={() => {
                    setMsgSelect(message);
                    setEmojiModal(true);
                  }}
                >
                  {Emoji.map((emoji, index) => (
                    <span key={index}>
                      <img
                        src={Icons["icon" + String(emoji.Emoji)]}
                        width={20}
                        alt=""
                      />
                    </span>
                  ))}
                  <p style={{ marginTop: "2px" }}>{count > 0 ? count : ""}</p>
                </span>
              )}
            </div>
          </pre>
        </div>
      </div>
    );
  };
  const downloadFile = (message) => {
    saveAs(
      message.Type === 1
        ? getUrlImage(0, 0, message.Files)
        : getUrlFile(message.Files)
    );
  };

  const controlMessage = (message, index) => {
    return (
      <div className="control-message">
        <Popover
          trigger="click"
          placement="top"
          content={
            <>
              <div className="emoji-wrapper">
                <pre
                  onClick={() => {
                    setShowMoreOptionPopupIdEmoji(null);
                    handleUpdateReactMessage(message, { emoji: "👍" });
                  }}
                >
                  <img src={Icons.icon1f44d} width={20} alt="" />
                </pre>
                <pre
                  onClick={() => {
                    setShowMoreOptionPopupIdEmoji(null);
                    handleUpdateReactMessage(message, { emoji: "❤️" });
                  }}
                >
                  <img src={Icons.icon2764} width={20} alt="" />
                </pre>
                <pre
                  onClick={() => {
                    setShowMoreOptionPopupIdEmoji(null);
                    handleUpdateReactMessage(message, { emoji: "😆" });
                  }}
                >
                  <img src={Icons.icon1f606} width={20} alt="" />
                </pre>
                <pre
                  onClick={() => {
                    setShowMoreOptionPopupIdEmoji(null);
                    handleUpdateReactMessage(message, { emoji: "😢" });
                  }}
                >
                  <img src={Icons.icon1f622} width={20} alt="" />
                </pre>
                <pre
                  onClick={() => {
                    setShowMoreOptionPopupIdEmoji(null);
                    handleUpdateReactMessage(message, { emoji: "😡" });
                  }}
                >
                  <img src={Icons.icon1f621} width={20} alt="" />
                </pre>
                <pre
                  onClick={() => {
                    setShowMoreOptionPopupIdEmoji(null);
                    handleUpdateReactMessage(message, { emoji: "😮" });
                  }}
                >
                  <img src={Icons.icon1f62e} width={20} alt="" />
                </pre>
                {/* <img src={EmojiHeart} alt="" onClick={()=>sendReact({emoji:"❤️"})}/>
             <img src={EmojiSmile} alt="" onClick={()=>sendReact({emoji:"😆"})}/>
             <img src={EmojiWow} alt="" onClick={()=>sendReact({emoji:"😮"})}/>
             <img src={EmojiSad} alt="" onClick={()=>sendReact({emoji:"😢"})}/>
             <img src={EmojiAngry} alt="" onClick={()=>sendReact({emoji:"😡"})}/>
             <img src={EmojiLike} alt="" onClick={()=>sendReact({emoji:"👍"})}/> */}
              </div>
            </>
          }
          visible={showMoreOptionPopupIdEmoji === index}
          onVisibleChange={() => handleShowMoreOptionPopupEmoji(index)}
        >
          <Tooltip placement="bottom" title="Bày tỏ cảm xúc">
            <img src={Smile2} className="pin" alt="moreIcon" />
          </Tooltip>
        </Popover>
        {message.Files !== "" && typeof message.Files !== "undefined" ? (
          <Tooltip placement="bottom" title="Tải xuống">
            <img
              src={Download}
              className="pin"
              alt="moreIcon"
              onClick={() => downloadFile(message)}
            />
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title="Trả lời">
            <img
              src={Share}
              className="pin"
              alt="moreIcon"
              onClick={() => openQuote(message)}
            />
          </Tooltip>
        )}

        <Popover
          placement={
            message.CreatedBy === Number(userInfo.Id) ? "topRight" : "topLeft"
          }
          trigger="click"
          content={
            <>
              {message.CreatedBy === Number(userInfo.Id) && message.Type == 0 && (
                <div
                  className="more-action__message-control"
                  onClick={() => {
                    setIsUpdateMsg(true);
                    setMessage(message.Msg);
                    setMsgSelect(message);
                    setShowMoreOptionPopupId(null);
                    setListClipBoard([]);
                  }}
                >
                  <img src={EditBlack} />
                  <p>Chỉnh sửa</p>
                </div>
              )}
              <div
                className="more-action__message-control"
                onClick={() => {
                  setMsgSelect(message);
                  setIsModalDeleteMsg(true), setShowMoreOptionPopupId(null);
                }}
              >
                <img src={DeleteBlack} className="pg--5" />
                <p>Xoá</p>
              </div>
              <div
                className="more-action__message-control"
                onClick={() => {
                  setShowMoreOptionPopupId(null);
                  copyToClipboard(message);
                }}
              >
                <img src={Copy} className="pg--5" />
                <p>Copy</p>
              </div>

              {message.Files !== "" && typeof message.Files !== "undefined" && (
                <div
                  className="more-action__message-control"
                  onClick={() => {
                    setShowMoreOptionPopupId(null);
                    openQuote(message);
                  }}
                >
                  <img src={Share2} className="pin" alt="moreIcon" />
                  <p>Trả lời</p>
                </div>
              )}
            </>
          }
          visible={showMoreOptionPopupId === index}
          onVisibleChange={() => handleShowMoreOptionPopup(index)}
        >
          {" "}
          <Tooltip placement="bottom" title="Xem thêm">
            <img
              style={{ width: "15px" }}
              src={Icons.more}
              // className="pin"
              alt="moreIcon"
            />
          </Tooltip>
        </Popover>
      </div>
    );
  };
  async function copyToClipboard(message) {
    // navigator clipboard api needs a secure context (https)
    if (message.Type == 0) {
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(message.Msg);
      } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = message.Msg;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    } else {
      const containImg = document.getElementById(message.Id);
      if (containImg && containImg.getElementsByTagName("img")[0]) {
        try {
          containImg.getElementsByTagName("img")[0].crossOrigin = "*";
          setTimeout(() => {
            const image = containImg.getElementsByTagName("img")[0];
            const canvas = document.createElement("canvas");
            canvas.setAttribute(
              "style",
              "position: fixed; top: -99999px; left: -99999px"
            );
            canvas.width = image.width;
            canvas.height = image.height;
            document.body.appendChild(canvas);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(function (blob) {
              const item = new ClipboardItem({ "image/png": blob });
              navigator.clipboard.write([item]);
              document.body.removeChild(canvas);
            });
          }, 400);
        } catch (error) {
          // console.error("Something wrong happened");
          console.error(error);
        }
      }
    }
  }
  const getLinkFromPost = (content) => {
    let links = [];
    let str = "";
    let newS = content + " ";
    newS.split("").forEach((c) => {
      if (c == " " || c == "\n") {
        if (str.slice(0, 8) == "https://" || str.slice(0, 7) == "http://") {
          if (links.findIndex((e) => e == str) == -1) {
            links.push(str);
          }
        }
        str = "";
      } else {
        str += c;
      }
    });
    return links;
  };

  const getTextMessage = (content) => {
    let texts = [];
    let str = "";
    let newS = content + " ";
    newS.split("").forEach((c, index) => {
      if (index != newS.split("").length) str += c;
      if (c == " " || c == "\n") {
        if (str.slice(0, 8) == "https://" || str.slice(0, 7) == "http://") {
          texts.push({
            msg: str,
            type: "url",
          });
        } else {
          texts.push({
            msg: str,
            type: "text",
          });
        }
        str = "";
      }
    });
    return texts;
  };

  const scrollToBottom = () => {
    let element = document.getElementById("scroll-bar").firstElementChild;
    element.scrollTop = element.scrollHeight;
  };

  const handleClickCreateGroup = () => {
    setIsCreateGroup(!isCreateGroup);
    if (!isMultiContact) {
      setIsMultiContact(true);
    } else if (singleContact) {
      setIsMultiContact(!!singleContact.IsGroup);
    }
  };

  const onChangeNameGroupChat = (e) => {
    setNameGroupChat(e.target.value);
  };

  const onChangeName = (singleContact) => {
    if (isShowModalChangeName) {
      API.chat
        .updateNameGroupChat({ name: nameGroupChat }, singleContact.Id)
        .then((r) => {
          if (r.data.code === 200) {
            loadData();
            messageNoti.success("Đổi tên nhóm thành công");
          } else {
            messageNoti.error("Đổi tên nhóm thất bại");
          }
        });
    } else {
      setNameGroupChat(getNameChat(singleContact));
    }
    setIsShowModalChangeName(!isShowModalChangeName);
  };
  const openQuote = (message) => {
    setMsgSelect({
      name: message.FullName.trim().split(" ").pop(),
      msg:
        message.Type === 0
          ? message.Msg
          : message.Type === 1
          ? "Hình ảnh"
          : message.Type === 2
          ? "Video"
          : "File",
      conservationId: message.ConversionId,
      chatId: message.Id,
    });
    setIsQuote(true);
  };
  const closeQuote = () => {
    setMsgSelect(null);
    setIsQuote(false);
  };

  return (
    <>
      <div className="common--layout" style={{ height: "100%", minHeight: 0 }}>
        <div
          className={`message-page ${collapseLevel1 ? "level1" : ""} ${
            collapseLevel2 ? "level2" : ""
          }`}
          style={{
            marginLeft: 0,
            width: "100%",
            paddingLeft: 0,
            height: "100%",
          }}
        >
          <Row
            gutter={40}
            className="main-row chat--container__row"
            style={{ height: "100%" }}
          >
            <Col className="left-col" style={{ position: "relative" }}>
              <div className="chat-modal__chatlist">
                <ChatList
                  ref={chatListRef}
                  listMember={listEmployee}
                  setIsMultiContact={resetMultiContact}
                  swapEmployee={swapEmployee}
                  listConversation={listConversation}
                  userInfo={userInfo}
                  setSingleContact={setSingleContact}
                  idSelected={singleContact.Id}
                  setIsCreateGroup={() => handleClickCreateGroup()}
                  setNewContact={(e) => setNewContact(e)}
                  selectContact={() => setChangeList(!changeList)}
                  onClose={props.onClose}
                />
              </div>

              {/* </Scrollbars> */}
              {/* <div className='divine__middle-chat'></div> */}
            </Col>
            <Col className="right-col">
              {((listEmployee &&
                (listConversation.length != 0 || singleContact?.length != 0)) ||
                isCreateGroup) && (
                <div
                  className={`work-space ${
                    listClipBoard.length > 0 ? " active" : ""
                  }`}
                  style={{ height: "calc(100% - 60px)" }}
                >
                  <div className="header">
                    {isMultiContact && !isCreateGroup && (
                      <div
                        style={{
                          marginRight: 8,
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                        className="chat__group--avatar"
                      >
                        <Avatar.Group
                          maxCount={2}
                          maxStyle={{
                            color: "white",
                            backgroundColor: "#32A1C8",
                          }}
                        >
                          <AvatarCustom
                            size={40}
                            src={getUrlImage(
                              200,
                              200,
                              singleContact.Employee[0]?.Avatar
                            )}
                            fullName={singleContact.Employee[0]?.FullName}
                          />
                          <AvatarCustom
                            size={40}
                            src={getUrlImage(
                              200,
                              200,
                              singleContact.Employee[1]?.Avatar
                            )}
                            fullName={singleContact.Employee[1]?.FullName}
                          />
                          <Tooltip
                            title="Ant User"
                            placement="bottom"
                            style={{ cursor: "pointer" }}
                          >
                            {singleContact.Employee.filter(
                              (item, index) => index === 2
                            ).map((item, index) => (
                              <AvatarCustom
                                key={index}
                                src={getUrlImage(35, 35, item.Avatar)}
                                fullName={item.FullName}
                              />
                            ))}
                          </Tooltip>
                          {singleContact.Employee.filter(
                            (item, index) => index > 2
                          ).map((item, index) => (
                            <AvatarCustom
                              key={index}
                              src={getUrlImage(35, 35, item.Avatar)}
                              fullName={item.FullName}
                            />
                          ))}
                        </Avatar.Group>
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: "1",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-end" }}>
                        {!isMultiContact ? (
                          <>
                            {!singleContact ? (
                              <>
                                <Space
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span className="messageName">Đến: </span>
                                </Space>
                                <Select
                                  bordered={false}
                                  className="multi-contacts"
                                  suffixIcon={false}
                                  showSearch
                                  optionFilterProp="label"
                                  optionLabelProp="label"
                                  onSelect={(value) => {
                                    let dataPick = listEmployee[value];
                                    listConversation?.find(
                                      (item) =>
                                        item?.Id === dataPick?.ConversationId
                                    )
                                      ? swapEmployee(dataPick?.ConversationId)
                                      : onFinish({
                                          contactsIndex: [value],
                                          chatName: dataPick?.FullName,
                                        });
                                  }}
                                >
                                  {listEmployee.map((contact, index) => (
                                    <Select.Option
                                      key={index}
                                      style={{ width: "215px" }}
                                      value={index}
                                      label={contact.FullName}
                                    >
                                      <Space>
                                        <AvatarCustom
                                          size={32}
                                          src={getUrlImage(
                                            35,
                                            35,
                                            contact.Avatar
                                          )}
                                          fullName={contact.FullName}
                                        />
                                        {contact.FullName}
                                      </Space>
                                    </Select.Option>
                                  ))}
                                </Select>
                              </>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Badge
                                  color="rgb(49, 162, 76)"
                                  offset={[-7, 33]}
                                  style={{ width: "9px", height: "9px" }}
                                  dot
                                >
                                  <AvatarCustom
                                    size={40}
                                    src={getUrlImage(
                                      35,
                                      35,
                                      getImageChat(singleContact)
                                    )}
                                    fullName={
                                      getNameChat(singleContact) || "Anonymous"
                                    }
                                  />
                                  {/* <Avatar
                                    size={40}
                                    src={getUrlImage(
                                      35,
                                      35,
                                      getImageChat(singleContact)
                                    )}
                                  /> */}
                                </Badge>

                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    marginLeft: 6,
                                  }}
                                >
                                  <span className="messageName">
                                    {getNameChat(singleContact)}
                                  </span>
                                  <div className="expand-info">
                                    <div
                                      style={{ paddingLeft: 0 }}
                                      className="expand-info__item"
                                      onClick={() =>
                                        setIsViewDocument(!isViewDocument)
                                      }
                                    >
                                      <img src={Icons.folder} alt="gallery" />{" "}
                                      Tài liệu
                                    </div>
                                    <span>|</span>
                                    <div
                                      className="expand-info__item"
                                      onClick={() =>
                                        setIsShowSearchChatModal(true)
                                      }
                                    >
                                      <img src={Icons.search} alt="find" /> Tìm
                                      kiếm
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : isCreateGroup ? (
                          <Form
                            layout="inline"
                            form={form}
                            // onFinish={onFinish}
                            requiredMark={false}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                              flexWrap: "nowrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flex: 2,
                                marginRight: "40px",
                              }}
                            >
                              <Space
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  marginRight: "15px",
                                }}
                                onClick={() => {
                                  setIsCreateGroup(false);
                                  swapEmployee(singleContact?.Id);
                                  setNameGroupChat("");
                                }}
                              >
                                <LeftOutlined />
                              </Space>
                              <Form.Item
                                // label={<span className="messageName">Đến</span>}
                                name="group-name"
                                style={{
                                  width: "50%",
                                  marginRight: 0,
                                  backgroundColor: "#f3f4f6",
                                }}
                              >
                                <Input
                                  // onChange={handleChangeContact}
                                  className="multi-contacts create--group__group--name"
                                  // placeholder="Tên nhóm..."
                                  bordered={false}
                                  style={{ backgroundColor: "#f3f4f6" }}
                                  suffixIcon={false}
                                  onFocus={() => setIsFocusNameInput(true)}
                                  onBlur={() => setIsFocusNameInput(false)}
                                  prefix={
                                    nameGroupChat === "" &&
                                    !isFocusNameInput ? (
                                      <div style={{ color: "#32a2c9" }}>
                                        Tên nhóm...
                                      </div>
                                    ) : (
                                      <></>
                                    )
                                  }
                                  value={nameGroupChat}
                                  onChange={onChangeNameGroupChat}
                                ></Input>
                              </Form.Item>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  backgroundColor: "#f3f4f6",
                                }}
                              >
                                <div
                                  style={{
                                    backgroundColor: "rgba(39, 39, 39, 0.2)",
                                    height: "70%",
                                    width: 1,
                                  }}
                                ></div>
                              </div>
                              <Form.Item
                                // label={<span className="messageName">Đến</span>}
                                name="contactsIndex"
                                style={{ width: "50%" }}
                              >
                                <Select
                                  mode="multiple"
                                  onChange={handleChangeContact}
                                  className="multi-contacts create--group__select--member"
                                  placeholder="Thành viên..."
                                  bordered={false}
                                  style={{
                                    backgroundColor: "#f3f4f6",
                                    marginRight: 8,
                                  }}
                                  suffixIcon={false}
                                  showSearch
                                  optionFilterProp="label"
                                  optionLabelProp="label"
                                >
                                  {listEmployee.map((contact, index) => (
                                    <Select.Option
                                      key={index}
                                      value={index}
                                      label={contact.FullName}
                                    >
                                      <Space>
                                        <AvatarCustom
                                          size={32}
                                          src={getUrlImage(
                                            35,
                                            35,
                                            contact.Avatar ?? ""
                                          )}
                                          fullName={contact.FullName}
                                        />
                                        {contact.FullName || contact.Email}
                                      </Space>
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>
                            <Form.Item>
                              <Button
                                type="primary"
                                onClick={() => onFinish()}
                                className={
                                  isMultiContact && selectedList.length == 0
                                    ? " customBtn"
                                    : "customBtn active"
                                }
                              >
                                Tạo nhóm
                              </Button>
                            </Form.Item>
                          </Form>
                        ) : (
                          <>
                            {/* <Avatar.Group style={{ marginRight: 10 }}>
                              {singleContact.Employee.map((item, index) => (
                                <Avatar
                                  key={index}
                                  src={getUrlImage(35, 35, item.Avatar)}
                                />
                              ))}
                            </Avatar.Group> */}

                            {isShowModalChangeName ? (
                              <Input
                                value={nameGroupChat}
                                style={{ width: "300px" }}
                                onChange={onChangeNameGroupChat}
                              />
                            ) : (
                              <span
                                className="messageName"
                                style={{ margin: 0, marginBottom: 2 }}
                              >
                                {getNameChat(singleContact)}
                              </span>
                            )}
                          </>
                        )}
                        {!isCreateGroup && isMultiContact && (
                          <Tooltip
                            title="Đổi tên nhóm"
                            onClick={() => onChangeName(singleContact)}
                          >
                            <div
                              className="edit-name__btn"
                              style={{ marginBottom: 0 }}
                            >
                              <img
                                src={isShowModalChangeName ? Check : Pencil}
                                alt="edit-name"
                              />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                      {!isCreateGroup && !singleContact.didNotCreate && (
                        <div className="expand-info">
                          {isMultiContact && (
                            <>
                              <div
                                style={{ paddingLeft: 0 }}
                                className="expand-info__item"
                                onClick={() => setVisibleDrawer(true)}
                              >
                                {singleContact?.Employee?.length} Thành viên
                              </div>
                              <span>|</span>
                              <div
                                className="expand-info__item"
                                onClick={() =>
                                  setIsViewDocument(!isViewDocument)
                                }
                              >
                                <img src={Icons.folder} alt="gallery" /> Tài
                                liệu
                              </div>
                              <span>|</span>
                              <div
                                className="expand-info__item"
                                onClick={() => setIsShowSearchChatModal(true)}
                              >
                                <img src={Icons.search} alt="find" /> Tìm kiếm
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    {!singleContact?.didNotCreate && !isCreateGroup && (
                      <div className="button-group">
                        <div className="more-options ">
                          <img src={PhoneIcon} alt="callVideo" />
                        </div>
                        {/* <div className="more-options">
                          <img src={Phone} alt="call" />
                        </div> */}
                        {isMultiContact && (
                          <Tooltip
                            title="Thêm thành viên"
                            onClick={() => setIsShowAddUsersModal(true)}
                          >
                            <div className="more-options">
                              <img src={Icons.groupAdd} alt="addUser" />
                            </div>
                          </Tooltip>
                        )}

                        <div className="more-options ">
                          <img src={VideoIcon} alt="callVideo" />
                        </div>
                        <div className="more-options ">
                          <img src={ContactIcon} alt="callVideo" />
                        </div>

                        <Dropdown
                          placement="bottomRight"
                          className="more-options"
                          overlay={
                            <Menu style={{ width: "200px" }}>
                              {!singleContact.IsGroup && (
                                <>
                                  <Menu.Item
                                    key="0"
                                    onClick={() =>
                                      onChangeNotify(singleContact)
                                    }
                                    icon={
                                      <img
                                        style={{ width: 18 }}
                                        src={
                                          singleContact.IsNotification
                                            ? Icons.notification
                                            : Icons.notificationOff
                                        }
                                        alt="Notify"
                                      />
                                    }
                                  >
                                    {singleContact.IsNotification
                                      ? "Tắt thông báo"
                                      : "Bật thông báo"}
                                  </Menu.Item>
                                  <Menu.Item
                                    key="1"
                                    onClick={() => setIsModalDeleteChat(true)}
                                    icon={
                                      <img
                                        style={{ width: 18 }}
                                        src={Icons.deleteGray}
                                        alt="Delete"
                                      />
                                    }
                                  >
                                    Xóa cuộc trò chuyện
                                  </Menu.Item>
                                </>
                              )}
                              {singleContact.IsGroup && (
                                <>
                                  <Menu.Item
                                    key="0"
                                    onClick={() =>
                                      onChangeNotify(singleContact)
                                    }
                                    icon={
                                      <img
                                        style={{ width: 18 }}
                                        src={
                                          singleContact.IsNotification
                                            ? Icons.notification
                                            : Icons.notificationOff
                                        }
                                        alt="Notify"
                                      />
                                    }
                                  >
                                    {singleContact.IsNotification
                                      ? "Tắt thông báo"
                                      : "Bật thông báo"}
                                  </Menu.Item>
                                  <Menu.Item
                                    key="1"
                                    onClick={() => {
                                      setIsModalLeaveChat(true);
                                    }}
                                    icon={
                                      <img
                                        src={Icons.logout}
                                        alt="LeaveGroup"
                                        style={{ width: 18 }}
                                      />
                                    }
                                  >
                                    Rời khỏi nhóm
                                  </Menu.Item>
                                  {/* <Menu.Item 
                                      key="0"
                                      onClick={() =>
                                        onChangeNotify(singleContact)
                                      }
                                      icon={<img
                                          style={{ width: 18 }}
                                          src={
                                            singleContact.IsNotification
                                              ? Notify
                                              : NoNotify
                                          }
                                          alt="Notify"
                                        />}
                                    >
                                      
                                      {singleContact.IsNotification
                                            ? "Tắt thông báo"
                                            : "Bật thông báo"}
                                    </Menu.Item>
                                    <Menu.Item 
                                      key="1"
                                      onClick={() => {
                                        setIsModalLeaveChat(true);
                                      }}
                                      icon={<img src={LeaveGroup} alt="LeaveGroup" />}
                                    >
                                      Rời khỏi nhóm
                                    </Menu.Item> */}
                                </>
                              )}
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <div>
                            <img src={Icons.more} alt="dots" />
                          </div>
                        </Dropdown>
                        <div className="more-options ">
                          <img
                            src={ZoomOut}
                            alt="ZoomOut"
                            onClick={props.handleZoomOut}
                          />
                        </div>
                        <div className="more-options ">
                          <img
                            src={CloseIcon}
                            alt="callVideo"
                            onClick={props.onClose}
                          />
                        </div>
                        <ModalAddUsers
                          currentConversation={currentConversation ?? null}
                          isShowAddUsersModal={isShowAddUsersModal}
                          setIsShowAddUsersModal={setIsShowAddUsersModal}
                          currentMember={conversationDetail}
                          conversationId={singleContact ? singleContact.Id : 0}
                          setchangeList={setChangeList}
                          changeList={changeList}
                        />
                        {/* <ModalChangeChatName
                        isShowModalChangeName={isShowModalChangeName}
                        setIsShowModalChangeName={setIsShowModalChangeName}
                        idGroupChat={singleContact.Id}
                        loadData={() => setIsLoadData(!isLoadData)}
                      /> */}
                        <ModalLeaveChat
                          isModalLeaveChat={isModalLeaveChat}
                          setIsModalLeaveChat={setIsModalLeaveChat}
                          changeList={changeList}
                          setChangeList={setChangeList}
                          idConversation={singleContact.Id}
                          loadData={() => setChangeList(!changeList)}
                        />
                        <ModalDeleteChat
                          isModalDeleteChat={isModalDeleteChat}
                          setIsModalDeleteChat={setIsModalDeleteChat}
                          idDelete={singleContact.Id}
                          isConversation={true}
                          loadData={() => setChangeList(!changeList)}
                        />
                        <Modal
                          title={
                            <span className="title" style={{ color: "white" }}>
                              Xóa tin nhắn
                            </span>
                          }
                          visible={isModalDeleteMsg}
                          onCancel={() => setIsModalDeleteMsg(false)}
                          className="modalCustom"
                          bodyStyle={{ padding: "20px" }}
                          footer={[
                            <Button
                              key="1"
                              type="secondary"
                              onClick={() => setIsModalDeleteMsg(false)}
                            >
                              Huỷ
                            </Button>,
                            <Button
                              key="2"
                              type="primary"
                              onClick={() => handleDeleteMessage(msgSelect)}
                            >
                              Xóa
                            </Button>,
                          ]}
                        >
                          <span className="subTitle">
                            Chúng tôi sẽ gỡ tin nhắn này cho bạn, những thành
                            viên khác trong đoạn chat vẫn có thể xem được.
                          </span>
                        </Modal>
                      </div>
                    )}
                  </div>
                  <Divider className="chatDivider" orientation />
                  {!isViewDocument ? (
                    <>
                      <div className="content" ref={messEl}>
                        <Scrollbars autoHide id="scroll-bar">
                          {singleContact &&
                            newMessages.map((message, index) =>
                              message.Type === 8 && isMultiContact ? (
                                <div className="message-add-leave">
                                  {message.Msg}
                                </div>
                              ) : index === 0 ||
                                newMessages[index].CreatedBy !==
                                  newMessages[index + 1]?.CreatedBy ? (
                                <div
                                  className={`message-content ${
                                    message.CreatedBy === Number(userInfo.Id)
                                      ? "own-message"
                                      : "normal-message"
                                  }`}
                                  style={
                                    isMultiContact
                                      ? {
                                          position: "relative",
                                          // paddingTop: 14
                                        }
                                      : {}
                                  }
                                  key={index}
                                >
                                  {/* {isMultiContact &&
                                    message.CreatedBy !==
                                      Number(userInfo.Id) && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          left: 28,
                                          top: 0,
                                          fontSize: 11,
                                        }}
                                        className="userchat"
                                      >
                                        {message.FullName}
                                      </div>
                                    )} */}
                                  {message.CreatedBy !==
                                    Number(userInfo.Id) && (
                                    <div
                                      style={{
                                        paddingTop:
                                          index === 0 ||
                                          newMessages[index - 1].CreatedBy !==
                                            newMessages[index].CreatedBy
                                            ? 19
                                            : 0,
                                      }}
                                    >
                                      <Badge
                                        color={
                                          message.Type === 0
                                            ? "rgb(49, 162, 76)"
                                            : "rgb(0,0,0,0)"
                                        }
                                        dot
                                        offset={[-4, 24]}
                                        style={{
                                          width: "8px",
                                          height: "8px",
                                          opacity:
                                            (index === 0 ||
                                              newMessages[index - 1]
                                                .CreatedBy !==
                                                newMessages[index].CreatedBy) &&
                                            message.Type === 0
                                              ? 1
                                              : 0,
                                        }}
                                        className="mt-3"
                                      >
                                        {/* <Avatar
                                        size={28}
                                        src={getUrlImage(
                                          200,
                                          200,
                                          message.Avatar ?? ""
                                        )}
                                        alt="image"
                                        style={{
                                          opacity: message.Type === 0 ? 1 : 0,
                                        }}
                                      /> */}
                                        <AvatarCustom
                                          size={28}
                                          src={getUrlImage(
                                            200,
                                            200,
                                            message.Avatar ?? ""
                                          )}
                                          // alt="image"
                                          style={{
                                            opacity:
                                              (index === 0 ||
                                                newMessages[index - 1]
                                                  .CreatedBy !==
                                                  newMessages[index]
                                                    .CreatedBy) &&
                                              message.Type === 0
                                                ? 1
                                                : 0,
                                          }}
                                          fullName={
                                            message.FullName || "Anonymous"
                                          }
                                        />
                                      </Badge>
                                    </div>
                                  )}

                                  <div className="message-box">
                                    {message.Type === 0 ? (
                                      <>
                                        {(index === 0 ||
                                          newMessages[index - 1].CreatedBy !==
                                            newMessages[index].CreatedBy ||
                                          isShowTime(
                                            newMessages[index].CreatedAt,
                                            newMessages[index - 1].CreatedAt
                                          )) && (
                                          // console.log(newMessages[index])
                                          <div
                                            style={{
                                              fontSize: 12,
                                              color: "#6E6F72",
                                            }}
                                            className="message-datetime"
                                          >
                                            {moment
                                              .utc(
                                                message.CreatedAt.search(
                                                  "Z"
                                                ) !== -1
                                                  ? message.CreatedAt
                                                  : message.CreatedAt + "Z"
                                              )
                                              .format("HH:mm")}{" "}
                                            |{" "}
                                            {moment
                                              .utc(
                                                message.CreatedAt.search(
                                                  "Z"
                                                ) !== -1
                                                  ? message.CreatedAt
                                                  : message.CreatedAt + "Z"
                                              )
                                              .calendar()}
                                          </div>
                                        )}

                                        {messageBoxAction(message, index)}

                                        {getLinkFromPost(message.Msg).length !=
                                          0 && (
                                          <div className="preview-url-wrapper">
                                            {getLinkFromPost(message.Msg).map(
                                              (url, index) => {
                                                return (
                                                  <LinkPreview
                                                    key={index}
                                                    className="preview-url-wrapper__container"
                                                    url={url}
                                                    descriptionLength={50}
                                                  />
                                                );
                                              }
                                            )}
                                          </div>
                                        )}
                                      </>
                                    ) : message.Type === 1 ? (
                                      <div>
                                        {handleRenderFiles(message, index)}
                                      </div>
                                    ) : message.Type === 2 ? (
                                      <div>
                                        {handleRenderFiles(message, index)}
                                      </div>
                                    ) : (
                                      <div>
                                        {" "}
                                        {handleRenderFiles(message, index)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={`message-content dmm ${
                                    message.CreatedBy === Number(userInfo.Id)
                                      ? "own-message"
                                      : "normal-message"
                                  }`}
                                  key={index}
                                >
                                  {message.CreatedBy !==
                                    Number(userInfo.Id) && (
                                    <div
                                      style={{
                                        paddingTop:
                                          index === 0 ||
                                          newMessages[index - 1].CreatedBy !==
                                            newMessages[index].CreatedBy
                                            ? 19
                                            : 0,
                                      }}
                                    >
                                      <Badge
                                        color={
                                          message.Type === 0
                                            ? "rgb(49, 162, 76)"
                                            : "rgb(0,0,0,0)"
                                        }
                                        dot
                                        offset={[-7, 33]}
                                        style={{
                                          width: "8px",
                                          height: "8px",
                                          opacity:
                                            (index === 0 ||
                                              newMessages[index - 1]
                                                .CreatedBy !==
                                                newMessages[index].CreatedBy) &&
                                            message.Type === 0
                                              ? 1
                                              : 0,
                                        }}
                                        className="mt-3"
                                      >
                                        <AvatarCustom
                                          size={28}
                                          src={getUrlImage(
                                            200,
                                            200,
                                            message.Avatar ?? ""
                                          )}
                                          alt="image"
                                          style={{
                                            opacity:
                                              (index === 0 ||
                                                newMessages[index - 1]
                                                  .CreatedBy !==
                                                  newMessages[index]
                                                    .CreatedBy) &&
                                              message.Type === 0
                                                ? 1
                                                : 0,
                                          }}
                                          fullName={message.FullName}
                                        />
                                      </Badge>
                                    </div>
                                  )}

                                  <div className="message-box">
                                    {(index === 0 ||
                                      newMessages[index - 1].CreatedBy !==
                                        newMessages[index].CreatedBy ||
                                      isShowTime(
                                        newMessages[index].CreatedAt,
                                        newMessages[index - 1].CreatedAt
                                      )) && (
                                      <div
                                        style={{
                                          fontSize: 12,
                                          color: "#6E6F72",
                                        }}
                                        className="message-datetime"
                                      >
                                        {moment
                                          .utc(
                                            message.CreatedAt.search("Z") !== -1
                                              ? message.CreatedAt
                                              : message.CreatedAt + "Z"
                                          )
                                          .format("HH:mm")}{" "}
                                        |{" "}
                                        {moment
                                          .utc(
                                            message.CreatedAt.search("Z") !== -1
                                              ? message.CreatedAt
                                              : message.CreatedAt + "Z"
                                          )
                                          .calendar()}
                                      </div>
                                    )}
                                    {message.Type === 0 ? (
                                      <>
                                        {messageBoxAction(message, index)}
                                        {getLinkFromPost(message.Msg).length !=
                                          0 && (
                                          <div className="preview-url-wrapper">
                                            {getLinkFromPost(message.Msg).map(
                                              (url, index) => {
                                                return (
                                                  <LinkPreview
                                                    key={index}
                                                    className="preview-url-wrapper__container"
                                                    url={url}
                                                    descriptionLength={50}
                                                  />
                                                );
                                              }
                                            )}
                                          </div>
                                        )}
                                      </>
                                    ) : message.Type === 1 ? (
                                      <>
                                        <div>
                                          {handleRenderFiles(message, index)}
                                        </div>
                                      </>
                                    ) : message.Type === 2 ? (
                                      <div>
                                        {handleRenderFiles(message, index)}
                                      </div>
                                    ) : (
                                      <div>
                                        {handleRenderFiles(message, index)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                        </Scrollbars>
                      </div>
                      <div className="footer">
                        <Row align="middle" justify="space-between">
                          <Col span={24}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <div className="message-tool">
                                <Tooltip title="Chọn biểu tượng cảm xúc">
                                  <img
                                    src={ToolEmoji}
                                    onMouseOver={(e) =>
                                      (e.currentTarget.src = ToolEmoji2)
                                    }
                                    onMouseOut={(e) =>
                                      (e.currentTarget.src = ToolEmoji)
                                    }
                                    onClick={() => showModal()}
                                  />
                                </Tooltip>
                                <Tooltip title="Chọn ảnh">
                                  <label htmlFor="clipBoardInput">
                                    <img
                                      src={ToolImage}
                                      onMouseOver={(e) =>
                                        (e.currentTarget.src = ToolImage2)
                                      }
                                      onMouseOut={(e) =>
                                        (e.currentTarget.src = ToolImage)
                                      }
                                    />
                                  </label>
                                </Tooltip>
                                {!isUpdateMsg && (
                                  <Upload
                                    name="avatar"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    onChange={handleChangeImage}
                                  >
                                    <Tooltip title="Đính kèm tệp">
                                      <img
                                        src={ToolFile}
                                        onMouseOver={(e) =>
                                          (e.currentTarget.src = ToolFile2)
                                        }
                                        onMouseOut={(e) =>
                                          (e.currentTarget.src = ToolFile)
                                        }
                                      />
                                    </Tooltip>
                                  </Upload>
                                )}
                                {/* <img
                                  src={ToolT}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.src = ToolT2)
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.src = ToolT)
                                  }
                                /> */}
                                <img
                                  src={ToolMapMarker}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.src = ToolMapMarker2)
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.src = ToolMapMarker)
                                  }
                                />
                                <img
                                  src={ToolCamera}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.src = ToolCamera2)
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.src = ToolCamera)
                                  }
                                />
                                <img
                                  src={ToolPlus}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.src = ToolPlus2)
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.src = ToolPlus)
                                  }
                                />
                              </div>

                              <div className="message-container">
                                <AutoResizeTextBox
                                  key={keyInput}
                                  ref={inputEl}
                                  isUpdate={isUpdateMsg}
                                  onKeyDown={(e) =>
                                    handleKeyDown(e, "sendMessage")
                                  }
                                  onCloseQuote={closeQuote}
                                  quoteContent={msgSelect ?? ""}
                                  value={message}
                                  isQuote={isQuote}
                                  listClipBoard={listClipBoard}
                                  setListClipBoard={setListClipBoard}
                                  onChange={handleChangeTyping}
                                  placeholder="Viết tin nhắn..."
                                  id="topicPost"
                                  handleUploadImages={handleUploadImages}
                                  className={`one-row ${
                                    listClipBoard.length > 0
                                      ? " image-clipboard"
                                      : ""
                                  }`}
                                  row="1"
                                  style={{
                                    flex: 1,
                                    marginLeft: 15,
                                    marginRight: 15,
                                  }}
                                  inputIcon={true}
                                  showModalIcon={showModal}
                                />

                                <Space style={{ marginBottom: "2px" }}>
                                  <div
                                    className={
                                      isCreateGroup &&
                                      (selectedList.length == 0 ||
                                        message.trim() === "")
                                        ? " customizeSend disabled"
                                        : "customizeSend"
                                    }
                                    onClick={sendMessage}
                                  >
                                    <img src={Icons.send} alt="send" />
                                    Gửi
                                  </div>
                                  {isUpdateMsg && (
                                    <Tooltip title="Hủy">
                                      <img
                                        src={CircleX}
                                        alt="close"
                                        className="cursor--pointer"
                                        onClick={() => {
                                          setIsUpdateMsg(false);
                                          setMessage("");
                                          setKeyInput(!keyInput);
                                          setMsgSelect(null);
                                          setListClipBoard([]);
                                        }}
                                      />
                                    </Tooltip>
                                  )}
                                </Space>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </>
                  ) : (
                    <>
                      <ChatDocument
                        conversationId={singleContact.Id}
                        backHandle={() => setIsViewDocument(false)}
                      />
                    </>
                  )}

                  <Modal
                    title="Basic Modal"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Picker onEmojiClick={onEmojiClick} />
                  </Modal>
                  <ModalSearchChat
                    visible={isShowSearchChatModal}
                    setIsShowSearchChatModal={setIsShowSearchChatModal}
                    singleContact={singleContact}
                    nameChat={getNameChat(singleContact)}
                  />
                  <Modal
                    title={<span className="title">Cảm xúc về tin nhắn</span>}
                    visible={emojiModal}
                    className="modal-react"
                    onOk={() => setEmojiModal(false)}
                    cancelButtonProps={{ hidden: true }}
                    onCancel={() => setEmojiModal(false)}
                    footer={null}
                    closeIcon={<img src={closeIcon} alt="closeIcon" />}
                  >
                    {getEmojis(msgSelect).map((message, index) => (
                      <Row
                        key={index}
                        justify="space-between"
                        style={{ marginBottom: "10px" }}
                      >
                        <div className="user-react-wrapper">
                          <AvatarCustom
                            size={32}
                            src={getUrlImage(35, 35, message.Avatar)}
                            fullName={message.FullName}
                          />
                          <div style={{ marginLeft: "10px" }}>
                            {message.FullName}
                          </div>
                        </div>
                        <span style={{ fontSize: "20px" }}>
                          {" "}
                          {message.Emoji === "2764"
                            ? "❤️"
                            : String.fromCodePoint(
                                "0x" + String(message.Emoji)
                              )}{" "}
                        </span>
                      </Row>
                    ))}
                  </Modal>
                </div>
              )}

              {!listEmployee ||
                (listConversation.length == 0 && singleContact?.length == 0 && (
                  <div className="empty-conversation">
                    Bắt đầu một cuộc trò chuyện
                  </div>
                ))}
            </Col>
          </Row>
        </div>
        <DrawerListMember
          currentConversation={singleContact}
          setIsShowAddUsersModal={setIsShowAddUsersModal}
          visible={visibleDrawer}
          setVisible={setVisibleDrawer}
          setchangeList={setChangeList}
          changeList={changeList}
        />
      </div>
    </>
  );
};
MessageModalContent.contextType = SocketContext;
MessageModalContent.propTypes = {
  onClose: PropTypes.func,
  handleZoomOut: PropTypes.func,
};
