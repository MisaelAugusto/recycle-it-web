import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Recycling from '../infra/typeorm/entities/Recycling';
import RecyclingsRepository from '../infra/typeorm/repositories/RecyclingsRepository';

interface Request {
  recycler_id: string;
  collect_point_id: string;
  items: string;
}

@injectable()
export default class CreateRecyclerService {
  constructor(
    @inject('RecyclingsRepository')
    private recyclingsRepository: RecyclingsRepository
  ) {}

  public async execute({
    recycler_id,
    collect_point_id,
    items
  }: Request): Promise<Recycling> {
    const recyclingsWithItems = await this.recyclingsRepository.findByItems(
      items
    );

    const checkIsRecyclerRecyclings = recyclingsWithItems.some(
      recycling => recycling.recycler_id === recycler_id
    );

    if (checkIsRecyclerRecyclings) {
      throw new AppError(
        'There is another recycling with some of these items.',
        401
      );
    }

    const recycling = this.recyclingsRepository.create({
      recycler_id,
      collect_point_id,
      items,
      finished: 0
    });

    return recycling;
  }
}
