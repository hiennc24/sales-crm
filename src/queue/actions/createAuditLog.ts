import mongoose from 'mongoose';
import Queue from 'bull';
import { QUEUE_NAME } from "../../config";
import { AUDITLOG_LEVELS, AUDITLOG_TYPES } from "../../types/enumTypes";

export const pushAuditLog = (data: {
  auditType: AUDITLOG_TYPES,
  auditModule: AUDITLOG_LEVELS,

  companyId: mongoose.ObjectId;
  folderId?: mongoose.ObjectId;
  projectId?: mongoose.ObjectId;

  createdById?: mongoose.ObjectId;
  data?: {
    oldValue: string,
    newValue: string
  }
}) => {
  const queue = new Queue(
    QUEUE_NAME.PROJ_AUDIT_ADD,
    `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
  );

  return queue.add(data)
}