import Joi from "joi";

export enum FIELD_TYPES {
  // field system
  NAME = "name",
  DESCRIPTION = "description",
  RELATE = "relate",
  QUANTITY = "quantity",
  PRICE = "price",
  // ORIGIN = 'origin',

  // field custom
  TEXT = "text",
  DECIMAL = "decimal",
  INTEGER = "integer",
  PERCENTAGE = "percentage",
  CURRENCY = "currency",
  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
  EMAIL = "email",
  PHONE = "phone",
  PICKLIST = "picklist",
  MULTISELECT = "multiselect",
  URL = "url",
  CHECKBOX = "checkbox",
  INFO = "info",
  SKYPE = "skype",
  ZALO = "zalo",
  TELEGRAM = "telegram",
  COLOR = "color",

  // RANGE_DATE = 'range_date',
  // FILE = 'file',
  // IMAGE = 'image',
}
export enum FIELDCUSTOM_TYPES {
  TEXT = "text",
  DECIMAL = "decimal",
  INTEGER = "integer",
  PERCENTAGE = "percentage",
  CURRENCY = "currency",
  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
  EMAIL = "email",
  PHONE = "phone",
  PICKLIST = "picklist",
  MULTISELECT = "multiselect",
  URL = "url",
  CHECKBOX = "checkbox",
  INFO = "info",

  SKYPE = "skype",
  ZALO = "zalo",
  TELEGRAM = "telegram",
  COLOR = "color",

  // RANGE_DATE = 'range_date',
  // FILE = 'file',
  // IMAGE = 'image',
}

export const fieldTypeValid = Joi.string()
  .valid(
    "text",
    "decimal",
    "integer",
    "percentage",
    "currency",
    "date",
    "time",
    "datetime",
    "email",
    "phone",
    "picklist",
    "url",
    "checkbox",
    "info",
    "multiselect",
    "skype",
    "zalo",
    "telegram",
    "color"
  )
  .required();

export type FIELDSYSTEM_TYPES =
  | "name"
  | "description"
  | "brand"
  | "quantity"
  | "price"
  | "origin";
export const FIELDSYSTEM_ARR = [
  "name",
  "description",
  "brand",
  "quantity",
  "price",
  "origin",
];

export const fieldSystemRequired = [
  {
    fieldTitle: "FIELD_NAME",
    fieldType: "name",
    position: 0,
    isRequired: true,
  },
  {
    fieldTitle: "FIELD_DESCRIPTION",
    fieldType: "description",
    position: 1,
    isRequired: true,
  },
  {
    fieldTitle: "FIELD_BRAND",
    fieldType: "brand",
    position: 2,
    isRequired: false,
  },
  {
    fieldTitle: "FIELD_QUANTITY",
    fieldType: "quantity",
    position: 3,
    isRequired: false,
  },
  {
    fieldTitle: "FIELD_PRICE",
    fieldType: "price",
    position: 4,
    isRequired: false,
  },
  {
    fieldTitle: "FIELD_PRICE",
    fieldType: "origin",
    position: 5,
    isRequired: false,
  },
];
export const fieldSystemTypeToggleValid = Joi.string()
  .valid("brand", "quantity", "price", "origin")
  .required();

export interface IFieldHelper {
  fieldTitle: string;
  fieldType: FIELD_TYPES;

  defaultValue?: any;
  required?: boolean;
  maxLength?: number;
}

export type PFieldType =
  | "Text"
  | "Peoples"
  | "Select"
  | "Date"
  | "Range_Date"
  | "Number"
  | "Range_Number"
  | "Files"
  | "Tags"
  | "Checkbox";

export const FIELD_TYPE_ARR: PFieldType[] = [
  "Text",
  "Peoples",
  "Select",
  "Date",
  "Range_Date",
  "Number",
  "Range_Number",
  "Files",
  "Tags",
  "Checkbox",
];

export type PFieldKey = 
  | "assignee"
  | "timeline"
  | "priority"
  | "percentage_done"
  | "status"
  | "file"
  | "tags"
  | "link"
  | "text"
  | "range_number"
  | "number"
  | "checkbox";

export const FILED_KEY_ARR: PFieldKey[] = [
  "assignee",
  "timeline",
  "priority",
  "percentage_done",
  "status",
  "file",
  "tags",
  "link",
  "text",
  "range_number",
  "number",
  "checkbox",
];

export type PFieldName = 
  | "Assignee"
  | "Timeline"
  | "Priority"
  | "Percentage_done"
  | "Status"
  | "File"
  | "Tags"
  | "Link"
  | "Text"
  | "Range_number"
  | "Number"
  | "Checkbox";

export const FILED_NAME_ARR: PFieldName[] = [
  "Assignee",
  "Timeline",
  "Priority",
  "Percentage_done",
  "Status",
  "File",
  "Tags",
  "Link",
  "Text",
  "Range_number",
  "Number",
  "Checkbox",
];

export const FILED_KEY_ARR_SYSTEM: PFieldKey[] = [
  "assignee",
  "timeline",
  "priority",
  "percentage_done",
  "status",
  "file",
];

export const FILED_NAME_ARR_SYSTEM: PFieldName[] = [
  "Assignee",
  "Timeline",
  "Priority",
  "Percentage_done",
  "Status",
  "File",
];

export const FIELD_TYPE_ARR_SYSTEM: PFieldType[] = [
  "Peoples",
  "Date",
  "Select",
  "Range_Number",
  "Checkbox",
  "Files",
];

export interface IFieldConfig {
  fieldKey?: string,
  fieldName?: string,
  fieldType: PFieldType,

  fieldConfigs?: object,
  // // fieldSettings?: any,
}

export const KEY_SYSTEM = {
  assignee: "Peoples",
  timeline: "Date",
  priority: "Select",
  percentage_done: "Range_Number",
  status: "Checkbox",
  file: "Files",
}