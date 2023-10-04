import { IUserDoc } from "./entityTypes";
import { IUserModel } from "../models";
import { IDoc } from "./entityTypes";
import mongoose from 'mongoose';

export interface IAccessTokenDoc extends IDoc {
  user: mongoose.ObjectId,
  token: string;
  multitenantToken: string;
  expiredAt: Date,
  // encryptedAccessToken: String,
  refreshToken: string,
  refreshTokenExpireInSeconds: number,
  // createAt: Date;
  // expiredAt: Date;

  userInfo: IUserDoc
}

export interface IGroupModel {
  name: string;
  company: string;
  project?: string;
  members: string[];

  createAt: Date;
  createBy: string;
  deleteAt?: Date;
  deleteBy?: string;
}
// export interface IGroupMembersModel {
//   user: string;
//   group: string;

//   createAt: Date;
//   createBy: string;
// }
export interface IProjectMembersModel {
  project: string;
  user?: string;
  group?: string;
  roles: string[];

  createAt: Date;
  createBy: string;
  deleteAt?: Date;
  deleteBy?: string;
}

export interface MultitenantAPIWrap<T> {
  result: {
    results: T,
    responseStatus: {
      "errorCode": string,
      "message": string
    }
  };
  // "targetUrl": null,
  "success": boolean,
  // "error": null,
  "unAuthorizedRequest": boolean,
}

export interface BearTokenType {
  user: IUserDoc,
  accesstoken: string
}
export interface GlobalUserInfo {
  _id: string
  user: {
    _id: string
    company: {
      isActive: true
      _id: string
      tenancyId: string //5,
      tenancyName: string //theanh2,
      name: string //"the anh 2",
    }
  }
}
