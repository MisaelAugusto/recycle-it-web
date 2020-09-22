import { Router } from 'express';

import CollectPointsController from '../controllers/CollectPointsController';

const collectPointsRouter = Router();

const collectPointsController = new CollectPointsController();

collectPointsRouter.get('/', collectPointsController.index);
collectPointsRouter.post('/', collectPointsController.create);

export default collectPointsRouter;
