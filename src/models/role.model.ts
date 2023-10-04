import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';
import { IRoleDoc, IModel } from "../types";
import {
  TABLE_USER, TABLE_ROLE, TABLE_PROJECT
} from '../config';
import { PERMISSIONS } from '../types/enumTypes';

export interface IRoleModelDoc extends IRoleDoc { }
interface IRoleModel extends IModel<IRoleModelDoc> { }

const roleSchema = new mongoose.Schema<IRoleModelDoc>(
  {
    name: {
      type: String,
      required: true,
    },

    permissions: [{
      type: String,
      enum: PERMISSIONS,
      default: []
    }],
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_PROJECT,
      required: true,
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

roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

// roleSchema.index({ user: 1, room: 1 });
/**
 * @typedef role
 */
export const RoleModel = mongoose.model<IRoleModelDoc, IRoleModel>(TABLE_ROLE, roleSchema);