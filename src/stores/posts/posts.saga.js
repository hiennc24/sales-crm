/* eslint-disable no-unused-vars */
import {
	call,
	put,
	takeLatest,
	select,
	takeEvery,
} from '@redux-saga/core/effects';
import API from '../../services/api';
import { clearFiles } from '../upload/upload.action';
import * as moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom';
import {
	createPostSuccess,
	CREATE_POST,
	CREATE_NEW_COMMENT,
	EDIT_POST,
	getListPostsSuccess,
	GET_LIST_POSTS,
	GET_LIST_HOT_POSTS,
	GET_LIST_ATTENTION_POSTS,
	GET_LIST_CONSIDERED_POSTS,
	pinPostSuccess,
	PIN_POST,
	reactPostSuccess,
	REACT_POST,
	editPostSuccess,
	editCommentSuccess,
	createCommentSuccess,
	CREATE_EVENT,
	GET_POST,
	getPostSuccess,
	CREATE_VOTE,
	UPDATE_VOTE,
	VOTE_ANSWER,
	DELETE_POST,
	deletePostSuccess,
	deleteCommentSuccess,
	ADD_ANSWER,
	REMOVE_ANSWER,
	addAnswerSuccess,
	removeAnswerSuccess,
	getCommentsSuccess,
	updateVoteSuccess,
	getListPostsHotSuccess,
	getListPostsAttentionSuccess,
	getListPostsConsideredSuccess,
	GET_COMMENTS,
	DELETE_COMMENT,
	EDIT_COMMENT,
	voteAnswerSuccess,
	GET_PIN_POST,
	updatePriorityProcessSuccess,
	updatePriorityStatusSuccess,
	UPDATE_PRIORITY_PROCESS,
	clearPostBeforeSubmit
} from './posts.action';

import {
	createEventCommentSuccess,
	editEventCommentSuccess
} from "../event/event.action";

function* getPinPost(data) {
	try {
		let response = {};
		if (!data.payload.inProfile) {
			response = yield call(API.posts.getListPosts, data.payload);
		} else {
			const payload = JSON.parse(JSON.stringify(data.payload));
			delete payload.inProfile;
			const userInfo = yield select(state =>
				state.get('userProfile').get('profile')
			);
			payload.userId = userInfo.Id;
			response = yield call(API.posts.getListPostInUserProfile, payload);
		}
		const listPostAfterAddComment = [];
		for (const post of response.data) {
			const comments = yield call(API.posts.getComment, post.Id, 1, 2);
			listPostAfterAddComment.push({
				...post, comments: comments.data.sort((a, b) => {
					if (moment(a.CreatedAt).isBefore(b.CreatedAt)) {
						return -1;
					}
					return 1;
				})
			});
		}

		const userInfo = yield select(state =>
			state.get('userProfile').get('profile')
		);

		listPostAfterAddComment.forEach(item => {
			item.IsLike =
				item?.LikeDetails?.findIndex(
					likedUser => +likedUser.Id === +userInfo.Id
				) >= 0;
		});

		yield put(
			getListPostsSuccess({
				posts: [
					...listPostAfterAddComment.filter(post => post.IsPin),
					...listPostAfterAddComment.filter(post => !post.IsPin),
				]
			})
		);


	} catch (error) {
		// console.log(error);
	}
}

function* getListPostsSaga(data) {
	try {
		let response = {};
		if (!data.payload.inProfile) {
			if (!data.payload.loaded) {
				response = yield call(API.posts.getListPosts, data.payload);
			} else {
				response.data = [];
			}
		} else {
			const payload = JSON.parse(JSON.stringify(data.payload));
			delete payload.inProfile;
			const userInfo = yield select(state =>
				state.get('userProfile').get('profile')
			);
			console.log('payload.userId', payload.userId)
			if (!payload.userId) payload.userId = userInfo.Id;
			response = yield call(API.posts.getListPostInUserProfile, payload);
		}
		const listPostAfterAddComment = [];
		for (const post of response.data) {
			const comments = yield call(API.posts.getComment, post.Id, 1, 2);
			listPostAfterAddComment.push({
				...post, comments: comments.data.map(rs => {
					if (!rs.Comments) {
						return { ...rs, Comments: [] }
					}
					return rs;
				}).sort((a, b) => {
					if (moment(a.CreatedAt).isBefore(b.CreatedAt)) {
						return -1;
					}
					return 1;
				})
			});
		}

		const userInfo = yield select(state =>
			state.get('userProfile').get('profile')
		);

		listPostAfterAddComment.forEach(item => {
			item.IsLike =
				item?.LikeDetails?.findIndex(
					likedUser => +likedUser.Id === +userInfo.Id
				) >= 0;
		});

		yield put(
			getListPostsSuccess({
				posts: [
					...listPostAfterAddComment.filter(post => post.IsPin),
					...listPostAfterAddComment.filter(post => !post.IsPin),
				],
				type: data.payload.type,
				loaded: data.payload.loaded
			})
		);


	} catch (error) {
		console.log(error);
	}
}

function* getListPostsHotSaga(data) {
	try {
		let response = {};
		if (!data.payload.inProfile) {
			response = yield call(API.posts.getListPostsPriority, data.payload);
		} else {
			const payload = JSON.parse(JSON.stringify(data.payload));
			response = yield call(API.posts.getListPostInUserProfile, payload);
		}
		const listPostAfterAddComment = [];
		for (const post of response.data) {
			listPostAfterAddComment.push({ ...post });
		}
		yield put(
			getListPostsHotSuccess(listPostAfterAddComment)
		);
	} catch (error) {
		console.log(error);
	}
}

function* getListPostsAttentionSaga(data) {
	try {
		let response = {};
		if (!data.payload.inProfile) {
			response = yield call(API.posts.getListPostsPriority, data.payload);
		} else {
			const payload = JSON.parse(JSON.stringify(data.payload));
			delete payload.inProfile;
			const userInfo = yield select(state =>
				state.get('userProfile').get('profile')
			);
			payload.userId = userInfo.Id;
			response = yield call(API.posts.getListPostInUserProfile, payload);
		}
		const listPostAfterAddComment = [];
		for (const post of response.data) {
			const comments = yield call(API.posts.getComment, post.Id, 1, 10);
			listPostAfterAddComment.push({ ...post, comments: comments.data });
		}

		yield put(
			getListPostsAttentionSuccess(listPostAfterAddComment)
		);

	} catch (error) {
		console.log(error);
	}
}

function* getListPostsConsideredSaga(data) {
	try {
		let response = {};
		if (!data.payload.inProfile) {
			response = yield call(API.posts.getListPostsPriority, data.payload);
		} else {
			const payload = JSON.parse(JSON.stringify(data.payload));
			delete payload.inProfile;
			const userInfo = yield select(state =>
				state.get('userProfile').get('profile')
			);
			payload.userId = userInfo.Id;
			response = yield call(API.posts.getListPostInUserProfile, payload);
		}
		const listPostAfterAddComment = [];
		for (const post of response.data) {
			const comments = yield call(API.posts.getComment, post.Id, 1, 10);
			listPostAfterAddComment.push({ ...post, comments: comments.data });
		}

		yield put(
			getListPostsConsideredSuccess(listPostAfterAddComment)
		);

	} catch (error) {
		console.log(error);
	}
}

function* getFilesId(files, type) {
	const result = [];
	for (const file of files) {
		const formData = new FormData();
		formData.append('files', file);
		const res = yield call(API.uploadFile.uploadFile, formData, type);
		// yield call(API.user.saveUserImage, {
		// 	code: type === 'image' ? res.imageId : res.docsId,
		// 	type: type === 'image' ? 1 : 3,
		// 	name: file.name,
		// });
		result.push({
			Files: type === 'image' ? res.imageId : type === 'video' ? res.videoId : res.docsId,
			Type: type === 'image' ? 1 : type === 'video' ? 2 : 3,
			Name: file.name,
		});
	}
	return result;
}
function* getFilesIdArray(imagesPreview, filesPreview, docFilesPreview = null) {
	const images = imagesPreview?.filter(r => r.type.includes('image'))
	const videos = imagesPreview?.filter(r => r.type.includes('video'))
	let imagesId = []
	if (images) {
		imagesId = yield getFilesId(images, 'image');
	}
	let videosId = []
	if (videos) {
		videosId = yield getFilesId(videos, 'video')
	}
	let filesId = []
	if (filesPreview) {
		filesId = yield getFilesId(filesPreview, 'document');
	}
	let docFilesId = []
	if (docFilesPreview) {
		docFilesId = yield getFilesId(docFilesPreview, 'document');
	}

	return [...imagesId, ...videosId, ...filesId, ...docFilesId];
}

export function* renderArray(payload) {
	let files = [];
	if (payload.imagesPreview || payload.filesPreview || payload.docFilesPreview) {
		files = yield getFilesIdArray(payload.imagesPreview, payload.filesPreview);
	}

	const newPost = JSON.parse(JSON.stringify(payload));
	delete newPost.filesPreview;
	delete newPost.imagesPreview;
	newPost.file = [...payload?.file, ...files];

	if (payload.imagesPreview) {
		// newPost.image = files[0]?.Files ?? null;
		let oldFiles = payload?.file ? [...payload?.file] : []
		newPost.cover = oldFiles.concat([...files]).map(item => item.Files ?? item);
		newPost.image = newPost.cover[0] ?? null;
	}

	if (payload.docFilesPreview) {
		let docFiles = []
		const docFileInit = payload.docFile || [];
		docFiles = yield getFilesIdArray(null, null, payload.docFilesPreview);
		newPost.docFile = [...docFileInit, ...docFiles?.map(f => f.Name)];
		newPost.docFileIds = [...docFileInit, ...docFiles?.map(f => f.Files)];
		delete newPost.docFilesPreview
	}


	return newPost;
}

function* createPostSaga(data) {
	try {

		let parentList = [];
		if (data.payload.parentList) {
			parentList = [...data.payload.parentList];
			delete data.payload.parentList
		}

		const isEvent = data.payload.isEvent;
		delete data.payload.isEvent;

		const newPost = yield renderArray(data.payload);
		const response = yield call(API.posts.createPost, newPost);
		if (!data.payload.isPost) {
			if (isEvent) {
				yield put(
					createEventCommentSuccess({
						...response?.data,
						parentId: data.payload.parentId,
						parentList
					})
				);
			}
			else {
				yield put(
					createCommentSuccess({
						...response?.data,
						parentId: data.payload.parentId,
						parentList
					})
				);
			}
		} else {
			if (!data.payload.publicDate) {
				yield getListPostsHotSaga({
					payload: {
						groupId: 0,
						type: 1,
						priority: response?.data.Priority,
						index: 1,
						pageSize: 5,
					}
				})
				yield put(createPostSuccess(response?.data));

			}
		}

		yield put(clearFiles());
	} catch (error) {
		console.log(error);
	}
}

function* reactPost(data) {
	try {
		yield put(reactPostSuccess(data.payload));
		yield call(API.posts.reactPost, data.payload);
	} catch (error) {
		console.log(error);
	}
}

function* pinPost(data) {
	try {
		yield put(pinPostSuccess(data.payload));
		yield call(API.posts.pinPost, data.payload);
	} catch (error) {
		console.log(error);
	}
}

function* editPostSaga(data) {
	try {
		const newPost = yield renderArray(data.payload);

		const response = yield call(API.posts.editPost, newPost);
		const dataRes = { Handled: data.payload.Handled, ...response.data }
		yield put(editPostSuccess(dataRes));
		yield put(clearFiles());
	} catch (error) {
		console.log(error);
	}
}

function* createCommentSaga(data) {
	try {

		let parentList = [];
		if (data.payload.parentList) {
			parentList = [...data.payload.parentList];
			delete data.payload.parentList
		}

		const isEvent = data.payload.isEvent;
		delete data.payload.isEvent;

		const newPost = yield renderArray(data.payload);
		const response = yield call(API.posts.createComment, newPost);
		if (!data.payload.isPost) {
			if (isEvent) {
				yield put(
					createEventCommentSuccess({
						...response?.data,
						parentId: data.payload.parentId,
						parentList
					})
				);
			}
			else {
				yield put(
					createCommentSuccess({
						...response?.data,
						parentId: data.payload.parentId,
						parentList
					})
				);
			}
		} else {
			if (!data.payload.publicDate) {
				yield getListPostsHotSaga({
					payload: {
						groupId: 0,
						type: 1,
						priority: response?.data.Priority,
						index: 1,
						pageSize: 5,
					}
				})
				yield put(createPostSuccess(response?.data));

			}
		}

		yield put(clearFiles());
	} catch (error) {
		console.log(error);
	}
}

function* editCommentSaga(data) {
	try {
		let parentList = [];
		if (data.payload.parentList) {
			parentList = [...data.payload.parentList];
			delete data.payload.parentList
		}

		const isEvent = data.payload.isEvent;
		delete data.payload.isEvent;

		const newPost = yield renderArray(data.payload);
		const response = yield call(API.posts.editPost, newPost);
		if (!isEvent) {
			yield put(editCommentSuccess({ ...response.data, parentList }));
		}
		else {
			yield put(editEventCommentSuccess({ ...response.data, parentList }));
		}
		yield put(clearFiles());
	} catch (error) {
		console.log(error);
	}
}

function* createEventSaga(data) {
	try {
		const newEvent = yield renderArray(data.payload);
		newEvent.docFile = newEvent.docFileIds;

		const response = yield call(API.posts.createEvent, newEvent);

		yield put(createPostSuccess(response?.data));
		yield put(clearFiles());
	} catch (error) {
		console.log(error);
	}
}

function* getPostSaga(data) {
	try {
		const response = yield call(API.posts.getPost, data.payload);
		const comment = yield call(API.posts.getComment, data.payload, 1, 10);
		const newPost = {
			...response.data, comments: comment.data.map(rs => {
				if (!rs.Comments) {
					return { ...rs, Comments: [] }
				}
				return rs;
			}).reverse()
		};
		yield put(getPostSuccess(newPost));
	} catch (error) { }
}

function* createVoteSaga(data) {
	try {
		const newVote = yield renderArray(data.payload);
		const response = yield call(API.posts.createVote, newVote);
		// yield put(clearPostBeforeSubmit());
		yield put(createPostSuccess(response?.data));
		yield put(clearFiles());
	} catch (error) {
		console.log(error);
	}
}

function* updateVoteSaga(data) {
	try {
		const response = yield call(API.posts.updateVote, data.payload);
		yield put(updateVoteSuccess(response.data));
	} catch (error) { }
}

function* voteAnswerSaga(data) {
	try {
		yield call(API.posts.voteAnswer, data.payload);
		const userInfo = yield select(state =>
			state.get('userProfile').get('profile')
		);
		yield put(voteAnswerSuccess({ data: data.payload, userInfo: userInfo }));

	} catch (error) { }
}

function* deletePostSaga(data) {
	try {
		yield call(API.posts.deletePost, data.payload);
		yield put(deletePostSuccess(data.payload));
	} catch (error) { }
}

function* deleteCommentSaga(data) {
	try {
		let parentList = [];
		if (data.payload.parentList) {
			parentList = [...data.payload.parentList];
			delete data.payload.parentList
		}
		yield call(API.posts.deletePost, data.payload.id);
		yield put(deleteCommentSuccess({ ...data.payload, parentList }));
	} catch (error) { }
}

function* addAnswer(data) {
	try {
		const response = yield call(API.posts.addAnswer, data.payload);
		yield put(addAnswerSuccess(response.data));
	} catch (error) { }
}

function* removeAnswer(data) {
	try {
		const response = yield call(API.posts.removeAnswer, data.payload.data);
		yield put(removeAnswerSuccess(data));
	} catch (error) { }
}

function* getComments(data) {
	try {
		const response = yield call(API.posts.getComment, data.payload)
		yield put(getCommentsSuccess(response.data));
	} catch (error) { }
}
function* updatePriorityProcessStatus(data) {
	try {
		const response = yield call(API.posts.updateStatusTypePriority, data.payload)
		yield put(updatePriorityProcessSuccess(data));
	} catch (error) { }
}

export default function* agentPosts() {
	yield takeLatest(GET_PIN_POST, getPinPost);
	yield takeLatest(GET_LIST_POSTS, getListPostsSaga);
	yield takeLatest(GET_LIST_HOT_POSTS, getListPostsHotSaga);
	yield takeLatest(GET_LIST_ATTENTION_POSTS, getListPostsAttentionSaga);
	yield takeLatest(GET_LIST_CONSIDERED_POSTS, getListPostsConsideredSaga);
	yield takeLatest(CREATE_POST, createPostSaga);
	yield takeLatest(CREATE_NEW_COMMENT, createCommentSaga);
	yield takeLatest(REACT_POST, reactPost);
	yield takeLatest(PIN_POST, pinPost);
	yield takeLatest(EDIT_POST, editPostSaga);
	yield takeLatest(EDIT_COMMENT, editCommentSaga);
	yield takeLatest(CREATE_EVENT, createEventSaga);
	yield takeLatest(CREATE_VOTE, createVoteSaga);
	yield takeLatest(GET_POST, getPostSaga);
	yield takeLatest(UPDATE_VOTE, updateVoteSaga);
	yield takeEvery(VOTE_ANSWER, voteAnswerSaga);
	yield takeLatest(DELETE_POST, deletePostSaga);
	yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
	yield takeLatest(ADD_ANSWER, addAnswer);
	yield takeEvery(REMOVE_ANSWER, removeAnswer);
	yield takeEvery(GET_COMMENTS, getComments);
	yield takeEvery(UPDATE_PRIORITY_PROCESS, updatePriorityProcessStatus);

}
