import Joi from 'joi';
import { customValidations } from './custom.validation';

const createFolder = {
  body: Joi.object().keys({
    companyId: Joi.string().custom(customValidations.objectId).required(),
    name: Joi.string().required(),

    parentId: Joi.string().custom(customValidations.objectId),

    ...customValidations.createEntityValidation,
  }),
};

const updateFolder = {
  params: Joi.object().keys({
    folderId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    companyId: Joi.string().custom(customValidations.objectId),
    name: Joi.string(),

    parentId: Joi.string().custom(customValidations.objectId),
    
    ...customValidations.updateEntityValidation
  }),
};

const getFolderById = {
  params: Joi.object().keys({
    folderId: Joi.string().custom(customValidations.objectId).required(),
  })
}

const deleteFolder = {
  params: Joi.object().keys({
    folderId: Joi.string().custom(customValidations.objectId).required(),
  }),

  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
}

export const folderValidations = {
  createFolder,
  updateFolder,
  getFolderById,
  deleteFolder,
}
