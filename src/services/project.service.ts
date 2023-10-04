import httpStatus from "http-status";
import { PhaseModel } from "../models/phase.model";
import { ProjectModel } from "../models/project.model";
import { TaskModel } from "../models/task.model";
import { IProjectDoc } from "../types";
import ApiError from "../utils/ApiError";
import { createFieldSystem } from '../common/fieldSystem.common';
import { FieldModel } from "../models";

const getProjectById = async (entityId: string): Promise<IProjectDoc> => {
  let data = await ProjectModel.findOne({
    _id: entityId,
    deletedById: { $exists: false },
  });
  if (!data) {
    return null;
  }
  return data;
};

const getProjects = async (
  filter: any,
  options: any
): Promise<IProjectDoc[]> => {
  return ProjectModel.find(filter, options);
};

const createProject = async (
  body: any,
  userId: any
): Promise<IProjectDoc | null> => {
  const project = await ProjectModel.create(body);

  await createFieldSystem(project._id.toString(), userId);

  await project.save();

  return project;
};

const updateProject = async (
  entityId: string,
  body: any,
): Promise<IProjectDoc | null> => {
  const data = await ProjectModel.findOneAndUpdate(
    {
      _id: entityId,
      deletedById: { $exists: false },
    },
    {
      ...body,
    },
    {
      new: true,
    }
  )

  return data;
};

const getProject = async (projectId: string): Promise<IProjectDoc> => {
  const project = ProjectModel.findOne({
    _id: projectId,
    deletedById: { $exists: false },
  });
  return project;
};

const deleteProject = async (
  projectId: string,
  body: any,
): Promise<IProjectDoc | null> => {
  const project = await getProject(projectId);

  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }

  await Promise.all(
    project["fields"]
      .map((field) =>
        FieldModel.findOneAndUpdate(
          {
            _id: field._id,
            deletedById: { $exists: false },
          },
          {
            ...body,
            deletedAt: new Date(),
          },
          {
            new: true,
          }
        )
      )
      .concat(
        ProjectModel.findOneAndUpdate(
          {
            _id: projectId,
            deletedAt: { $exists: false },
          },
          {
            ...body,
            deletedAt: new Date(),
          },
          {
            new: true,
          }
        ),
        PhaseModel.findOneAndUpdate(
          {
            projectId,
            deletedAt: { $exists: false },
          },
          {
            ...body,
            deletedAt: new Date(),
          },
          {
            new: true,
          }
        ),
        TaskModel.findOneAndUpdate(
          {
            projectId,
            deletedAt: { $exists: false },
          },
          {
            ...body,
            deletedAt: new Date(),
          },
          {
            new: true,
          }
        ),
      )
  );

  return project;
};

export const projectService = {
  getProjectById,
  getProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
};
