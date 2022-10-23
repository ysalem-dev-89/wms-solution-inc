import { Request } from 'express';

export interface LoginControllerRequest extends Request {
  body: { password: string; username: string };
}
