import { Repository, getRepository } from 'typeorm';

import CreateCollectPointDTO from '@modules/collect-points/dtos/CreateCollectPointDTO';
import CollectPoint from '../entities/CollectPoint';

export default class CollectPointsRepository {
  private ormRepository: Repository<CollectPoint>;

  constructor() {
    this.ormRepository = getRepository(CollectPoint);
  }

  public async findAll(): Promise<CollectPoint[]> {
    const collectPoints = await this.ormRepository.find();

    return collectPoints;
  }

  public async findById(id: string): Promise<CollectPoint | undefined> {
    const collectPoint = await this.ormRepository.findOne(id);

    return collectPoint;
  }

  public async findByEmail(email: string): Promise<CollectPoint | undefined> {
    const collectPoint = await this.ormRepository.findOne({
      where: { email }
    });

    return collectPoint;
  }

  public async create(
    collectPointData: CreateCollectPointDTO
  ): Promise<CollectPoint> {
    const collectPoint = this.ormRepository.create(collectPointData);

    await this.ormRepository.save(collectPoint);

    return collectPoint;
  }

  public async save(collectPoint: CollectPoint): Promise<CollectPoint> {
    return this.ormRepository.save(collectPoint);
  }
}
