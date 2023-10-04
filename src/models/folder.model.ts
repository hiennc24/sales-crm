import mongoose from "mongoose";
import { toJSON, paginate, aggregatePaginate } from "./plugins";
import { IFolderDoc, IModel } from "../types";
import {
  projectPopulateFields,
  TABLE_FOLDER,
  TABLE_COMPANY,
  TABLE_USER,
  TABLE_PROJECT,
} from "../config";
import {
  pushFolderAudit,
  pushRenameFolderAudit,
} from "../queue/actions/pushFolderAudit";
import { NextFunction } from "express";

export interface IFolderModelDoc extends IFolderDoc {
  isModifiedName: boolean;
}
interface IFolderModel extends IModel<IFolderModelDoc> {}

const folderSchema = new mongoose.Schema<IFolderModelDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    name: {
      type: String,
      required: true,
      // set: function (newVal: string) {
      //   this.$locals._name = newVal;
      //   return newVal;
      // },
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_FOLDER,
      required: false,
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
folderSchema.virtual("parent", {
  ref: TABLE_FOLDER,
  localField: "parentId",
  foreignField: "_id",
  justOne: true,
});

folderSchema.virtual("projects", {
  ref: TABLE_PROJECT,
  localField: "_id",
  foreignField: "folderId",
  match: { deletedById: { $exists: false } },
});

folderSchema.plugin(toJSON);
folderSchema.plugin(paginate);

const populateArr = [{ path: "projects", select: projectPopulateFields }];
function populates() {
  this.populate(populateArr);
}

folderSchema.pre("findOne", populates);
folderSchema.pre("find", populates);

// function preSave(next: any) {
//   console.log("folderSchema:pre:save", this.$locals);
//   // console.log("folderSchema:pre:save getChanges ", this.getChanges());
//   // console.log("folderSchema:pre:save isModified ", this.isModified("name"));
//   this.$locals.wasNew = this.isNew;
//   if (this.isModified("name")) {
//     this.$locals.isModifiedName = true;
//   }
//   next();
// }
// folderSchema.pre("save", preSave);
// folderSchema.pre("findOneAndUpdate", preSave);

// folderSchema.post("save", function (doc: IFolderModelDoc) {
//   console.log("folderSchema:post:save", doc.$locals);
//   if (doc.$locals.wasNew) {
//     pushFolderAudit({
//       companyId: doc.companyId,
//       folderId: doc._id,
//       createdById: doc.createdById,
//     });
//   }
//   if (doc.$locals.isModifiedName) {
//     console.log(
//       "folderSchema:post:save:isModified name",
//       doc.$locals._name,
//       doc.name
//     );
//     pushRenameFolderAudit({
//       companyId: doc.companyId,
//       folderId: doc._id,
//       createdById: doc.createdById,
//       data: {
//         oldValue: String(doc.$locals._name),
//         newValue: doc.name,
//       },
//     });
//   }
// });

// folderSchema.index({ user: 1, room: 1 });
/**
 * @typedef folder
 */
export const FolderModel = mongoose.model<IFolderModelDoc, IFolderModel>(
  TABLE_FOLDER,
  folderSchema
);
