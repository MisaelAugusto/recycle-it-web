import { injectable, inject } from 'tsyringe';

import CollectPoint from '../infra/typeorm/entities/CollectPoint';
import CollectPointsRepository from '../infra/typeorm/repositories/CollectPointsRepository';

interface Request {
  name: string;
  city: string;
  state: string;
  items: string;
}

@injectable()
class FilterCollectPointsService {
  constructor(
    @inject('CollectPointsRepository')
    private collectPointsRepository: CollectPointsRepository
  ) {}

  public async execute({
    name,
    city,
    state,
    items
  }: Request): Promise<CollectPoint[]> {
    let collectPoints = await this.collectPointsRepository.findAll();

    if (name) {
      collectPoints = collectPoints.filter(collectPoint =>
        collectPoint.name.includes(name)
      );
    }

    if (city && state) {
      collectPoints = collectPoints.filter(
        collectPoint =>
          collectPoint.city === city && collectPoint.state === state
      );
    }

    if (items) {
      collectPoints = collectPoints.filter(collectPoint =>
        items
          .split(',')
          .some(item => collectPoint.items.split(',').includes(item))
      );
    }

    return collectPoints;
  }
}

export default FilterCollectPointsService;
