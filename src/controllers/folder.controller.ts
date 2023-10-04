import { Request, Response } from 'express';
import { folderService } from '../services';
import { catchAsync } from '../utils/catchAsync';

const createFolder = catchAsync(async (req: Request, res: Response) => {
	const folder = await folderService.createFolder({
		...req.body,
	});
	res.send(folder)
});

const updateFolder = catchAsync(async (req: Request, res: Response) => {
	const data = await folderService.updateFolder(req.params.folderId, req.body);
	res.send(data)
});

const getFolder = catchAsync(async (req: Request, res: Response) => {
	const folder = await folderService.getFolder(req.params.folderId);
	res.send(folder);
})

const delFolder = catchAsync(async (req: Request, res: Response) => {
	const folder = await folderService.deleteFolder(req.params.folderId, req.body);
	res.send(folder);
})

export const folderController = {
	createFolder,
	updateFolder,
	getFolder,
	delFolder,
}
