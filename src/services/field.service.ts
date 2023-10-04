import { ProjectModel } from "./../models/project.model";
import httpStatus from "http-status";
import { FieldModel } from "../models/fields.models";
import { IFieldDoc, FIELD_TYPE_ARR, FIELD_TYPE_ARR_SYSTEM } from "../types";
import ApiError from "../utils/ApiError";
import { getFieldHelper } from "../helpers/ProjectFieldHelper";

const createField = async (body: any): Promise<IFieldDoc> => {
  const { entityId, type } = body;

  const checkTypeSystem = FIELD_TYPE_ARR_SYSTEM.findIndex(item => item === type) 

  if(checkTypeSystem >= 0 ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Type Invalid");
  }

  if (
    !!entityId &&
    !!type &&
    FIELD_TYPE_ARR.findIndex((fieldType) => fieldType == type) > -1
  ) {
    const project = await ProjectModel.findOne({
      _id: entityId,
      deletedById: { $exists: false },
    });

    if (!project) {
      throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    }

    const num_inc: number =
      !!project?.fields_inc && project.fields_inc.hasOwnProperty(type)
        ? project.fields_inc[type] + 1
        : 1;

    const fieldConfigs = getFieldHelper(
      {
        fieldType: type,
      },
      num_inc
    );

    const newField = new FieldModel({
      ...body,
      ...fieldConfigs.toJson(),
    });

    project.fields_inc = {
      ...project.fields_inc,
      ...{
        [type]: num_inc,
      },
    };

    await Promise.all([
      await newField.save(),
      await project.save(),
    ])

    return newField;
  }
};

const getField = async (fieldId: string): Promise<IFieldDoc | null> => {
  const field = await FieldModel.findOne({
    _id: fieldId,
    deletedById: { $exists: false },
  });

  if (!field) {
    throw new ApiError(httpStatus.NOT_FOUND, "Field not found");
  }

  return field;
};

const updateField = async (
  fieldId: string,
  body: any
): Promise<IFieldDoc | null> => {
  const newField = await FieldModel.findOneAndUpdate(
    {
      _id: fieldId,
      deletedById: { $exists: false },
    },
    {
      ...body,
    },
    {
      new: true,
    }
  );

  return newField;
};

const delField = async (fieldId: string, body: any): Promise<IFieldDoc> => {
  const delField = await FieldModel.findOneAndUpdate(
    {
      _id: fieldId,
      deletedById: { $exists: false },
      isFieldSystem: { $ne: true },
    },
    {
      ...body,
      deletedAt: new Date(),
    },
    {
      new: true,
    }
  );

  if (!delField) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Field not found");
  }

  return delField;
};

const getFields = async (filter: object): Promise<IFieldDoc[]> => {
  const fields = await FieldModel.find(filter);

  return fields;
};

export const fieldService = {
  createField,
  getField,
  updateField,
  delField,
  getFields,
};
