import { hash } from 'bcrypt';

import CollectPoint from '../entities/CollectPoint';
import CollectPointsRepository from '../repositories/CollectPointsRepository';

interface Schedule {
  weekDay: string;
  start: string;
  end: string;
}

interface Request {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  items: string;
  schedules: Schedule[];
}

class CreateCollectPointService {
  private collectPointsRepository: CollectPointsRepository;

  constructor(collectPointsRepository: CollectPointsRepository) {
    this.collectPointsRepository = collectPointsRepository;
  }

  public async execute({
    name,
    email,
    password,
    city,
    state,
    items,
    schedules
  }: Request): Promise<CollectPoint> {
    const checkEmailExists = this.collectPointsRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new Error('Email address already in use.');
    }

    const hashedPassword = await hash(password, 8);

    const collectPoint = this.collectPointsRepository.create({
      name,
      email,
      password: hashedPassword,
      city,
      state,
      items,
      schedules
    });

    return collectPoint;
  }
}

export default CreateCollectPointService;
