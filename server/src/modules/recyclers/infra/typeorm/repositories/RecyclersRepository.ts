import { Repository, getRepository } from 'typeorm';

import Recycler from '../entities/Recycler';

export default class RecyclersRepository {
  private ormRepository: Repository<Recycler>;

  constructor() {
    this.ormRepository = getRepository(Recycler);
  }
}
