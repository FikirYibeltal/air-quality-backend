import { Request, Response } from 'express';

export function notFoundController(req: Request, res: Response): any {
  return res.status(404).send('Not Found');
}
