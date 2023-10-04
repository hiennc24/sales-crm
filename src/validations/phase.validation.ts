import Joi from 'joi';
import { customValidations } from './custom.validation';

const createPhase = {
  // params: Joi.object().keys({
  //   projectId: Joi.string().custom(customValidations.objectId).required(),
  // }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    position: Joi.number().required(),
    projectId: Joi.string().custom(customValidations.objectId).required(),

    companyId: Joi.string().custom(customValidations.objectId).required(),
    ...customValidations.createEntityValidation,
  }),
};

const getPhase = {
  params: Joi.object().keys({
    phaseId: Joi.string().custom(customValidations.objectId).required(),
  })
}

const getPhases = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(customValidations.objectId).required(),
  })
}

const updatePhase = {
  params: Joi.object().keys({
    phaseId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    folderId: Joi.string().custom(customValidations.objectId).empty(),
    position: Joi.number(),
    
    ...customValidations.updateEntityValidation,
  }),
};

const deletePhase = {
  params: Joi.object().keys({
    phaseId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

export const phaseValidations = {
  createPhase,
  updatePhase,
  getPhase,
  deletePhase,
  getPhases,
}
