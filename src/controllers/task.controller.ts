import { NextFunction, Request, Response } from 'express';
import { taskService } from '../services/task.service';
import { catchAsync } from '../utils/catchAsync';

const createTask = catchAsync(async (req: Request, res: Response) => {
	const data = await taskService.createTask(req.body);
	res.send(data)
});
;

const getTask = catchAsync(async (req: Request, res: Response) => {
  const data = await taskService.getTask(req.params.taskId);
	res.send(data);
})

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const data = await taskService.updateTask(req.params.taskId, req.body);
  res.send(data);
})

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const data = await taskService.deleteTask(req.params.taskId, req.body);
  res.send(data);
})

export const taskController = {
	createTask,
  getTask,
  updateTask,
  deleteTask,
}
