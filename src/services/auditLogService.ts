import { AuditLogModel } from "../models/auditLog.model";
import { IAuditLogDoc } from "../types";

const createAuditLog = async (body: any): Promise<IAuditLogDoc | null> => {
  return AuditLogModel.create(body);
};

const getAuditLogs = async (filter: any, options: any): Promise<IAuditLogDoc | null> => {
  return AuditLogModel.paginate(filter, options);
};

export const auditLogService = {
  createAuditLog,
  getAuditLogs,
}
