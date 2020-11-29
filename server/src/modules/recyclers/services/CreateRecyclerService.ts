import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import HashProvider from '@shared/container/providers/HashProvider/BCryptHashProvider';

import Recycler from '../infra/typeorm/entities/Recycler';
import RecyclersRepository from '../infra/typeorm/repositories/RecyclersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateRecyclerService {
  constructor(
    @inject('RecyclersRepository')
    private recyclersRepository: RecyclersRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider
  ) {}

  public async execute({ name, email, password }: Request): Promise<Recycler> {
    const checkRecyclerExists = await this.recyclersRepository.findByEmail(
      email
    );

    if (checkRecyclerExists) {
      throw new AppError('Email address already used.');
    }

    const name_id = Math.random().toString(36).substr(2, 4);
    const hashedPassword = await this.hashProvider.generateHash(password);

    const recycler = this.recyclersRepository.create({
      name,
      email,
      name_id,
      password: hashedPassword
    });

    return recycler;
  }
}
