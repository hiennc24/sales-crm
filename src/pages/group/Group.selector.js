import { createSelector } from "reselect";

const storeName = "group";
const selectStore = (state) => state.get(storeName, {});

export const selectListGroup = () =>
    createSelector(selectStore, (state) => state.get("groups", []));

export const selectError = () =>
    createSelector(selectStore, (state) => state.get("error", null));

export const selectLoading = () =>
    createSelector(selectStore, (state) => state.get("loading", null));


export const selectGroupDetail = () =>
    createSelector(selectStore, (state) => state.get("groupDetail", {}));

export const selectListUserRequestGroup = () =>
    createSelector(selectStore, (state) => state.get("listUserRequestGroup", []));

export const selectListUserInviteGroup = () =>
    createSelector(selectStore, (state) => state.get("listUserInviteGroup", []));

export const selectIsLoadMore = () =>
    createSelector(selectStore, (state) => state.get("isLoadMore", []));
