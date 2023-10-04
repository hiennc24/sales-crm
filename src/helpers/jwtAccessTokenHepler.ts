import config from "../config/config";
import { BearTokenType } from "../types";

var jwt = require('jsonwebtoken');

export function generateAccessToken(data: BearTokenType) {
  return jwt.sign(data, config.jwt.privateKey);
}