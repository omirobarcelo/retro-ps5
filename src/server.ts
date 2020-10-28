import * as sapper from '@sapper/server';
import compression from 'compression';
import express from 'express';
import type { Document } from 'mongoose';
import sirv from 'sirv';
import models, { connectDb } from './models';

require('dotenv').config();

const { PORT, NODE_ENV, MONGO_INITDB_SERVER, DB_DROP, DB_SEED } = process.env;
const dev = NODE_ENV === 'development';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDb(MONGO_INITDB_SERVER).then(async () => {
  if (DB_DROP === 'true') {
    await Promise.all(Object.keys(models).map(model => models[model].deleteMany({})));
  }
  if (DB_SEED === 'true') {
    await seedDB();
  }

  app
    .use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware())
    .listen(PORT)
    .on('error', err => {
      if (err) console.error('error', err);
    });
});

const seedDB = async () => {
  const games: Document[] = [];
  games.push(
    new models.Game({
      name: 'Zanki Zero: The Beginning',
      altNames: ['Zanki Zero']
    })
  );
  games.push(
    new models.Game({
      name: 'Zero Time Dilemma',
      altNames: ['Zero Escape 3']
    })
  );
  games.push(
    new models.Game({
      name: "Virtue's Last Reward",
      altNames: ['Zero Escape 2']
    })
  );
  games.push(
    new models.Game({
      name: 'Project Zero',
      altNames: ['Fatal Frame', 'Zero']
    })
  );
  games.push(
    new models.Game({
      name: 'Project Zero: Crimson Butterfly',
      altNames: ['Fatal Frame 2', 'Fatal Frame: Crimson Butterfly', 'Zero 2']
    })
  );

  return Promise.all([...games.map(game => game.save())]);
};
