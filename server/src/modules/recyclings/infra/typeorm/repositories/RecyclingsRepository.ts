import { Repository, getRepository } from 'typeorm';

import CreateRecyclingDTO from '@modules/recyclings/dtos/CreateRecyclingDTO';
import Recycling from '../entities/Recycling';

export default class RecyclingsRepository {
  private ormRepository: Repository<Recycling>;

  constructor() {
    this.ormRepository = getRepository(Recycling);
  }

  public async findById(id: string): Promise<Recycling | undefined> {
    const recycling = await this.ormRepository.findOne(id);

    return recycling;
  }

  public async findAllByCollectPoint(
    collect_point_id: string
  ): Promise<Recycling[]> {
    const recyclings = await this.ormRepository.find({
      where: { collect_point_id, finished: 0 }
    });

    return recyclings;
  }

  public async findByCollectPointAndRecycler(
    recycler_id: string,
    collect_point_id: string
  ): Promise<Recycling | undefined> {
    const recycling = await this.ormRepository.findOne({
      where: { recycler_id, collect_point_id }
    });

    return recycling;
  }

  public async delete(recycling_id: string): Promise<void> {
    await this.ormRepository.delete({ id: recycling_id });
  }

  public async findByItems(items: string): Promise<Recycling[]> {
    const recyclings = await this.ormRepository.find();

    const filteredRecyclings = recyclings.filter(
      recycling =>
        !recycling.finished &&
        items.split(',').some(item => recycling.items.split(',').includes(item))
    );

    return filteredRecyclings;
  }

  public async create(recyclingData: CreateRecyclingDTO): Promise<Recycling> {
    const recycling = this.ormRepository.create(recyclingData);

    await this.ormRepository.save(recycling);

    return recycling;
  }

  public async save(recycling: Recycling): Promise<Recycling> {
    return this.ormRepository.save(recycling);
  }
}
