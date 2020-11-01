import type { NextFunction, Request, Response } from 'express';
import models from '../../models';

export async function get(req: Request, res: Response, next: NextFunction) {
  const games = await models.Game.findByNameOrAlt(
    req.query.query as string,
    { name: true, altNames: true, image: true, positiveVotes: true, negativeVotes: true },
    { sort: { name: 1 } }
  );
  return res.send(games);
}
