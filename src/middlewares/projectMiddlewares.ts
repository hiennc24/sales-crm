import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { projectService } from '../services';
import { PERMISSIONS } from '../types/enumTypes';
import ApiError from '../utils/ApiError';

export const validateInProject = async (req: Request, res: Response, next: any) => {
  if (!req.params.projectId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Not found'));
  }

  const [project] = await Promise.all([
    projectService.getProjectById(req.params.projectId),
  ])
  if (!project) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Project not found'));
  }

  req.projectId = req.params.projectId;
  const isAdmin = project.createdById.toString() == req.userId.toString();
  if (isAdmin) {
    req.isAdminProject = true
  }
  return next()
}

export const checkProjectRole = (roles: PERMISSIONS[]) => (req: Request, res: Response, next: any) => {
  console.log("checkProjectRole")
  if (req.isAdminProject) {
    return next()
  } else {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Permission denied'));
  }
};