import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Recycling from '../infra/typeorm/entities/Recycling';
import RecyclingsRepository from '../infra/typeorm/repositories/RecyclingsRepository';

interface Request {
  id: string;
  quantities: string;
}

@injectable()
export default class FinishRecyclingService {
  constructor(
    @inject('RecyclingsRepository')
    private recyclingsRepository: RecyclingsRepository
  ) {}

  public async execute({ id, quantities }: Request): Promise<Recycling> {
    const recycling = await this.recyclingsRepository.findById(id);

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
