import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Space, Input, Button, Checkbox, Switch, Form, Select, message } from "antd";
import LayoutMain from "../../components/LayoutMain";
import "./InviteAccount.scss";
import { validateEmail, copyToClipboard } from "../../utils";
import API from "../../services/api";
import errors from "../../constants/error";
import toaster from "../../components/toaster";
import linkIcon from '../../assets/new/account/vectorIcon.svg'
import Change from "../../assets/new/account/ico-reload.svg";
import IconAdd from "../../assets/new/common/add-icon.svg"

const SITE = process.env.REACT_APP_HOST_SITE;

const InviteAccount = () => {
  const INVITE_LINK = 1;
  const INVITE_EMAIL = 2;
  const [method, setMethod] = useState(INVITE_LINK);
  const [isSentRequestAdmin, setIsSentRequestAdmin] = useState(false);
  const [isQuickInvite, setIsQuickInvite] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
  const [emailPhone, setEmailPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [email, setEmail] = useState([])
  const [form] = Form.useForm();

  useEffect(() => {
    getInviteLink();
  }, []);

  const getInviteLink = async () => {
    try {
      const result = await API.company.getInviteLink();
      console.log('link', result)

      if (result?.code === 200 && result?.data?.inviteCode) {
        setInviteLink(
          `${SITE}/verify-link?inviteCode=${result?.data?.inviteCode}`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
      email.forEach(async (item, index) => {
        const data = await API.company.sendInviteEmail({
          account: item,
          isEmail: 1,
        });
        if (data?.code !== 200) {
          toaster.error(email + " " + errors[data?.message]);
        } else {
          toaster.success("Gửi lời mời thành công đến " + email);
        }
      })
      setLoading(false);
  };

  const handleCopyClipboard = () => {
    copyToClipboard(inviteLink);
    toaster.success("Sao chép thành công");
  };

  const checkInputEmail = (value) => {
    var lastEmail = value[value.length-1]
    if(validateEmail(lastEmail)){
      setEmail(value)
      return
    }
    setEmail(value.filter(r => r !== lastEmail))
    message.error("Hãy nhập email hợp lệ")
  }

  return (
    <div className="invite-account-page">
      <Row gutter={[32, 16]}>
        <Col span={24} style={{ paddingTop: 0 }}>
          <div className="invite-content-wrapper">
            <div className="invite-content-header">
              <p className="title">
                <img src={linkIcon} alt="attach" />
                <span>Mời qua liên kết</span>
              </p>
            </div>
            <div className="invite-content-body">
              <div className="invite-quick">
                <span>Cho phép đăng ký nhanh</span>
                <Switch
                  checked={isQuickInvite}
                  onChange={setIsQuickInvite}
                  className="custom-switch"
                />
              </div>
              <div className="invite-link-wrapper">
                <div className="invite-link-input">
                  <span className="invite-link-title">
                    Liên kết đăng ký nhanh
                  </span>
                  <Input className="input-invite" value={inviteLink} disabled={true} />
                </div>
                <div style={{ marginLeft: '16px' }}>
                  <Button className="btn-invite-link" onClick={handleCopyClipboard}>
                    Sao chép đường dẫn
                  </Button>
                </div>
              </div>
              <div className="invite-change-link">
                <p onClick={getInviteLink} style={{ width: '160px', cursor: 'pointer' }}>
                  <img src={Change} alt="change"/>
                  <span className="text-change">Thay đổi mã liên kết</span>
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[32, 16]} className="mt-2">
        <Col span={24} style={{ paddingBottom: 0 }}>
          <div className="invite-content-wrapper">
            <div className="invite-content-header">
              <p className="title">
                <img src={linkIcon} alt="attach" />
                <span>Mời qua Email</span>
              </p>
            </div>
            <div className="invite-content-body">
              <div className="invite-link-wrapper">
                <div className="invite-link-input">
                  <span className="invite-link-title">
                    Địa chỉ Email
                  </span>
                  <Select mode='tags' style={{ width: '100%' }} value={email} open={false} onChange={checkInputEmail} tokenSeparators={[',']}>
                  </Select>,
                </div>
              </div>
              <Col span={24} style={{ padding: 0, marginTop: '10px' }} onClick={() => handleSubmit()}>
                <Button className="btn-invite-email">
                  Gửi lời mời
                </Button>
              </Col>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

InviteAccount.propTypes = {};

export default InviteAccount;
