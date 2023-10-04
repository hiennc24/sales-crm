import { Request, Response } from 'express';
import { memberRoleService, userService } from '../services';
import { catchAsync } from '../utils/catchAsync';
import { pick } from "../utils";

const getProjectMember = catchAsync(async (req: Request, res: Response) => {
  const memberRoles = await memberRoleService.getMemberRoles(req.params);
  let memberRoleMaps = {}, arrMembers = [];
  for (let item of memberRoles) {
    if (!item.userId) continue;
    let memberId = item.userId.toString();
    let role = item.roles.length ? pick(item.roles[0], ['_id', 'name']) : {};
    if (memberRoleMaps[memberId]) {
      if (!item.roles.length) continue;
      memberRoleMaps[memberId].push(role);
    }
    else {
      arrMembers.push(memberId);
      memberRoleMaps[memberId] = item.roles.length ? [role] : [];
    }
  }
  const users = (await userService.getUsers({ _id: arrMembers })).map(o => {
    return {
      _id: o._id,
      name: o.name,
      surname: o.surname,
      userName: o.userName,
      fullName: o.fullName,
      emailAddress: o.emailAddress,
      roles: memberRoleMaps[o._id.toString()] || []
    }
  });
  res.send({ users });
});

export const projectMemberController = {
  getProjectMember,
}
