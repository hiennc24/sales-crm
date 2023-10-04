import Joi from 'joi';
import { PERMISSIONS } from '../types/enumTypes';
import { customValidations } from './custom.validation';

const addUserMember = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId).required(),
    roleId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    userId: Joi.string().custom(customValidations.objectId).required(),
  }),
};
const deleteUserMember = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId).required(),
    roleId: Joi.string().custom(customValidations.objectId).required(),
    userId: Joi.string().custom(customValidations.objectId).required(),
  }),
};

const addGroupMember = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId).required(),
    roleId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    groupId: Joi.string().custom(customValidations.objectId).required(),
  }),
};
const deleteGroupMember = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId).required(),
    roleId: Joi.string().custom(customValidations.objectId).required(),
    groupId: Joi.string().custom(customValidations.objectId).required(),
  }),
};

export const userMemberRoleRouteValidations = {
  addGroupMember,
  deleteGroupMember,
  addUserMember,
  deleteUserMember,
}
