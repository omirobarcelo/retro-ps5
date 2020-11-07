import type { NextFunction, Request, Response } from 'express';
import models from '../models';

export async function post(req: Request, res: Response, next: NextFunction) {
  const { title, description } = req.body;
  try {
    const contact = new models.Contact({ title, description, read: false, dealt: false });
    await contact.save();
  } catch (err) {
    return res.status(500).send({ successful: false, errorMsg: 'Error while saving your contact request.' });
  }
  return res.send({ successful: true });
}
