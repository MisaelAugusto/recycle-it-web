import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Recycling from '../infra/typeorm/entities/Recycling';
import RecyclingsRepository from '../infra/typeorm/repositories/RecyclingsRepository';

interface Request {
  recycler_id: string;
  collect_point_id: string;
  quantities: string;
}

@injectable()
export default class FinishRecyclingService {
  constructor(
    @inject('RecyclingsRepository')
    private recyclingsRepository: RecyclingsRepository
  ) {}

  public async execute({
    recycler_id,
    collect_point_id,
    quantities
  }: Request): Promise<Recycling> {
    const recycling = await this.recyclingsRepository.findByCollectPointAndRecycler(
      recycler_id,
      collect_point_id
    );

    if (!recycling) {
      throw new AppError(
        'There is no recycling with this recycler and this collect point',
        401
      );
    }

    recycling.quantities = quantities;
    recycling.finished = 1;

    await this.recyclingsRepository.save(recycling);

    return recycling;
  }
}
