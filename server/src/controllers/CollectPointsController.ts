/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import CollectPointsRepository from '../repositories/CollectPointsRepository';
import CreateCollectPointService from '../services/CreateCollectPointService';

const collectPointsRepository = new CollectPointsRepository();

export default class CollectPointsController {
  public show(request: Request, response: Response): Response {
    const collectPoints = collectPointsRepository.findAll();

    return response.json(collectPoints);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createCollectPoint = new CreateCollectPointService(
        collectPointsRepository
      );

      const collectPoint = await createCollectPoint.execute({
        name,
        email,
        password
      });

      return response.status(201).json(collectPoint);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
