/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import '../NewPost.scss';
import { searchMapByKey } from '../../../../../services/api/search-map/SearchMap';

import CloseBlack from '../../../../../assets/new/common/close-black.svg';
import Search from '../../../../../assets/new/common/tim-kiem.svg';
import Location from '../../../../../assets/new/common/location.svg';
import LocationActive from '../../../../../assets/new/common/location-active.svg';
import Check from '../../../../../assets/new/common/check.svg';


const LocationModal = ({ showLocationModal, setShowLocationModal, location, setLocation }) => {
  const [listLoc, setListLoc] = useState([]);

  const handleSearchLocation = (e) => {
    let key = e.target.value;
    setTimeout(() => {
      searchMapByKey(key).then(res => {
        if (res.status === 200) {
          ;
          setListLoc(res.data.items);
        }
      });
    }, 350);
  };

  const handleSetLocation = (loc) => {
    setLocation(loc);
    setShowLocationModal(false);
  };

  return <Modal
    visible={showLocationModal}
    onCancel={() => setShowLocationModal(false)}
    title={
      <div className="tag-modal-title">
        <h4>Tìm vị trí</h4>
        <Input prefix={<img src={Search} />} className="tag-search" onChange={handleSearchLocation} placeholder="Bạn đang ở đâu" />
      </div>
    }
    closeIcon={<img src={CloseBlack} alt="close" />}
    footer={false}
    className="tag-modal__new"
  >
    {listLoc && listLoc.map(loc =>
      <div key={loc.id} className={`mb--10 location-select-wrapper ${location === loc ? 'selected' : ''}`} onClick={() => handleSetLocation(loc)}>
        <div className="location-select">
          <img src={location === loc ? LocationActive : Location} alt="location" />
          <div className="ml--10">
            <p>{loc.title}</p>
            <small>{loc.address.label}</small>
          </div>
        </div>
        {location === loc && <img src={Check} />}
      </div>)}
  </Modal>;
};

export default LocationModal;