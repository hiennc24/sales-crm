import { fromJS } from "immutable";

import {
  GET_SETTING,
  GET_SETTING_SUCCESS,
  GET_SETTING_ERROR,
} from "./Setting.action";

const initialState = fromJS({
  settings: null,
  loading: false,
  error: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTING:
      return state
        .set("loading", true)
        .set("error", null)
        .set("settings", null);
    case GET_SETTING_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .set("settings", action.payload);
    case GET_SETTING_ERROR:
      return state
        .set("loading", false)
        .set("error", action.payload)
        .set("companies", null);
    default:
      return state;
  }
};

export default reducer;
