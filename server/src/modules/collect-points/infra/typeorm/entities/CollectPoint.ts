import { uuid } from 'uuidv4';

class CollectPoint {
  id: string;

  image: string;

  name: string;

  email: string;

  password: string;

  city: string;

  state: string;

  items: string;

  schedules: Array<{
    weekDay: string;
    start: string;
    end: string;
  }>;

  constructor({
    name,
    email,
    password,
    city,
    state,
    items,
    schedules
  }: Omit<CollectPoint, 'id' | 'image'>) {
    this.id = uuid();
    this.image = '';
    this.name = name;
    this.email = email;
    this.password = password;
    this.city = city;
    this.state = state;
    this.items = items;
    this.schedules = schedules;
  }
}

export default CollectPoint;
