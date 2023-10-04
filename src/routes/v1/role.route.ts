import express from 'express';
import { roleController } from '../../controllers/role.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { checkProjectRole } from '../../middlewares/projectMiddlewares';
import { validate } from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { PERMISSIONS } from '../../types/enumTypes';
import { roleValidations } from '../../validations/role.validation';
import { groupMemberRoleRoute } from './groupMemberRole.route';
import { userMemberRoleRoute } from './userMemberRole.route';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    addDataToBody({
      projectId: RequestParams.PROJECTID,
      createdById: RequestParams.USERID,
    }),
    validate(roleValidations.createRole),
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    roleController.createRole
  )

router
  .route('/:roleId')
  .patch(
    validate(roleValidations.updateRole),
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    roleController.updateRole
  )
  .delete(
    validate(roleValidations.deleteRole),
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    roleController.deleteRole
  )

router
  .use(
    '/:roleId/user-member',
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    userMemberRoleRoute
  )

router
  .use(
    '/:roleId/group-member',
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    groupMemberRoleRoute
  )

export const roleRoute = router;
