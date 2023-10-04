import express from 'express';
import { groupWorkController } from '../../controllers/groupWork.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { checkProjectRole } from '../../middlewares/projectMiddlewares';
import { validate } from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { PERMISSIONS } from '../../types/enumTypes';
import { groupWorkValidations } from '../../validations/groupWork.validation';
import { groupWorkMemberMember } from './groupWorkMember.route';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    addDataToBody({
      projectId: RequestParams.PROJECTID,
      createdById: RequestParams.USERID,
    }),
    validate(groupWorkValidations.createGroupWork),
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    groupWorkController.createGroupWork
  )

router
  .route('/:groupWorkId')
  .get(
    validate(groupWorkValidations.getGroupWork),
    groupWorkController.getGroupWork
  )
  .patch(
    validate(groupWorkValidations.updateGroupWork),
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    groupWorkController.updateGroupWork
  )
  .delete(
    validate(groupWorkValidations.deleteGroupWork),
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    groupWorkController.deleteGroupWork
  )
router
  .use('/:groupWorkId/member', groupWorkMemberMember)

export const groupWorkRoute = router;
