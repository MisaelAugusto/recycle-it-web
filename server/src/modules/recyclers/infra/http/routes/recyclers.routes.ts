import { Router } from 'express';

import RecyclersController from '../controllers/RecyclersController';

const recyclersRouter = Router();
const recyclersController = new RecyclersController();

recyclersRouter.post('/', recyclersController.create);

export default recyclersRouter;
