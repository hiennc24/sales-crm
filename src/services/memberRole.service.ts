import { MemberRoleModel } from "../models/memberRole.model";
import { IMemberRoleDoc } from "../types";
import { TABLE_ROLE } from '../config';

const createMemberRole = async (body: any): Promise<IMemberRoleDoc | null> => {
  return MemberRoleModel.create(body);
};

const createIfNotExistMemberRole = async (body: any): Promise<IMemberRoleDoc | null> => {
  return MemberRoleModel.findOneAndUpdate(body, {
    createdAt: new Date()
  }, { upsert: true, new: true, setDefaultsOnInsert: true });
};

const deleteMemberRole = async (filter: any): Promise<IMemberRoleDoc> => {
  return MemberRoleModel.findOneAndDelete(filter);
};

const getMemberRoles = async (filter: any): Promise<IMemberRoleDoc[] | []> => {
  return MemberRoleModel.aggregate([
    {
      $project: {
        _id: 0,
        projectId: 1,
        roleId: 1,
        userId: 1,
        roles: 1,
      },
    },
    {
      $lookup: {
        from: `${TABLE_ROLE}s`,
        localField: "roleId",
        foreignField: "_id",
        as: "roles"
      },
    },
  ]);
};

export const memberRoleService = {
  createIfNotExistMemberRole,
  createMemberRole,
  deleteMemberRole,
  getMemberRoles,
}
