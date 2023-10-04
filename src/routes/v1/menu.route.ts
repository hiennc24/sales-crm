import express from 'express';
import { menuController } from '../../controllers/menu.Controller';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .get(
    menuController.getMenu
  )

export const menuRoute = router;
