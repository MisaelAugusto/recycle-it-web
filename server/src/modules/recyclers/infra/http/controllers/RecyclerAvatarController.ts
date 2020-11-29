import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateRecyclerAvatarService from '@modules/recyclers/services/UpdateRecyclerAvatarService';

import { classToClass } from 'class-transformer';

export default class RecyclerAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateRecyclerAvatar = container.resolve(
        UpdateRecyclerAvatarService
      );

      const recycler = await updateRecyclerAvatar.execute({
        id: request.user.id,
        avatarFilename: request.file.filename
      });

      return response.json(classToClass(recycler));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
