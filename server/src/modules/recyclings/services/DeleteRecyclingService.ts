import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import RecyclingsRepository from '../infra/typeorm/repositories/RecyclingsRepository';

interface Request {
  recycling_id: string;
}

@injectable()
export default class DeleteRecyclingService {
  constructor(
    @inject('RecyclingsRepository')
    private recyclingsRepository: RecyclingsRepository
  ) {}

  public async execute({ recycling_id }: Request): Promise<void> {
    const recycling = await this.recyclingsRepository.findById(recycling_id);

    if (!recycling) {
      throw new AppError('Recycling not found.', 401);
    }

    await this.recyclingsRepository.delete(recycling_id);
  }
}
