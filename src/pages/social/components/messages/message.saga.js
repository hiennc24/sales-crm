import { takeLatest, call, put } from "redux-saga/effects";
import API from "../../../../services/api";
import {
  createChatError,
  createChatSuccess,
  getListConversationError,
  getListConversationSuccess,
  updateChatError,
  updateChatSuccess,
  updateNameGroupChatSuccess,
  viewLastMemberChatError,
  viewLastMemberChatSuccess,
} from "./message.action";
import {
  CREATE_CHAT,
  GET_LIST_CONVERSATION,
  UPDATE_CHAT,
  UPDATE_NAME_GROUP_CHAT,
  VIEW_LAST_MEMBER,
} from "./message.constant";

function* createChatSaga() {
  try {
    // call api
    const response = yield call(API.chat.createChat);
    yield put(createChatSuccess(response?.data || []));
  } catch (e) {
    yield put(createChatError(e.message));
  }
}

function* createSingleConversationSage() {
  try {
    // call api
    const response = yield call(API.chat.createSingleConversation);
    yield put(createChatSuccess(response?.data || []));
  } catch (e) {
    yield put(createChatError(e.message));
  }
}

function* updateChatSaga(data) {
  try {
    // call api
    const response = yield call(API.chat.updateChat, data);
    if (response?.message === "DUPLICATE_SLUG") {
      yield put(updateChatError(response.message));
    } else {
      if (response?.code === 200) {
        yield put(updateChatSuccess(response.data));
      }
    }
  } catch (e) {
    yield put(updateChatError(e.message));
  }
}

function* updateNameGroupChat(data) {
  try {
    console.log(222222222222, data)
    const response = yield call(API.chat.updateNameGroupChat, {name: data.payload.name}, data.payload.id);
    console.log('saga ne', response)
    if (response?.message === "DUPLICATE_SLUG") {
      yield put(updateNameGroupChat(data.payload.name));
    } else {
      if (response?.code === 200) {
        yield put(updateNameGroupChatSuccess(data.payload.name));
      }
    }
  } catch (e) {
    yield put(updateChatError('abc'))
  }
}

function* viewLastMemberSaga(data) {
  try {
    // call api
    const response = yield call(API.chat.viewLastMemberChat, data);
    if (response?.message === "DUPLICATE_SLUG") {
      yield put(viewLastMemberChatError(response.message));
    } else {
      if (response?.code === 200) {
        yield put(viewLastMemberChatSuccess(response.data));
      }
    }
  } catch (e) {
    yield put(viewLastMemberChatError(e.message));
  }
}

function* getListConversation() {
  try {
    // call api
    const response = yield call(API.chat.getListConversation);
    yield put(getListConversationSuccess(response?.data || []));
  } catch (e) {
    yield put(getListConversationError(e.message));
  }
}

export default function* chatWatcher() {
  yield takeLatest(CREATE_CHAT, createChatSaga);
  yield takeLatest(UPDATE_CHAT, updateChatSaga);
  yield takeLatest(VIEW_LAST_MEMBER, viewLastMemberSaga);
  yield takeLatest(GET_LIST_CONVERSATION, getListConversation);
  yield takeLatest(UPDATE_NAME_GROUP_CHAT, updateNameGroupChat)
}
