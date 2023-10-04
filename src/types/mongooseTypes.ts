import * as mongoose from 'mongoose';

export interface IModel<T> extends mongoose.Model<T> {
  toJSON: any
  paginate: any,
  aggregatePaginate: any,
}