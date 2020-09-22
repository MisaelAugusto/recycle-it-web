import ICreateCollectPointDTO from '../dtos/ICreateCollectPointDTO';
import CollectPoint from '../entities/CollectPoint';

class CollectPointsRepository {
  private collectPoints: CollectPoint[] = [];

  public findAll(): CollectPoint[] {
    return this.collectPoints;
  }

  public findById(id: string): CollectPoint | undefined {
    const findCollectPoint = this.collectPoints.find(
      collectPoint => collectPoint.id === id
    );

    return findCollectPoint;
  }

  public findByEmail(email: string): CollectPoint | undefined {
    const findCollectPoint = this.collectPoints.find(
      collectPoint => collectPoint.email === email
    );

    return findCollectPoint;
  }

  public create({
    name,
    email,
    password,
    city,
    state,
    items,
    schedules
  }: ICreateCollectPointDTO): CollectPoint {
    const collectPoint = new CollectPoint({
      name,
      email,
      password,
      city,
      state,
      items,
      schedules
    });

    this.collectPoints.push(collectPoint);

    return collectPoint;
  }
}

export default CollectPointsRepository;
