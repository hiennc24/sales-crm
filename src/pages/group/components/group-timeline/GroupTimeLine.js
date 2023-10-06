import React, { useEffect, useState } from 'react';
import NewPost from '../new-post/NewPost'
import { Menu, Dropdown, Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { CaretDownOutlined, EditOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { selectGroupDetail } from '../../Group.selector';
import apis from '../../../../services/api';
import GGMapPost from '../new-post/Map';
// import FileViewer from 'react-file-viewer';
import { getUrlImage } from '../../../../utils';


import avatar from '../../../../assets/images/avatar.svg';
import publicIcon from '../../../../assets/images/public-icon.svg';
import IconEmpty from '../../../../assets/images/groups/none-task-work.svg';
import rightArrowIcon from '../../../../assets/images/right-arrow-icon.svg';
// import postImage from '../../../../assets/images/post-image.svg';
// import pinIcon from '../../../../assets/images/pin-icon.svg';
import moreIcon from '../../../../assets/images/more-icon.svg';
import BoxLoading from '../../../../components/box-loading/BoxLoading';
import moment from 'moment';
import { formatMinutes, getUrlFile } from '../../../../utils';
import './GroupTimeLine.scss'
import CommentFooter from '../comment-footer/CommentFooter';
import { FORMAT_DATE_TIME } from '../../../../constants/config'
import ListImageView from './ListImageView';
import { useHistory } from 'react-router-dom';
import TypeofPosts from '../../../social/components/new-post/TypeofPosts';
const size = 10;
const GroupTimeLine = () => {

    const [listPostView, setListPostView] = useState([]);
    // console.log('🚀 ~ file: GroupTimeLine.js ~ line 31 ~ GroupTimeLine ~ listPostView', listPostView)
    const [pageIndex, setPageIndex] = useState(1);
    const groupDetail = useSelector(selectGroupDetail());
    const [isLoading, setLoading] = useState(false);
    const [isLoadMore, setLoadMore] = useState(true);
    const [showEditModalId, setShowEditModalId] = useState(null);
    const [postSelected, selectPost] = useState({});
    const [messNoti, setMessNoti] = useState({});
    const user = useSelector(state => state.get('userProfile').get('profile'));
    const history = useHistory();

    useEffect(() => {
        // console.log('user', user);
        if (groupDetail.Id) {
            window.scrollTo(0, 0)
            setPageIndex(1)
            getListPosts(1, []);
            setLoadMore(true);
        }
    }, [groupDetail.Id])

    useEffect(() => {
        window.addEventListener("scroll", handle_scroll)
        return () => window.removeEventListener("scroll", handle_scroll);
    }, [isLoading, listPostView.length])

    const handle_scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
        const body = document.body
        const html = document.documentElement
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
        const windowBottom = windowHeight + window.pageYOffset

        if (windowBottom + 10 >= docHeight) {
            if (isLoading === false && isLoadMore) {
                getListPosts(pageIndex, listPostView)
            }
        } else {
        }
    }

    const getListPosts = (page, listPost) => {
        setLoading(true)
        apis.group.getListPostsGroup(groupDetail.Id, 1, page, size).then(res => {
            if (res?.code === 200) {
                if (res.data.length < size) {
                    setLoadMore(false);
                } else {
                    setPageIndex(page + 1);
                }
                setListPostView(listPost.concat(res.data));
            }
            setLoading(false)
        })
    }

    const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
    ]

    const refreshTimeline = (post) => {
        const data = { ...post, Tags: post.tags, Content: post.content, Title: post.title, PublicDate: moment(new Date()).format('YYYY-MM-DD'), CreatedBy: user.Id, CreatedByAvatar: user.Avatar, Address: post?.address ?? '' }




        // console.log(post)
        setListPostView(insert(listPostView, 0, data));
        // setPageIndex(1)
        // getListPosts(1, []);
        // setLoadMore(true);
    }

    const actionDeletePost = () => {
        apis.posts.deletePost(messNoti.postId).then(res => {
            if (res?.code === 200) {
                var list = listPostView.filter(item => item.Id !== messNoti.postId);
                setListPostView(list);
                setMessNoti({})
            } else {
                message.error("Đã xảy ra lỗi vui lòng thử lại sau")
            }
        })
    }

    const renderListImage = (post) => {
        if (post.Files && post.Files.length > 0) {
            let isExistImage = false;
            let listViewFile = [];
            let listViewImage = [];
            // let countImg = 0
            post.Files.forEach((file, index) => {
                if (file.Type === 1) {
                    // countImg++;
                    isExistImage = true;
                    listViewImage.push(file.Files);
                } else if (file.Type === 3) {
                    listViewFile.push(
                        <a className="file-preview-wrapper" key={index} href={getUrlFile(file.Files)} target="_blank" rel="noopener noreferrer">
                            {file.Name}
                        </a>
                    )
                }
            })
            if (isExistImage) {
                return (
                    <ListImageView listImg={listViewImage} />
                );
            } else {
                return listViewFile;
            }
        } else if (post.Address) {
            return (
                <GGMapPost lat={post.Lat} lng={post.Lon} />
            )
        }
    }

    const listTags = (tags) => (
        <Menu >
            {tags.map((tag) => (
                <Menu.Item key={tag.UserId}>
                    <a className="item-privacy">
                        <span className="label-privacy-post">{tag.FullName}</span>
                    </a>
                </Menu.Item>
            ))}
        </Menu>
    )

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

    const renderTagsUser = (tags) => {
        var firstTag = tags[0] || {};
        let list = tags.filter((item, i) => i !== 0);
        return (
            <div className="item-horizontal bottom-0">
                <span className="tags-with">{'cùng với'}</span>
                <span className="tags-with"><strong>{firstTag.FullName}</strong></span>
                {(tags.length > 1 ? <span className="tags-with">và</span> : '')}
                {
                    tags.length > 1 &&
                    <Dropdown overlay={listTags(list)} >
                        <a className="item-privacy" onClick={e => e.preventDefault()}>
                            <span className="text-short-tags" style={{ fontSize: 16 }}>{(tags.length - 1) + " người khác"}</span>
                            <CaretDownOutlined />
                        </a>
                    </Dropdown>
                }
            </div>
        )
    }

    const refeshData = (data) => {
        listPostView[showEditModalId] = data
        setListPostView(listPostView)
        selectPost({})
        setShowEditModalId(null);

    }

    const navigateUserProfile = (userId) => {
        // console.log(userId)
        if (user.Id == userId) {
            history.push('/profile');
        }
    }
    return (
        <div className="group-timeline">
            {((groupDetail.IsJoin || user.Id === groupDetail.Admin) && !postSelected.Id) && <NewPost refeshData={refreshTimeline} />}
            {isLoading &&
                <div className="loading">
                    <BoxLoading />
                </div>}
            {listPostView.map((post, index) => (
                <div className="detail-post" key={index}>
                    <div className="post-header">
                        <div>
                            <div className="avatar-wrapper" onClick={() => navigateUserProfile(post.CreatedBy)}>
                                <img src={post.CreatedByAvatar ? getUrlImage(40, 40, post.CreatedByAvatar) : avatar} alt="avatar" style={{ borderRadius: '50%', width: 40, height: 40 }} />
                            </div>
                            <div>
                                <div className="item-horizontal">
                                    <div className="name-wrapper">
                                        <p className="user-name" onClick={() => navigateUserProfile(post.CreatedBy)}>{post.CreatedByName || "Anonymous"}</p>
                                        <img src={rightArrowIcon} alt="rightArrow" />
                                        <p className="group-name">{groupDetail.Name}</p>
                                    </div>
                                    {post.Tags.length > 0 && renderTagsUser(post.Tags)}
                                </div>
                                <div className="post-status">
                                    <small>{moment(post?.CreatedAt, FORMAT_DATE_TIME).startOf('minute').fromNow()}</small>
                                    <img src={publicIcon} alt="" />
                                    <span className="title-location">{post?.Address ? (" tại " + post.Address) : null}</span>
                                </div>
                            </div>
                        </div>
                        {post.CreatedBy === user.Id && <div className="more-actions">
                            {/* <img src={pinIcon} alt="pinIcon" /> */}
                            <Dropdown overlay={listoptionsMenu(post, index)} >
                                <img
                                    src={moreIcon}
                                    alt="moreIcon"
                                />
                            </Dropdown>
                        </div>}
                    </div>
                    <div className="post-content">
                        {/* <h4>{post?.Title || ""}</h4> */}
                        {post.Title && <p className="post-title" dangerouslySetInnerHTML={{ __html: post.Title.replaceAll('\n', '<br/>') }} ></p>}
                        <p dangerouslySetInnerHTML={{ __html: post.Content.replaceAll('\n', '<br/>') }} ></p>
                        <div className="tags">
                            {/* <p>#Phongnhansu</p>
                            <p>#Phongmarketing</p>
                            <p>#Phongketoan</p> */}
                        </div>
                        <div className="post-images">
                            {renderListImage(post)}
                            {/* <img src={postImage} alt="postImage" /> */}
                        </div>
                    </div>
                    <div className="post-footer">
                        <CommentFooter post={post} />
                    </div>
                </div>
            ))}
            {listPostView.length === 0 &&
                <div className="empty-data">
                    <img className="icon-empty" src={IconEmpty} />
                    <div className="text-empty">Chưa có bài đăng nào</div>
                </div>}
            {postSelected.Id &&
                <Modal
                    title={
                        <p className="title-dialog-edit-post">Chỉnh sửa bài viết</p>
                    }
                    visible={postSelected.Id}
                    onOk={() => { }}
                    onCancel={() => selectPost({})}
                    className="post-modal"
                    footer={false}>
                    <TypeofPosts
                        key="edit-post"
                        type='post'
                        isEditType={postSelected.Id}
                        postData={postSelected}
                        refeshData={(data) => refeshData(data)}
                        hideModal={() => selectPost({})}
                    />
                </Modal>
            }
            <Modal
                title={
                    <p className="title-dialog-edit-post">Thông báo xác nhận</p>
                }
                visible={messNoti.isShow}
                onOk={() => actionDeletePost()}
                onCancel={() => setMessNoti({})}>
                <div style={{ textAlign: 'center' }}>{messNoti.message}</div>
            </Modal>
        </div>
    )
}

GroupTimeLine.propTypes = {};

export default GroupTimeLine;