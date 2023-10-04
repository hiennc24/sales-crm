import express from 'express';
import { groupWorkController } from '../../controllers/groupWork.controller';
import { validate } from '../../middlewares/validate';
import { groupWorkValidations } from '../../validations/groupWork.validation';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    validate(groupWorkValidations.addMembers),
    groupWorkController.addMembers
  )
router
  .route('/:memberId')
  .delete(
    validate(groupWorkValidations.removeMember),
    groupWorkController.removeMember
  )

export const groupWorkMemberMember = router;
