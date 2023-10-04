import mongoose, { Schema } from "mongoose";
import {
  TABLE_AUDITLOG, TABLE_COMPANY, TABLE_FOLDER,
  folderPopulateFields, TABLE_USER,
  userPopulateFields, projectPopulateFields,
  TABLE_PROJECT
} from "../config";
import { IAuditLogDoc, IModel } from "../types";
import { AUDITLOG_LEVELS, AUDITLOG_TYPES } from "../types/enumTypes";
import { toJSON, paginate, aggregatePaginate } from './plugins';

export interface AuditLogDoc extends IAuditLogDoc { }
interface IAuditLogModel extends IModel<AuditLogDoc> { }
// 2. Create Schema
const auditLogModelSchema = new Schema<AuditLogDoc>({
  auditType: {
    type: String,
    enum: AUDITLOG_TYPES,
    required: true,
  },
  auditModule: {
    type: String,
    enum: AUDITLOG_LEVELS,
    required: true,
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TABLE_COMPANY,
    required: false
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TABLE_FOLDER,
    required: false
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TABLE_PROJECT,
    required: false
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TABLE_USER,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
// auditLogModelSchema.virtual('company', {
//   ref: TABLE_COMPANY,
//   localField: 'companyId',
//   foreignField: '_id',
//   justOne: true
// });
auditLogModelSchema.virtual('createBy', {
  ref: TABLE_USER,
  localField: 'createdById',
  foreignField: '_id',
  justOne: true
});
auditLogModelSchema.virtual('folder', {
  ref: TABLE_FOLDER,
  localField: 'folderId',
  foreignField: '_id',
  justOne: true
});
auditLogModelSchema.virtual('project', {
  ref: TABLE_PROJECT,
  localField: 'projectId',
  foreignField: '_id',
  justOne: true
});

auditLogModelSchema.plugin(toJSON);
auditLogModelSchema.plugin(paginate);

const populateArr = [
  { path: 'createBy', select: userPopulateFields },
  { path: 'folder', select: folderPopulateFields },
  { path: 'project', select: projectPopulateFields },
];
function populates() {
  this.populate(populateArr)
}

auditLogModelSchema.pre("findOne", populates);
auditLogModelSchema.pre('find', populates);

const AuditLogModel = mongoose.model<AuditLogDoc, IAuditLogModel>(TABLE_AUDITLOG, auditLogModelSchema)

export { AuditLogModel }