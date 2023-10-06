import React, { useState } from 'react'
import { Modal, Button, Alert } from 'antd';
import PropTypes from 'prop-types';
import apis from '../../../../services/api';
import BoxLoading from '../../../../components/box-loading/BoxLoading';

const ModalDeleteGroup = ({ isShow, onToggle, groupId, refeshData }) => {
    // const { isShow, onToggle } = props;
    const [status, setStatus] = useState('');

    const confirmDeleteGroup = () => {
        setStatus('LOADING')
        apis.group.deleteGroup(groupId).then(res => {
            console.log(res)
            if (res.code === 200) {
                refeshData();
                onToggle()
                setStatus("");
            } else {
                setStatus('ERROR')
            }
        })
    }
    return (
        <Modal className="modal-create-group"
            footer={null}
            visible={isShow}
            onCancel={onToggle}>
            <div className="modal-confirm">
                <span className="text-confirm">
                    Bạn có chắc chắn muốn xóa nhóm này?
                </span>
                {
                    status === "ERROR" && <Alert description="Đã xảy ra lỗi, vui lòng thử lại sau!!!" type="error" />
                }
                {
                    status === "LOADING" && <div className="loading"><BoxLoading /></div>
                }
                <div className="group-btn-confirm">
                    <Button disabled={status === "LOADING"} type="primary" onClick={confirmDeleteGroup}>Xác nhận</Button>
                    <Button onClick={onToggle}>Hủy</Button>
                </div>
            </div>
        </Modal>
    )
}

ModalDeleteGroup.propTypes = {
    isShow: PropTypes.bool,
    onToggle: PropTypes.func,
    groupId: PropTypes.string,
    refeshData: PropTypes.func,
};


export default ModalDeleteGroup;