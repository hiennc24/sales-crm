import express from 'express';
import { phaseController } from '../../controllers/phase.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { checkProjectRole } from '../../middlewares/projectMiddlewares';
import { validate } from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { PERMISSIONS } from '../../types/enumTypes';
import { phaseValidations } from '../../validations/phase.validation';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    checkProjectRole([
      PERMISSIONS.PHASE_CREATE
    ]),
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
      // projectId: RequestParams.PROJECTID,
    }),
    validate(phaseValidations.createPhase),
    phaseController.createPhase
  )

router
  .route('/:phaseId')
  .get(
    validate(phaseValidations.getPhase),
    phaseController.getPhase
  )
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(phaseValidations.updatePhase),
    phaseController.updatePhase
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(phaseValidations.deletePhase),
    phaseController.deletePhase
  )

router
  .route('/list/:projectId')
  .get(
    validate(phaseValidations.getPhases),
    phaseController.getPhases
  )

export const phaseRoute = router;
