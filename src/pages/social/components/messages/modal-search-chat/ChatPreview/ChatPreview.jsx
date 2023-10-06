/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import apis from "../../../../../../services/api";
import { Avatar, Row, Col, Badge, Popover, Tooltip, Image } from "antd";
import Scrollbars from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { FORMAT_DATE_TIME } from "../../../../../../constants/config";
import Share from "../../../../../../assets/new/messenger/share.svg";
import Highlighter from "react-highlight-words";
import moment from "moment"
import {
    getUrlFile,
    getUrlImage,
} from "../../../../../../utils";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import "./ChatPreview.scss"
const ChatPreview = ({ selectedChat, keySearch = "a" }) => {
    const [conversation, setConversation] = useState(null)
    const [newMessages, setNewMessages] = useState([])
    const [isBackward, setBackward] = useState(true)
    const [isForward, setForward] = useState(true)
    const messEl = useRef(null);
    const userInfo = useSelector((state) =>
        state.get("userProfile").get("profile")
    );
    useEffect(() => {
        console.log('selectedChat', selectedChat)
        if (selectedChat) {
            // setBackward(true)
            // setForward(true)
            loadData("both")
        }
    }, [selectedChat])

    useEffect(() => {
        console.log('conversation', conversation)
        setNewMessages(conversation?.Details ?? [])
    }, [conversation])

    const loadData = (range = "both") => {
        const chatId = range == "both" ? selectedChat.Id : range == "forward" ? newMessages[newMessages.length - 1].Id : newMessages[0].Id;
        apis.chat.getMessageRange(selectedChat.ConversionId, chatId, 3).then((rs) => {
            const charReverse = rs.data.data.Details.reverse()
            const pos = charReverse.findIndex(e => e.Id == chatId)
            if (range == "both")
                setConversation(rs.data.data)
            else if (range == "forward") {
                const newChats = charReverse.slice(pos +1);
                setNewMessages([...newMessages, ...newChats]);
                setForward(newChats.length == 0 ? false : true);
            }
            else {
                const newChats = charReverse.slice(0,pos);
                setNewMessages([...newChats, ...newMessages]);
                setBackward(newChats.length == 0 ? false : true);
            }
        })
    }



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
    const messageBoxAction = (message, index) => {
        const [Emoji, count] = getEmojiSorted(message);
        const isOwnMessage = message.CreatedBy === +userInfo.Id;
        const senderName = message.FullName?.trim().split(" ").pop() ?? "";
        const isSenderSameQuoter = message.FullName === message.QuoteName;
        const quoteName = message?.QuoteName?.trim().split(" ").pop() ?? "";
        const isQuoteOwnMsg = message.QuoteName == userInfo.FullName;

        return (
            <div className="message-box-action" >
                {message.CreatedBy !== Number(userInfo.Id) &&
                    newMessages[index].CreatedBy !==
                    newMessages[index - 1]?.CreatedBy && (
                        <div className="userchat">{message.FullName}</div>
                    )}
                {message.QuoteId !== 0 && typeof message.QuoteId !== "undefined" && (
                    <>
                        <div className="quote-title-msg">
                            <img src={Share}></img>
                            <div style={{ marginLeft: "2px", fontSize: "12px" }}>
                                {isOwnMessage
                                    ? "Bạn đã trả lời "
                                    : message.FullName + " đã trả lời"}
                            </div>
                        </div>
                        <div className="quote-wrapper">
                            <div className="quote-content-msg quote-content-msg-preview ">{message.QuoteContent}</div>
                        </div>
                    </>
                )}

                <div className="message-content-wrapper">
                    <pre style={{
                        marginBottom: Emoji.length > 0 ? "15px" : "0px",
                        fontSize: "12px",
                        marginBottom: message.Id === newMessages[newMessages.length - 1].Id ? "20px" : "",
                        backgroundColor: selectedChat.Id==message.Id?"#D9EBEF":"#f3f4f6"
                    }}>
                        <div>
                            {getTextMessage(message.Msg).map((r, i) => {
                                if (r.type == "url")
                                    return (
                                        <a
                                            key={i}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="access-link"
                                            href={r.msg}
                                        >
                                            <Highlighter
                                                highlightClassName="hightlight-chat-custom"
                                                searchWords={[keySearch]}
                                                autoEscape={true}
                                                textToHighlight={r.msg}
                                            />

                                        </a>
                                    );
                                return <Highlighter
                                    highlightClassName="hightlight-chat-custom"
                                    searchWords={[keySearch]}
                                    autoEscape={true}
                                    textToHighlight={r.msg}
                                />;

                            })}</div>

                        {/* {Emoji.length > 0 && (
                            <span
                                className="react-message"
                                onClick={() => {
                                    setMsgSelect(message);
                                    setEmojiModal(true);
                                }}
                            >
                                {Emoji.map((emoji, index) => (
                                    <span key={index}>
                                        {" "}
                                        {emoji.Emoji === "2764"
                                            ? "❤️"
                                            : String.fromCodePoint("0x" + String(emoji.Emoji)) ??
                                            "❤️"}{" "}
                                    </span>
                                ))}
                                {count > 0 ? count : ""}
                            </span>
                        )} */}
                        <small
                            style={{
                                textAlign:
                                    message.CreatedBy === Number(userInfo.Id) ? "right" : "left"
                                , fontSize: "8px"
                            }}
                        >
                            {moment(message.CreatedAt, FORMAT_DATE_TIME)
                                .local()
                                .format("hh:mm A")}
                        </small>
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
                            {isOwnMessage
                                ? isQuoteOwnMsg
                                    ? "Bạn đã trả lời chính mình"
                                    : "Bạn đã trả lời " + quoteName
                                : "tra loi"}
                        </div>
                        <div className="quote-wrapper">
                            <div className="quote-content-msg">{message.QuoteContent}</div>
                        </div>
                    </>
                )}
                <div className="file-type file-type-preview">
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
                                    {" "}
                                    {emoji.Emoji === "2764"
                                        ? "❤️"
                                        : String.fromCodePoint("0x" + String(emoji.Emoji))}{" "}
                                </span>
                            ))}
                            {count > 0 ? count : ""}
                        </span>
                    )}
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

    return (
        <div className="content content-preview " ref={messEl}>
            <Scrollbars autoHide
                autoHeight
                autoHeightMin={65}
                autoHeightMax={300} id="scroll-bar">
                {isBackward && <div className="view-more">
                    <button onClick={() => loadData("backward")} className="button-view-more  button-view-more__top">View more</button>
                </div>}
                {newMessages.length > 0 &&
                    newMessages.map((message, index) =>
                        message.Type === 8 ? (
                            <div className="message-add-leave">
                                {message.Msg}
                            </div>
                        ) : index === 0 ||
                            newMessages[index].CreatedBy !==
                            newMessages[index + 1]?.CreatedBy ? (
                            <div
                                className={`message-content ${message.CreatedBy === Number(userInfo.Id)
                                    ? "own-message"
                                    : "normal-message"
                                    }`}
                                style={
                                    message.IsGroup
                                        ? { position: "relative", paddingTop: 14 }
                                        : {}
                                }
                                key={index}
                            >
                                {message.IsGroup &&
                                    message.CreatedBy !==
                                    Number(userInfo.Id) && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: 28,
                                                top: 0,
                                                fontSize: 11,
                                            }}
                                        >
                                            {message.FullName}
                                        </div>
                                    )}
                                {message.CreatedBy !==
                                    Number(userInfo.Id) && (
                                        <Badge
                                            color={
                                                message.Type === 0
                                                    ? "rgb(49, 162, 76)"
                                                    : "rgb(0,0,0,0)"
                                            }
                                            offset={[-3, 20]}
                                            style={{
                                                width: "8px",
                                                height: "8px",
                                            }}
                                            className="mt-3"
                                        >
                                            <Avatar
                                                size={36}
                                                src={getUrlImage(
                                                    200,
                                                    200,
                                                    message.Avatar ?? ""
                                                )}
                                                alt="image"
                                                style={{
                                                    opacity: message.Type === 0 ? 1 : 0,
                                                }}
                                            />
                                        </Badge>
                                    )}

                                <div className="message-box">
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
                                className={`message-content ${message.CreatedBy === Number(userInfo.Id)
                                    ? "own-message"
                                    : "normal-message"
                                    }`}
                                key={index}
                            >
                                {message.CreatedBy !==
                                    Number(userInfo.Id) && (
                                        <Badge
                                            color={
                                                newMessages?.length === index + 1
                                                    ? "rgb(49, 162, 76)"
                                                    : "rgb(0,0,0,0)"
                                            }
                                            offset={[-3, 20]}
                                            style={{
                                                width: "8px",
                                                height: "8px",
                                            }}
                                            className="mt-3"
                                        >
                                            <Avatar
                                                src={getUrlImage(
                                                    200,
                                                    200,
                                                    message.Avatar ?? ""
                                                )}
                                                size={36}
                                                alt="image"
                                                style={{
                                                    opacity:
                                                        newMessages?.length === index + 1
                                                            ? 1
                                                            : 0,
                                                }}
                                            />
                                        </Badge>
                                    )}

                                <div className="message-box">
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
                                    {/* {newMessages?.length === index + 1 && (
                      <small
                        style={{
                          textAlign:
                            message.CreatedBy ===
                            Number(userInfo.Id)
                              ? "right"
                              : "left",
                        }}
                      >
                        {moment(
                          message.CreatedAt,
                          FORMAT_DATE_TIME
                        )
                          .local()
                          .format("HH:mm, DD [tháng] MM,yyyy")}
                      </small>
                    )} */}
                                </div>
                            </div>
                        )
                    )}
                {isForward && <div className="view-more">
                    <button onClick={() => loadData("forward")} className="button-view-more button-view-more__bottom">View more</button>
                </div>}


            </Scrollbars>
        </div>
    )
}

export default ChatPreview
