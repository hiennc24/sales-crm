import { all } from "redux-saga/effects";
import headerSaga from "../components/header/Header.saga";
import globalSaga from "../stores/global/global.saga";
import homeSaga from "../pages/home/Home.saga";
import groupSaga from "../pages/group/Group.saga";
import settingSaga from "../pages/setting/Setting.saga";
import getUserProfileWathcer from "../components/header-main/HeaderMain.saga";
import postsSaga from "../stores/posts/posts.saga";
import uploadFileSaga from "../stores/upload/upload.saga";
import chatWatcher from "../pages/social/components/messages/message.saga";
import userProfileSaga from "../pages/user-profile/UserProfile.saga";
import eventSaga from "../stores/event/event.saga";

export default function* rootSaga() {
  yield all([
    headerSaga(),
    globalSaga(),
    homeSaga(),
    groupSaga(),
    settingSaga(),
    getUserProfileWathcer(),
    postsSaga(),
    uploadFileSaga(),
    chatWatcher(),
    userProfileSaga(),
    eventSaga(),
  ]);
}
