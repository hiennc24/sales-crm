import Joi from 'joi';
import { customValidations } from './custom.validation';

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    folderId: Joi.string().custom(customValidations.objectId),

    companyId: Joi.string().custom(customValidations.objectId).required(),
    ...customValidations.createEntityValidation,
  }),
};

const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    folderId: Joi.string().custom(customValidations.objectId),

    ...customValidations.updateEntityValidation
  }),
};

const assignRole = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    roleIds: Joi.array().items(
      Joi.string().valid(...Object.values(customValidations.objectId))
    ),
    userIds: Joi.array().items(
      Joi.string().valid(...Object.values(customValidations.objectId))
    ).default([]),
    groupWorkIds: Joi.array().items(
      Joi.string().valid(...Object.values(customValidations.objectId))
    ).default([]),
  }),
};

const getProject = {
  params: Joi.object().keys({
    projectId: Joi.string().valid(...Object.keys(customValidations.objectId))
  })
}

const deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.string().valid(...Object.keys(customValidations.objectId))
  }),

  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  })
}

export const projectValidations = {
  createProject,
  updateProject,
  assignRole,
  getProject,
  deleteProject,
}
