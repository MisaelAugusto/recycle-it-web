import { hash } from 'bcrypt';

import CollectPoint from '../entities/CollectPoint';
import CollectPointsRepository from '../repositories/CollectPointsRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateCollectPointService {
  private collectPointsRepository: CollectPointsRepository;

  constructor(collectPointsRepository: CollectPointsRepository) {
    this.collectPointsRepository = collectPointsRepository;
  }

  public async execute({
    name,
    email,
    password
  }: IRequest): Promise<CollectPoint> {
    const checkEmailExists = this.collectPointsRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new Error('Email address already in use.');
    }

    const hashedPassword = await hash(password, 8);

    const collectPoint = this.collectPointsRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return collectPoint;
  }
}

export default CreateCollectPointService;
