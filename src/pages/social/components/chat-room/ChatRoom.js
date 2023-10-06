import React, { useState } from "react"
import ChatIcon from "../../../../assets/new/chat-room/chat-icon.svg"
import InviteIcon from "../../../../assets/new/chat-room/invite-icon.svg"
import ContactIcon from "../../../../assets/new/chat-room/contact-icon.svg"
import CallIcon from "../../../../assets/new/chat-room/call-icon.svg"
import AddIcon from "../../../../assets/new/chat-room/add-icon.svg"
import ImagineAddIcon from "../../../../assets/new/chat-room/imagine-add-icon.svg"
import "./chat-room.scss"
import { Avatar, Input } from "antd"

const ChatRoom = () => {

    const [ textChat, setTextChat ] = useState("")

    return (

        <div className="chat-room" style={{marginTop:0}}>
            <div className="chat-room__header">
                <div className="chat-room__header--left">
                    <img src={ChatIcon} />
                    <span>Chatroom</span>
                </div>
                <div className="chat-room__header--right">
                    <img src={InviteIcon} />
                    <div className="chat-room__header--right-line"></div>
                    <img src={ContactIcon} />
                    <div className="chat-room__header--right-line"></div>
                    <img src={CallIcon} />
                    <div className="chat-room__header--right-line"></div>
                </div>
            </div>
            <div className="chat-room__body">
                <div className="block">
                    <Avatar className="avatar" style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="default" gap={4}>T</Avatar>
                    <div className="message">
                        <div className="name">unknowname</div>
                        <div className="content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</div>
                    </div>
                </div>
                <div className="block">
                    <Avatar className="avatar" style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="default" gap={4}>T</Avatar>
                    <div className="message">
                        <div className="name">unknowname</div>
                        <div className="content">Lorem ipsum dolor sit amet,</div>
                    </div>
                </div>
                <div className="block reverse">
                    <Avatar className="avatar" style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="default" gap={4}>T</Avatar>
                    <div className="message message-reverse">
                        <div className="content">Lorem ipsum dolor sit amet,</div>
                    </div>
                </div>
                <div className="block reverse">
                    <Avatar className="avatar" style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="default" gap={4}>T</Avatar>
                    <div className="message message-reverse">
                        <div className="content">Lorem ipsum dolor sit amet,</div>
                    </div>
                </div>
                <div className="block reverse">
                    <Avatar className="avatar" style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="default" gap={4}>T</Avatar>
                    <div className="message message-reverse">
                        <div className="content">Lorem ipsum dolor sit amet,</div>
                    </div>
                </div>
            </div>
            <div className="chat-room__footer">
                <div className="chat-room__footer--div">
                    <div className="chat-room__footer--div-line"></div>
                </div>
                <div className="chat-room__footer--main">
                    <img src={AddIcon} />
                    <Input className="chat-room__footer--main-input" value={textChat} onChange={(e) => setTextChat(e.target.value) } />
                    <img src={ImagineAddIcon} />
                </div>
            </div>
        </div>
    )
}
export default ChatRoom