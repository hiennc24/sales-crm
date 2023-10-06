import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, message, Modal, Row, Tooltip } from 'antd'
import './SearchGroup.scss'
import API from '../../../../services/api';
import { getUrlImage } from '../../../../utils';
import { useSelector } from 'react-redux';
import { selectGroupType } from '../../../../stores/global/global.selector';

import RecentImage from '../../../../assets/images/recent-image.svg';
import IconJoin from '../../../../assets/images/groups/group-join.svg';
import IconUnJoin from '../../../../assets/images/groups/group-unjoin.svg';
import IconWaitingAccept from '../../../../assets/images/groups/waiting-accept.svg';
import IconEmpty from '../../../../assets/new/group/empty-search.svg';
import { NavLink, useHistory } from 'react-router-dom';
import BoxLoading from '../../../../components/box-loading/BoxLoading';
import PAGES from '../../../../routes/constants';

const size = 20;
const SearchGroup = ({ keySearch }) => {
    const history = useHistory();

    const [listGroup, setListGroup] = useState([]);
    const [messNoti, setMessNoti] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [isLoadMore, setLoadMore] = useState(false)
    const groupType = useSelector(selectGroupType());

    useEffect(() => {
        searchGroup()
    }, [keySearch])

    const searchGroup = () => {
        setLoading(true)
        API.group.searchListGroup(keySearch, 1, size).then(res => {
            if (res?.code === 200) {
                if (res.data.length < size) {
                    setLoadMore(false)
                } else {
                    setPageIndex(pageIndex + 1)
                }
                setListGroup(res.data || [])
            }
            setLoading(false)
        })
    }

    const loadMoreData = () => {
        // API.group.getListGroup(keySearch, pageIndex, size).then(res => {
        //     if (res?.code === 200) {
        //         if (res.data.length < size) {
        //             setLoadMore(false)
        //         } else {
        //             setPageIndex(pageIndex + 1)
        //         }
        //         setListGroup(listGroup.concat(res.data || []))
        //     }
        //     setLoading(false)
        // })
    }

    const renderPrivacyGroup = (type) => {
        var name = ""
        groupType.forEach(element => {
            if (type === element.Id) {
                name = element.Name;
            }
        });
        return name
    }


    const confirmRequest = (isJoin, groupId) => {
        if (isJoin) {
            // setMessNoti({
            //     isShow: true,
            //     message: "Bạn có chắc chắn muốn rời khỏi nhóm này!",
            //     groupId
            // })
            history.push(`${PAGES.groupWork}/${groupId}`)
        } else {
            var data = {
                "groupId": groupId
            }
            API.group.requestJoinGroup(data).then(res => {
                // console.log(res)
                if (res?.code === 200 || res?.code === 500) {
                    message.success("Đã gửi yêu cầu, chờ phê duyệt!")
                } else {
                    message.error("Đã xảy ra lỗi vui lòng thử lại sau!")
                }
                searchGroup()
            })
        }
    }


    const actionOutGroup = () => {
        var data = {
            "groupId": messNoti.groupId
        }
        API.group.outGroup(data).then(res => {
            if (res?.code === 200) {
                setMessNoti({})
                searchGroup()
            }
        })
    }

    // console.log('%clistGroup', "background: red", listGroup)

    // const getTextDescription = (text) => {
    //     let rows = 0;
    //     let countLetter = 0;
    //     let selectedText = '';
    //     let countSpace = 0;
    //     for(let t of text.split('')) {
    //         if(countLetter == 19) {
    //             rows++;
    //         }

    //         if(rows == 3 || countLetter >= 80) {
    //             selectedText+='...'
    //             break;
    //         }

    //         if(t == '\n') {
    //             countLetter++
    //             rows++;
    //         }
    //         else if(t == " ") {
    //             countSpace++;
    //             if(countSpace == 5) {
    //                 countLetter++
    //             }
    //             else if(countSpace == 1) {
    //                 countLetter++;
    //             }
    //         }
    //         else {
    //             countSpace = 0;
    //         }
    //         selectedText+=t;
    //     }

    //     console.log(selectedText)

    //     return selectedText;
    // }


    return (
        <div className="group-search-page">
            {listGroup.length ?
                listGroup.map((item, index) => (
                    <div className="item-group" key={index} to={'/group-work/' + item.Id}>
                        <Row gutter={[16, 32]}>
                            <Col span={2}>
                                <NavLink className="item-group-link" key={index} to={'/group-work/' + item.Id}>
                                    <img className="avatar" src={(!item.Avatar || item.Avatar === "") ? RecentImage : getUrlImage(0, 0, item.Avatar)} style={{ maxWidth: 'none' }} />
                                </NavLink>
                            </Col>
                            <Col span={20}>
                                <NavLink className="item-group-link" key={index} to={'/group-work/' + item.Id}>
                                    {/* <img className="avatar" src={(!item.Avatar || item.Avatar === "") ? RecentImage : getUrlImage(0, 0, item.Avatar)} style={{ maxWidth: 'none' }} /> */}
                                    <div className="item-info">
                                        <div className="group-name">{item.Name}</div>
                                        <div className="item-text-under">{renderPrivacyGroup(item.GroupTypeId)} - {item.Employee.length + 1 + " thành viên"}</div>
                                        <pre className="description">{item.Desc}</pre>
                                    </div>
                                </NavLink>
                            </Col>
                            <Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Tooltip title={item.IsWaitingAccept ? "Chờ xác nhận" : item.IsJoin ? "Truy cập vào nhóm " + item.Name : "Tham gia nhóm " + item.Name}>
                                    <button className="btn-group" onClick={() => confirmRequest(item.IsJoin, item.Id)}>
                                        <img src={item.IsWaitingAccept ? IconWaitingAccept : item.IsJoin ? IconJoin : IconUnJoin} alt="" style={{ maxWidth: 'none' }} />
                                    </button>
                                </Tooltip>
                            </Col>
                        </Row>
                    </div>
                )) : (
                    <div className="empty-search">
                        <div className="empty-search-image-wrapper">
                            <img className="empty-search-image" src={IconEmpty} draggable={false} />
                        </div>
                        <p className="empty-search-text">Chưa có dữ liệu</p>

                    </div>
                )}
            {isLoading &&
                <div className="loading">
                    <BoxLoading />
                </div>}
            {isLoadMore &&
                <div className="see-more" onClick={loadMoreData}>
                    <button className="btn-see-more">Xem thêm</button>
                </div>}
            <Modal
                title={
                    <p className="title-dialog-edit-post">Thông báo xác nhận</p>
                }
                visible={messNoti.isShow}
                onOk={() => actionOutGroup()}
                onCancel={() => setMessNoti({})}>
                <div style={{ textAlign: 'center' }}>{messNoti.message}</div>
            </Modal>
        </div>
    )
}

SearchGroup.propTypes = {
    keySearch: PropTypes.string
};

export default SearchGroup;