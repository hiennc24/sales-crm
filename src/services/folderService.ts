import httpStatus from "http-status";
import logger from "../config/logger";
import { FolderModel } from "../models/folder.model";
import { IProjectModelDoc, ProjectModel } from "../models/project.model";
import { IFolderDoc } from "../types";
import ApiError from "../utils/ApiError";

const createFolder = async (body: any): Promise<IFolderDoc | null> => {
  return FolderModel.create(body);
};

const updateFolder = async (
  entityId: string,
  body: any
): Promise<IFolderDoc | null> => {
  const folder = await FolderModel.findByIdAndUpdate(
    {
      _id: entityId,
      deletedById: { $exists: false },
    },
    {
      $set: body,
    },
    {
      new: true,
    }
  ).exec();

  return folder;
};

const getFolders = async (filter: any): Promise<IFolderDoc[]> => {
  return FolderModel.find(filter);
};

const getFolder = async (folderId: string): Promise<IFolderDoc> => {
  const folder = await FolderModel.findOne({
    _id: folderId,
    deletedById: { $exists: false },
  });

  return folder;
};

const deleteFolder = async (
  folderId: string,
  body: any,
): Promise<IFolderDoc> => {
  const folder = await getFolder(folderId);
  if (!folder) {
    throw new ApiError(httpStatus.NOT_FOUND, "Folder not found");
  }

  await Promise.all(
    folder["projects"]
      .map((project: any) =>
        ProjectModel.findOneAndUpdate(
          {
            _id: project.id,
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
        FolderModel.findOneAndUpdate(
          {
            _id: folderId,
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
  );
  return folder;
};

export const folderService = {
  getFolders,
  createFolder,
  updateFolder,
  getFolder,
  deleteFolder,
};
