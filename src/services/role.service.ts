import httpStatus from "http-status";
import { RoleModel } from "../models/role.model";
import { IRoleDoc } from "../types";
import ApiError from "../utils/ApiError";

// const getRoles = async (filter: any, options: any): Promise<IRoleDoc[]> => {
//   return RoleModel.find(filter, options);
// };

const createRole = async (body: any): Promise<IRoleDoc | null> => {
  return RoleModel.create(body);
};

const updateRole = async (entityId: string, body: any): Promise<IRoleDoc | null> => {
  let data = await RoleModel.findById(entityId);
  if (!data) {
    return null;
  }

  Object.keys(body).forEach(key => {
    data[key] = body[key];
  })

  return data.save();
};

const deleteRole = async (entityId: string): Promise<IRoleDoc> => {
  return RoleModel.findByIdAndDelete(entityId);
};

export const roleService = {
  // getRoles,
  createRole,
  updateRole,
  deleteRole,
}
