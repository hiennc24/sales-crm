import { fromJS } from "immutable";
import { Construct } from "styled-icons/ionicons-sharp";

import {
  GET_EVENT,
  GET_EVENT_SUCCESS,
  GET_EVENT_BY_TIME,
  GET_EVENT_BY_TIME_SUCCESS,
  GET_EVENT_ERROR,
  UPDATE_LIKE_STATUS,
  CLEAR_EVENT,
  EDIT_EVENT_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  EDIT_EVENT_COMMENT_SUCCESS,
  DELETE_COMMENT_EVENT_SUCCESS
} from "./event.action";
const initialState = {
  event: [],
  loading: false,
  error: null,
  isLoadMore: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT:
      // return state.set("loading", true).set("error", null);
      return { ...state, loading: true, error: null }
    case GET_EVENT_BY_TIME:
      return { ...state, loading: true };
    case GET_EVENT_SUCCESS:
      // return state
      // .set("event", action.payload)
      // .set("loading", false)
      // .set("error", null);
      return { ...state, event: action.payload, loading: false, error: null }
    case GET_EVENT_BY_TIME_SUCCESS:
      const newEvent = {
        ...state,
        event: [...state.event, ...action.payload],
        loading: false,
        isLoadMore: true
      };
      if (action.payload.length === 0) {
        newEvent.isLoadMore = false;
      }
      return newEvent;

    case GET_EVENT_ERROR:
      // return state
      // .set("event", null)
      // .set("loading", false)
      // .set("error", action.payload);
      return { ...state, loading: false, error: action.payload, event: [] }

    case UPDATE_LIKE_STATUS:
      // const prevState = state.get("event", {});
      const newState = { ...prevState, IsLike: action.payload };
      // return state
      //   .set("event", newState)
      //   .set("loading", false)
      //   .set("error", action.payload);
      return { ...state, loading: false, error: action.payload, event: newState }


    case CLEAR_EVENT:
      // return state.set("event", null).set("loading", false).set("error", null);
      return { ...state, loading: false, error: null, event: [] }

    case EDIT_EVENT_SUCCESS: {
      return { ...state, event: action.payload }
    }

    case CREATE_COMMENT_SUCCESS: {

      const targetPost = { ...state.event }

      if (+targetPost.Id === +action.payload.parentList[0]) {

        if (action.payload.parentList.length === 1) {
          const newCmt = { ...action.payload };
          delete newCmt.parentList;
          targetPost.comments = [...targetPost.comments, { ...newCmt, Comments: [] }];
          targetPost.CountComment++;
        }
        else {
          let newData = targetPost.comments;
          for (let i = 1; i < action.payload.parentList.length; i++) {
            if (i === action.payload.parentList.length - 1) {
              newData = newData.find(item => +item.Id === +action.payload.parentList[i])
              const newCmt = { ...action.payload };
              delete newCmt.parentList;
              newData.Comments = [...newData.Comments, newCmt]
            }
            else {
              newData = newData.find(item => +item.Id === +action.payload.parentList[i])?.Comments
            }
          }
        }
      }
      return { ...state, event: targetPost };

    }
    case GET_COMMENTS_SUCCESS: {
      const data = { ...state.event }
      if (+data.Id === +action.payload.id) {
        data.comments = [...action.payload.comments.reverse(), ...data.comments];
      }
      return { ...state, event: data }
    }
    case EDIT_EVENT_COMMENT_SUCCESS: {
      const targetPost = {...state.event}

      if(+targetPost.Id === +action.payload.parentList[0]) {

          if (action.payload.parentList.length === 2) {
              const newCmt = { ...action.payload };
              delete newCmt.parentList;
              targetPost.comments = targetPost.comments.map(item => {
                  if(+item.Id === +newCmt.Id) {
                      return { ...newCmt, Comments: item.Comments};
                  }
                  return item;
              });

          }
          else {
              let newData = targetPost.comments;
              for(let i = 1; i < action.payload.parentList.length; i++) {
                  if(i === action.payload.parentList.length - 1) {
                      const newCmt = {...action.payload};
                      delete newCmt.parentList;
                      newData.Comments = newData.Comments.map(item => {
                          if(+item.Id === +newCmt.Id) return { ...newCmt, Comments: item.Comments};
                          return item;
                      })
                  }
                  else {
                      newData = newData.find(item => +item.Id === +action.payload.parentList[i])
                  }
              }
          }
      }
      return { ...state, loading: false, event: targetPost };
    }
    case DELETE_COMMENT_EVENT_SUCCESS: {

      const targetPost = {...state.event}

      if(+targetPost.Id === +action.payload.parentList[0]) {

          if (action.payload.parentList.length === 2) {
              targetPost.comments = targetPost.comments.filter(item => +item.Id !== +action.payload.id)
              targetPost.CountComment--;
          }
          else {
              let newData = targetPost.comments;
              for(let i = 1; i < action.payload.parentList.length; i++) {
                  if(i === action.payload.parentList.length - 1) {
                      const newCmt = {...action.payload};
                      delete newCmt.parentList;
                      newData.Comments = newData.Comments.filter(item => +item.Id !== +action.payload.id)
                  }
                  else {
                      newData = newData.find(item => +item.Id === +action.payload.parentList[i])
                  }
              }
          }
      }

			return {
				...state,
				event: targetPost,
			};
		}
    default:
      return state;
  }
};

export default reducer;
