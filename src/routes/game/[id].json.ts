import type { NextFunction, Request, Response } from 'express';
import models from '../../models';

export async function get(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const game = await models.Game.findById(id);
  if (!game) {
    return res.status(404).send({
      message: 'Game Not Found!'
    });
  }
  return res.send(game);
}

export async function patch(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { vote, comment } = req.body;

  const game = await models.Game.findById(id);
  if (!game) {
    return res.status(404).send({
      message: 'Game Not Found!'
    });
  }

  const update = {
    [`${vote}Votes`]: game[`${vote}Votes`] + 1
  };
  if (comment !== undefined && comment !== null && comment.trim() !== '') {
    update[`comments`] = [...game.comments, { kind: vote, text: comment, date: new Date() }];
  }
  const updated = await models.Game.findOneAndUpdate({ _id: id }, update, {
    new: true
  });

  return res.send(updated);
}
