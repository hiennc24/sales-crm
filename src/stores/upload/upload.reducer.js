import {
  CLEAR_FILES,
  DELETE_FILE,
  UPLOAD_FILE_SUCCESS,
  SET_DATA,
} from "./upload.action";

const initialState = {
  data: [],
};

const uploadFileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DATA: {
			return { ...state, data: action.payload };
		}
		case UPLOAD_FILE_SUCCESS: {
			return { ...state, data: [...state.data, action.payload] };
		}
		case DELETE_FILE: {
			return {
				...state,
				data: state.data.filter(file => file.Name !== action.payload.name),
			};
		}
		case CLEAR_FILES: {
			return { data: [] };
		}
		default:
			return state;
	}
};

export default uploadFileReducer;
