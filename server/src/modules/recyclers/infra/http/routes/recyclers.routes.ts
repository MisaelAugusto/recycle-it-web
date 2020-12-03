import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import RecyclersController from '../controllers/RecyclersController';
import RecyclerAvatarController from '../controllers/RecyclerAvatarController';

const recyclersRouter = Router();
const upload = multer(uploadConfig);
const recyclersController = new RecyclersController();
const recyclerAvatarController = new RecyclerAvatarController();

recyclersRouter.get('/:id', recyclersController.index);
recyclersRouter.post('/', recyclersController.create);
recyclersRouter.put('/', ensureAuthenticated, recyclersController.update);
recyclersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  recyclerAvatarController.update
);

export default recyclersRouter;
