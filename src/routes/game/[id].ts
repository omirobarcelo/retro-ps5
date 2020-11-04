import type { NextFunction, Request, Response } from 'express';
import models from '../../models';

export async function get(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const game = await models.Game.findById(id);
  return res.send(game);
}
