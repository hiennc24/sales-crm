import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { memberRoleService, projectService } from '../services';
import ApiError from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';

const createProject = catchAsync(async (req: Request, res: Response) => {
	const project = await projectService.createProject({
		...req.body,
	}, req.userId);
	res.send(project)
});

const updateProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const project = await projectService.updateProject(req.params.projectId, req.body);
	if (!project) {
		next(new ApiError(httpStatus.NOT_FOUND, 'Project not found'));
	}
	res.send(project)
});

const assignRole = catchAsync(async (req: Request, res: Response) => {
	const { projectId } = req.params;
	const { userIds, roleIds, groupWorkIds } = req.body;

	Promise.all([
		roleIds.map((roleId: string) => {
			return Promise.all([
				Promise.all(userIds.map((userId: string) => {
					return memberRoleService.createIfNotExistMemberRole({ projectId, userId, roleId })
				})),
				Promise.all(groupWorkIds.map((groupWorkId: string) => {
					return memberRoleService.createIfNotExistMemberRole({ projectId, groupWorkId, roleId })
				}))
			])
		})
	])
		.then(() => {
			res.status(httpStatus.NO_CONTENT).send()
		})
});

const getProject = catchAsync(async (req: Request, res: Response) => {
	const project = await projectService.getProject(req.params.projectId);
	res.send(project);
})

const deleteProject = catchAsync(async (req: Request, res: Response) => {
	const project = await projectService.deleteProject(req.params.projectId, req.body);
	res.send(project);
})

export const projectController = {
	createProject,
	updateProject,
	assignRole,
	getProject,
	deleteProject,
}
