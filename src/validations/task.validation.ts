import Joi from 'joi';
import { customValidations } from './custom.validation';

const createTask = {
  body: Joi.object().keys({
    phaseId: Joi.string().custom(customValidations.objectId),
    projectId: Joi.string().custom(customValidations.objectId).required(),
    value: Joi.object().optional().default('New Task').required(),
    name: Joi.string().required(),

    ...customValidations.createEntityValidation,
  }),
}

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(customValidations.objectId)
  })
}

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(customValidations.objectId)
  }),

  body: Joi.object().keys({
    phaseId: Joi.string().custom(customValidations.objectId),
    projectId: Joi.string().custom(customValidations.objectId),
    value: Joi.object(),
    name: Joi.string().optional().default('New Task'),

    ...customValidations.updateEntityValidation
  })
}

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(customValidations.objectId)
  }),

  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  })
}

export const taskValidations = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
}