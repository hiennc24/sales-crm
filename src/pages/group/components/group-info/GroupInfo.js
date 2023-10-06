import React, { useEffect, useState } from 'react';
import './GroupInfo.scss';
import { useSelector } from 'react-redux';
import { selectGroupDetail } from '../../Group.selector';


import PrivacyLock from '../../../../assets/images/privacy_lock.svg';
import RecentImage from '../../../../assets/images/avatar.svg';
import IconPublic from '../../../../assets/images/public_privacy.svg';
import { selectGroupType } from '../../../../stores/global/global.selector';
import { getUrlImage } from '../../../../utils';

const GroupInfo = () => {

    const groupDetail = useSelector(selectGroupDetail());
    const groupType = useSelector(selectGroupType());
    const [accountManager, setAccManager] = useState({})

    useEffect(() => {
        if (groupDetail.AccountManager) {
            setAccManager(groupDetail.AccountManager[0] || {})
        }
    }, [groupDetail.Id])

    const renderPrivacyGroup = () => {
        var privacy = []
        groupType.forEach(element => {
            if (groupDetail.Type === element.Id) {
                privacy.push(
                    <div className="privacy-group-work" key={element.Id}>
                        <div className="horizontal">
                            <img src={element.Code === "public" ? IconPublic : PrivacyLock} alt="recent" />
                            <span className="text-privacy">{element.Name}</span>
                        </div>
                        <p className="text-des-privacy">{element.Desc}</p>
                    </div>
                )
            }
        });
        return privacy;
    }
    return (
        <div className="col-group-info">
            <span className="title-owner">Chủ sở hữu</span>
            <div className="user-item">
                <img className="avt-member" src={accountManager.Avatar && accountManager.Avatar !== "" ? getUrlImage(35, 35, accountManager.Avatar) : RecentImage} alt="recent" />
                <span className="user-name">{accountManager.FullName && accountManager.FullName !== "" ? accountManager.FullName : "Anonymous"}</span>
            </div>
            {renderPrivacyGroup()}
            <div className="content-description">
                <span className="title-description-group">Mô tả</span>
                <p className="description-group" dangerouslySetInnerHTML={{ __html: groupDetail.Desc?.replaceAll('\n', '<br/>') }} ></p>
            </div>
        </div>
    )
}


GroupInfo.propTypes = {};

export default GroupInfo;