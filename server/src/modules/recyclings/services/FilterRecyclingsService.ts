import { injectable, inject } from 'tsyringe';

import Recycling from '../infra/typeorm/entities/Recycling';
import RecyclingsRepository from '../infra/typeorm/repositories/RecyclingsRepository';

interface Request {
  user_id: string;
  userType: string;
}

@injectable()
export default class FilterRecyclingsService {
  constructor(
    @inject('RecyclingsRepository')
    private recyclingsRepository: RecyclingsRepository
  ) {}

  public async execute({ user_id, userType }: Request): Promise<Recycling[]> {
    const recyclings = await this.recyclingsRepository.findAll();

    const filteredRecyclings = recyclings.filter(recycling => {
      if (userType === 'recycler') {
        return recycling.recycler_id === user_id;
      }

      return recycling.collect_point_id === user_id;
    });

    return filteredRecyclings;
  }
}
