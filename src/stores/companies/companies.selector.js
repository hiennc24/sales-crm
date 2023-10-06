import { createSelector } from "reselect";

const storeName = "company";
const selectStore = (state) => state.getIn([storeName]);

const getCompanyToken = () =>
  createSelector(selectStore, (state) => {
    return state.get("company_token", null);
  });

export { getCompanyToken };
