import { Router } from 'express';

import CollectPointsController from '../controllers/CollectPointsController';

const collectPointsRouter = Router();

const collectPointsController = new CollectPointsController();

collectPointsRouter.get('/', collectPointsController.show);
collectPointsRouter.post('/', collectPointsController.create);

export default collectPointsRouter;
