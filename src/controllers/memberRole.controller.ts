import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { memberRoleService } from '../services';
import { catchAsync } from '../utils/catchAsync';

const addUserMember = catchAsync(async (req: Request, res: Response) => {
	const { roleId } = req.params;
	await memberRoleService.createMemberRole({
		...req.body,
		roleId
	});
	res.status(httpStatus.NO_CONTENT).send(req.body)
});

const deleteUserMember = catchAsync(async (req: Request, res: Response) => {
	await memberRoleService.deleteMemberRole({
		...req.params
	});
	res.status(httpStatus.NO_CONTENT).send()
});

export const memberRoleController = {
	addUserMember,
	deleteUserMember,
}
