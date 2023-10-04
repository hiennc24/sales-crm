import mongoose, { Model } from 'mongoose';
import { toJSON } from './plugins';
import { IAccessTokenDoc } from '../types';
import { IModel } from '../types/mongooseTypes';
import { TABLE_ACCESSTOKEN, TABLE_USER, userPopulateFields } from '../config';

export interface IAccessTokenModel extends IModel<IAccessTokenDoc> { }
const accessTokenSchema = new mongoose.Schema<IAccessTokenDoc, Model<IAccessTokenDoc>>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
    },
    token: String,
    multitenantToken: String,
    expiredAt: Date,
    // encryptedAccessToken: String,
    refreshToken: String,
    refreshTokenExpireInSeconds: Number,
    // createAt: Date;
    // expiredAt: Date;
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
accessTokenSchema.virtual('userInfo', {
  ref: TABLE_USER,
  localField: 'user',
  foreignField: '_id',
  justOne: true
});
// add plugin that converts mongoose to json
accessTokenSchema.plugin(toJSON);

const populateArr = [
  { path: 'userInfo', select: userPopulateFields },
];
function populates() {
  this.populate(populateArr)
}
accessTokenSchema.pre("findOne", populates);
accessTokenSchema.pre('find', populates);

/**
 * @typedef AccessToken
 */
export const AccessToken = mongoose.model<IAccessTokenDoc, IAccessTokenModel>(TABLE_ACCESSTOKEN, accessTokenSchema);
