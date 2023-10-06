import { createSelector } from "reselect";

const storeName = "message";
const selectStore = (state) => state.get(storeName, {});

export const getListConversationSelector = () =>
  createSelector(selectStore, (state) => state.get("listMember", []));

  export const getCountChat = () =>
  createSelector(selectStore, (state) => state.get("countChat"));
