import express from 'express';
import { fieldController } from '../../controllers/field.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { validate } from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { fieldValidations } from '../../validations/field.validation';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
    }),
    validate(fieldValidations.createField),
    fieldController.createField
  )
  // .get(
  //   fieldController.getFields
  // )

router
    .route('/:fieldId')
    .get(
      validate(fieldValidations.getField),
      fieldController.getField
    )
    .patch(
      addDataToBody({
        updatedById: RequestParams.USERID,
      }),
      validate(fieldValidations.updateField),
      fieldController.updateField
    )
    .delete(
      addDataToBody({
        deletedById: RequestParams.USERID,
      }),
      validate(fieldValidations.delField),
      fieldController.delField,
    )
    
export const fieldRoute = router;
