interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateRecyclerService {
  public async execute({ name, email, password }: Request): Promise<void> {
    // Change return type to Recycler
  }
}
