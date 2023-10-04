import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';
import { IProjectDoc, IModel, FILED_NAME_ARR } from "../types";
import {
  TABLE_FOLDER, TABLE_COMPANY, TABLE_USER, TABLE_PROJECT, TABLE_FIELD, TABLE_PHASE
} from '../config';
import { NextFunction } from 'express';
import { pushAuditLog } from '../queue/actions/createAuditLog';
import { AUDITLOG_LEVELS, AUDITLOG_TYPES } from '../types/enumTypes';

export interface IProjectModelDoc extends IProjectDoc {
  isModifiedName: boolean
}
interface IProjectModel extends IModel<IProjectModelDoc> { }

const projectSchema = new mongoose.Schema<IProjectModelDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },

    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_FOLDER,
      required: false,
    },

    name: {
      type: String,
      required: true,
      // set: function (newVal: string) {
      //   this.$locals._name = this.name;
      //   return newVal;
      // }
    },

    description: {
      type: String,
      required: true,
    },

    fields_inc: {
      type: Object,
      enum: FILED_NAME_ARR,
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


projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

projectSchema.virtual('fields', {
  ref: TABLE_FIELD,
  localField: "_id",
  foreignField: "entityId",
  match: { deletedById: { $exists: false } },
})

projectSchema.virtual('phase', {
  ref: TABLE_PHASE,
  localField: "_id",
  foreignField: "projectId",
  match: { deletedById: { $exists: false } },
})

projectSchema.virtual('tasks', {
  ref: TABLE_PHASE,
  localField: "_id",
  foreignField: "projectId",
  match: { deletedById: { $exists: false } },
})

const populateArr = [
  { path: 'fields' },
  { path: 'phase' },
  { path: 'tasks' },

  // { path: 'status' },
  // { path: 'parent', select: messagePopulateFields },
  // { path: 'createBy', select: userPopulateFields },
  // { path: 'deleteBy', select: userPopulateFields },
];

function preFind() {
  this.populate(populateArr)
}
projectSchema.pre("findOne", preFind);
projectSchema.pre('find', preFind);

// function afterSave(doc: IMessageModelDoc, next: any) {
//   //console.log("Message:afterSave")
//   Promise.all([
//     doc.populate(populateArr.concat([{ path: 'room', select: roomPopulateFields }])),
//   ])
//     .then(() => {
//       next()
//     })

// audit log
projectSchema.pre('save', function (next: NextFunction) {
  // Mongoose will set `isNew` to `false` if `save()` succeeds
  this.$locals.wasNew = this.isNew;
  if (this.isModified("name")) {
    this.$locals.isModifiedName = true
  }
  next()
});
projectSchema.post('save', function (doc: IProjectModelDoc) {
  console.log('projectSchema:post:save', doc.$locals);
  if (doc.$locals.wasNew) {
    pushAuditLog({
      auditType: AUDITLOG_TYPES.PROJ_PROJECT_CREATE,
      auditModule: AUDITLOG_LEVELS.PROJ_PROJECT,

      companyId: doc.companyId,
      projectId: doc._id,
      createdById: doc.createdById
    })
  }
  if (!!doc._id && doc.$locals.isModifiedName) {
    console.log('projectSchema:post:save:isModified name', doc.$locals._name, doc.name);
    pushAuditLog({
      auditType: AUDITLOG_TYPES.PROJ_PROJECT_RENAME,
      auditModule: AUDITLOG_LEVELS.PROJ_PROJECT,

      companyId: doc.companyId,
      projectId: doc._id,
      createdById: doc.createdById,
      data: {
        oldValue: String(doc.$locals._name),
        newValue: doc.name
      }
    })
  }
});

// projectSchema.index({ user: 1, room: 1 });
/**
 * @typedef project
 */
export const ProjectModel = mongoose.model<IProjectModelDoc, IProjectModel>(TABLE_PROJECT, projectSchema);