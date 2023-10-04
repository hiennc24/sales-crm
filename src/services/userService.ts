import { User } from "../models";
import { IUserDoc, IUsersDoc } from "../types";

const getUser = async (userName: string): Promise<IUserDoc | null> => {
  const user = User.findOne({ userName });
  return user
};

const getUsers = async (filter: any): Promise<IUsersDoc[] | []> => {
  return User.find(filter);
};

export const userService = {
  getUser,
  getUsers,
}
