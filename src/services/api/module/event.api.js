import baseApi from "../base.api";
import { paths } from "../paths";

export const toggleJoinEvent = (data) => {
  return baseApi.post(paths.toggleJoinEvent(), data);
};
export const getListPosts = (groupId, index, pageSize, type) => {
  return baseApi.get(paths.getListPosts(groupId, index, pageSize, type));
};

export const getListEventByTime = ({ key, groupId, index, pageSize, type, option }) => {
  return baseApi.get(paths.getListEventByTime(key, groupId, index, pageSize, type, option));
};

export const userJoinEvent = (data) => {
  return baseApi.post(paths.userJoinEvent(), data);
};

export const userConsiderEvent = (data) => {
  return baseApi.post(paths.userConsiderEvent(), data);
};

export const getListPlace = () => {
  return baseApi.get(paths.getListPlace());
};

export const createAgendar = (data) => {
  return baseApi.post(paths.createAgendar(), data);
};

export const updateAgendar = (data) => {
  return baseApi.put(paths.updateAgendar(), data);
};

export const deleteAgendar = (data) => {
  return baseApi.delete(paths.deleteAgendar(), data);
};

export const deleteParticipant = (data) => {
  return baseApi.put(paths.deleteParticipant(), data);
};

export const inviteEvent = (data) => {
  return baseApi.post(paths.inviteEvent(), data);
};

export const createSubtask = (data) => {
  return baseApi.post(paths.createSubtask(), data);
};

export const updateSubtask = (data) => {
  return baseApi.put(paths.updateSubtask(), data);
};

export const updateDiary = (data) => {
  return baseApi.post(paths.updateDiary(), data);
};

export const deleteSubtask = (data) => {
  return baseApi.delete(paths.deleteSubtask(), data);
};