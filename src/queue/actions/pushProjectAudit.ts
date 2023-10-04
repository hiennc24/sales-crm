import mongoose from 'mongoose';
import { AUDITLOG_LEVELS, AUDITLOG_TYPES } from '../../types/enumTypes';
import { pushAuditLog } from './createAuditLog';

export const pushProjectAudit = (data: {
  companyId: mongoose.ObjectId;
  projectId: mongoose.ObjectId;

  createdById: mongoose.ObjectId;
}) => {
  return pushAuditLog({
    ...data,
    auditType: AUDITLOG_TYPES.PROJ_FOLDER_CREATE,
    auditModule: AUDITLOG_LEVELS.PROJ_FOLDER
  })
}
export const pushRenameProjectAudit = (data: {
  companyId: mongoose.ObjectId;
  projectId: mongoose.ObjectId;

  createdById: mongoose.ObjectId;
  data: {
    oldValue: string,
    newValue: string
  }
}) => {
  return pushAuditLog({
    ...data,
    auditType: AUDITLOG_TYPES.PROJ_FOLDER_RENAME,
    auditModule: AUDITLOG_LEVELS.PROJ_FOLDER
  })
}