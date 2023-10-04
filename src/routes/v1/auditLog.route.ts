import express from 'express';
import { auditLogController } from '../../controllers/auditLog.controller';
import { validate } from '../../middlewares/validate';
import { auditLogValidations } from '../../validations/auditLog.validation';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .get(
    validate(auditLogValidations.getAuditLogs),
    auditLogController.getAuditLogs
  )

export const auditLogRoute = router;
