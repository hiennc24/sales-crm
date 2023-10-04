import httpStatus from "http-status";
import { GroupWorkModel } from "../models/groupWork.model";
import { IGroupWorkDoc } from "../types";
import ApiError from "../utils/ApiError";

// const getGroupWorks = async (filter: any, options: any): Promise<IGroupWorkDoc[]> => {
//   return GroupWorkModel.find(filter, options);
// };

const createGroupWork = async (body: any): Promise<IGroupWorkDoc | null> => {
  return GroupWorkModel.create(body);
};

const getGroupWork = async (entityId: string): Promise<IGroupWorkDoc> => {
  let data = await GroupWorkModel.findById(entityId);
  return data;
};

const updateGroupWork = async (entityId: string, body: any): Promise<IGroupWorkDoc> => {
  let data = await GroupWorkModel.findById(entityId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'GroupWork not found');
  }

  Object.keys(body).forEach(key => {
    data[key] = body[key];
  })

  return data.save();
};

const deleteGroupWork = async (entityId: string): Promise<IGroupWorkDoc> => {
  return GroupWorkModel.findByIdAndDelete(entityId);
};

const addMembers = async (entityId: string, newUserIds: string[]): Promise<IGroupWorkDoc> => {
  return GroupWorkModel.findByIdAndUpdate(entityId, {
    $addToSet: { memberIds: newUserIds }
  }, { new: true });
};

const removeMember = async (entityId: string, memberId: string): Promise<IGroupWorkDoc> => {
  return GroupWorkModel.findByIdAndUpdate(entityId, {
    $pull: { memberIds: memberId }
  }, { new: true });
};

export const groupWorkService = {
  // getGroupWorks,
  getGroupWork,
  createGroupWork,
  updateGroupWork,
  deleteGroupWork,
  addMembers,
  removeMember,
}
