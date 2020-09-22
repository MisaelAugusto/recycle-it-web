import CollectPoint from '../entities/CollectPoint';
import CollectPointsRepository from '../repositories/CollectPointsRepository';

interface Request {
  name?: string;
  city?: string;
  state?: string;
  items: string;
  weekDay: string;
}

class FilterCollectPointsService {
  private collectPointsRepository: CollectPointsRepository;

  constructor(collectPointsRepository: CollectPointsRepository) {
    this.collectPointsRepository = collectPointsRepository;
  }

  public execute({
    name = '',
    city = '',
    state = '',
    items,
    weekDay
  }: Request): CollectPoint[] {
    const collectPoints = this.collectPointsRepository.findAll();

    const filteredCollectPoints = collectPoints.filter(
      collectPoint =>
        collectPoint.name.includes(name) &&
        collectPoint.city === city &&
        collectPoint.state === state &&
        items
          .split('')
          .every(item => collectPoint.items.split('').indexOf(item) !== -1) &&
        collectPoint.schedules.some(schedule => schedule.weekDay === weekDay)
    );

    return filteredCollectPoints;
  }
}

export default FilterCollectPointsService;
