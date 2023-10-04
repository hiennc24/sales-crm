import mongoose from 'mongoose';
import { AUDITLOG_LEVELS, AUDITLOG_TYPES, PERMISSIONS, SYSTEMFOLDER_TYPES } from './enumTypes';
import { PFieldType } from './fieldTypes';

export interface IDoc extends mongoose.Document {
  _original?: any;
  wasNew: boolean,
  _id: mongoose.ObjectId,
  id: string,

  createdAt: Date,
  createdById?: mongoose.ObjectId;
  updatedAt?: Date,
  updatedById?: mongoose.ObjectId;
  deletedAt?: Date,
  deletedById?: mongoose.ObjectId;

  toJSON: any,
  toObject: any,
  aggregatePaginate: any,
}

export interface IUserDoc extends IDoc {
  userId: string,//1
  company: any, //2

  name: string,//admin,
  surname: string,//admin,
  userName: string,//admin,
  emailAddress: string,//admin@aspnetzero.com,
  phoneNumber: string | null,//null,
  profilePictureId: string | null,//null,
  isActive: boolean,//true,
  creationTime: Date,//2021-07-24T17:53:09.752915,
  // isEmailConfirmed: boolean,// true,
  // roles: [
  //     {
  //         roleId: 1,
  //         roleName: Admin
  //     }
  // ],
}

export interface ICompanyDoc extends IDoc {
  tenancyId: string,
  tenancyName: string,
  name: string,
  isActive: boolean,
  creationTime: Date,
  // editionDisplayName: string,
  // connectionString: string,
  // subscriptionEndDateUtc: Date,
  // editionId: number,
  // isInTrialPeriod: boolean,
}

export interface IFolderDoc extends IDoc {
  companyId: mongoose.ObjectId;
  name: string;

  parentId?: mongoose.ObjectId;
}

export interface IAuditLogDoc extends IDoc {
  auditType: AUDITLOG_TYPES;
  auditModule: AUDITLOG_LEVELS;

  companyId?: mongoose.ObjectId;
  folderId?: mongoose.ObjectId;
  projectId?: mongoose.ObjectId;

  // template: string | IPTemplateModel,

  // projectId?: mongoose.ObjectId;
  // phaseId?: mongoose.ObjectId;
  // taskId?: mongoose.ObjectId;
  // subtaskId?: mongoose.ObjectId;
  // commentId?: mongoose.ObjectId;
  company?: ICompanyDoc;
  folder?: IFolderDoc;
  project?: IFolderDoc;

  data?: object;
}

export interface IProjectDoc extends IDoc {
  companyId: mongoose.ObjectId;
  folderId?: mongoose.ObjectId;

  name: string,
  description: string,

  company?: ICompanyDoc;
  folder?: IFolderDoc;

  fields_inc: object;
}

export interface IPhaseDoc extends IDoc {
  name: string,

  companyId: mongoose.ObjectId;
  projectId: mongoose.ObjectId;
  taskId: mongoose.ObjectId;

  position: number,
  description?: string,

  project: IProjectDoc
}

export interface IRoleDoc extends IDoc {
  name: string,

  permissions: PERMISSIONS[],
  projectId: mongoose.ObjectId;
}

export interface IGroupWorkDoc extends IDoc {
  name: string,

  memberIds: mongoose.ObjectId[],
  projectId: mongoose.ObjectId;
}

export interface IMemberRoleDoc extends IDoc {
  projectId: mongoose.ObjectId;
  roleId: mongoose.ObjectId;
  userId: mongoose.ObjectId,
  groupWorkId: mongoose.ObjectId;
  roles?: any
}

export interface IUsersDoc extends IDoc {
  _id: mongoose.ObjectId,
  userId: string,
  company: any,
  name: string,
  surname: string,
  userName: string,
  emailAddress: string,
  phoneNumber: string | null,
  profilePictureId: string | null,
  isActive: boolean,
  creationTime: Date,
}

export interface IFieldDoc extends IDoc {
  _id: mongoose.ObjectId,
  entityId: mongoose.ObjectId,
  onModel: string,
  fieldKey: string,
  fieldName: string,
  fieldType: PFieldType,
  isFieldSystem: Boolean,

  fieldConfigs?: object,
}

export interface ITaskDoc extends IDoc {
  _id: mongoose.ObjectId,
  phaseId: mongoose.ObjectId,
  projectId: mongoose.ObjectId,
  value: object,
  name: string,
}

