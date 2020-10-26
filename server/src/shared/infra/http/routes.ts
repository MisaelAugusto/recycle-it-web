import { Router } from 'express';

import RecyclersController from '@modules/recyclers/infra/http/routes/recyclers.routes';

const routes = Router();

routes.use('/recyclers', RecyclersController);

export default routes;
