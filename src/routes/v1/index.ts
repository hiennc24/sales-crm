import express from 'express';
import docsRoute from './docs.route';
import config from '../../config/config';
import { authRoute } from './auth.route';
import { folderRoute } from './folder.route';
import { auth } from '../../middlewares/auth';
import { auditLogRoute } from './auditLog.route';
import { projectRoute } from './project.route';
import { menuRoute } from './menu.route';
import { fieldRoute } from './field.route';
import { phaseRoute } from './phase.route.';
import { taskRoute } from './task.route';

const router = express.Router();

const authRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
];
const mainRoutes = [
  {
    path: '/folder',
    route: folderRoute,
  },
  {
    path: '/auditLog',
    route: auditLogRoute,
  },
  {
    path: '/project',
    route: projectRoute,
  },
  {
    path: '/menu',
    route: menuRoute,
  },
  {
    path: '/field',
    route: fieldRoute,
  },
  {
    path: '/phase',
    route: phaseRoute,
  },
  {
    path: '/task',
    route: taskRoute,
  }
];
const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

mainRoutes.forEach((route) => {
  router.use(route.path, auth, route.route);
});
authRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
