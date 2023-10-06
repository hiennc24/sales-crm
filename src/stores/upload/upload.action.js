export const UPLOAD_FILE = "UPLOAD_FILE";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const DELETE_FILE = "DELETE_FILE";
export const CLEAR_FILES = "CLEAR_FILES";
export const SET_DATA = "SET_DATA";

export const setData = (payload) => ({
  type: SET_DATA,
  payload,
});

export const uploadFileAction = (payload) => ({
  type: UPLOAD_FILE,
  payload,
});

export const uploadFileSuccessAction = (payload) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload,
});

export const deleteFile = payload => {
	return {
		type: DELETE_FILE,
		payload,
	};
};

export const clearFiles = () => ({
  type: CLEAR_FILES,
});
