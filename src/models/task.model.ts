import mongoose from "mongoose";
import { TABLE_FIELD, TABLE_PROJECT, TABLE_TASK, TABLE_USER } from "../config";
import { FIELD_TYPE_ARR, FILED_KEY_ARR, FILED_NAME_ARR, IFieldDoc, IModel, ITaskDoc } from "../types";
import { paginate, toJSON } from "./plugins";

export interface ITaskModelDoc extends ITaskDoc { }
interface ITaskModel extends IModel<ITaskModelDoc> { }

const taskSchema = new mongoose.Schema<ITaskDoc, IModel<ITaskDoc>>(
  {
    phaseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    value: {
      type: mongoose.Schema.Types.Mixed,
    },

    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: true,
    },

    updatedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },

    deletedAt: {
      type: Date,
      required: false,
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

taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

export const TaskModel = mongoose.model<ITaskModelDoc, ITaskModel>(TABLE_TASK, taskSchema);

