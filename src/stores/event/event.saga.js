import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  GET_EVENT,
  GET_EVENT_BY_TIME,
  getEventSuccess,
  getEventByTimeSuccess,
  getEventError,
  EDIT_EVENT,
  editEventSuccess,
  createEventCommentSuccess,
  CREATE_COMMENT,
  EDIT_COMMENT,
  editEventCommentSuccess,
  DELETE_COMMENT_EVENT,
  deleteEventCommentSuccess
} from "./event.action";
import API from "../../services/api";
import errors from "../../constants/error";
import { renderArray } from "../posts/posts.saga"

// import { PROCESS_SUCCESS } from "../../constants/strings";

function* getEventSaga({ payload }) {
  try {
    // call api
    let response = yield call(API.posts.getPostEvent, payload);
    if (response?.code !== 200) {
      yield put(getEventError(errors[response.message]));
    } else {

      // const userInfo = yield select((state) =>
      //   state.get("userProfile").get("profile")
      // );
      // const comments = yield call(API.posts.getComment, +response.data.Id, 1, 10 );
      // response.data.comments = comments.data.reverse()

      // response.data.IsLike =
      //   (response?.data?.LikeDetails || []).findIndex((likedUser) => {
      //     return +likedUser.Id === +userInfo.Id;
      //   }) >= 0;
      yield put(getEventSuccess(response?.data));
    }
  } catch (e) {
    yield put(getEventError(errors[e]));
  }
}

function* getEventByTimeSaga({ payload }) {
  try {
    // call api
    const response = yield call(API.event.getListEventByTime, payload);
    if (response?.code !== 200) {
      yield put(getEventError(errors[response.message]));
    } else {
      const userInfo = yield select((state) =>
        state.get("userProfile").get("profile")
      );

      response.data.IsLike =
        (response?.data?.LikeDetails || []).findIndex((likedUser) => {
          return +likedUser.Id === +userInfo.Id;
        }) >= 0;
      yield put(getEventByTimeSuccess(response?.data));
    }
  } catch (e) {
    yield put(getEventError(errors[e]));
  }
}

function* postCommentEvent(data) {
  try {
    const newPost = yield renderArray(data.payload);
    const response = yield call(API.posts.createPost, newPost);
    if (!data.payload.isPost) {
      yield put(
        createEventCommentSuccess({
          ...response?.data,
          parentId: data.payload.parentId,
        })
      );
    } else {
      if (!data.payload.publicDate) {
        yield put(createEventCommentSuccess(response?.data));
      }
    }

  } catch (error) {
    console.log(error);
  }
}

function* editEventSaga({ payload }) {
  try {
    const newEvent = yield renderArray(payload.data);
    newEvent.docFile = newEvent.docFileIds;

    const response = yield call(API.posts.editEvent, { data: newEvent, id: payload.id });
    // const userInfo = yield select((state) =>
    //   state.get("userProfile").get("profile")
    // );
    // // const comments = yield call(API.posts.getComment, +response.data.Id, 1, 10 );
    // // response.data.comments = comments.data.reverse()

    // // response.data.IsLike =
    // //   (response?.data?.LikeDetails || []).findIndex((likedUser) => {
    // //     return +likedUser.Id === +userInfo.Id;
    // //   }) >= 0;
    yield put(editEventSuccess(response.data));
  } catch (error) { }
}

function* editCommentSaga(data) {
  try {
    const newPost = yield renderArray(data.payload);
    const response = yield call(API.posts.editPost, newPost);
    yield put(editEventCommentSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}
function* deleteCommentSaga(data) {
  try {
    let parentList = [];
    if (data.payload.parentList) {
      parentList = [...data.payload.parentList];
      delete data.payload.parentList
    }
    yield call(API.posts.deletePost, data.payload.id);
    yield put(deleteEventCommentSuccess({ ...data.payload, parentList }));
  } catch (error) { }
}

export default function* rootSaga() {
  yield takeLatest(GET_EVENT, getEventSaga);
  yield takeLatest(GET_EVENT_BY_TIME, getEventByTimeSaga);
  yield takeLatest(EDIT_EVENT, editEventSaga);
  yield takeLatest(CREATE_COMMENT, postCommentEvent);
  yield takeLatest(EDIT_COMMENT, editCommentSaga);
  yield takeLatest(DELETE_COMMENT_EVENT, deleteCommentSaga);
}
