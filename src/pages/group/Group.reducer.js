import { fromJS } from 'immutable'

import {
    GET_LIST_GROUP,
    // GET_LIST_GROUP_ERROR,
    GET_LIST_GROUP_SUCCESS,
    RELOAD_LIST_GROUP,
    CREATE_GROUP,
    GET_GROUP_DETAIL,
    GET_GROUP_DETAIL_SUCCESS,
    // CREATE_GROUP_SUCCESS,
    // CREATE_GROUP_ERROR

    SAVE_LIST_USER_REQUEST_GROUP,
    SAVE_LIST_USER_INVITE_GROUP,
    CLEAR_LIST_GROUP,
} from './Group.action'

const initialState = fromJS({
    groups: [],
    loading: false,
    error: null,
    listUserRequestGroup: [],
    listUserInviteGroup: [],
    isLoadMore: true,
});

const reducer = (state = initialState, action) => {
    let listGroups;
    switch (action.type) {
        case GET_LIST_GROUP:
            return state.set("loading", true).set("error", null).set("companies", []);
        case GET_LIST_GROUP_SUCCESS:
            return state
                .set("loading", false)
                .set("error", null)
                .set("groups", [...state.get('groups'), ...action.payload])
                .set('isLoadMoreImage', action.payload.length === 12);
        case RELOAD_LIST_GROUP:
            // console.log('reload', action.payload)
            return state
                .set("loading", false)
                .set("error", null)
                .set("groups", [...action.payload])
                .set('isLoadMoreImage', action.payload.length === 12);
        case CREATE_GROUP:
            return state.set("loading", true).set("error", null);
        case GET_GROUP_DETAIL:
            return state;
        case GET_GROUP_DETAIL_SUCCESS:
            return state.set("groupDetail", action.payload);
        case SAVE_LIST_USER_REQUEST_GROUP:
            return state.set("listUserRequestGroup", action.payload);
        case SAVE_LIST_USER_INVITE_GROUP:
            return state.set("listUserInviteGroup", action.payload);
        case CLEAR_LIST_GROUP: {
            return state.set('groups', []);
        }
        default:
            return state;
    }
}
export default reducer;