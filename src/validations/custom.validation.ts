import Joi from 'joi';

const objectId = (value: any, helpers: any) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const roomKey = (value: string, helpers: any) => {
  if (
    value.indexOf("group-") == 0
  ) {
    return value;
  } else {
    const ids = value.split("-");
    if (
      ids.length == 2
      && ids[0] < ids[1]
      && ids.map((str: string) => str.match(/^[0-9a-fA-F]{24}$/)).filter((a: any) => !a).length == 0
    ) {
      return value;
    } else {
      return helpers.message('"{{#label}}" must be a valid roomKey');
    }
  }
};

const password = (value: any, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const paginateValidation = {
  sortBy: Joi.string(),
  limit: Joi.number().integer(),
  page: Joi.number().integer(),
};

const searchValidation = {
  search: Joi.string(),
};

const createEntityValidation = {
  createdById: Joi.string().custom(objectId).required(),
};

const updateEntityValidation = {
  updatedById: Joi.string().custom(objectId).required(),
};

const createEntityValidationWhenFind = {
  createdById: Joi.string().custom(objectId),
};

const deleteEntityValidation = {
  deletedById: Joi.string().custom(objectId).required(),
};

export const customValidations = {
  objectId,
  password,
  roomKey,
  paginateValidation,
  createEntityValidation,
  createEntityValidationWhenFind,
  updateEntityValidation,
  deleteEntityValidation,
  searchValidation,
}
