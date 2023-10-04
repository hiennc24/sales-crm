import Joi from 'joi';
import { customValidations } from './custom.validation';

const createGroupWork = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    memberIds: Joi.array().items(
      Joi.string().custom(customValidations.objectId)
    ).unique(),
    projectId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.createEntityValidation,
  }),
};

const updateGroupWork = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId),
    groupWorkId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    memberIds: Joi.array().items(
      Joi.string().custom(customValidations.objectId)
    ),
  }),
};

const deleteGroupWork = {
  projectId: Joi.string().custom(customValidations.objectId),
  params: updateGroupWork.params
};

const getGroupWork = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId),
    groupWorkId: Joi.string().required(),
  })
};
const addMembers = {
  params: getGroupWork.params,
  body: Joi.object().keys({
    newUserIds: Joi.array().items(
      Joi.string().custom(customValidations.objectId)
    ),
  }),
};

const removeMember = {
  params: getGroupWork.params.append({
    memberId: Joi.string().custom(customValidations.objectId).required()
  })
};

export const groupWorkValidations = {
  createGroupWork,
  updateGroupWork,
  deleteGroupWork,
  getGroupWork,
  addMembers,
  removeMember,
}
