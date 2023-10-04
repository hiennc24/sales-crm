import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';
import { IMemberRoleDoc, IModel } from "../types";
import {
  TABLE_USER, TABLE_PROJECT, TABLE_MEMBERROLE, TABLE_ROLE, TABLE_GROUPWORK
} from '../config';

export interface ImemberRoleModelDoc extends IMemberRoleDoc { }
interface ImemberRoleModel extends IModel<ImemberRoleModelDoc> { }

const memberRoleSchema = new mongoose.Schema<ImemberRoleModelDoc>(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_PROJECT,
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_ROLE,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },
    groupWorkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_GROUPWORK,
      required: false,
    },

    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: true,
    },
    deletedAt: {
      type: Date,
      required: false
    },
    deletedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

memberRoleSchema.plugin(toJSON);
memberRoleSchema.plugin(paginate);

// memberRoleSchema.index({ user: 1, room: 1 });
memberRoleSchema.index({ roleId: 1, userId: 1, groupWorkId: 1 }, { unique: true })
/**
 * @typedef memberRole
 */
export const MemberRoleModel = mongoose.model<ImemberRoleModelDoc, ImemberRoleModel>(TABLE_MEMBERROLE, memberRoleSchema);