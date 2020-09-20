import { uuid } from 'uuidv4';

class CollectPoint {
  id: string;

  name: string;

  email: string;

  password: string;

  constructor({ name, email, password }: Omit<CollectPoint, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default CollectPoint;
