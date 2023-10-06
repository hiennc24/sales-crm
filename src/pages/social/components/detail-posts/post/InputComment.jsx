/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DefaulAvatar from "../../../../../assets/images/avatar_default.jpg";
import "../DetailPosts.scss";
import { useSelector } from "react-redux";
import { Modal, Avatar, Tooltip, Button } from "antd";

import { getUrlImage, getUrlFile } from "../../../../../utils";
import Picker from "emoji-picker-react";
import CloseBlack from "../../../../../assets/new/common/close-black.svg";
import IconEmoji from "../../../../../assets/new/comment/emojiIcon.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageIcon from "../../../../../assets/new/create-post/img.svg";
import ToolAttachIcon from "../../../../../assets/new/create-post/add-file.svg";
import ImagesPreview from "../../new-post/components/ImagesPreview";
import FilePreview from "../../new-post/components/FilePreview";
import File from "../../../../../assets/new/create-post/tai-len.svg";
import DeteleImg from "../../../../../assets/new/common/delete-img.svg";
import AvatarCustom from "../../../../../components/avatar-custom";

const InputComment = ({
  post,
  createComment,
  content = "",
  onClose = undefined,
  isEdit = false,
  initFiles = [],
}) => {
  const [inputComment, setInputComment] = useState({
    id: post?.Id,
    content: content,
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const [isFocusComment, setIsFocusComment] = useState(isEdit);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [keyCommentFile, setKeyCommentFile] = useState(true);
  const [filesPreview, setFilesPreview] = useState([]);
  const [totalFilesPreview, setTotalFilesPreview] = useState(
    initFiles.filter((item) => item.Type === 3)
  );
  const [isValidFile, setIsValidFile] = useState(true);
  const [initFilesPreview, setInitFilesPreview] = useState(
    initFiles.filter((item) => item.Type === 3)
  );
  const [initImagesPreview, setInitImagesPreview] = useState(
    initFiles.filter((item) => item.Type !== 3)
  );
  const [filesRemove, setFilesRemove] = useState([]);

  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );

  const handlePushComment = async (id) => {
    if (!isEdit) {
      if (inputComment) {
        if (inputComment.content.trim() != "") {
          const newComment = {
            content: inputComment.content.trim(),
            isPost: 0,
            parentId: id,
            tags: [],
            employees: [],
            imagesPreview: imagesPreview,
            filesPreview,
            file: [],
          };
          createComment(newComment);
        }
        setInputComment(null);
        closeComment();
      }
    } else {
      if (inputComment) {
        if (inputComment.content.trim() != "") {
          const newComment = {
            content: inputComment.content.trim(),
            imagesPreview,
            filesPreview,
            file: initFilesPreview,
          };
          createComment(newComment);
          console.log(newComment);
        }
        setInputComment(null);
        closeComment();
      }
    }
  };
  const onEmojiClick = (id, emojiObject, event) => {
    event.preventDefault();
    setInputComment({
      id,
      content: inputComment?.content
        ? inputComment?.content.slice(0, -4) + emojiObject.emoji + "</p>"
        : emojiObject.emoji,
    });
  };

  const closeComment = () => {
    setIsFocusComment(false);
    setFilesPreview([]);
    setImagesPreview([]);
    if (typeof onClose !== "undefined") onClose();
  };

  const handleUploadImages = (event) => {
    setKeyCommentFile(!keyCommentFile);
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
    setImagesPreview(validImage);
  };

  const handleDeleteImage = (img, index) => {
    setImagesPreview(imagesPreview.filter((img, i) => i !== index));
  };

  const handleDeleteFile = (file, index) => {
    console.log(file);
    if (file.name) {
      const newFiles = filesPreview.filter((f, i) => f.name !== file.name);
      setFilesPreview(newFiles);
      setTotalFilesPreview([...initFilesPreview, ...newFiles]);
    }

    if (file.Name) {
      const newInitFiles = initFilesPreview.filter(
        (f, i) => f.Name !== file.Name
      );
      setInitFilesPreview(newInitFiles);
      setTotalFilesPreview([...newInitFiles, ...filesPreview]);
    }
  };

  const uploadFile = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.file);
      setKeyCommentFile(!keyCommentFile);
      if (+(e.target.files[0].size / 1024 / 1024).toFixed(4) > 5) {
        setIsValidFile(false);
      } else {
        setIsValidFile(true);
        setFilesPreview([...filesPreview, ...e.target.files]);
        setTotalFilesPreview([...totalFilesPreview, ...e.target.files]);
      }
    }
  };

  const removeFiles = (item, index) => {
    if (item.Type === 3) {
      setInitFilesPreview(initFilesPreview.filter((rs) => rs !== item));
    } else {
      setInitImagesPreview(initImagesPreview.filter((rs) => rs !== item));
    }

    setFilesRemove([...filesRemove, item]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isFocusComment) {
        const parent = document.getElementById("idEditor" + post.Id);
        const editor = parent.getElementsByClassName("ck-blurred")[0] || null;
        if (editor) {
          editor.focus();
        }
      }
    }, 100);
  }, [isFocusComment]);

  return (
    <div
      className={`comment-input-wrapper ${
        isFocusComment ? "" : "flex--center"
      }`}
    >
      <AvatarCustom
        src={userInfo.Avatar ? getUrlImage(200, 200, userInfo.Avatar) : ""}
        size={32}
        fullName={userInfo?.FullName || "Anonymous"}
      />
      <>
        {isFocusComment ? (
          <div
            className="comment"
            id={"idEditor" + post.Id}
            style={{ width: "calc(100% - 52px)" }}
          >
            <div
              style={{
                margin: "0px 5px",
                border: "1px solid rgba(39, 39, 39, 0.2)",
              }}
            >
              <CKEditor
                className="editor-container"
                editor={ClassicEditor}
                data={inputComment?.id === post.Id ? inputComment?.content : ""}
                config={{
                  placeholder: "Phản hồi hoặc bình luận...",
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
                  setInputComment({ id: post.Id, content: data });
                }}
              />
              {(imagesPreview.length > 0 || initImagesPreview.length > 0) && (
                <div className="images-preview-wrapper">
                  {initImagesPreview.map((item) => {
                    return (
                      <div className="image-preview-wapper" key={item.Files}>
                        {item.Type === 1 ? (
                          <img
                            src={getUrlImage(0, 0, item.Files)}
                            alt={item.Name}
                            className="image-preview"
                          />
                        ) : (
                          <video width="137" controls alt={item.Name}>
                            <source src={getUrlFile(item.Files)} />
                          </video>
                        )}
                        <Tooltip
                          placement="top"
                          title={"Xóa"}
                          className="emoji-control"
                        >
                          <img
                            src={DeteleImg}
                            alt="close"
                            onClick={() => {
                              removeFiles(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                    );
                  })}

                  <ImagesPreview
                    imagesPreview={imagesPreview}
                    handleDeleteImage={handleDeleteImage}
                    htmlFor={post.Id + "InputComment"}
                  />
                </div>
              )}
              {(filesPreview.length > 0 || initFilesPreview.length > 0) && (
                // <div className="images-preview-wrapper">
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    padding: "8px 5px 0px 5px",
                  }}
                >
                  {/* <label htmlFor={post.Id + 'AttachComment'} className="input-image">
                <Tooltip placement='top' title='Files'>
                  <img src={File} alt='fileInput' />
                </Tooltip>
                <span>Thêm tài liệu</span>
              </label> */}
                  {/* <FilePreview
                filesPreview={initFilesPreview}
                handleDeleteFile={removeFiles}
                handleUploadFiles={uploadFile}
                postType='event'
                type='edit'
              /> */}
                  <FilePreview
                    filesPreview={isEdit ? totalFilesPreview : filesPreview}
                    handleDeleteFile={handleDeleteFile}
                    handleUploadFiles={uploadFile}
                    postType="event"
                    type={isEdit ? "edit" : "create"}
                  />
                </div>
              )}
            </div>

            {!isValidFile && (
              <p style={{ color: "red" }}>
                {" "}
                Dung lượng file không vượt quá 5 Mb.{" "}
              </p>
            )}
            <div
              className="editor-comment__footer"
              style={{ marginLeft: 0, padding: "0px 4px" }}
            >
              <div className="editor-comment__footer-left">
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "30px",
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title={"Biểu tượng cảm xúc"}
                      className="emoji-control"
                      onClick={() => setShowEmojiPicker(post.Id)}
                    >
                      <img
                        src={IconEmoji}
                        alt="emojiIcon"
                        className={`cursor--pointer select-icon icon-comment emoji-icon ${
                          isFocusComment ? "select-icon-new" : ""
                        }`}
                      />
                    </Tooltip>
                  </label>
                </div>
                <div>
                  <label
                    htmlFor={post.Id + "InputComment"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "30px",
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="Ảnh/Video"
                      className="emoji-control"
                    >
                      <img
                        src={ImageIcon}
                        alt="imageIcon"
                        style={{ margin: 0 }}
                        className={`cursor--pointer select-icon icon-comment ${
                          isFocusComment ? "select-icon-new" : ""
                        }`}
                      />
                      {/* Ảnh/Video */}
                    </Tooltip>
                  </label>
                  <input
                    key={keyCommentFile}
                    type="file"
                    name="image"
                    id={post.Id + "InputComment"}
                    hidden={true}
                    multiple
                    onChange={handleUploadImages}
                  />
                </div>

                <div>
                  <label
                    htmlFor={post.Id + "AttachComment"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "30px",
                    }}
                  >
                    <Tooltip
                      placement="top"
                      title="Đính kèm file"
                      className="emoji-control"
                    >
                      <img
                        src={ToolAttachIcon}
                        alt="imageIcon"
                        style={{ margin: 0 }}
                        className={`cursor--pointer select-icon icon-comment ${
                          isFocusComment ? "select-icon-new" : ""
                        }`}
                      />
                      {/* Đính kèm */}
                    </Tooltip>
                  </label>
                  <input
                    key={keyCommentFile}
                    type="file"
                    name="fileInput"
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    id={post.Id + "AttachComment"}
                    hidden
                    multiple
                    onChange={uploadFile}
                  />
                </div>
              </div>
              <div className="controls">
                <Button
                  type="link"
                  size="small"
                  style={{
                    fontSize: 14,
                    height: "20px",
                    lineHeight: "16.1px",
                    color: "#272727",
                    opacity: 0.5,
                  }}
                  onClick={() => closeComment()}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="primary"
                  size="small"
                  style={{
                    fontSize: 14,
                    height: "20px",
                    lineHeight: "16.1px",
                    backgroundColor: "#32A1C8",
                  }}
                  onClick={() => handlePushComment(Number(post.Id))}
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <input
            placeholder="Phản hồi hoặc bình luận..."
            onFocus={() => setIsFocusComment(true)}
            className="comment-input pl--10 ml--10"
          />
        )}
      </>
      <Modal
        title={"Emoji"}
        footer={null}
        centered
        width="fit-content"
        visible={showEmojiPicker === post.Id}
        onOk={() => {}}
        onCancel={() => setShowEmojiPicker(null)}
        className="tag-modal__new"
        closeIcon={<img src={CloseBlack} alt="close" />}
      >
        <Picker
          onEmojiClick={(event, emojiObject) =>
            onEmojiClick(post.Id, emojiObject, event)
          }
        />
      </Modal>
    </div>
  );
};

export default InputComment;
