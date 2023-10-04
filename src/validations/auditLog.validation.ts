import Joi from 'joi';
import { AUDITLOG_LEVELS } from '../types/enumTypes';
import { customValidations } from './custom.validation';

const getAuditLogs = {
  body: Joi.object().keys({
    companyId: Joi.string().custom(customValidations.objectId),

    ...customValidations.paginateValidation,
  }),
};

export const auditLogValidations = {
  getAuditLogs,
}
