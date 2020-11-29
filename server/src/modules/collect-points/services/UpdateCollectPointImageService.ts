import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import CollectPoint from '../infra/typeorm/entities/CollectPoint';
import CollectPointsRepository from '../infra/typeorm/repositories/CollectPointsRepository';

interface Request {
  id: string;
  imageFilename: string;
}

@injectable()
export default class UpdateCollectPointImageService {
  constructor(
    @inject('CollectPointsRepository')
    private collectPointsRepository: CollectPointsRepository
  ) {}

  public async execute({ id, imageFilename }: Request): Promise<CollectPoint> {
    const collectPoint = await this.collectPointsRepository.findById(id);

    if (!collectPoint) {
      throw new AppError(
        'Only authenticated collectPoints can change image.',
        401
      );
    }

    if (collectPoint.image) {
      const filePath = path.resolve(
        uploadConfig.uploadFolder,
        collectPoint.image
      );

      await fs.promises.unlink(filePath);
    }

    collectPoint.image = imageFilename;

    await this.collectPointsRepository.save(collectPoint);

    return collectPoint;
  }
}
