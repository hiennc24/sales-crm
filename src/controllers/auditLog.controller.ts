import { Request, Response } from 'express';
import { auditLogService } from '../services';
import { pick } from "../utils";
import ApiError from "../utils/ApiError";
import { catchAsync } from "../utils/catchAsync";

const getAuditLogs = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['companyId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await auditLogService.getAuditLogs(filter, options);
  res.send(result);
});

export const auditLogController = {
	getAuditLogs,
}
