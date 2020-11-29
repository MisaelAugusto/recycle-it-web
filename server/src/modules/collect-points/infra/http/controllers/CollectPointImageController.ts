import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCollectPointImageService from '@modules/collect-points/services/UpdateCollectPointImageService';

import { classToClass } from 'class-transformer';

export default class CollectPointImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateCollectPointImage = container.resolve(
        UpdateCollectPointImageService
      );

      const collectPoint = await updateCollectPointImage.execute({
        id: request.user.id,
        imageFilename: request.file.filename
      });

      return response.json(classToClass(collectPoint));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
