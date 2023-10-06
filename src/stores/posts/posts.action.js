export const GET_LIST_POSTS = 'GET_LIST_POSTS';
export const GET_LIST_POSTS_SUCCESS = 'GET_LIST_POSTS_SUCCESS';
export const GET_LIST_HOT_POSTS = 'GET_LIST_HOT_POSTS';
export const GET_LIST_HOT_POSTS_SUCCESS = 'GET_LIST_HOT_POSTS_SUCCESS';
export const GET_LIST_ATTENTION_POSTS = 'GET_LIST_ATTENTION_POSTS';
export const GET_LIST_ATTENTION_POSTS_SUCCESS = 'GET_LIST_ATTENTION_POSTS_SUCCESS';
export const GET_LIST_CONSIDERED_POSTS = 'GET_LIST_CONSIDERED_POSTS';
export const GET_LIST_CONSIDERED_POSTS_SUCCESS = 'GET_LIST_CONSIDERED_POSTS_SUCCESS';
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const PIN_POST = 'PIN_POST';
export const PIN_POST_SUCCESS = 'PIN_POST_SUCCESS';
export const REACT_POST = 'REACT_POST';
export const REACT_POST_SUCCESS = 'REACT_POST_SUCCESS';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const GET_POST = 'GET_POST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const CREATE_NEW_COMMENT = 'CREATE_NEW_COMMENT';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_VOTE = 'CREATE_VOTE';
export const CREATE_VOTE_SUCCESS = 'CREATE_VOTE_SUCCESS';
export const UPDATE_VOTE = 'UPDATE_VOTE';
export const UPDATE_VOTE_SUCCESS = 'UPDATE_VOTE_SUCCESS';
export const CLEAR_DATA = 'CLEAR_DATA';
export const CLEAR_PRIORITY_DATA = 'CLEAR_PRIORITY_DATA';
export const VOTE_ANSWER = 'VOTE_ANSWER';
export const VOTE_ANSWER_SUCCESS = 'VOTE_ANSWER_SUCCESS';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_ANSWER_SUCCESS = 'ADD_ANSWER_SUCCESS';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';
export const REMOVE_ANSWER_SUCCESS = 'REMOVE_ANSWER_SUCCESS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const GET_PIN_POST = 'GET_PIN_POST';
export const UPDATE_PRIORITY_PROCESS = 'UPDATE_PRIORITY_PROCESS';
export const UPDATE_PRIORITY_PROCESS_SUCCESS = 'UPDATE_PRIORITY_PROCESS_SUCCESS';
export const UPDATE_PRIORITY_STATUS = 'UPDATE_PRIORITY_STATUS';
export const UPDATE_PRIORITY_STATUS_SUCCESS = 'UPDATE_PRIORITY_STATUS_SUCCESS';
export const DELETE_POST_BEFORE_SUBMIT = 'DELETE_POST_BEFORE_SUBMIT'

export const updatePriorityProcess = payload => {
	return {
		type: UPDATE_PRIORITY_PROCESS,
		payload,
	};
};

export const updatePriorityProcessSuccess = payload => {
	return {
		type: UPDATE_PRIORITY_PROCESS_SUCCESS,
		payload,
	};
};
export const updatePriorityStatus = payload => {
	return {
		type: UPDATE_PRIORITY_STATUS,
		payload,
	};
};
export const updatePriorityStatusSuccess = payload => {
	return {
		type: UPDATE_PRIORITY_STATUS_SUCCESS,
		payload,
	};
};



export const getPinPost = payload => {
	return {
		type: GET_PIN_POST,
		payload,
	};
};

export const getListPosts = payload => {
	return {
		type: GET_LIST_POSTS,
		payload,
	};
};

export const getListPostsSuccess = payload => ({
	type: GET_LIST_POSTS_SUCCESS,
	payload,
});

export const getListHotPosts = payload => {
	return {
		type: GET_LIST_HOT_POSTS,
		payload,
	};
};

export const getListPostsHotSuccess = payload => ({
	type: GET_LIST_HOT_POSTS_SUCCESS,
	payload,
});

export const getListAttentionPosts = payload => {
	return {
		type: GET_LIST_ATTENTION_POSTS,
		payload,
	};
};

export const getListPostsAttentionSuccess = payload => ({
	type: GET_LIST_ATTENTION_POSTS_SUCCESS,
	payload,
});

export const getListConsideredPosts = payload => {
	return {
		type: GET_LIST_CONSIDERED_POSTS,
		payload,
	};
};

export const getListPostsConsideredSuccess = payload => ({
	type: GET_LIST_CONSIDERED_POSTS_SUCCESS,
	payload,
});

export const createPost = payload => ({
	type: CREATE_POST,
	payload,
});

export const createPostSuccess = payload => ({
	type: CREATE_POST_SUCCESS,
	payload,
});

export const pinPost = payload => ({
	type: PIN_POST,
	payload,
});

export const pinPostSuccess = payload => ({
	type: PIN_POST_SUCCESS,
	payload,
});

export const reactPost = payload => {
	return {
		type: REACT_POST,
		payload,
	};
};

export const reactPostSuccess = payload => ({
	type: REACT_POST_SUCCESS,
	payload,
});

export const editPost = payload => ({
	type: EDIT_POST,
	payload,
});

export const editPostSuccess = payload => ({
	type: EDIT_POST_SUCCESS,
	payload,
});

export const editComment = payload => ({
	type: EDIT_COMMENT,
	payload,
});

export const editCommentSuccess = payload => ({
	type: EDIT_COMMENT_SUCCESS,
	payload,
});

export const getPost = id => ({
	type: GET_POST,
	payload: id,
});

export const getPostSuccess = payload => ({
	type: GET_POST_SUCCESS,
	payload,
});

export const createComment = payload => ({
	type: CREATE_NEW_COMMENT,
	payload,
});

export const createCommentSuccess = payload => ({
	type: CREATE_COMMENT_SUCCESS,
	payload,
});

export const createEvent = payload => ({
	type: CREATE_EVENT,
	payload,
});

export const createEventSuccess = payload => ({
	type: CREATE_EVENT_SUCCESS,
	payload,
});

export const createVote = payload => {
	return {
		type: CREATE_VOTE,
		payload,
	};
};

export const createVoteSuccess = payload => ({
	type: CREATE_VOTE_SUCCESS,
	payload,
});

export const updateVote = payload => ({
	type: UPDATE_VOTE,
	payload,
});

export const updateVoteSuccess = payload => ({
	type: UPDATE_VOTE_SUCCESS,
	payload,
});

export const clearData = () => ({
	type: CLEAR_DATA,
});

export const clearPriorityData = () => ({
	type: CLEAR_PRIORITY_DATA,
});

export const voteAnswer = payload => ({
	type: VOTE_ANSWER,
	payload,
});

export const voteAnswerSuccess = payload => ({
	type: VOTE_ANSWER_SUCCESS,
	payload,
});

export const deletePost = id => ({
	type: DELETE_POST,
	payload: id,
});

export const deletePostSuccess = payload => ({
	type: DELETE_POST_SUCCESS,
	payload,
});

export const deleteEventSuccess = payload => ({
	type: DELETE_EVENT_SUCCESS,
	payload,
});

export const deleteComment = payload => ({
	type: DELETE_COMMENT,
	payload: payload
});

export const deleteCommentSuccess = payload => ({
	type: DELETE_COMMENT_SUCCESS,
	payload,
});

export const getCommentsSuccess = payload => ({
	type: GET_COMMENTS_SUCCESS,
	payload,
});

export const addAnswer = payload => ({
	type: ADD_ANSWER,
	payload,
});

export const addAnswerSuccess = payload => ({
	type: ADD_ANSWER_SUCCESS,
	payload,
});

export const removeAnswer = payload => ({
	type: REMOVE_ANSWER,
	payload,
});
export const removeAnswerSuccess = payload => ({
	type: REMOVE_ANSWER_SUCCESS,
	payload,
});

export const clearPostBeforeSubmit = payload => ({
	type: DELETE_POST_BEFORE_SUBMIT,
	payload
})