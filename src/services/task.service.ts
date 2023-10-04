import httpStatus from "http-status";
import { PhaseModel } from "../models/phase.model";
import { TaskModel } from "../models/task.model";
import { ITaskDoc } from "../types";
import ApiError from "../utils/ApiError";
import { ProjectModel } from "./../models/project.model";

const createTask = async (body: any): Promise<ITaskDoc> => {
  const { phaseId, projectId } = body;

  const project = await ProjectModel.findById(projectId);

  if(!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found")
  }

  if(!!phaseId) {
    const phase = await PhaseModel.findById(phaseId);

    if(!phase) {
      throw new ApiError(httpStatus.NOT_FOUND, "Phase not found")
    }
  }

  const newTask = new TaskModel(body);

  newTask.save();

  return newTask;
};

const getTask = async (taskId: string): Promise<ITaskDoc> => {
  const data = await TaskModel.findOne({
    _id: taskId,
    deletedById: { $exists: false }
  })

  if(!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "task not found");
  }

  return data;
}

const updateTask = async (taskId: string, body: any): Promise<ITaskDoc> => {
  const newData = await TaskModel.findOneAndUpdate(
    {
      _id: taskId,
      deletedById: { $exists: false }
    },
    body,
    {
      new: true,
    }
  )

  if(!newData) {
    throw new ApiError(httpStatus.NOT_FOUND, "task not found");
  }

  return newData;
}

const deleteTask = async (taskId: string, body: any): Promise<ITaskDoc> => {
  const data = await TaskModel.findOneAndUpdate(
    {
      _id: taskId,
      deletedById: { $exists: false }
    },
    {
      ...body,
      deletedAt: new Date(),
    },
    {
      new: true,
    }
  )

  if(!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "task not found");
  }

  return data;
}

export const taskService = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
}