/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import autosize from "autosize";
import DeteleImg from "../../assets/new/common/delete-img.svg";
import AddImg from "../../assets/new/common/more-img.svg";
import "./auto-resize-textbox.scss";
import Close from "../../assets/new/messenger/plus.png";
import { Typography } from "antd";
import { beforeUploadDoc } from "../../utils";
import { SmileOutlined } from "@ant-design/icons";

const AutoResizeTextBox = forwardRef((props, ref) => {
  const input = useRef();
  const className = "post-input event-name-input";
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
  const retrieveImageFromClipboardAsBlob = (pasteEvent, isUpdate) => {
    if (pasteEvent.clipboardData == false || isUpdate) {
      return;
    }

    var items = pasteEvent.clipboardData.items;

    if (items == undefined) {
      return;
    }
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") == -1) continue;
      let blob = items[i].getAsFile();
      if (!beforeUploadDoc(blob)) {
        return;
      }
      props.setListClipBoard([blob]);
    }
  };

  const removeImageClipboard = (img) => {
    props.setListClipBoard([]);
  };
  // useEffect(() => {
  //   if (ref && ref.current) {
  //     ref.current.addEventListener("paste", (e) => retrieveImageFromClipboardAsBlob(e, props.isUpdate))
  //     return () => ref.current?.removeEventListener("paste", (e) => retrieveImageFromClipboardAsBlob(e, props.isUpdate));
  //   }
  // });

  useEffect(() => {
    input.current.focus();
  }, [props.value]);

  return (
    <div className="message-wrapper">
      {(props.listClipBoard.length > 0 || props.isQuote) && !props.isUpdate && (
        <div className="send-message-wrapper">
          {props.isQuote && (
            <div className="quote-container">
              <div>
                <img
                  className="close-quote"
                  src={Close}
                  onClick={props.onCloseQuote}
                />
                <i> Đang trả lời </i>
                <span style={{ fontWeight: "700", fontStyle: "italic" }}>
                  {props.quoteContent.name}
                </span>
              </div>

              <Typography.Text
                ellipsis
                style={{ maxWidth: "calc(100% - 20px )" }}
              >
                {props.quoteContent.msg}
              </Typography.Text>
            </div>
          )}

          {props.listClipBoard.length > 0 && (
            <div className="clipboard-wrapper">
              {props.listClipBoard.map((img, index) => (
                <div key={index} className="image-preview-wapper d-flex">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={img.name}
                    className="image-preview"
                  />
                  <img
                    src={DeteleImg}
                    alt="close"
                    onClick={() => {
                      // handleDeleteImage(img, index);
                      removeImageClipboard(img);
                    }}
                  />
                </div>
              ))}
              {props.listClipBoard.length > 0 && (
                <label htmlFor="clipBoardInput" className="add-more-image-btn">
                  <img src={AddImg} alt="Icon" />
                </label>
              )}
            </div>
          )}
        </div>
      )}
      <input
        hidden={true}
        type="file"
        name="image"
        accept="image/*,video/*"
        id="clipBoardInput"
        onChange={props.handleUploadImages}
      />
      {props.listClipBoard.length > 0 && !props.isUpdate && (
        <hr className="divider-chatbox" />
      )}

      <textarea
        {...props}
        ref={(e) => {
          if (input) {
            input.current = e;
          }
          if (ref) {
            ref.current = e;
          }
        }}
        className={
          props.className ? className + " " + props.className : className
        }
        onChange={(e) => {
          props.onChange(e);
          autosize(input.current);
        }}
        onFocus={() => {
          placeholder(input, props.placeholder, false);
        }}
        onBlur={() => {
          placeholder(input, props.placeholder, true);
        }}
        onKeyDown={props.onKeyDown}
        onPaste={(e) => retrieveImageFromClipboardAsBlob(e, props.isUpdate)}
      ></textarea>
      {/* {
      props.inputIcon && <SmileOutlined className='icon-message' onClick={() => props.showModalIcon()}/>
    } */}
    </div>
  );
});

AutoResizeTextBox.propTypes = {
  onChange: PropTypes.function,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  className: PropTypes.string,
  isUpdate: PropTypes.bool,
  showModalIcon: PropTypes.func,
  inputIcon: PropTypes.bool,
};

export default AutoResizeTextBox;

AutoResizeTextBox.displayName = "AutoResizeTextBox";
