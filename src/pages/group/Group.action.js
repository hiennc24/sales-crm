const path = 'pages/Group/';

export const GET_LIST_GROUP = `${path}GET_LIST_GROUP`;
export const GET_LIST_GROUP_SUCCESS = `${path}GET_LIST_GROUP_SUCCESS`;
export const GET_LIST_GROUP_ERROR = `${path}GET_LIST_GROUP_ERROR`;
export const RELOAD_LIST_GROUP = `${path}RELOAD_LIST_GROUP`;
export const CREATE_GROUP = `${path}CREATE_GROUP`;
export const CREATE_GROUP_ERROR = `${path}CREATE_GROUP_ERROR`;
export const CREATE_GROUP_SUCCESS = `${path}CREATE_GROUP_SUCCESS`;

export const GET_GROUP_DETAIL = `${path}GET_GROUP_DETAIL`;
export const GET_GROUP_DETAIL_SUCCESS = `${path}GET_GROUP_DETAIL_SUCCESS`;
export const GET_GROUP_DETAIL_ERROR = `${path}GET_GROUP_DETAIL_ERROR`;

export const GET_LIST_USER_REQUEST_GROUP = `${path}GET_LIST_USER_REQUEST_GROUP`;
export const SAVE_LIST_USER_REQUEST_GROUP = `${path}SAVE_LIST_USER_REQUEST_GROUP`;
export const APPROVE_USER_REQUEST_GROUP = `${path}APPROVE_USER_REQUEST_GROUP`;

export const GET_LIST_USER_INVITE_GROUP = `${path}GET_LIST_USER_INVITE_GROUP`;
export const SAVE_LIST_USER_INVITE_GROUP = `${path}SAVE_LIST_USER_INVITE_GROUP`;
export const SUBMIT_LIST_USER_INVITE_GROUP = `${path}SUBMIT_LIST_USER_INVITE_GROUP`;
export const CLEAR_LIST_GROUP = 'CLEAR_LIST_GROUP'

export const getListGroup = (data) => ({
    type: GET_LIST_GROUP,
    payload: data
})

export const getListGroupSuccess = (data) => ({
    type: GET_LIST_GROUP_SUCCESS,
    payload: data
})

export const getListGroupError = (err) => ({
    type: GET_LIST_GROUP_ERROR,
    payload: err
})

export const reloadListGroup = (data) => ({
    type: RELOAD_LIST_GROUP,
    payload: data
})

export const addNewGroupAction = (data) => ({
    type: CREATE_GROUP,
    payload: data
})

export const getGroupDetailAction = (data) => ({
    type: GET_GROUP_DETAIL,
    payload: data
})


export const getGroupDetailActionSuccess = (data) => ({
    type: GET_GROUP_DETAIL_SUCCESS,
    payload: data
})

export const actionGetListUserRequestGroup = (data) => ({
    type: GET_LIST_USER_REQUEST_GROUP,
    payload: data
})

export const actionSaveListUserRequestGroup = (data) => ({
    type: SAVE_LIST_USER_REQUEST_GROUP,
    payload: data
})

export const actionApproveUserRequestGroup = (data) => ({
    type: APPROVE_USER_REQUEST_GROUP,
    payload: data
})

export const actionGetListUserInviteGroup = (data) => ({
    type: GET_LIST_USER_INVITE_GROUP,
    payload: data
})

export const actionSaveListUserInviteGroup = (data) => ({
    type: SAVE_LIST_USER_INVITE_GROUP,
    payload: data
})

export const actionSubmitListUserInviteGroup = (data) => ({
    type: SUBMIT_LIST_USER_INVITE_GROUP,
    payload: data
})

export const clearListGroup = () => ({
	type: CLEAR_LIST_GROUP,
});