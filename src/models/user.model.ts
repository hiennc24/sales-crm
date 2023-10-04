import mongoose, { Model } from 'mongoose';
import { toJSON, paginate } from './plugins';
import { IUserDoc } from '../types';
import { IModel } from '../types/mongooseTypes';
import { TABLE_COMPANY, TABLE_USER } from '../config';

export interface IUserModel extends IModel<IUserDoc> { }
const userSchema = new mongoose.Schema<IUserDoc, Model<IUserDoc>>(
  {
    userId: String,//1
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
    }, //2
    name: String,//admin,
    surname: String,//admin,
    userName: String,//admin,
    emailAddress: String,//admin@aspnetzero.com,
    phoneNumber: {
      type: String, require: false
    },//null,
    profilePictureId: {
      type: String, require: false
    },//null,
    isActive: {
      type: Boolean, default: true
    },//true,
    creationTime: Date,//2021-07-24T17:53:09.752915,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('fullName')
  .get(function () {
    return [this.surname, this.name].filter(str => !!str).join(" ")
  })

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * @typedef User
 */
export const User = mongoose.model<IUserDoc, IUserModel>(TABLE_USER, userSchema);
