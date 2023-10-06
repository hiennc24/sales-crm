import { fromJS } from "immutable";
import {
  CREATE_CHAT,
  CREATE_CHAT_ERROR,
  CREATE_CHAT_SUCCESS,
  DELETE_CHAT,
  DELETE_CHAT_ERROR,
  DELETE_CHAT_SUCCESS,
  GET_LIST_CONVERSATION_SUCCESS,
  UPDATE_CHAT,
  UPDATE_CHAT_ERROR,
  UPDATE_CHAT_SUCCESS,
  VIEW_LAST_MEMBER,
  VIEW_LAST_MEMBER_ERROR,
  VIEW_LAST_MEMBER_SUCCESS,
  UPDATE_NAME_GROUP_CHAT,
  UPDATE_NAME_GROUP_CHAT_SUCCESS,
  SET_COUNT_CHAT
} from "./message.constant";

const initialState = fromJS({
  listMember: [],
  message: [],
  loading: false,
  error: null,
  nameGroupChat: '',
  countChat: 0
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHAT:
      return state.set("loading", true).set("error", null).set("message", []);
    case CREATE_CHAT_SUCCESS:
      stateMessage = state.get("message", []);
      listMessage = [...stateMessage, ...action.payload];
      return state
        .set("loading", false)
        .set("error", null)
        .set("message", listMessage);
    case CREATE_CHAT_ERROR:
      return state
        .set("loading", false)
        .set("error", action.payload)
        .set("message", []);
    
    case UPDATE_NAME_GROUP_CHAT:
      return state
        .set("loading", true)
        .set("error", null)

    case UPDATE_NAME_GROUP_CHAT_SUCCESS:
      return state
        .set("nameGroupChat", action.payload)
        .set("loading", false)
        .set("error", null)

    case UPDATE_CHAT:
      return state.set("loading", false).set("error", null);

    case UPDATE_CHAT_SUCCESS:
      stateMessage = state.get("message", []);
      listMessage = [...stateMessage, action.payload];
      return state
        .set("loading", false)
        .set("error", null)
        .set("message", listMessage);

    case UPDATE_CHAT_ERROR:
      return state.set("loading", false).set("error", action.payload);
    case DELETE_CHAT:
      return state.set("loading", false).set("error", null);

    case DELETE_CHAT_SUCCESS:
      stateMessage = state.get("message", []);
      listMessage = [...stateMessage, action.payload];
      return state
        .set("loading", false)
        .set("error", null)
        .set("message", listMessage);

    case DELETE_CHAT_ERROR:
      return state.set("loading", false).set("error", action.payload);
    case VIEW_LAST_MEMBER:
      return state.set("loading", false).set("error", null);

    case VIEW_LAST_MEMBER_SUCCESS:
      stateMessage = state.get("message", []);
      listMessage = [...stateMessage, action.payload];
      return state
        .set("loading", false)
        .set("error", null)
        .set("message", listMessage);

    case VIEW_LAST_MEMBER_ERROR:
      return state.set("loading", false).set("error", action.payload);
    case GET_LIST_CONVERSATION_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .set("listMember", action.payload);
    case SET_COUNT_CHAT:
      return state
        .set("countChat", action.payload)
    default:
      return state;
  }
};

export default reducer;
