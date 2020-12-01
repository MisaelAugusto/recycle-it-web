import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import HashProvider from '@shared/container/providers/HashProvider/BCryptHashProvider';

import AppError from '@shared/errors/AppError';
import RecyclersRepository from '@modules/recyclers/infra/typeorm/repositories/RecyclersRepository';
import CollectPointsRepository from '@modules/collect-points/infra/typeorm/repositories/CollectPointsRepository';
import CollectPoint from '@modules/collect-points/infra/typeorm/entities/CollectPoint';
import Recycler from '@modules/recyclers/infra/typeorm/entities/Recycler';

interface Request {
  email: string;
  password: string;
  userType: string;
}

interface Response {
  user: Recycler | CollectPoint;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('RecyclersRepository')
    private recyclersRepository: RecyclersRepository,

    @inject('CollectPointsRepository')
    private collectPointsRepository: CollectPointsRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider
  ) {}

  public async execute({
    userType,
    email,
    password
  }: Request): Promise<Response> {
    let user;

    if (userType === 'recycler') {
      user = await this.recyclersRepository.findByEmail(email);
    } else if (userType === 'collect-point') {
      user = await this.collectPointsRepository.findByEmail(email);
    }

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {
      user,
      token
    };
  }
}
