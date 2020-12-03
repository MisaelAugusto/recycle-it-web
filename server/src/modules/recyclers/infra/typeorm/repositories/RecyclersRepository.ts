import { Repository, getRepository } from 'typeorm';

import CreateRecyclerDTO from '@modules/recyclers/dtos/CreateRecyclerDTO';
import Recycler from '../entities/Recycler';

export default class RecyclersRepository {
  private ormRepository: Repository<Recycler>;

  constructor() {
    this.ormRepository = getRepository(Recycler);
  }

  public async findById(id: string): Promise<Recycler | undefined> {
    const recycler = await this.ormRepository.findOne({ where: { id } });

    return recycler;
  }

  public async findByEmail(email: string): Promise<Recycler | undefined> {
    const recycler = await this.ormRepository.findOne({
      where: { email }
    });

    return recycler;
  }

  public async create(recyclerData: CreateRecyclerDTO): Promise<Recycler> {
    const recycler = this.ormRepository.create(recyclerData);

    await this.ormRepository.save(recycler);

    return recycler;
  }

  public async save(recycler: Recycler): Promise<Recycler> {
    return this.ormRepository.save(recycler);
  }
}
