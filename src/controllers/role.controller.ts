import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { roleService } from '../services';
import ApiError from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';

const createRole = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const role = await roleService.createRole({
		...req.body,
	});
	if (!role) {
		next(new ApiError(httpStatus.NOT_FOUND, 'Role not found'));
	}
	res.send(role)
});

const updateRole = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const role = await roleService.updateRole(req.params.roleId, {
		...req.body,
	});
	if (!role) {
		next(new ApiError(httpStatus.NOT_FOUND, 'Role not found'));
	}
	res.send(role)
});

const deleteRole = catchAsync(async (req: Request, res: Response) => {
	await roleService.deleteRole(req.params.roleId);
	res.status(httpStatus.NO_CONTENT).send()
});

export const roleController = {
	createRole,
	updateRole,
	deleteRole,
}
