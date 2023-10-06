/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import "./ModalAddUser.scss";
import { Select } from "antd";
import closeIcon from "../../../../../assets/new/messenger/close.svg";
import Close from "../../../../../assets/new/messenger/close2.svg";
import addMemberIcon from "../../../../../assets/new/messenger/add-member.svg";
import addMemberIcon2 from "../../../../../assets/new/messenger/add-member-checked.svg";
import {
  Modal,
  Space,
  Checkbox,
  Button,
  Avatar,
  Input,
  Row,
  Col,
  Divider,
  Menu,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Scrollbars from "react-custom-scrollbars";
import API from "../../../../../services/api";
import { getUrlImage, Icons } from "../../../../../utils";
import { useSelector } from "react-redux";
const ModalAddUsers = ({
  isShowAddUsersModal,
  setIsShowAddUsersModal,
  currentMember,
  conversationId,
  setchangeList,
  changeList,
  currentConversation,
}) => {
  let timer;
  const [selectedList, setSelectedList] = useState();
  const [listEmployee, setListEmployee] = useState([]);
  const CheckboxGroup = Checkbox.Group;
  const [listContactAll, setListContactAll] = useState([]);
  const [listContactAvai, setListContactAvai] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );

  useEffect(() => {
    if (currentConversation) {
      let conversation = currentConversation?.Employee ?? [];
      let listContact = [];
      setKeySearch([]);
      API.employee.getListEmployees().then((res) => {
        if (res.code === 200) {
          let data = res.data;
          for (let index = 0; index < data.length; index++) {
            let rs = conversation.find((e) => e.UserId === +data[index].UserId);
            if (typeof rs === "undefined") {
              listContact = [...listContact, data[index]];
              setListContactAll(listContact);
            }
          }
        }
      });
      setListContactAll(listContact);
    }
  }, [currentConversation]);
  useEffect(() => {
    if (keySearch.length === 0) {
      setListContactAvai(listContactAll);
      return;
    }
    setListContactAvai(
      listContactAll.filter((contact) => contact.FullName?.includes(keySearch))
    );
  }, [JSON.stringify(listContactAll)]);
  const onCheckSelectBox = (e) => {
    console.log(
      "list",
      listContactAll.map((row) => {
        if (e.UserId == row.UserId)
          return { ...row, selected: !(row?.selected ?? false) };
        else {
          return row;
        }
      })
    );
    setListContactAll(
      listContactAll.map((row) => {
        if (e.UserId == row.UserId)
          return { ...row, selected: !(row?.selected ?? false) };
        else {
          return row;
        }
      })
    );
    setSelectedList(listContactAll.filter((a) => a.selected));
  };
  const addMember = () => {
    if (listContactAll?.length > 0) {
      let transform = [];
      let userAdd = [];
      listContactAll.forEach((item) => {
        if (item.selected === true) {
          transform.push({ MemberId: item.UserId });
          userAdd.push(item);
        }
      });
      API.chat
        .addMember({
          conversionId: Number(currentConversation.Id),
          member: transform,
        })
        .then((res) => {
          if (res.status === 200) {
            // setchangeList(!changeList);
            // console.log('transform', userAdd)
            userAdd.forEach((item) => {
              API.chat
                .createChat({
                  conversionId: Number(currentConversation.Id),
                  msg:
                    userInfo.FullName +
                    " đã thêm " +
                    item.FullName +
                    " vào nhóm",
                  showOnlyForSender: "",
                  file: "",
                  type: 8,
                  quoteId: 0,
                  quoteContent: "",
                })
                .then(() => {
                  window.scroll(0, 100);
                });
            });
            setchangeList(!changeList);
          }
        });
    }
    setIsShowAddUsersModal(false);
    setSelectedList(undefined);
  };
  const handleOk = () => {
    return currentMember;
  };
  const handleCancel = () => {
    setIsShowAddUsersModal(false);
    setSelectedList(undefined);
  };
  const handleChangeTyping = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (e.target.value === "") {
        setListContactAvai(listContactAll);
        return;
      }
      setListContactAvai(
        listContactAll.filter((contact) =>
          contact.FullName?.trim()
            .toLowerCase()
            .includes(e.target.value.toLowerCase().trim())
        )
      );
    }, 1000);
  };
  const handleChangeContact = (data) => {
    setSelectedList(data);
  };

  const handleSearchValue = (e) => {
    const value = e.target.value;
    setSearchValue(value)
  }
  return (
    <Modal
      // className="modalCustom"
      bodyStyle={{ padding: "0rem 2.5rem" }}
      title={
        <span className="title-modal-add-user">Mời thành viên vào nhóm</span>
      }
      closeIcon={<img src={closeIcon} alt="closeIcon" />}
      visible={isShowAddUsersModal}
      onOk={handleOk}
      width="800px"
      onCancel={handleCancel}
      footer={[
        <Button className="cancel-add-user" type="text" onClick={handleCancel}>
          Huỷ
        </Button>,
        <Button
          // className="add-user"\
          type="primary"
          style={{ backgroundColor: "#32a1c8" }}
          onClick={addMember}
        >
          Xong
        </Button>,
      ]}
    >
      <div
        className="search-container"
        style={{ boxShadow: "none", borderRadius: "none" }}
      >
        <h4 style={{ margin: "15px 0px" }}>Mời thêm bạn vào nhóm</h4>
        {/* <Input
          className="input-search"
          onChange={e => { handleChangeTyping(e); setKeySearch(e.target.value) }}
          placeholder="Tìm thành viên theo tên..."
          prefix={<SearchOutlined />}
        /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(39, 39, 39, 0.2)",
            borderRadius: "2px",
            padding: "10px",
          }}
        >
          <img src={Icons.search} alt="" />
          <div style={{display:'flex', flex:'auto', flexWrap:'wrap', width:'100%'}}>
            {listContactAll.map((emp, index) => {
              if (emp?.selected)
                return (
                  <div
                    key={index}
                    // value={index}
                    // label={emp.FullName}
                    style={{width:'fit-content', padding: 6, backgroundColor:'#F3F4F6', borderRadius:20, margin: 2}}
                  >
                    <div 
                    style={{width:'fit-content', display:'flex', alignItems:'center'}}
                    onClick={() => onCheckSelectBox(emp)}>
                      <Avatar
                        size={25}
                        style={{ marginRight: 8}}
                        src={getUrlImage(50, 50, emp.Avatar)}
                      />
                      {emp.FullName}
                      <img
                        className="checkbox-img"
                        src={emp?.selected ? Close : Icons.unCheckbox}
                        checked={emp?.selected ?? false}
                        style={{height:12, cursor:'pointer', marginLeft:8}}
                      />
                    </div>
                  </div>
                );
            })}
              <input style={{border:'none', outline:'none'}} value={searchValue} onChange={handleSearchValue}/>
          </div>
        
          {/* <Select
            mode="multiple"
            size="large"
            style={{ width: "100%" }}
            showSearch
            bordered={false}
            onChange={handleChangeContact}
            optionFilterProp="label"
            value={selectedList}
            // optionLabelProp="label"
          >
            {listContactAll.map((emp, index) =>
            <Select.Option 
              key={index}
              value={index}
              label={emp.FullName}
            >
              <div onClick={() => onCheckSelectBox(emp)}>
                <img className="checkbox-img" src={emp?.selected ? Icons.checkbox : Icons.unCheckbox} checked={emp?.selected ?? false} />
                <Avatar size={25} style={{marginRight:'5px'}} src={getUrlImage(50, 50, emp.Avatar)}/>
                {emp.FullName}
              </div>
            </Select.Option>
          )}
          </Select> */}
        </div>
        <div>
          <Menu>
            {listContactAll.map((emp, index) => {
              if (searchValue === "") {
                return (
                  <Menu.Item
                    key={index}
                    // value={index}
                    // label={emp.FullName}
                    style={{paddingLeft:0, paddingRight: 0}}
                  >
                    <div onClick={() => onCheckSelectBox(emp)}>
                      <img
                        className="checkbox-img"
                        src={emp?.selected ? Icons.checkbox : Icons.unCheckbox}
                        checked={emp?.selected ?? false}
                        style={{height:18}}
                      />
                      <Avatar
                        size={25}
                        style={{ marginRight: "5px", marginLeft:8 }}
                        src={getUrlImage(50, 50, emp.Avatar)}
                      />
                      {emp.FullName}
                    </div>
                  </Menu.Item>
                )
              }
              else {
                if (emp.FullName.toLowerCase().search(searchValue.toLowerCase()) !== -1) {
                  return (
                    <Menu.Item
                      key={index}
                      // value={index}
                      // label={emp.FullName}
                      style={{paddingLeft:0, paddingRight: 0}}
                    >
                      <div onClick={() => onCheckSelectBox(emp)}>
                        <img
                          className="checkbox-img"
                          src={emp?.selected ? Icons.checkbox : Icons.unCheckbox}
                          checked={emp?.selected ?? false}
                          style={{height:18}}
                        />
                        <Avatar
                          size={25}
                          style={{ marginRight: "5px", marginLeft:8 }}
                          src={getUrlImage(50, 50, emp.Avatar)}
                        />
                        {emp.FullName}
                      </div>
                    </Menu.Item>
                  )
                }
              }
            }
            )}
          </Menu>
        </div>
      </div>
      {/* <div className="search-result">
        <div className="member-count">
          Thành viên ({currentConversation?.Employee?.length ?? 0})
        </div>
        <hr className="divider-member" /> */}
      {/* <Row className="scroll-contact"> */}
      {/* <Scrollbars id="scroll-bar-add-user" autoHide >
          {listContactAvai.length > 0 ? (
            <>
              {listContactAvai.map((emp, index) =>
                <Col span={24} key={index} className="containerCheckboxChat" >
                  <img className="checkbox-img" src={emp?.selected ? addMemberIcon2 : addMemberIcon} onClick={() => onCheckSelectBox(emp)} checked={emp?.selected ?? false} />
                  <div className="checkbox-item">
                    <Avatar size={40} src={getUrlImage(50, 50, emp.Avatar)}></Avatar>
                    <p>{emp.FullName}</p>
                  </div>
                </Col>
              )}

            </>
          ) : (
            <></>
          )}

        </Scrollbars> */}
      {/* </Row> */}
      {/* <hr className="divider-member" />
      </div> */}
    </Modal>
  );
};

export default ModalAddUsers;
