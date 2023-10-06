const path = "pages/Setting/";

export const GET_SETTING = `${path}GET_SETTING`;
export const GET_SETTING_SUCCESS = `${path}GET_SETTING_SUCCESS`;
export const GET_SETTING_ERROR = `${path}GET_SETTING_ERROR`;

export const getSetting = () => ({
  type: GET_SETTING,
});

export const getSettingSuccess = (data) => ({
  type: GET_SETTING_SUCCESS,
  payload: data,
});

export const getSettingError = (error) => ({
  type: GET_SETTING_ERROR,
  payload: error,
});
