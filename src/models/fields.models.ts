import mongoose from "mongoose";
import { TABLE_FIELD, TABLE_PROJECT, TABLE_USER } from "../config";
import { IFieldDoc, IModel } from "../types";
import { paginate, toJSON } from "./plugins";

export interface IFieldModelDoc extends IFieldDoc {}
interface IFieldModel extends IModel<IFieldModelDoc> {}

const fieldSchema = new mongoose.Schema<IFieldDoc, IModel<IFieldDoc>>(
  {
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },

    onModel: {
      type: String,
      required: true,
      enum: [TABLE_PROJECT, TABLE_USER],
    },

    isFieldSystem: {
      type: Boolean,
      default: false,
    },

    fieldKey: {
      type: String,
    },
    fieldName: {
      type: String,
    },
    fieldType: {
      type: String,
    },

    fieldConfigs: {
      options: {
        type: [
          {
            text: String,
            value: String,
            color: { type: String, require: false },
          },
        ],
        require: false,
      },

      requiredWhenNew: { type: Boolean, default: false },
      requiredWhenDone: { type: Boolean, default: false },
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

fieldSchema.plugin(toJSON);
fieldSchema.plugin(paginate);

export const FieldModel = mongoose.model<IFieldModelDoc, IFieldModel>(
  TABLE_FIELD,
  fieldSchema
);
