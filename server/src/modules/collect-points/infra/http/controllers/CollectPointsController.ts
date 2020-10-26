/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import CollectPointsRepository from '../repositories/CollectPointsRepository';
import CreateCollectPointService from '../services/CreateCollectPointService';
import FilterCollectPointsService from '../services/FilterCollectPointsService';

const collectPointsRepository = new CollectPointsRepository();

export default class CollectPointsController {
  public index(request: Request, response: Response): Response {
    const { name, items, weekDay } = request.query;

    const filterCollectPoints = new FilterCollectPointsService(
      collectPointsRepository
    );

    const filteredCollectPoints = filterCollectPoints.execute({
      name: String(name),
      items: String(items),
      weekDay: String(weekDay)
    });

    return response.status(200).json(filteredCollectPoints);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        email,
        password,
        city,
        state,
        items,
        schedules
      } = request.body;

      const createCollectPoint = new CreateCollectPointService(
        collectPointsRepository
      );

      const collectPoint = await createCollectPoint.execute({
        name,
        email,
        password,
        city,
        state,
        items,
        schedules
      });

      return response.status(201).json(collectPoint);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
