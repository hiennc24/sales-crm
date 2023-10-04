const axios = require('axios');
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from '../services';
import { catchAsync } from '../utils/catchAsync';
import { pick } from '../utils';
import ApiError from '../utils/ApiError';
import mongoose from 'mongoose';
import { generateAccessToken } from '../helpers/jwtAccessTokenHepler';
import { accessTokenService } from '../services/accessTokenService';

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userName, password } = req.body;

  // MultitenantHelper.login(userName, password)
  //   .then(loginRes => {
  //     // console.log("1111111", loginRes.data.results)
  //     if (loginRes.data.responseStatus.errorCode == "00") {

  const user = await userService.getUser(userName)
  if (!user) {
    next(new ApiError(httpStatus.NOT_FOUND, 'User not found'));
  }
  // console.log("1111111", user)
  // res.send({
  //   code: 200,
  //   data: user
  // })
  // const {
  //   accessToken, expireInSeconds, refreshToken, refreshTokenExpireInSeconds
  // } = loginRes.data.results;
  const newAccesstokenId = new mongoose.Types.ObjectId();
  const token = generateAccessToken({
    user,
    accesstoken: newAccesstokenId.toString()
  });

  Promise.all([
    axios.post(
      process.env.INCOM_API + "/api/v1/auth/verify",
      {},
      {
        // httpsAgent: agentApi,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ),
    accessTokenService.createAccessToken({
      _id: newAccesstokenId,
      user: user.id,
      token: token,
      // multitenantToken: accessToken,
      // expiredAt: new Date(Date.now() + (expireInSeconds * 1000)),
      // encryptedAccessToken: String,
      // refreshToken: refreshToken,
      // refreshTokenExpireInSeconds: refreshTokenExpireInSeconds,
    })
  ])
    .then((values) => {
      res.send({
        code: 200,
        data: token,
        userInfo: values[0].data.data
      })
    })
    .catch(err => {
      console.log("11111", err)
      next(err.message)
    })
});

export const authController = {
  login,
}
