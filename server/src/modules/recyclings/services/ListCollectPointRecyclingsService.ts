import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Recycling from '../infra/typeorm/entities/Recycling';
import RecyclingsRepository from '../infra/typeorm/repositories/RecyclingsRepository';

interface Request {
  collect_point_id: string;
}

@injectable()
export default class ListCollectPointRecyclingsService {
  constructor(
    @inject('RecyclingsRepository')
    private recyclingsRepository: RecyclingsRepository
  ) {}

  public async execute({ collect_point_id }: Request): Promise<Recycling[]> {
    const recyclings = await this.recyclingsRepository.findAllByCollectPoint(
      collect_point_id
    );

    return recyclings;
  }
}
