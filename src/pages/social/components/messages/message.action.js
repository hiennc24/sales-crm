import {
  CREATE_CHAT,
  CREATE_CHAT_ERROR,
  CREATE_CHAT_SUCCESS,
  DELETE_CHAT,
  DELETE_CHAT_ERROR,
  DELETE_CHAT_SUCCESS,
  UPDATE_CHAT,
  UPDATE_CHAT_ERROR,
  UPDATE_CHAT_SUCCESS,
  VIEW_LAST_MEMBER,
  VIEW_LAST_MEMBER_ERROR,
  VIEW_LAST_MEMBER_SUCCESS,
  GET_LIST_CONVERSATION,
  GET_LIST_CONVERSATION_SUCCESS,
  GET_LIST_CONVERSATION_ERROR,
  UPDATE_NAME_GROUP_CHAT,
  UPDATE_NAME_GROUP_CHAT_SUCCESS,
  SET_COUNT_CHAT
} from "./message.constant";

export const createChat = () => ({
  type: CREATE_CHAT,
});

export const createChatSuccess = (data) => ({
  type: CREATE_CHAT_SUCCESS,
  payload: data,
});

export const createChatError = (error) => ({
  type: CREATE_CHAT_ERROR,
  payload: error,
});

export const updateChat = (data) => ({
  type: UPDATE_CHAT,
  payload: data,
});

export const updateChatSuccess = (data) => ({
  type: UPDATE_CHAT_SUCCESS,
  payload: data,
});

export const updateChatError = (error) => ({
  type: UPDATE_CHAT_ERROR,
  payload: error,
});
export const deleteChat = (data) => ({
  type: DELETE_CHAT,
  payload: data,
});

export const deleteChatSuccess = (data) => ({
  type: DELETE_CHAT_SUCCESS,
  payload: data,
});

export const deleteChatError = (error) => ({
  type: DELETE_CHAT_ERROR,
  payload: error,
});
export const viewLastMemberChat = (data) => ({
  type: VIEW_LAST_MEMBER,
  payload: data,
});

export const viewLastMemberChatSuccess = (data) => ({
  type: VIEW_LAST_MEMBER_SUCCESS,
  payload: data,
});

export const viewLastMemberChatError = (error) => ({
  type: VIEW_LAST_MEMBER_ERROR,
  payload: error,
});

export const getListConversation = () => {
  return {
    type: GET_LIST_CONVERSATION,
  };
};

export const getListConversationSuccess = (data) => {
  return {
    type: GET_LIST_CONVERSATION_SUCCESS,
    payload: data,
  };
};

export const getListConversationError = (error) => {
  return {
    type: GET_LIST_CONVERSATION_ERROR,
    payload: error,
  };
};

export const updateNameGroupChat = (data) => {
  return {
    type: UPDATE_NAME_GROUP_CHAT,
    payload: data
  }
};

export const updateNameGroupChatSuccess = (data) => {
  return {
    type: UPDATE_NAME_GROUP_CHAT_SUCCESS,
    payload: data
  }
};

export const setCountChat = (data) => ({
  type: SET_COUNT_CHAT,
  payload: data,
});
