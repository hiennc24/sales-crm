import { fromJS } from "immutable";

import { SAVE_COMPANY_TOKEN, CLEAR_COMPANY_TOKEN } from "./companies.action";

const initialState = fromJS({
  company_token: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_COMPANY_TOKEN:
      console.log("SAVE_COMPANY_TOKEN", action);
      return state.set("company_token", action.payload.token);
    case CLEAR_COMPANY_TOKEN:
      return state.set("company_token", null);
    default:
      return state;
  }
};

export default reducer;
