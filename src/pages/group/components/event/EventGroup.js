import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectGroupDetail } from '../../Group.selector';
import apis from '../../../../services/api';
import moment from 'moment'
import { Menu, Button, Col, Row, Dropdown, Empty } from 'antd'
import NewPost from '../new-post/NewPost';
import './EventGroup.scss';
import { CaretDownOutlined, EditOutlined, CloseSquareOutlined } from '@ant-design/icons';

import ImgEvent from '../../../../assets/images/groups/img-event.svg';
// import IconCareEvent from '../../../../assets/images/groups/icon-care-event.svg';
// import IconShare from '../../../../assets/images/groups/icon-share-event.svg';
import IconEmpty from '../../../../assets/images/groups/none-task-work.svg';
import IconClock from '../../../../assets/new/event/dong-ho.svg';
import IconCareOutline from '../../../../assets/new/event/quan-tam.svg';
import IconCareSolid from '../../../../assets/new/event/quan-tam-black.svg';
import IconMember from '../../../../assets/new/event/nguoi-tham-gia.svg';
import IconShare from '../../../../assets/new/event/share-black.svg';
import IconLocation from '../../../../assets/new/event/dia-chi.svg';
import Joined from '../../../../assets/new/event/da-tham-gia.svg';
import moreIcon from '../../../../assets/images/more-icon.svg';

import rightArrowIcon from '../../../../assets/images/right-arrow-icon.svg';
import avatar from '../../../../assets/images/avatar.svg';
import { formatMinutes } from '../../../../utils';
import publicIcon from '../../../../assets/images/public-icon.svg';
import emptyIcon from "../../../search/img/emptyIcon.png";

const size = 20;
const EventGroup = () => {

    const [listEvent, setListEvent] = useState([]);
    const [pageIndex, setPageIndex] = useState(1)
    const groupDetail = useSelector(selectGroupDetail());
    const user = useSelector(state => state.get('userProfile').get('profile'));

    useEffect(() => {
        apis.group.getListPostsGroup(groupDetail.Id, 3, pageIndex, size).then(res => {
            if (res?.code === 200) {
                setPageIndex(pageIndex + 1);
                // setListEvent(res.data);
                setListEvent([{}]);
            }
        })
    }, [groupDetail.Id])
    // console.log(listEvent)

    const listoptionsMenu = (post, index) => (
        post.CreatedBy === user.Id ? <Menu >
            <Menu.Item>
                <a style={{ display: 'flex', alignItems: 'center', marginTop: 5 }} onClick={() => {
                    setShowEditModalId(index)
                    selectPost(post)
                }}>
                    <EditOutlined />
                    <p style={{ margin: 0, marginLeft: 5 }}>Chỉnh sửa bài viết</p>
                </a>
            </Menu.Item>
            <Menu.Item><a style={{ display: 'flex', alignItems: 'center', marginTop: 5 }} onClick={() => {
                setMessNoti({
                    isShow: true,
                    message: "Bạn có chắc chắn muốn xóa bài viết này?",
                    postId: post.Id
                })
            }}>
                <CloseSquareOutlined />
                <p style={{ margin: 0, marginLeft: 5 }}>Xóa bài viết</p>
            </a></Menu.Item>
        </Menu> : ""
    )

    return (
        <div className="event-group-page">
            {(groupDetail.IsJoin || user.Id === groupDetail.Admin) && <NewPost />}
            {listEvent.map((post, index) => (
                <div className="item-event-group" key={index}>
                    <img className="item-event-image" src={ImgEvent} />
                    <div className="item-event-info">
                        <div className="event-header">
                            <div className="avatar-wrapper" onClick={() => navigateUserProfile(post.CreatedBy)}>
                                <img src={avatar} alt="avatar" style={{ borderRadius: '50%', width: 40, height: 40 }} />
                            </div>
                            <div>
                                <div className="item-horizontal">
                                    <div className="name-wrapper">
                                        <p
                                            className="user-name mr--16"
                                            onClick={() => {
                                                // navigateUserProfile(post.CreatedBy)}
                                            }}
                                        >
                                            Anonymous
                                        </p>
                                        <img src={rightArrowIcon} alt="rightArrow" />
                                        <p className="group-name">{groupDetail.Name}</p>
                                    </div>
                                    {post?.Tags?.length > 0 && renderTagsUser(post.Tags)}
                                </div>
                                <div className="post-status">
                                    <small>{formatMinutes(post.PublicDate)}</small>
                                    <img src={publicIcon} alt="" />
                                    <span className="title-location">{post.Address ? (" tại " + post.Address) : null}</span>
                                </div>
                            </div>
                            {post.CreatedBy === user.Id && (
                                <div className="more-actions">
                                    <Dropdown overlay={listoptionsMenu(post, index)} >
                                        <img
                                            src={moreIcon}
                                            alt="moreIcon"
                                        />
                                    </Dropdown>
                                </div>
                            )}
                        </div>
                        <p className="event-title">Sự kiện họp thường niên</p>
                        <p className="event-content-text">
                            Họp thường niên công ty là sự kiện gắn kết các thành viên trong công ty <br />
                            Họp thường niên công ty là sự kiện gắn kết các thành viên trong công ty
                        </p>
                        <div className="event-time">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <div className="event-time-item">
                                        <img className="event-time-icon" src={IconClock} alt="icon clock" />
                                        <p className="event-time-text red">
                                            {moment().format('HH:mm - DD/MM/YYYY')}
                                        </p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="event-time-item">
                                        <img className="event-time-icon" src={IconCareOutline} alt="icon quan tam" />
                                        <p className="event-time-text">
                                            {post?.care || 41} Quan tâm
                                        </p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="event-time-item">
                                        <img className="event-time-icon" src={IconMember} alt="icon nguoi tham gia" />
                                        <p className="event-time-text">
                                            {post?.member || 30} Tham gia
                                        </p>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="event-time-item">
                                        <img className="event-time-icon" src={IconLocation} alt="icon dia chỉ" />
                                        <p className="event-time-text">
                                            {post?.Address || 'P-606, CT4-4, Khu DT Mễ Trì, Nam Từ Liêm. Hà Nội'}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="event-btns">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Button block className="btn-joined-members" disabled>
                                        <img src={Joined} alt="joined" />
                                        <span>Đã tham gia</span>
                                    </Button>
                                </Col>
                                <Col span={8}>
                                    <Button block className="btn-care">
                                        <img src={IconCareSolid} alt="care" />
                                        <span>Quan tâm</span>
                                    </Button>
                                </Col>
                                <Col span={8}>
                                    <Button block className="btn-share">
                                        <img src={IconShare} alt="share" />
                                        <span>Chia sẻ</span>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>

                </div>
            ))}
            {listEvent.length === 0 &&
                <Empty
                    image={<img src={emptyIcon} alt="emptyIcon" />}
                    description="Chưa có bài viết nào"
                />
            }
        </div>
    )
}

export default EventGroup;