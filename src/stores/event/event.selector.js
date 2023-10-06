import { createSelector } from "reselect";

const storeName = "event";
export const selectEventStore = (state) => state.get(storeName, {});

export const selectEvent = () => (state) => state.get("event").event

export const selectLoading = () =>
  createSelector(selectEventStore, (state) => state.get("loading", false));

export const selectEventByTime = (state) => state.get('event').event;