import { Router } from 'express';

import CollectPointsRouter from './collect-points.routes';

const routes = Router();

routes.use('/collect-points', CollectPointsRouter);

export default routes;
