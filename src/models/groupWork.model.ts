import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';
import { IGroupWorkDoc, IModel } from "../types";
import {
  TABLE_USER, TABLE_ROLE, TABLE_GROUPWORK, TABLE_PROJECT,
  userPopulateFields
} from '../config';

export interface IGroupWorkModelDoc extends IGroupWorkDoc { }
interface IGroupWorkModel extends IModel<IGroupWorkModelDoc> { }

const droupWorkSchema = new mongoose.Schema<IGroupWorkModelDoc>(
  {
    name: {
      type: String,
      required: true,
    },

    memberIds: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: TABLE_USER,
      }],
      default: []
    },
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

droupWorkSchema.plugin(toJSON);
droupWorkSchema.plugin(paginate);

droupWorkSchema.virtual('members', {
  ref: TABLE_USER,
  localField: 'memberIds',
  foreignField: '_id',
});

const populateArr = [
  { path: 'members', select: userPopulateFields },
];
function populates() {
  this.populate(populateArr)
}

droupWorkSchema.pre("findOne", populates);
droupWorkSchema.pre('find', populates);
droupWorkSchema.pre('findOneAndUpdate', populates);

// droupWorkSchema.index({ user: 1, room: 1 });
/**
 * @typedef droupWork
 */
export const GroupWorkModel = mongoose.model<IGroupWorkModelDoc, IGroupWorkModel>(TABLE_GROUPWORK, droupWorkSchema);