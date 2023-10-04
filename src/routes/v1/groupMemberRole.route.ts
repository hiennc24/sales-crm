import express from 'express';
import { memberRoleController } from '../../controllers/memberRole.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { checkProjectRole } from '../../middlewares/projectMiddlewares';
import { validate } from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { PERMISSIONS } from '../../types/enumTypes';
import { userMemberRoleRouteValidations } from '../../validations/userMemberRoleRoute.validation';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    validate(userMemberRoleRouteValidations.addGroupMember),
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    addDataToBody({
      projectId: RequestParams.PROJECTID,
      createdById: RequestParams.USERID,
    }),
    memberRoleController.addUserMember
  )

router
  .route('/:groupId')
  .delete(
    validate(userMemberRoleRouteValidations.deleteGroupMember),
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    memberRoleController.deleteUserMember
  )

export const groupMemberRoleRoute = router;
