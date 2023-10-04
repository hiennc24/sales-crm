import mongoose, { Model } from 'mongoose';
import { TABLE_COMPANY } from '../config';
import { ICompanyDoc, IModel } from '../types';
mongoose.Promise = require('bluebird');
import { toJSON, paginate } from './plugins';

// 2. Create a Schema corresponding to the document interface.
// const CompanyModelSchema = new Schema<CompanyModelDoc>({

export interface CompanyModelDoc extends IModel<ICompanyDoc> { }
const companySchema = new mongoose.Schema<ICompanyDoc, Model<ICompanyDoc>>({
  tenancyId: String, //2
  tenancyName: String, //Biso24,
  name: String, //Công ty thương mại,
  isActive: {
    type: Boolean, default: true
  },//true,
  // creationTime: Date, //2021-08-22T10:45:04.371498,
  // editionDisplayName: String, // Standard,
  // connectionString: null,
  // subscriptionEndDateUtc: null,
  // editionId: string, //1,
  // isInTrialPeriod: false,
});
// add plugin that converts mongoose to json
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

export const Company = mongoose.model<ICompanyDoc, CompanyModelDoc>(TABLE_COMPANY, companySchema);
