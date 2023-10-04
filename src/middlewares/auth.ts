import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { accessTokenService } from '../services/accessTokenService';
import { BearTokenType } from '../types';
import ApiError from '../utils/ApiError';
import mongoose from 'mongoose'

export function auth(req: Request, res: Response, next: any) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return next("Unauthorized")

  jwt.verify(token, process.env.PRIVATE_KEY as string, async (err: any, data: BearTokenType) => {

    if (err) return next(new ApiError(httpStatus.UNAUTHORIZED, "TOKEN_INVALID"))

    const accessToken = await accessTokenService.findOne({
      _id: new mongoose.Types.ObjectId(data.accesstoken).toString(),
    })
    if (!!accessToken) {
      req.userId = accessToken.user.toString();
      req.companyId = accessToken.userInfo.company.toString();
      next()
    } else {
      return next(new ApiError(httpStatus.UNAUTHORIZED, "TOKEN_INVALID"))
    }
  })
}
