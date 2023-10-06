
import { Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import PropTypes from "prop-types";
import React, { useState } from 'react';
import { SearchOutlined, CheckOutlined } from '@ant-design/icons';
import './NewPost.scss';
import closeIcon from '../../../../assets/images/close-icon.svg';
import selectedLocation from '../../../../assets/images/selected-location.svg';
import unselectLocation from '../../../../assets/images/unselect-location.svg';
import { searchMapByKey } from '../../../../services/api/search-map/SearchMap';


const ModalCheckIn = ({ isShow, onHide, location, setLocation }) => {

    const [listLocation, setListLocation] = useState([]);
    var location;
    const searchLocation = (e) => {
        let key = e.target.value;
        setTimeout(() => {
            searchMapByKey(key).then(res => {
                if (res.status === 200) {
                    setListLocation(res.data.items)
                }
            })
        }, 350)
    }

    return <Modal
        visible={isShow}
        onCancel={() => onHide()}
        title={
            <div className="tag-modal-title">
                <h4>Tìm kiếm vị trí</h4>
                <Input prefix={<SearchOutlined />} className="tag-search" onChange={searchLocation} />
            </div>
        }
        closeIcon={<img src={closeIcon} alt="close" />}
        footer={false}
        className="tag-modal"
    >
        {listLocation && listLocation.map((loc, i) =>
            <div key={i} className={`location-select-wrapper ${location.id === loc.id ? 'selected' : ''}`} 
                onClick={() => {
                    setLocation(loc)
                    onHide()
                }}>
                <div className="location-select">
                    <img src={location === loc ? selectedLocation : unselectLocation} alt="location" />
                    <div>
                        <p>{loc.title}</p>
                        <small>{loc.address.label}</small>
                    </div>
                </div>
                {location === loc && <CheckOutlined />}
            </div>)}
    </Modal>;
};

ModalCheckIn.propTypes = {
    isShow: PropTypes.bool,
    onHide: PropTypes.func,
    location: PropTypes.object,
    setLocation: PropTypes.func,
};
export default ModalCheckIn;