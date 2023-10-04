export type EntityLevel = "COMMENT" | "TASK" | "PHASE" | "PROJECT" | "COMPANY" | "TEMPLATE"
export const EntityLevelArr = ["COMMENT", "TASK", "PHASE", "PROJECT", "COMPANY", "TEMPLATE"]
export type PBoardTabType = "table" | "kaban" | 'chart' | 'gantt' | 'timeline' | 'calender' | 'ogsm'
export type PFieldType = "Text" |
  'Peoples' |
  'Select' |
  'Date' |
  'Range_Date' |
  'Number' |
  'Range_Number' |
  'Files' |
  'Tags' |
  'Checkbox' |
  'Progress' |
  'Assignee' |
  'Timeline' |
  'Priority' |
  'Percentage_Done' |
  'Status' |
  'Link' |
  'Description'
export interface IFieldV2ConfigOptions {
  text: string, //"Open",
  value: string, //"option_1",
  color?: string, //"#ff249d",
  isDone?: boolean,
  // isReview?: boolean,
}
export interface IFieldV2Config {
  fieldKey: string,
  fieldName: string,
  fieldType: PFieldType,
  // isFieldSystem?: boolean,
  // isSubtask?: boolean,

  fieldConfigs?: {
    defaultValue?: any;
    options?: IFieldV2ConfigOptions[]
    options_inc?: number,
    percentage_jump?: number,

    requiredWhenNew?: boolean,
    requiredWhenDone?: boolean,
  },
}

export interface IProjVerDetailDoc {
  name: string;
  description: string;
  fields: IFieldV2Config[]
  fields_inc: { [key: string]: number; }

  phases: {
    name: string,
    color: string,
    tasks: string[]
  }[]
}
export interface IPTemplateVersionModel {
  updateDescription?: string;

  pTemplate: string;

  projectDetail: IProjVerDetailDoc

  createdAt: Date;
  deleteAt?: Date;
}
// 1. Create an interface representing a document in MongoDB
export interface IProject {
  name: string;
  description?: string;
  companyId: string;
  folderId?: string;

  template?: string;

  createdAt?: Date;
  isDeleted?: boolean;
  deleteAt?: Date;

  fields: IFieldV2Config[]
  fields_inc: { [key: string]: number; }

  phases: string[]
  favorites: string[]
}

// 1. Create an interface representing a document in MongoDB
export interface IPPhaseV2Model {
  name: string;
  description: string;
  color: string,

  project: any,
  // tasks: string[]

  position: number,

  // nếu là người được share sẽ có field này
  createdAt: Date;
  createBy: string;
  deleteAt?: Date;
  deleteBy?: string;
}
export interface IPPhaseModel { // --- old
  name: string;
  projectId: any,

  color: string,
  tasks: string[]

  // nếu là người được share sẽ có field này
  createdAt: Date;
  createBy: string;
  deleteAt?: Date;
  deleteBy?: string;
}

// 1. Create an interface representing a document in MongoDB
export interface ITaskV2Model {
  name: string;
  description: string;

  parent?: any,
  phase: any,
  project: any,

  subtasks: any[];
  checklists: any[];

  assignee: string[];
  priority: string;
  status: string,
  startdate: Date;
  duedate: Date;
  timeline: {
    from: Date,
    to: Date,
  };
  result: string,
  bugget: number;

  value: Object;

  createdAt: Date;
  createBy: string;
  deleteAt?: Date;
  deleteBy?: string;
}
export interface IPTaskModel { //old ----------
  name: string;
  description: string;
  taskId?: any,
  phaseId: any,
  projectId: any,

  value: Object;
  subtasks: any[];
  checklists: any[];

  createdAt: Date;
  createBy: string;
  deleteAt?: Date;
  deleteBy?: string;
}

export interface IChecklistModel {
  name: string;
  phase: any,
  project: any,
  task: any,

  status: "pending" | "doing" | "done",
  assignee: string[];
  duedate: Date;
  priority: string;
  bugget: number;
  result: string,

  createdAt: Date;
  createBy: string;
  deleteAt?: Date;
  deleteBy?: string;
}

export type FileModel = {
  fileName?: string;
  fileId: string;
  fileType: string;
}

export interface ICommentModel {
  content: string;

  mentions: string[];

  template: string,

  company: string;
  project: string | IProject,
  phase?: string | IPPhaseModel,
  task?: string | IPTaskModel,
  // subTask?: string,
  parent?: string | ICommentModel,

  attachments?: FileModel[];
  likes: string[],

  createdAt: Date;
  createBy: string;
  updateAt?: Date;
  updateBy?: string;
  deleteAt?: Date;
  deleteBy?: string;
}

// 1. create an interface
export interface IAuditLogModel {
  auditType: string;
  auditModule: string;

  updateAt?: Date;
  updateBy: string; //idUser

  template: string,

  company?: string;
  project?: string;
  phase?: string;
  task?: string;
  subtask?: string;
  comment?: string;

  data?: object;
}

export interface IMentionModel {
  userName: string;
  comment: string;
  isRead: boolean;
  createdAt: Date;
  updateBy: string;
}
