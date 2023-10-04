import express from 'express';
import { projectController } from '../../controllers/project.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { checkProjectRole, validateInProject } from '../../middlewares/projectMiddlewares';
import { validate } from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { PERMISSIONS } from '../../types/enumTypes';
import { projectValidations } from '../../validations/project.validation';
import { groupWorkRoute } from './groupWork.route';
import { phaseRoute } from './phase.route.';
import { roleRoute } from './role.route';
import { projectMemberRoute } from './projectMember.route';


const inProjectRoute = express.Router({ mergeParams: true });
inProjectRoute
  .route('/')
  .patch(
    validate(projectValidations.updateProject),
    projectController.updateProject
  )
inProjectRoute
  .route('/assign-role')
  .post(
    validate(projectValidations.assignRole),
    validateInProject,
    checkProjectRole([
      PERMISSIONS.MANAGE_MEMBER
    ]),
    projectController.assignRole
  )

inProjectRoute
  .use('/phase', phaseRoute)
inProjectRoute
  .use('/role', roleRoute)
inProjectRoute
  .use('/group-work', groupWorkRoute)
inProjectRoute
  .use('/project-member', projectMemberRoute)


// ----- project
const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    addDataToBody({
      companyId: RequestParams.COMPANYID,
      createdById: RequestParams.USERID,
    }),
    validate(projectValidations.createProject),
    projectController.createProject
  )
router
    .route('/:projectId')
    .get(
      validate(projectValidations.getProject),
      projectController.getProject
    )
    .delete(
      addDataToBody({
        deletedById: RequestParams.USERID,
      }),
      validate(projectValidations.deleteProject),
      projectController.deleteProject
    )
    .patch(
      addDataToBody({
        updatedById: RequestParams.USERID,
      }),
      validate(projectValidations.updateProject),
      projectController.updateProject
    )
router
  .use('/:projectId', validateInProject, inProjectRoute)

export const projectRoute = router;
