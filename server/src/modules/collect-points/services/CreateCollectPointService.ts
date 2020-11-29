import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import HashProvider from '@shared/container/providers/HashProvider/BCryptHashProvider';

import CollectPoint from '../infra/typeorm/entities/CollectPoint';
import CollectPointsRepository from '../infra/typeorm/repositories/CollectPointsRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateRecyclerService {
  constructor(
    @inject('CollectPointsRepository')
    private collectPointsRepository: CollectPointsRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider
  ) {}

  public async execute({
    name,
    email,
    password
  }: Request): Promise<CollectPoint> {
    const checkCollectPointExists = await this.collectPointsRepository.findByEmail(
      email
    );

    if (checkCollectPointExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const collectPoint = this.collectPointsRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return collectPoint;
  }
}
