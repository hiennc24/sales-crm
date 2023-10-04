import express from 'express';
import { projectMemberController } from '../../controllers/projectMember.Controller';
import { checkProjectRole } from '../../middlewares/projectMiddlewares';
import { PERMISSIONS } from '../../types/enumTypes';

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        checkProjectRole([
            PERMISSIONS.MANAGE_MEMBER
        ]),
        projectMemberController.getProjectMember
    )

export const projectMemberRoute = router;
