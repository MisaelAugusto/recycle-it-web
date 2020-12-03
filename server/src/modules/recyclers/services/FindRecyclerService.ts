import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Recycler from '../infra/typeorm/entities/Recycler';
import RecyclersRepository from '../infra/typeorm/repositories/RecyclersRepository';

interface Request {
  id: string;
}

@injectable()
export default class CreateRecyclerService {
  constructor(
    @inject('RecyclersRepository')
    private recyclersRepository: RecyclersRepository
  ) {}

  public async execute({ id }: Request): Promise<Recycler> {
    const recycler = await this.recyclersRepository.findById(id);

    if (!recycler) {
      throw new AppError('Recycler not found.');
    }

    return recycler;
  }
}
