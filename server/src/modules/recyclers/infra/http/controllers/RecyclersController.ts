import { Request, Response } from 'express';

import CreateRecyclerService from '@modules/recyclers/services/CreateRecyclerService';

export default class RecyclersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      // TODO
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.json({ message: 'TODO' });
  }
}
