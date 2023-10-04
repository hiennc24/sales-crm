import { Request, Response } from 'express';
import { fieldService } from '../services/field.service';
import { catchAsync } from '../utils/catchAsync';

const createField = catchAsync(async (req: Request, res: Response) => {
  const response = await fieldService.createField(req.body);
	res.send(response)
})

const getField = catchAsync(async (req: Request, res: Response) => {
	const response = await fieldService.getField(req.params.fieldId);
	res.send(response);
})

const updateField = catchAsync(async (req: Request, res: Response) => {
	const response = await fieldService.updateField(req.params.fieldId, req.body);
	res.send(response);
})

const delField = catchAsync(async (req: Request, res: Response) => {
	const response = await fieldService.delField(req.params.fieldId, req.body);
	res.send(response);
})

// const getFields = catchAsync(async (req: Request, res: Response) => {
// 	const response = await fieldService.getFields();
// 	res.send(response);
// })

export const fieldController = {
	createField,
	getField,
	updateField,
	delField,
	// getFields,
}
