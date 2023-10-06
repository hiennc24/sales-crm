export const PREFIX = '@event';

export const GET_EVENT = `${PREFIX}/GET_EVENT`;
export const GET_EVENT_SUCCESS = `${PREFIX}/GET_EVENT_SUCCESS`;
export const GET_EVENT_ERROR = `${PREFIX}/GET_EVENT_ERROR`;
export const UPDATE_LIKE_STATUS = `${PREFIX}/UPDATE_LIKE_STATUS`;
export const CLEAR_EVENT = `${PREFIX}/CLEAR_EVENT`;
export const EDIT_EVENT = 'EDIT_EVENT';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const GET_EVENT_BY_TIME = `GET_EVENT_BY_TIME`;
export const GET_EVENT_BY_TIME_SUCCESS = `GET_EVENT_BY_TIME_SUCCESS`;
export const CREATE_COMMENT_SUCCESS = `CREATE_EVENT_COMMENT_SUCCESS`;
export const GET_COMMENTS_SUCCESS = `GET_EVENT_COMMENTS_SUCCESS`;
export const CREATE_COMMENT = `CREATE_COMMENT`;
export const EDIT_COMMENT = 'EDIT_COMMENT_EVENT';
export const EDIT_EVENT_COMMENT_SUCCESS = 'EDIT_EVENT_COMMENT_SUCCESS';
export const DELETE_COMMENT_EVENT = 'DELETE_COMMENT_EVENT';
export const DELETE_COMMENT_EVENT_SUCCESS = 'DELETE_COMMENT_EVENT_SUCCESS';
export const getEvent = id => ({
	type: GET_EVENT,
	payload: id,
});

export const getEventSuccess = payload => ({
	type: GET_EVENT_SUCCESS,
	payload,
});

export const getEventByTime = payload => ({
	type: GET_EVENT_BY_TIME,
	payload: payload,
});

export const getEventByTimeSuccess = payload => ({
	type: GET_EVENT_BY_TIME_SUCCESS,
	payload,
});

export const getEventError = payload => ({
	type: GET_EVENT_ERROR,
	payload,
});

export const updateLikeStatus = status => ({
	type: UPDATE_LIKE_STATUS,
	payload: status,
});

export const clearEvent = () => ({
	type: CLEAR_EVENT,
});

export const editEvent = payload => ({
	type: EDIT_EVENT,
	payload,
});

export const editEventSuccess = payload => ({
	type: EDIT_EVENT_SUCCESS,
	payload,
});
export const createEventCommentSuccess = payload => ({
	type: CREATE_COMMENT_SUCCESS,
	payload,
});
export const postCommentEvent = payload => ({
	type: CREATE_COMMENT,
	payload,
});
export const getCommentsSuccess = payload => ({
	type: GET_COMMENTS_SUCCESS,
	payload,
});

export const editEventComment = payload => ({
	type: EDIT_COMMENT,
	payload,
});

export const editEventCommentSuccess = payload => ({
	type: EDIT_EVENT_COMMENT_SUCCESS,
	payload,
});

export const deleteEventComment = payload => ({
	type: DELETE_COMMENT_EVENT,
	payload: payload
});

export const deleteEventCommentSuccess = payload => ({
	type: DELETE_COMMENT_EVENT_SUCCESS,
	payload,
});