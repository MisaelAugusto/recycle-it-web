/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCollectPointService from '@modules/collect-points/services/CreateCollectPointService';
import UpdateCollectPointService from '@modules/collect-points/services/UpdateCollectPointService';
import FilterCollectPointsService from '@modules/collect-points/services/FilterCollectPointsService';

export default class CollectPointsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, items, city, state } = request.query;

    const filterCollectPoints = container.resolve(FilterCollectPointsService);

    const filteredCollectPoints = await filterCollectPoints.execute({
      name: String(name),
      items: String(items),
      city: String(city),
      state: String(state)
    });

    const parsedFilteredCollectPoints = filteredCollectPoints.map(
      filteredCollectPoint => classToClass(filteredCollectPoint)
    );

    return response.status(200).json(parsedFilteredCollectPoints);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;
      const { city, state, items, latitude, longitude } = request.body;

      const updateCollectPoint = container.resolve(UpdateCollectPointService);

      const collectPoint = await updateCollectPoint.execute({
        id,
        city,
        state,
        items,
        latitude,
        longitude
      });

      return response.json(classToClass(collectPoint));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createCollectPoint = container.resolve(CreateCollectPointService);

      const collectPoint = await createCollectPoint.execute({
        name,
        email,
        password
      });

      return response.status(201).json(classToClass(collectPoint));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
