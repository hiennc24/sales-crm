import express from 'express';
import { taskController } from '../../controllers/task.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { validate } from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { taskValidations } from '../../validations/task.validation';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
    }),
    validate(taskValidations.createTask),
    taskController.createTask
  )

router
    .route('/:taskId')
    .get(
      validate(taskValidations.getTask),
      taskController.getTask
    )
    .patch(
      addDataToBody({
        updatedById: RequestParams.USERID,
      }),
      validate(taskValidations.updateTask),
      taskController.updateTask
    )
    .delete(
      addDataToBody({
        deletedById: RequestParams.USERID,
      }),
      validate(taskValidations.deleteTask),
      taskController.deleteTask
    )

export const taskRoute = router;
