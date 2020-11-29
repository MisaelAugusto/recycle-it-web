import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import CollectPoint from '../infra/typeorm/entities/CollectPoint';
import CollectPointsRepository from '../infra/typeorm/repositories/CollectPointsRepository';

interface Request {
  id: string;
  city: string;
  state: string;
  items: string;
  latitude: number;
  longitude: number;
}

@injectable()
export default class UpdateCollectPointService {
  constructor(
    @inject('CollectPointsRepository')
    private collectPointsRepository: CollectPointsRepository
  ) {}

  public async execute({
    id,
    city,
    state,
    items,
    latitude,
    longitude
  }: Request): Promise<CollectPoint> {
    const collectPoint = await this.collectPointsRepository.findById(id);

    if (!collectPoint) {
      throw new AppError('CollectPoint not found.');
    }

    collectPoint.city = city;
    collectPoint.state = state;
    collectPoint.items = items;
    collectPoint.latitude = latitude;
    collectPoint.longitude = longitude;

    return this.collectPointsRepository.save(collectPoint);
  }
}
