import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Recycler from '../infra/typeorm/entities/Recycler';
import RecyclersRepository from '../infra/typeorm/repositories/RecyclersRepository';

interface Request {
  id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateRecyclerAvatarService {
  constructor(
    @inject('RecyclersRepository')
    private recyclersRepository: RecyclersRepository
  ) {}

  public async execute({ id, avatarFilename }: Request): Promise<Recycler> {
    const recycler = await this.recyclersRepository.findById(id);

    if (!recycler) {
      throw new AppError(
        'Only authenticated recyclers can change avatar.',
        401
      );
    }

    if (recycler.avatar) {
      const filePath = path.resolve(uploadConfig.uploadFolder, recycler.avatar);

      await fs.promises.unlink(filePath);
    }

    recycler.avatar = avatarFilename;

    await this.recyclersRepository.save(recycler);

    return recycler;
  }
}
