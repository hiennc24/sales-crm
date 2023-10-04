import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { phaseService } from '../services';
import ApiError from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';

const createPhase = catchAsync(async (req: Request, res: Response) => {
	const phase = await phaseService.createPhase({
		...req.body,
	});
	res.send(phase)
});

const getPhase = catchAsync(async (req: Request, res: Response) => {
	const phase = await phaseService.getPhase(req.params.phaseId);
	res.send(phase);
})

const getPhases = async (req: Request, res: Response) => {
	const phases = await phaseService.getPhases(req.params.projectId);
	res.send(phases);
}

const updatePhase = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const phase = await phaseService.updatePhase(req.params.phaseId, {
		...req.body,
	});
	if (!phase) {
		next(new ApiError(httpStatus.NOT_FOUND, 'Phase not found'));
	}
	res.send(phase);
});

const deletePhase = catchAsync(async (req: Request, res: Response) => {
	await phaseService.deletePhase(req.params.phaseId, req.body);
	res.status(httpStatus.NO_CONTENT).send();
});

export const phaseController = {
	createPhase,
	getPhase,
	updatePhase,
	deletePhase,
	getPhases,
}
