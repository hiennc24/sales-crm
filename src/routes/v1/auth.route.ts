import express from 'express';
import { authController } from '../../controllers/authController';
import { validate } from '../../middlewares/validate';
import { authValidation } from '../../validations';

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
// router.post('/logout', validate(authValidation.logout), authController.logout);

export const authRoute = router;