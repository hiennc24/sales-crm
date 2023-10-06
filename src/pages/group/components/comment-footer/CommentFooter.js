import React, { useEffect, useState } from 'react';
import { Input, message, Modal, Tooltip, Row, Col, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { SmileOutlined } from '@ant-design/icons';
import API from '../../../../services/api';
import './CommentFooter.scss';
import ItemComment from './ItemComment'
import Picker from "emoji-picker-react";

// import unlikeIcon from '../../../../assets/images/unlike-icon.svg';
// import likeIcon from '../../../../assets/images/like-icon.svg';
// import commentIcon from '../../../../assets/images/comment-icon.svg';
// import shareIcon from '../../../../assets/images/share-icon.svg';
import avatar from '../../../../assets/images/avatar.svg';
import sendIcon from '../../../../assets/images/send-icon2.svg';
import Like from '../../../../assets/new/common/like.svg';
import LikeActive from '../../../../assets/new/common/like-active.svg';
import Comment from '../../../../assets/new/common/comment.svg';
import Share from '../../../../assets/new/common/share.svg';
import { getUrlImage } from '../../../../utils';
import { useSelector } from 'react-redux';

const size = 20;
const CommentFooter = ({ post }) => {
	const [isLike, setLike] = useState(false);
	const [countLike, setCountLike] = useState(0);
	const [countComment, setCountComment] = useState(0);
	const [comment, setComment] = useState('');
	const [pageIndex, setPageIndex] = useState(1);
	const [listComment, setListComment] = useState([]);
	const [isLoadMore, setLoadMore] = useState(true);
	const [isShowAllComment, showAllComment] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isShowEmojiPicker, showEmojiPicker] = useState(null);
	const user = useSelector(state => state.get('userProfile').get('profile'));

	useEffect(() => {
		setLoadMore(true)
		setLike(post.IsLike);
		setCountLike(post.CountLike);
		setCountComment(post.CountComment);
		// setListComment(post.Comments)
		API.posts.getCommentPaging(post.Id, 1, size).then(res => {
			if (res?.code === 200) {
				setListComment(res.data);
				setPageIndex(2);
				if (res.data.length <= 3) {
					setLoadMore(false);
					showAllComment(true)
				}
			}
		});
	}, [post?.Id]);

	const loadMoreComment = () => {
		if (isShowAllComment) {
			API.posts.getCommentPaging(post.Id, pageIndex, size).then(res => {
				if (res?.code === 200) {
					setListComment(listComment.concat(res.data));
					setPageIndex(pageIndex + 1);
					setLoadMore(!(res.data.length < size));
				}
			});
		} else {
			showAllComment(true)
			setLoadMore(!(listComment.length < size));
		}
	};

	const actionLikePost = () => {
		var data;
		if (isLike) {
			//unlike
			data = {
				id: post.Id,
				action: 1,
				status: 0,
			};
		} else {
			//like
			data = {
				id: post.Id,
				action: 1,
				status: 1,
			};
		}
		if (data.status === 1) {
			setCountLike(countLike + 1);
		} else {
			setCountLike(countLike - 1);
		}
		setLike(data.status === 1);
		API.posts.reactPost(data).then(res => {
			if (res?.code === 200) {

			} else {
				message.error("Đã xảy ra lỗi vui lòng thử lại sau!!!")
				if (data.status === 1) {
					setCountLike(countLike - 1);
				} else {
					setCountLike(countLike + 1);
				}
				setLike(data.status !== 1);
			}
		});
	};

	const insert = (arr, index, newItem) => [
		...arr.slice(0, index),
		newItem,
		...arr.slice(index),
	];

	const handlKeyEnter = (e) => {
		if (e.keyCode == 13 && e.shiftKey)
			return;

		if (e.key === "Enter") {
			createComment()
		}
	}

	const createComment = () => {
		if (comment.length > 0 && !isLoading) {
			var data = {
				content: comment,
				isPost: 0,
				parentId: post.Id,
				isPublic: true,
				employees: [],
				file: [],
				tags: [],
			};
			setLoading(true)
			API.posts.createPost(data).then(res => {
				if (res.code === 200) {
					setListComment(insert(listComment, 0, res.data));
					setComment('');
					setCountComment(countComment + 1);
				}

				setLoading(false)
			}).catch(() => {
				setLoading(false)
			});
		}
	};

	const onEmojiClick = (emojiObject, event) => {
		event.preventDefault();
		setComment(comment + emojiObject.emoji);
	};

	return (
		<div className="list-comment">
			<div className="post-interative">
				<Row>
					<Col span="8">
						<div className="reaction-wrapper" onClick={() => actionLikePost()}>
							<Tooltip placement="topLeft" title={isLike ? "Bỏ thích" : "Thích"}>
								<img
									src={isLike ? LikeActive : Like}
									alt="likeIcon"
								/>
							</Tooltip>
							<p>{countLike} Thích</p>
						</div>
					</Col>
					<Col span="8">
						<div className="comment-wrapper">
							<Tooltip placement="topLeft" title={'Bình luận'}>
								<img src={Comment} alt="commentIcon" />
							</Tooltip>
							<p>{countComment} Bình luận</p>
						</div>
					</Col>
					<Col span="8">
						<div className="share-wrapper">
							<Tooltip placement="topLeft" title={'Chia sẻ'}>
								<img src={Share} alt="shareIcon" title="Chia sẻ" />
							</Tooltip>
							<p>{post.CountShare} Chia sẻ</p>
						</div>
					</Col>
				</Row>
			</div>
			<div className="list-comment">
				{listComment.length > 0 && <p className="title-comment-list">Bình luận</p>}
				{listComment.map((item, index) => (
					(isShowAllComment || index <= 2) && <ItemComment comment={item} key={item.Id} />))}
				{isLoadMore && (listComment.length > 2) ? (
					<div className="item-center">
						<button
							className="btn-load-more"
							onClick={() => loadMoreComment()}
						>
							Xem thêm
						</button>
					</div>
				) : ''}
			</div>
			<div className="comment-input-wrapper">
				<div className="avatar-wrapper">
					<Avatar src={(user.Avatar && user.Avatar !== "") ? getUrlImage(40, 40, user.Avatar) : avatar} size={32} />
				</div>
				<Input
					type="text"
					placeholder="Viết bình luận..."
					className="comment-input"
					value={comment}
					onKeyDown={handlKeyEnter}
					onChange={event => setComment(event.target.value)}
					suffix={
						<>
							<Tooltip placement="topLeft" title={'Biểu tượng cảm xúc'}>
								<SmileOutlined onClick={() => showEmojiPicker(true)} />
							</Tooltip>
							{/* <CameraOutlined /> */}
						</>
					}
				/>
				{/* <Tooltip placement="topLeft" title={'Đăng bình luận'}>
					<img src={sendIcon} alt="send" onClick={() => createComment()} />
				</Tooltip> */}
			</div>
			<Modal
				title={'Emoji'}
				footer={null}
				centered
				width="fit-content"
				visible={isShowEmojiPicker}
				onOk={() => { }}
				onCancel={() => showEmojiPicker(false)}
			>
				<Picker onEmojiClick={(event, emojiObject) => onEmojiClick(emojiObject, event)} />
			</Modal>
		</div>
	);
};
CommentFooter.propTypes = {
	post: PropTypes.object,
};

export default CommentFooter;
