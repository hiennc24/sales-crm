import { Request, Response } from 'express';
import { folderService, projectService } from '../services';
import { catchAsync } from '../utils/catchAsync';

const getMenu = catchAsync(async (req: Request, res: Response) => {
  const [folders, projects] = await Promise.all([
    folderService.getFolders({
      companyId: req.companyId
    }),
    projectService.getProjects({
      companyId: req.companyId,
      folderId: {
        $exists: false
      }
    }, {
      createdAt: -1,
      name: 1,
    })
  ])
  res.send({
    folders, projects
  })
});

export const menuController = {
  getMenu,
}
