import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@shared/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { userType, email, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
        userType
      });

      return response.json({ user: classToClass(user), token });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
