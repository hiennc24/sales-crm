import React, { useEffect, useState } from 'react'
import './TaskWork.scss'
import { useSelector } from 'react-redux';
import { selectGroupDetail } from '../../Group.selector';
import apis from '../../../../services/api';
import IconEmpty from '../../../../assets/images/groups/none-task-work.svg';
import NewPost from '../new-post/NewPost';
import { Row, Col, Button, Dropdown, Checkbox, Input } from 'antd';

import rightArrowIcon from '../../../../assets/images/right-arrow-icon.svg';
import avatar from '../../../../assets/images/avatar.svg';
import { formatMinutes } from '../../../../utils';
import publicIcon from '../../../../assets/images/public-icon.svg';
import CommentFooter from '../comment-footer/CommentFooter';

const size = 20;
const TaskGroup = () => {

    const [listTask, setListTask] = useState([]);
    const [pageIndex, setPageIndex] = useState(1)
    const groupDetail = useSelector(selectGroupDetail());

    const user = useSelector(state => state.get('userProfile').get('profile'));
    useEffect(() => {
        apis.group.getListPostsGroup(groupDetail.Id, 4, pageIndex, size).then(res => {
            if (res?.code === 200) {
                setPageIndex(pageIndex + 1);
                // setListTask(res.data);
                setListTask([{}]);
            }
        })
    }, [groupDetail.Id])
    console.log(listTask)

    const renderMembersShort = (item) => {
        let Employees = item?.Employee;
        Employees = Employees?.concat(item?.AccountManager);
        var listView = [];
        if (Employees) {
            Employees.map((emp, index) => {
                var avatar =
                    emp?.Avatar && emp?.Avatar !== ""
                        ? getUrlImage(35, 35, emp?.Avatar)
                        : RecentImage;
                if (Employees.length === index + 1) {
                    listView.push(
                        <img
                            className="avt-member avt-first"
                            src={avatar}
                            alt="recent"
                            title={emp?.FullName}
                            key={index}
                        />
                    );
                } else {
                    listView.push(
                        <img
                            className="avt-member"
                            src={avatar}
                            alt="recent"
                            title={emp?.FullName}
                            key={index}
                        />
                    );
                }
            });
        }
        return listView;
    };


    return (
        <div className="task-group-page">
            {(groupDetail.IsJoin || user.Id === groupDetail.Admin) && <NewPost />}

            {listTask.map((post, index) => (
                <div className="item-task-group" key={index}>
                    <div className="item-task-info">
                        <div className="task-header">
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
                        <p className="task-title">Sự kiện họp thường niên</p>
                        <div className="task-checkbox-list">
                            <div className="task-checkbox-item">
                                <Row>
                                    <Col xs={20}>
                                        <Checkbox>
                                            <div className="checkbox-label checked">Lựa chọn số 1</div>
                                        </Checkbox>
                                    </Col>
                                    <Col xs={4}>
                                        {renderMembersShort({})}
                                    </Col>
                                </Row>
                            </div>
                            <div className="task-checkbox-item">
                                <Row>
                                    <Col xs={20}>
                                        <Checkbox>
                                            <div className="checkbox-label">Lựa chọn số 2</div>
                                        </Checkbox>
                                    </Col>
                                    <Col xs={4}>
                                        {renderMembersShort({})}
                                    </Col>
                                </Row>
                            </div>
                            <div className="task-checkbox-item">
                                <Row>
                                    <Col xs={20}>
                                        <Input className="task-add-option" placeholder="Thêm lựa chọn" />
                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </div>
                    <div className="post-footer">
                        <CommentFooter post={post} />
                    </div>

                </div>
            ))}

            {listTask.length === 0 &&
                <div className="empty-data">
                    <img className="icon-empty" src={IconEmpty} />
                    <span className="text-empty">Chưa có tác vụ nào</span>
                </div>}
        </div>
    )
}

export default TaskGroup;