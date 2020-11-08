import type { NextFunction, Request, Response } from 'express';
import models from '../../models';
import type { IGameDocument } from '../../models/game.model';

export async function post(req: Request, res: Response, next: NextFunction) {
  const { name, altNames, image, vote, comment } = req.body;
  let game: IGameDocument;
  try {
    game = new models.Game({
      name,
      altNames,
      image,
      positiveVotes: vote === 'positive' ? 1 : 0,
      negativeVotes: vote === 'negative' ? 1 : 0,
      comments: comment ? [{ kind: vote, text: comment, date: new Date() }] : [],
      locked: false,
      accepted: false
    });
    game = await game.save();
  } catch (err) {
    return res.status(500).send({ successful: false, errorMsg: 'Error while saving the game entry.' });
  }
  return res.send(game);
}
