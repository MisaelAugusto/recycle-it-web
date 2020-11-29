import { container } from 'tsyringe';

import './providers';

import RecyclersRepository from '@modules/recyclers/infra/typeorm/repositories/RecyclersRepository';
import CollectPointsRepository from '@modules/collect-points/infra/typeorm/repositories/CollectPointsRepository';
import RecyclingsRepository from '@modules/recyclings/infra/typeorm/repositories/RecyclingsRepository';

container.registerSingleton('RecyclersRepository', RecyclersRepository);
container.registerSingleton('RecyclingsRepository', RecyclingsRepository);
container.registerSingleton('CollectPointsRepository', CollectPointsRepository);
