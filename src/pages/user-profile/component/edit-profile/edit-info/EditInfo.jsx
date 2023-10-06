/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./EditInfo.scss";
import imageIcon from "../../../../../assets/images/image_icon.svg";
import { Col, Row, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { updateProfile } from "../../../UserProfile.action";
import { useHistory } from "react-router-dom";
// import iconUpload from "../../../../../assets/new/account/upload-image.svg";
import iconUpload from "../../../../../assets/new/create-post/img2.svg";

const EditInfo = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );
  const [avatar, setAvatar] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [inforValue, setInforValue] = useState('<p>' + userInfo?.Info + '</p>');

  const initialValues = {
    fullName: userInfo?.FullName || "",
    address: userInfo?.Address || "",
    infor: userInfo?.Info || "",
    zalo: userInfo?.Zalo||"",
    tel: userInfo?.Tel||"",
    email: userInfo?.Email || "",
    department:userInfo?.Department||"",
    job: userInfo?.JobTitle || "",
  };

  if (userInfo.Birthday) {
    initialValues.birthDay = moment(userInfo.Birthday);
  }

  const handleChangeAvatar = (event) => {
    setAvatar(event.target.files[0]);
  };
  const handleChangeCoverImg = (event) => {
    setCoverImg(event.target.files[0]);
  };

  const onResetForm = () => {
    form.resetFields();
    setInforValue(userInfo?.Info || "")
    history.push("/profile");
  };

  const onSubmit = () => {
    const info = inforValue.replace('<p>', '').replace('</p>', '');
    const submitData = {...form.getFieldsValue(), infor: info}
    dispatch(updateProfile({ ...submitData, avatar, coverImg }));
    history.push("/profile");
  };

  useEffect(() => {
   console.log(userInfo);
  }, [])

  return (
    <div className="form-wrapper edit-infomation">
      <h4>Thông tin cá nhân</h4>
      <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      <Row justify="space-between" className="image-inputs-wrapper">
        <Col span={11}>
          <h4 className="sub-image">Ảnh đại diện</h4>
        </Col>
        <Col span={11}>
          <h4 className="sub-image">Ảnh bìa</h4>
        </Col>
        <Col span={11} className="image-input-wrapper">
          <label htmlFor="changeAvatarInput" className="image-input-label">
            {!avatar ? (
              <>
                <div className="icon-wrapper">
                  <img src={iconUpload} alt="image" />
                </div>
                <div className="title-action-image">Thêm ảnh đại diện</div>
              </>
            ) : (
              <img src={URL.createObjectURL(avatar)} alt="avatar" />
            )}
          </label>
          <input
            type="file"
            hidden
            id="changeAvatarInput"
            onChange={handleChangeAvatar}
          />
        </Col>
        <Col span={11} className="image-input-wrapper">
          <label htmlFor="changeBackgroundInput" className="image-input-label">
            {!coverImg ? (
              <>
                <div className="icon-wrapper">
                  <img src={iconUpload} alt="image" />
                </div>
                <div className="title-action-image">Thêm ảnh bìa (banner) </div>
              </>
            ) : (
              <img src={URL.createObjectURL(coverImg)} alt="avatar" />
            )}
          </label>
          <input
            type="file"
            hidden
            id="changeBackgroundInput"
            onChange={handleChangeCoverImg}
          />
        </Col>
      </Row>

      <Form
        // labelCol={{ span: 6 }}
        // wrapperCol={{ span: 18 }}
        name="control-hooks"
        initialValues={initialValues}
        form={form}
              className="edit-info-form"
      >
       <Row 
      //  gutter={16}
      style={{justifyContent:'space-between'}}
       >
       <Col span={11}>
        <Form.Item label={<label title="Họ và tên:">Họ và tên:</label>} name="fullName" style>
          <Input />
        </Form.Item>
        </Col>
 
        <Col span={11}>
        <Form.Item label={<label title="Ngày sinh:">Ngày sinh:</label>} name="birthDay">
          <DatePicker placeholder=""/>
        </Form.Item>
        </Col>

        <Col span={11}>
        <Form.Item label={<label title="Công việc:">Công việc:</label>} name="job">
          <Input />
        </Form.Item>
        </Col>

        <Col span={11}>
        <Form.Item label={<label title="Địa chỉ/Nơi sống:">Địa chỉ/Nơi sống:</label>} name="address">
          <Input />
        </Form.Item>
        </Col>

        <Col span={11}>
        <Form.Item label={<label title="Số điện thoại:">Số điện thoại:</label>} name="tel">
          <Input />
        </Form.Item>
        </Col>
 
        <Col span={11}>
        <Form.Item label={<label title="Zalo:">Zalo:</label>} name="zalo">
          <Input />
        </Form.Item>
        </Col>

        <Col span={11}>
        <Form.Item label={<label title="Email:">Email:</label>} name="email">
          <Input />
        </Form.Item>
        </Col>
         </Row>
         {/* <Form.Item 
                 labelCol={{ span: 3 }}
                 wrapperCol={{ span: 21 }}
         label="Giới thiệu" name="infor"
         >
          <Input.TextArea autoSize={{ minRows: 4 }}/>
        </Form.Item> */}

        <div className='post-row ckedit-custom' style={{ position: 'relative', marginTop:24 }}>
                    <CKEditor
                    style={{padding: '0px !important'}}
                      className="editor-container"
                      editor={ClassicEditor}
                      data={inforValue}
                      config={{
                        placeholder: 'Giới thiệu...',
                        startupFocus:'end',
                        toolbar: ['heading', '|',
                          'bold', 'italic', 'link', '|',
                          'bulletedList', 'numberedList', '|',
                          'insertTable', 'blockQuote', '|',
                          'undo', 'redo'],
                        heading: {
                          options: [
                            { model: 'paragraph', title: 'Normal', class: 'ck-heading_normal' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                          ]
                        },
                      }}
                      
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setInforValue(data)
                      }}
                    />
                    
                  </div>

        <div className="footer-end">
          <button
            type="button"
            onClick={onResetForm}
            className="button reset-button"
          >
            Huỷ
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="button submit-button"
          >
            Lưu
          </button>
        </div>
      </Form>

      
    </div>
  );
};

export default EditInfo;
