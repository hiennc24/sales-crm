/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux-immutable";
import globalReducer from "./global/global.reducer";
import headerReducer from "../components/header/Header.reducer";
import homeReducer from "../pages/home/Home.reducer";
import companyReducer from "./companies/companies.reducer";
import groupReducer from "../pages/group/Group.reducer";
import settingReducer from "../pages/setting/Setting.reducer";
import postsReducer from "./posts/posts.reducer";
import messageReducer from "../pages/social/components/messages/message.reducer";
import headerMainReducer from "../components/header-main/HeaderMain.reducer";
import uploadFileReducer from "./upload/upload.reducer";
import userProfileReducer from "../pages/user-profile/UserProfile.reducer";
import eventReducer from "./event/event.reducer";

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
  return combineReducers({
    global: globalReducer,
    header: headerReducer,
    home: homeReducer,
    company: companyReducer,
    group: groupReducer,
    setting: settingReducer,
    posts: postsReducer,
    message: messageReducer,
    headerMain: headerMainReducer,
    uploadFile: uploadFileReducer,
    userProfile: userProfileReducer,
    event: eventReducer,
  });
}
