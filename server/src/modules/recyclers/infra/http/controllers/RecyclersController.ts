import { Request, Response } from 'express';

import FindRecyclerService from '@modules/recyclers/services/FindRecyclerService';
import UpdateRecyclerService from '@modules/recyclers/services/UpdateRecyclerService';
import CreateRecyclerService from '@modules/recyclers/services/CreateRecyclerService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class RecyclersController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const findRecycler = container.resolve(FindRecyclerService);

      const recycler = await findRecycler.execute({
        id: String(id)
      });

      return response.json(classToClass(recycler));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createRecycler = container.resolve(CreateRecyclerService);

      const recycler = await createRecycler.execute({
        name,
        email,
        password
      });

      return response.json(classToClass(recycler));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;
      const { city, state } = request.body;

      const updateRecycler = container.resolve(UpdateRecyclerService);

      const recycler = await updateRecycler.execute({
        id,
        city,
        state
      });

      return response.json(classToClass(recycler));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
