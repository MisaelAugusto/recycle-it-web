import { Router } from 'express';

import RecyclersRouter from '@modules/recyclers/infra/http/routes/recyclers.routes';
import RecyclingsRouter from '@modules/recyclings/infra/http/routes/recyclings.routes';
import CollectPointsRouter from '@modules/collect-points/infra/http/routes/collect-points.routes';
import SessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', SessionsRouter);
routes.use('/recyclers', RecyclersRouter);
routes.use('/recyclings', RecyclingsRouter);
routes.use('/collect-points', CollectPointsRouter);

export default routes;
