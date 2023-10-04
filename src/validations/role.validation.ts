import Joi from 'joi';
import { PERMISSIONS } from '../types/enumTypes';
import { customValidations } from './custom.validation';

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.array().items(
      Joi.string().valid(...Object.values(PERMISSIONS))
    ).min(1).unique().required(),
    projectId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.createEntityValidation,
  }),
};

const updateRole = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId),
    roleId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    permissions: Joi.array().items(
      Joi.string().valid(...Object.values(PERMISSIONS))
    ),
  }),
};

const deleteRole = {
  projectId: Joi.string().custom(customValidations.objectId),
  params: updateRole.params
};

export const roleValidations = {
  createRole,
  updateRole,
  deleteRole,
}
