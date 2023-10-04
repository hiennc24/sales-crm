import Joi from 'joi';
import { customValidations } from './custom.validation';

const createField = {
  body: Joi.object().keys({
    entityId: Joi.string().custom(customValidations.objectId).required(),
    onModel: Joi.string().optional().required(),
    type: Joi.string().optional().required(),
    // fieldName: Joi.string().optional().required(),
    // fieldType: Joi.string().optional().required(),
    fieldConfigs: Joi.object(),
    isFieldSystem: Joi.boolean().optional().default(false),
    
    ...customValidations.createEntityValidation,
  }),

}

const getField = {
  params: Joi.object().keys({
    fieldId: Joi.string().custom(customValidations.objectId).required(),
  })
}

const updateField = {
  params: Joi.object().keys({
    fieldId: Joi.string().custom(customValidations.objectId).required(),
  }),

  body: Joi.object().keys({
    entityId: Joi.string().custom(customValidations.objectId),
    onModel: Joi.string().optional(),
    fieldKey: Joi.string().optional(),
    fieldName: Joi.string().optional(),
    fieldType: Joi.string().optional(),
    
    ...customValidations.updateEntityValidation
  })
}

const delField = {
  params: Joi.object().keys({
    fieldId: Joi.string().custom(customValidations.objectId).required(),
  }),

  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  })
}

export const fieldValidations = {
  createField,
  getField,
  updateField,
  delField,
}