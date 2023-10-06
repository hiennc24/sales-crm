/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import "./styles.scss";
import {
  Modal,
  Avatar,
  Button,
  Tooltip
} from "antd";
import Scrollbars from "react-custom-scrollbars";
import { getUrlImage, Icons } from "../../../utils";
import deleteIcon from '../../../assets/new/event/delete.png';
import inviteUser from '../../../assets/new/event/inviteUser.png';
import closeIcon from '../../../assets/images/closeIcon.png';
import { useSelector } from "react-redux";
import API from "../../../services/api";
import { selectEvent } from "../../../stores/event/event.selector";

const ModalListMembers = ({
  isShowModal,
  setIsShowModal,
  listMember,
  listTags,
  isInvite,
  setIsInvite,
  countJoin,
  setCountJoin,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [listParticipants, setListParticipants] = useState([]);
  const [listEmployees, setListEmployees] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );
  const event = useSelector(selectEvent());

  useEffect(() => {
    if (isInvite) setListUsers(listEmployees);
    else setListUsers(listParticipants);
  }, [isInvite])

  useEffect(() => {
    setListParticipants(listMember);
    setListUsers(listMember);
  }, [listMember])

  useEffect(() => {
    if (listTags.length > 1) {
      const participantIds = listParticipants ? listParticipants.map(item => item.Id) : [];
      const newEmployees = listTags.slice(2).filter(item => !participantIds.includes(+item.Id));
      setListEmployees(newEmployees);
    }
  }, [listTags])

  const handleCancel = () => {
    setListUsers(listParticipants);
    setIsShowModal(false);
    setIsInvite(false);
  };

  const handleChangeAction = () => {
    setIsInvite(!isInvite); 
  }

  const handleSearchValue = (e) => {
    const value = e.target.value.replace(/\\/g, '');
    setSearchValue(value)
  }

  const handleClickAction = (e, id) => {
    e.preventDefault();
    if (isInvite) {
      let newEmployees = listEmployees?.filter(item => item.Id !== id);
      setListEmployees(newEmployees);
      setListUsers(newEmployees);
      API.event.inviteEvent({
        id: + event.Id,
        isJoin: 1,
        userId: [+id]
      })
        .then()
        .catch(err => console.log(err))
    } else {
      let newParticipants = listParticipants?.filter(item => item.Id !== id);
      setListParticipants(newParticipants);
      setListUsers(newParticipants);
      API.event.deleteParticipant({
        id: + event.Id,
        participants: newParticipants.map(item => item.Id)
      })
        .then(() => setCountJoin(countJoin - 1))
        .catch(err => console.log(err))
    }
  }

  return (
    <Modal
      title={
        <span className="title-modal-add-user">
          {isInvite 
            ? 'Mời tham gia'
            : 'Danh sách những người tham gia sự kiện'}
        </span>
      }
      // bodyStyle={{ padding: "0rem 2.5rem" }}
      closeIcon={<img src={closeIcon} alt='closeIcon' />}
      visible={isShowModal}
      width="600px"
      onCancel={handleCancel}
      footer={false}
    >
      <div
        className="search-container"
        style={{ boxShadow: "none", borderRadius: "none" }}
      >
        <div className='search-group-header'>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(39, 39, 39, 0.2)",
              borderRadius: "2px",
              height: '40px',
              width: '400px'
              // padding: "10px",
            }}
          >
            <img src={Icons.search} alt="" style={{ marginLeft: '12px' }}/>
            <div style={{display:'flex', flex:'auto', flexWrap:'wrap', width:'100%'}}>
              <input style={{ border:'none', outline:'none', width: '100%' }} value={searchValue} onChange={handleSearchValue}/>
            </div>
          </div>
          <Button className='join-button' onClick={() => handleChangeAction()}>{isInvite ? 'Xem thành viên' : 'Mời tham gia'}</Button>
        </div>
        <div className="participants-list">
          <Scrollbars style={{ height: '400px' }}>
              {listUsers?.map(item => {
                if (searchValue === "") {
                  return (
                    <a href={'/income/profile/' + item.Id}>
                      <div className="participant-detail">
                        <Avatar
                          size={25}
                          style={{ marginRight: "5px", marginLeft: '8px' }}
                          src={getUrlImage(50, 50, item.Avatar)}
                        />
                        <span className="participant-name">{item.FullName}</span>
                        <Tooltip placement='left' title={isInvite ? 'Mời' : 'Xóa thành viên'}>
                          <img 
                            src={isInvite ? inviteUser : deleteIcon} 
                            alt='action-icon' 
                            style={{ float: 'right', marginRight: '10px', cursor: 'pointer' }}
                            onClick={(e) => handleClickAction(e, item.Id)} 
                          />
                        </Tooltip>
                      </div>
                    </a>
                  )
                }
                else {
                  if (item.FullName.toLowerCase().search(searchValue.toLowerCase()) !== -1) {
                    return (
                      <a href={'/income/profile/' + item.Id}>
                        <div className="participant-detail">
                          <Avatar
                            size={25}
                            style={{ marginRight: "5px", marginLeft: '8px' }}
                            src={getUrlImage(50, 50, item.Avatar)}
                          />
                          <span className="participant-name">{item.FullName}</span>
                          <Tooltip placement='left' title={isInvite ? 'Mời' : 'Xóa thành viên'}>
                            <img 
                              src={isInvite ? inviteUser : deleteIcon} 
                              alt='action-icon' 
                              style={{ float: 'right', marginRight: '10px', cursor: 'pointer' }}
                              onClick={(e) => handleClickAction(e, item.Id)} 
                            />
                          </Tooltip>
                        </div>
                      </a>
                    )
                  }
                }
              })}
          </Scrollbars>
        </div>
      </div>
    </Modal>
  );
};

export default ModalListMembers;
