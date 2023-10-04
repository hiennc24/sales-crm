import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';
import { IPhaseDoc, IModel } from "../types";
import {
  TABLE_USER, TABLE_PHASE, TABLE_PROJECT, TABLE_TASK
} from '../config';

export interface IPhaseModelDoc extends IPhaseDoc { }
interface IPhaseModel extends IModel<IPhaseModelDoc> { }

const phaseSchema = new mongoose.Schema<IPhaseModelDoc>(
  {
    name: {
      type: String,
      required: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_PROJECT,
      required: true,
    },

    position: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
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

phaseSchema.plugin(toJSON);
phaseSchema.plugin(paginate);

phaseSchema.virtual('tasks', {
  ref: TABLE_TASK,
  localField: "_id",
  foreignField: "phaseId",
  match: { deletedById: { $exists: false } },
})

const populateArr = [
  { path: 'tasks' },
];

function preFind() {
  this.populate(populateArr)
}
phaseSchema.pre("findOne", preFind);
phaseSchema.pre('find', preFind);

// phaseSchema.index({ user: 1, room: 1 });
/**
 * @typedef phase
 */
export const PhaseModel = mongoose.model<IPhaseModelDoc, IPhaseModel>(TABLE_PHASE, phaseSchema);