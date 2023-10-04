import { AccessToken } from "../models";
import { IAccessTokenDoc } from "../types";

const createAccessToken = async (body: any): Promise<IAccessTokenDoc | null> => {
  return AccessToken.create(body);
};

const getAccessToken = async (AccessTokenName: string): Promise<IAccessTokenDoc | null> => {
  return AccessToken.findOne({ AccessTokenName });
};

const findOne = async (body: any): Promise<IAccessTokenDoc | null> => {
  return AccessToken.findOne(body);
};

export const accessTokenService = {
  createAccessToken,
  getAccessToken,
  findOne,
}
