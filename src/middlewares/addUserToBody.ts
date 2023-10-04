import { Request, Response } from 'express';
import { RequestParams } from '../types';

export const addDataToBody = (body: { [x: string]: RequestParams }) => (req: Request, res: Response, next: any) => {
  console.log("addDataToBody")
  Object.keys(body).forEach(key => {
    req.body[key] = req[body[key]];
  })
  next()
}

export function addCreateByToBody(req: Request, res: Response, next: any) {
  req.body.createBy = req.userInfo.id.toString();
  next()
}

export function addTubeTypeToBody(req: Request, res: Response, next: any) {
  req.body.tubeType = req.params.tubeType;
  next()
}

export function addDeleteByByToBody(req: Request, res: Response, next: any) {
  req.body.deleteBy = req.userInfo.id.toString();
  req.body.deleteAt = new Date();
  next()
}
