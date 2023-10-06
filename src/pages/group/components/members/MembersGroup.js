import { SearchOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Input, message, Popover } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CHAT_AVATAR from "../../../../assets/images/avatar.svg";
import IconSearch from "../../../../assets/new/group/search.png";
import IconKey from '../../../../assets/images/key.png';
import { selectGroupDetail } from '../../Group.selector';
import './MembersGroup.scss';
import apis from '../../../../services/api';
import { getUrlImage } from '../../../../utils';
import { getGroupDetailAction } from '../../Group.action';


const MembersGroup = () => {
    const dispatch = useDispatch();
    const groupDetail = useSelector(selectGroupDetail());
    const { AccountManager, Employee, Id } = groupDetail;
    const managers = AccountManager || [];
    const indexMembers = Employee || [];
    const totalMembers = (managers.length + indexMembers.length) || 1;
    const [admins, setAdmins] = useState(managers);
    const [employee, setEmployee] = useState(indexMembers);
    const [search, setSearch] = useState('');
    const [userId, setUserId] = useState('')
    const user = useSelector(state => state.get('userProfile').get('profile'));
    var isAdmin = user.Id === groupDetail.Admin
    useEffect(() => {
        setEmployee(indexMembers)
    }, [indexMembers])
    useEffect(() => {
        setAdmins(managers)
    }, [managers])
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!search) return;
            onSubmitSearch()
        } else {
            return;
        }
    };

    function onSubmitSearch() {
        const newEmployee = employee.filter(e => e.FullName === search.trim())
        setEmployee(newEmployee)

    }

    function handleChangeSearch(e) {
        const value = e.target.value.trim().toLowerCase();
        setTimeout(() => {
            if (value === '') {
                setEmployee(indexMembers)
                setAdmins(managers)
                return
            }
            setAdmins(managers.filter(e => e.FullName.trim().toLowerCase().includes(value)) ?? [])
            setEmployee(indexMembers.filter(e => e.FullName.trim().toLowerCase().includes(value)))
        }, 300);
        setSearch(value);
    }

    function onRemove() {
        let r = confirm("Bạn có chắc muốn xóa thành viên này khỏi group?");
        if (r == true) {
            const data = { id: userId, groupId: Id }
            apis.group.removeMember(data).then(res => {
                console.log(res)
                if (res.code === 200) {
                    const newEmployee = Employee.filter(e => e.UserId !== userId)
                    setEmployee(newEmployee)
                    dispatch(getGroupDetailAction(Id))
                    return;
                } else {
                    message.error("Đã xảy ra lỗi, vui lòng thử lại sau!!!")
                    console.log('error', res.message)
                    return;
                }
            })
        } else {
            return;
        }
    }

    const content = (
        <div className="px--8 py--12 cursor-pointer" onClick={() => onRemove()}>
            Mời ra khỏi nhóm
        </div>
    );

    function renderAdmin() {
        return admins.map((item, index) => {
            return (
                <div className="row-sb-center mb--14 px--26 py--9" style={{ background: 'rgb(65 67 70 / 5%)' }} key={`account_${index}`}>
                    <div className="members-list-avatar">
                        <img style={{ borderRadius: '50%', width: 35, height: 35 }} src={item.Avatar !== '' ? getUrlImage(35, 35, item.Avatar) : CHAT_AVATAR} alt="avatar" className="mr--13" />
                        <span className="fs--16 lh--19 c-4E596F">{item.FullName}</span>
                    </div>
                    <div>
                        <img src={IconKey} alt="" />
                    </div>
                </div>
            )
        })
    }

    function renderMembers() {
        return employee.map((item, index) => {
            return (
                <div className="row-sb-center mb--14 px--26 py--9 rad--10" key={`employee_${index}`}>
                    <div className="members-list-avatar">
                        <img style={{ borderRadius: '50%', width: 35, height: 35 }} src={item.Avatar !== '' ? getUrlImage(35, 35, item.Avatar) : CHAT_AVATAR} alt="avatar" className="mr--13" />
                        <span className="fs--16 lh--19 c-4E596F">{item.FullName}</span>
                    </div>
                    <div>
                        {(isAdmin) && <Popover placement="bottomRight" title={null} content={content} trigger="click">
                            <span className="icon cursor-pointer" onClick={() => setUserId(item.UserId)} ><EllipsisOutlined /></span>
                        </Popover>}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="row-center">
            <div className="members-group-page">
                <div className=" px--21">
                    <div className="fs--16 lh--16 c-4E596F font-weight--bold my--16">Thành viên ({totalMembers})</div>
                    <Input
                        placeholder="Tìm kiếm"
                        className="members-search mt--9 mx-21"
                        value={search}
                        onChange={handleChangeSearch}
                        prefix={<img src={IconSearch} onClick={() => onSubmitSearch} className="c-4E596F" />}
                        onKeyDown={() => handleKeyDown}
                    />
                </div>
                <div className="members-body mt--15">

                    <div className="members-admin">
                        {renderAdmin()}
                    </div>


                    <div className="members">
                        {renderMembers()}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MembersGroup;