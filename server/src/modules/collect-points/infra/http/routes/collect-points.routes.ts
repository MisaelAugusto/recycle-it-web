import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CollectPointsController from '../controllers/CollectPointsController';
import CollectPointImageController from '../controllers/CollectPointImageController';

const upload = multer(uploadConfig);
const collectPointsRouter = Router();
const collectPointsController = new CollectPointsController();
const collectPointImageController = new CollectPointImageController();

collectPointsRouter.get('/', collectPointsController.index);
collectPointsRouter.post('/', collectPointsController.create);
collectPointsRouter.put(
  '/',
  ensureAuthenticated,
  collectPointsController.update
);

collectPointsRouter.patch(
  '/image',
  ensureAuthenticated,
  upload.single('image'),
  collectPointImageController.update
);

export default collectPointsRouter;
