import { Request, Response } from 'express';

import { container } from 'tsyringe';

import FilterRecyclingsService from '@modules/recyclings/services/FilterRecyclingsService';
import CreateRecyclingService from '@modules/recyclings/services/CreateRecyclingService';
import FinishRecyclingService from '@modules/recyclings/services/FinishRecyclingService';
import DeleteRecyclingService from '@modules/recyclings/services/DeleteRecyclingService';

export default class RecyclingsController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { userType } = request.query;

      const filterRecyclings = container.resolve(FilterRecyclingsService);

      const recyclings = await filterRecyclings.execute({
        user_id,
        userType: String(userType)
      });

      return response.json(recyclings);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const recycler_id = request.user.id;
      const { collect_point_id, items } = request.body;

      const createRecycling = container.resolve(CreateRecyclingService);

      const recycling = await createRecycling.execute({
        recycler_id,
        collect_point_id,
        items
      });

      return response.json(recycling);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { quantities } = request.body;
      const { id } = request.params;

      const finishRecycling = container.resolve(FinishRecyclingService);

      const recycling = await finishRecycling.execute({
        id,
        quantities
      });

      return response.json(recycling);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { recycling_id } = request.params;

      const deleteRecycling = container.resolve(DeleteRecyclingService);

      await deleteRecycling.execute({
        recycling_id
      });

      return response.json({ message: 'Recycling deleted successfully.' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
