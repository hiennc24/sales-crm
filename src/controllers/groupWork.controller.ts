import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { groupWorkService } from '../services';
import { catchAsync } from '../utils/catchAsync';

const createGroupWork = catchAsync(async (req: Request, res: Response) => {
	const groupWork = await groupWorkService.createGroupWork({
		...req.body,
	});
	res.send(groupWork)
});

const updateGroupWork = catchAsync(async (req: Request, res: Response) => {
	const groupWork = await groupWorkService.updateGroupWork(req.params.groupWorkId, {
		...req.body,
	});
	res.send(groupWork)
});

const deleteGroupWork = catchAsync(async (req: Request, res: Response) => {
	await groupWorkService.deleteGroupWork(req.params.groupWorkId);
	res.status(httpStatus.NO_CONTENT).send()
});

const getGroupWork = catchAsync(async (req: Request, res: Response) => {
	const groupWork = await groupWorkService.getGroupWork(req.params.groupWorkId);
	res.send(groupWork)
});

const addMembers = catchAsync(async (req: Request, res: Response) => {
	const groupWork = await groupWorkService.addMembers(req.params.groupWorkId, req.body.newUserIds);
	res.send(groupWork)
});

const removeMember = catchAsync(async (req: Request, res: Response) => {
	const groupWork = await groupWorkService.removeMember(req.params.groupWorkId, req.params.memberId);
	res.send(groupWork)
});

export const groupWorkController = {
	createGroupWork,
	updateGroupWork,
	deleteGroupWork,
	getGroupWork,
	addMembers,
	removeMember,
}
