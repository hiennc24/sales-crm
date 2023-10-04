import { FileMimeTypes } from "../constants/fileType.constants";
import { IFieldConfig, PFieldType } from "../types";

const validateDatePatt = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+/
export const getFieldHelper = (field: IFieldConfig, inc?: number) => {
  const fTypeObject = {
    "Assignee": () => {
      return new AssigneeFieldConfig(field, inc)
    },
    "Timeline": () => {
      return new TimelineFieldConfig(field, inc)
    },
    "Priority": () => {
      return new PriorityFieldConfig(field, inc)
    },
    "Percentage_Done": () => {
      return new PercentageDoneFieldConfig(field, inc)
    },
    "Status": () => {
      return new StatusFieldConfig(field, inc)
    },
    "Text": () => {
      return new TextFieldConfig(field, inc)
    },
    "Peoples": () => {
      return new PeoplesFieldConfig(field, inc)
    },
    "Select": () => {
      console.log("getField Select")
      return new SelectFieldConfig(field, inc)
    },
    "Date": () => {
      return new DateFieldConfig(field, inc)
    },
    "Range_Date": () => {
      return new RangeDateFieldConfig(field, inc)
    },
    "Number": () => {
      return new NumberFieldConfig(field, inc)
    },
    "Range_Number": () => {
      return new RangeNumberFieldConfig(field, inc)
    },
    "Files": () => {
      return new FilesFieldConfig(field, inc)
    },
    "Tags": () => {
      return new TagsFieldConfig(field, inc)
    },
    "Checkbox": () => {
      return new CheckboxFieldConfig(field, inc)
    },
    "Progress": () => {
      return new ProgressFieldConfig(field, inc)
    },
    "Link": () => {
      return new LinkFieldConfig(field, inc)
    },
    "Description": () => {
      return new DescriptionFieldConfig(field, inc)
    },
  }
  return fTypeObject[field.fieldType]()
}

export class FieldConfig implements IFieldConfig {
  fieldKey: string;
  fieldName: string;
  fieldType: PFieldType;

  fieldConfigs?: {
    defaultValue?: any;
    options?: {
      text: string; value: string; color?: string | undefined;
    }[] | undefined;
    options_inc?: number | undefined;
    requiredWhenNew?: boolean | undefined;
    requiredWhenDone?: boolean | undefined;
  } | undefined;

  constructor(field: IFieldConfig, inc = 1) {
    this.fieldType = field.fieldType
    this.fieldKey = field.fieldKey || `${this.fieldType.toLocaleLowerCase()}_${inc}`
    this.fieldName = field.fieldName || `${this.fieldType} ${inc}`
    this.fieldConfigs = !!field.fieldConfigs ? field.fieldConfigs : this.getDefaultFieldConfigs()
  }

  public inValid(value: any) {
    return !value;
  }

  getDefaultFieldConfigs() {
    console.log("getDefaultFieldConfigs: FieldConfig")
    return {
      defaultValue: this.getDefaultVaue()
    }
  }

  getDefaultVaue(): any {
    return !!this.fieldConfigs?.defaultValue
      ? this.fieldConfigs.defaultValue
      : this.getNullValue()
  }

  getNullValue(): any {
    return null
  }

  // forText
  validate(value: any): boolean {
    return typeof (value) == "string" || typeof (value) == "number"
  }
  formatData(value: any) {
    return value.toString()
  }
  getNewValue(value: any) {
    return this.formatData(value)
  }
  // end forText

  validateDefaultValue(value: any): boolean {
    return this.validate(value)
      || value == null
  }
  formatDefaultValue(value: any) {
    return (
      value == null
    )
      ? undefined
      : this.formatData(value)
  }

  toJson(): IFieldConfig {
    return {
      fieldKey: this.fieldKey,
      fieldName: this.fieldName,
      fieldType: this.fieldType,
      fieldConfigs: this.fieldConfigs
    }
  }
}
export class ArrayFieldConfig extends FieldConfig {

  inValid(value: any) {
    return super.inValid(value) || value == [];
  }

  getNullValue(): any {
    return []
  }

  validate(value: any): boolean {
    //TODO validate people ids
    return Array.isArray(value)
  }

  formatDefaultValue(value: any) {
    return (
      value == null
      || (Array.isArray(value) && value.length == 0)
    )
      ? undefined
      : this.formatData(value)
  }
}

// return string
export class TextFieldConfig extends FieldConfig {
  validate(value: any): boolean {
    return typeof (value) == "string" || typeof (value) == "number" || value === null
  }
  formatData(value: any) {
    return value === null ? null : value.toString()
  }
}
export class DescriptionFieldConfig extends TextFieldConfig { }

export class SelectFieldConfig extends FieldConfig {
  getDefaultVaue() {
    return "option_1"
  }
  getDefaultFieldConfigs() {
    console.log("getDefaultFieldConfigs: SelectFieldConfig")
    return {
      options: [
        {
          text: "Option 1",
          value: "option_1",
          color: 'rgb(196, 196, 196)'
        },
        {
          text: "Option 2",
          value: "option_2",
          color: '#6e8b3d'
        },
        {
          text: "Option 3",
          value: "option_3",
          color: '#2acaea'
        },
        {
          text: "Option 4",
          value: "option_4",
          color: 'rgb(0, 200, 117)'
        }
      ],
      options_inc: 4,
      defaultValue: this.getDefaultVaue()
    }
  }

  //update select
  validate(value: any): boolean {
    return (
      (typeof (value) == "string" || typeof (value) == "number")
      && !!this.fieldConfigs?.options && this.fieldConfigs.options.findIndex(
        (vItem: any) => vItem.value == this.formatData(value)
      ) != -1
    )
    // || value == null
  }
  // end select
}
export class PriorityFieldConfig extends SelectFieldConfig {
  getDefaultFieldConfigs() {
    console.log("getDefaultFieldConfigs: PriorityFieldConfig")
    return {
      options: [
        {
          text: "High",
          value: "option_1",
          color: '#ff249d'
        },
        {
          text: "Medium",
          value: "option_2",
          color: '#6e8b3d'
        },
        {
          text: "Low",
          value: "option_3",
          color: '#2acaea'
        }
      ],
      options_inc: 3,
      defaultValue: this.getDefaultVaue()
    }
  }
}
export class StatusFieldConfig extends SelectFieldConfig {
  getDefaultFieldConfigs() {
    console.log("getDefaultFieldConfigs: StatusFieldConfig")
    return {
      options: [
        {
          text: "Open",
          value: "option_1",
          color: 'rgb(196, 196, 196)'
        },
        {
          text: "To Do",
          value: "option_2",
          color: '#6e8b3d'
        },
        {
          text: "In Progress",
          value: "option_3",
          color: '#2acaea'
        },
        {
          text: "Done",
          value: "option_4",
          color: 'rgb(0, 200, 117)'
        }
      ],
      options_inc: 4,
      defaultValue: this.getDefaultVaue()
    }
  }
}

// return array
// string[]
export class PeoplesFieldConfig extends ArrayFieldConfig {
  formatData(value: any) {
    return value.map((vItem: string | number) => vItem.toString())
  }
}
export class AssigneeFieldConfig extends PeoplesFieldConfig { }

export class FilesFieldConfig extends ArrayFieldConfig {
  validate(value: any): boolean {
    //TODO validate people ids
    return Array.isArray(value)
      && value
        .map((fObj: {
          fileName: string,
          fileId: string,
          fileMimeType: string
        }) => {
          return !!fObj.fileName && !!fObj.fileId && !!fObj.fileMimeType
            && typeof (fObj.fileName == 'string')
            && typeof (fObj.fileId == 'string')
            && FileMimeTypes.indexOf(fObj.fileMimeType) > -1
        })
        .findIndex(isVal => isVal === false) == -1
  }
  formatData(value: any) {
    return value
  }
}
export class TagsFieldConfig extends ArrayFieldConfig {
  validate(value: any): boolean {
    //TODO validate people ids
    return Array.isArray(value)
      && value.findIndex(v => typeof (v) != "string") == -1
    // && value
    //   .map((vItem: string) => {
    //     return !!this.fieldConfigs?.options && this.fieldConfigs.options
    //       .map((oItem: {
    //         text: string,//"Tag 1",
    //         value: string, //"tag_1"
    //       }) => oItem.value === vItem.toString())
    //       .findIndex((isVal: boolean) => isVal === true) > -1
    //   })
    //   .findIndex((isVal: boolean) => isVal === false) == -1
  }

  formatData(value: any) {
    return value.map((vItem: string | number) => vItem.toString())
  }
  formatDefaultValue(value: any) {
    return (
      value == null
      || (Array.isArray(value) && value.length == 0)
    )
      ? undefined
      : this.formatData(value)
  }
}

// return ISO date
export class DateFieldConfig extends FieldConfig {
  validate(value: any): boolean {
    return validateDatePatt.test(value) || value === null
  }
  formatData(value: any) {
    return value
  }
}

export class RangeDateFieldConfig extends FieldConfig {
  validate(value: any): boolean {
    return !!value && !!value.from && !!value.to
      && validateDatePatt.test(value.from)
      && validateDatePatt.test(value.to)
      && value.from < value.to
  }
  formatData(value: any) {
    return value
  }
}
export class TimelineFieldConfig extends RangeDateFieldConfig { }

export class NumberFieldConfig extends FieldConfig {
  validate(value: any): boolean {
    // return !isNaN(value)
    return typeof (value) == 'number' || value === null
  }
  formatData(value: any) {
    return value
  }
}
export class RangeNumberFieldConfig extends FieldConfig {
  validate(value: any): boolean {
    return !isNaN(value?.from) && !isNaN(value?.to)
      && value.from < value.to
  }
  formatData(value: any) {
    return {
      "from": Number(value.from),
      "to": Number(value.to)
    }
  }
}

// return boolean
export class CheckboxFieldConfig extends FieldConfig {
  getNullValue(): any {
    return false
  }

  // updateField
  validate(value: any): boolean {
    return typeof (value) == "boolean"
  }
  formatData(value: any) {
    return value
  }
}

export class ProgressFieldConfig extends FieldConfig {
  getNullValue(): any {
    return 0
  }
  validate(value: any): boolean {
    return typeof (value) == 'number'
      && value >= 0 && value <= 100
  }
  formatData(value: any) {
    return value
  }
  getNewValue(value: any) {
    return this.formatData(value)
  }
  validateDefaultValue(value: any): boolean {
    return this.validate(value)
  }
  formatDefaultValue(value: any) {
    return this.formatData(value)
  }
  toJson(): IFieldConfig {
    return {
      fieldKey: this.fieldKey,
      fieldName: this.fieldName,
      fieldType: this.fieldType,
      fieldConfigs: this.fieldConfigs
    }
  }
}
export class PercentageDoneFieldConfig extends ProgressFieldConfig { }
export class LinkFieldConfig extends FieldConfig {
  // forLink
  validate(value: any): boolean {
    return (
      typeof (value) == "object"
      && !!value.displayText && !!value.url
    ) || value == null
  }
  formatData(value: any) {
    return value
  }
  // end forLink
}

