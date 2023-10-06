import { takeLatest, call, put } from "redux-saga/effects";
import {
    getListGroupError,
    getListGroupSuccess,
    GET_LIST_GROUP,
    CREATE_GROUP,
    GET_GROUP_DETAIL,
    getGroupDetailActionSuccess,

    GET_LIST_USER_REQUEST_GROUP,
    actionSaveListUserRequestGroup,
    APPROVE_USER_REQUEST_GROUP,

    GET_LIST_USER_INVITE_GROUP,
    actionSaveListUserInviteGroup,
    SUBMIT_LIST_USER_INVITE_GROUP,
} from "./Group.action";
import API from "../../services/api";
// import errors from "../../constants/error";

function* getListGroupSaga(data) {
    try {
        // call api
        const response = yield call(API.group.getListGroup, data.payload);
        yield put(getListGroupSuccess(response.data || []));
    } catch (e) {
        yield put(getListGroupError(e.message));
    }
}


function* createGroupSaga(data) {
    try {
        // call api
        const response = yield call(API.group.createGroup, data.payload);

        if (response?.message === "DUPLICATE_SLUG") {
        } else {
            if (response?.code === 200) {
                getListGroupSaga();
            }
        }
    } catch (e) {
        //   yield put(createCompanyError(e.message));
    }
}


function* getGroupInfoSaga({ payload }) {
    try {
        // call api
        const response = yield call(API.group.getGroupDetail, payload);
        if (response?.code === 200) {
            yield put(getGroupDetailActionSuccess(response?.data));
        }
    } catch (e) {
        //   yield put(createCompanyError(e.message));
    }
}

function* actionGetListUserRequestGroup({ payload }) {
    try {
        const response = yield call(API.group.getListUserRequestGroup, payload);
        yield put(actionSaveListUserRequestGroup(response.data || []));
    } catch (e) {
        yield put(getListGroupError(e.message));
    }
}

function* actionApproveUserRequestGroup({ payload }) {
    try {
        const { isAccept, item, listUserRequestGroup, groupId } = payload
        const dataSubmit = {
            isAccept,
            groupId,
            userId: item.Id
        }
        const response = yield call(API.group.approveUserRequestGroup, dataSubmit);
        if (response) {
            yield put(actionSaveListUserRequestGroup(listUserRequestGroup.filter(it => it.Id !== item.Id)));
            return response
        }
    } catch (e) {
        yield put(getListGroupError(e.message));
    }
}

function* actionGetListUserInviteGroup({ payload }) {
    try {
        const { listUserAddGroups } = payload
        let response = yield call(API.group.getListUserInviteGroup, payload);
        response.data = response.data.map(it => {
            return {
                ...it,
                isChecked: false,
                label: it.FullName,
                value: it.UserId,
            }
        })

        if (listUserAddGroups) {
            let newListResponse = Array.from(response.data)
            newListResponse.forEach((item, idx) => {
                if (listUserAddGroups.map(it => it.UserId).includes(item.UserId)) {
                    newListResponse[idx].isChecked = true
                }
            });

            response.data = newListResponse
        }

        yield put(actionSaveListUserInviteGroup(response.data || []));
    } catch (e) {
        yield put(getListGroupError(e.message));
    }
}

function* actionSubmitListUserInviteGroup({ payload }) {
    try {
        let response = yield call(API.group.submitListUserInviteGroup, payload);
        return response
    } catch (e) {
        yield put(getListGroupError(e.message));
    }
}

export default function* groupSaga() {
    yield takeLatest(GET_LIST_GROUP, getListGroupSaga);
    yield takeLatest(CREATE_GROUP, createGroupSaga);
    yield takeLatest(GET_GROUP_DETAIL, getGroupInfoSaga);
    yield takeLatest(GET_LIST_USER_REQUEST_GROUP, actionGetListUserRequestGroup);
    yield takeLatest(APPROVE_USER_REQUEST_GROUP, actionApproveUserRequestGroup);
    yield takeLatest(GET_LIST_USER_INVITE_GROUP, actionGetListUserInviteGroup);
    yield takeLatest(SUBMIT_LIST_USER_INVITE_GROUP, actionSubmitListUserInviteGroup);
}
