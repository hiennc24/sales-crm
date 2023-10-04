import express from 'express';
import { folderController } from '../../controllers/folder.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { validate } from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { folderValidations } from '../../validations/folder.validation';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(folderValidations.createFolder),
    folderController.createFolder
  )

router
  .route('/:folderId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(folderValidations.updateFolder),
    folderController.updateFolder
  )
  .get(
    validate(folderValidations.getFolderById),
    folderController.getFolder
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(folderValidations.deleteFolder),
    folderController.delFolder
  )

export const folderRoute = router;
