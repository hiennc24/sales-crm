import { Button, message } from 'antd';
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import avatar from '../../../../assets/images/avatar.svg';
import { getUrlImage } from '../../../../utils';
import { actionApproveUserRequestGroup, actionGetListUserRequestGroup, getGroupDetailAction } from '../../Group.action';
import { selectListUserRequestGroup } from '../../Group.selector';
import './GroupInfo.scss';

const ListGroupRequest = (props) => {

    // const groupDetail = useSelector(selectGroupDetail());
    const groupId = props?.match?.params?.id || null
    const dispatch = useDispatch()
    const listUserRequestGroup = useSelector(selectListUserRequestGroup());
    console.log('🚀 ~ file: ListGroupRequest.js ~ line 18 ~ ListGroupRequest ~ listUserRequestGroup', listUserRequestGroup)

    useEffect(() => {
        dispatch(actionGetListUserRequestGroup({ groupId }))
    }, [groupId])

    const onApproveGroup = async (isAccept, item, listUserRequestGroup) => {
        const res = await dispatch(actionApproveUserRequestGroup({ isAccept, item, listUserRequestGroup, groupId }))
        if (res) {
            if (isAccept) {
                dispatch(getGroupDetailAction(groupId))
                return message.success("Phê duyệt thành viên vào nhóm thành công!")
            } else
                return message.success("Xóa yêu cầu thành công!")
        }
    }

    const renderListUserRequest = () => {
        return listUserRequestGroup && listUserRequestGroup.length > 0
            ? listUserRequestGroup.map((it) => {
                return (
                    <div key={`renderListUserRequest_${it.Id}`} className="user-ctn">
                        <div className="user-item rowy-center">
                            <img className="avt-member mr--14" style={{ borderRadius: '50%', width: 35, height: 35, objectFit: 'cover' }}
                                src={it.Avatar ? getUrlImage(35, 35, it.Avatar) : avatar} alt="recent"
                                onError={(e) => { e.target.onerror = null; e.target.src = avatar }}
                            />
                            <div className="user-name text-one-inline" style={{ maxWidth: '' }}>{it?.FullName || "Anonymous"}</div>
                        </div>
                        <div className="btn__holder">
                            <Button
                                className="btn-accept-req mr--5 fs--12"
                                onClick={() => onApproveGroup(true, it, listUserRequestGroup)}
                            >
                                Đồng ý
                            </Button>
                            <Button
                                className="btn-reject-req fs--12"
                                onClick={() => onApproveGroup(false, it, listUserRequestGroup)}
                            >
                                Xóa
                            </Button>
                        </div>
                    </div>
                )
            }) : <div className="list-no-data">Không có yêu cầu</div>
    }

    return (
        <div className="bg-FFFFFF rad--10 list_join_request">
            <div 
                className="fs--16 lh--20 px--17 py--13 font-weight--bold" 
                style={{ 
                    borderBottom: '1px solid #E9F0F4',
                    color: '#272727CC' 
                }}>
                    Yêu cầu tham gia
            </div>
            {renderListUserRequest()}
        </div>
    )
}


ListGroupRequest.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    }),
};

export default withRouter(ListGroupRequest);