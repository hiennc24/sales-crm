import { createSelector } from "reselect";

const storeName = "setting";
const selectStore = (state) => state.get(storeName, {});

export const selectSettings = () =>
  createSelector(selectStore, (state) => state.get("settings", null));

export const selectError = () =>
  createSelector(selectStore, (state) => state.get("error", null));

export const selectLoading = () =>
  createSelector(selectStore, (state) => state.get("loading", null));
