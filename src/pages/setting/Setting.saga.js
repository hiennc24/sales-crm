import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_SETTING,
  getSettingSuccess,
  getSettingError,
} from "./Setting.action";
import API from "../../services/api";
// import errors from "../../constants/error";

function* getSettingSaga() {
  try {
    // call api
    const response = yield call(API.setting.getSettings);
    yield put(getSettingSuccess(response?.data));
  } catch (e) {
    yield put(getSettingError(e.message));
  }
}

export default function* companySaga() {
  yield takeLatest(GET_SETTING, getSettingSaga);
}
