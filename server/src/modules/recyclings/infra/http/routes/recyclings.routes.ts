import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import RecyclingsController from '@modules/recyclings/infra/http/controllers/RecyclingsController';

const recyclingsRouter = Router();
const recyclingsController = new RecyclingsController();

recyclingsRouter.get('/', ensureAuthenticated, recyclingsController.show);
recyclingsRouter.put('/', ensureAuthenticated, recyclingsController.update);
recyclingsRouter.post('/', ensureAuthenticated, recyclingsController.create);
recyclingsRouter.delete(
  '/:id',
  ensureAuthenticated,
  recyclingsController.delete
);

export default recyclingsRouter;
