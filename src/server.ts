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
  if (dev) {
    games.push(
      new models.Game({
        name: 'Zanki Zero: The Beginning',
        altNames: ['Zanki Zero'],
        image: 'https://upload.wikimedia.org/wikipedia/en/3/31/Zanki_Zero_cover.png',
        positiveVotes: 5,
        negativeVotes: 1,
        comments: [
          {
            kind: 'positive',
            text: 'Lorem Ipsum',
            date: new Date(2020, 10, 10)
          },
          {
            kind: 'positive',
            text: 'Lorem Ipsum 2',
            date: new Date(2020, 10, 12)
          },
          {
            kind: 'negative',
            text: 'Bad Lorem Ipsum',
            date: new Date(2020, 10, 10)
          }
        ],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Zero Time Dilemma',
        altNames: ['Zero Escape 3'],
        positiveVotes: 5,
        negativeVotes: 1,
        comments: [],
        locked: false,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: "Virtue's Last Reward",
        altNames: ['Zero Escape 2'],
        image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Virtue%27s_Last_Reward_3DS_Boxart.jpg',
        positiveVotes: 5,
        negativeVotes: 1,
        comments: [],
        locked: false,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Project Zero',
        altNames: ['Fatal Frame', 'Zero'],
        image: 'https://images-na.ssl-images-amazon.com/images/I/514FS26YANL._SY445_.jpg',
        positiveVotes: 3,
        negativeVotes: 3,
        comments: [
          {
            kind: 'positive',
            text: 'New Lorem Ipsum',
            date: new Date(2020, 9, 9)
          }
        ],
        locked: false,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Project Zero: Crimson Butterfly',
        altNames: ['Fatal Frame 2', 'Fatal Frame: Crimson Butterfly', 'Zero 2'],
        image: 'https://images-eu.ssl-images-amazon.com/images/I/5116EF55KWL._AC_UL600_SR420,600_.jpg',
        positiveVotes: 1,
        negativeVotes: 4,
        comments: Array.from({ length: 16 }, (_, idx) => ({
          kind: Math.random() > 0.5 ? 'positive' : 'negative',
          text: `Generated Lorem Ipsum ${idx}`,
          date: new Date(2020, 9, idx + 1)
        })),
        locked: false,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Project Zero: Black Water Maiden',
        altNames: ['Fatal Frame 5', 'Fatal Frame: Black Water Maiden', 'Zero 5'],
        image:
          'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Project_Zero_MOBW_PAL_box.jpg/220px-Project_Zero_MOBW_PAL_box.jpg',
        positiveVotes: 5,
        negativeVotes: 0,
        comments: [],
        locked: false,
        accepted: false
      })
    );  
  } else {
    games.push(
      new models.Game({
        name: 'Afro Samurai 2: Revenge of Kuma Volume One',
        altNames: [],
        image:
          'https://upload.wikimedia.org/wikipedia/en/f/fb/AfroSamurai2.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'DWVR',
        altNames: [],
        image:
          'https://ps3digitalchile.com/files/images/thumbs/productos_300x400_1544904135-dwvr-ps4-vr.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Hitman Go: Definitive Edition',
        altNames: [],
        image:
          'https://s3.gaming-cdn.com/images/products/1586/orig/hitman-go-definitive-edition-cover.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: "Joe's Diner",
        altNames: [],
        image:
          'https://images-na.ssl-images-amazon.com/images/I/516QpR3mm8L._SX342_.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Just Deal With It!',
        altNames: [],
        image:
          'https://images-na.ssl-images-amazon.com/images/I/717SRRUrQHL._SX342_.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Robinson: The Journey',
        altNames: [],
        image:
          'https://images-na.ssl-images-amazon.com/images/I/91-Rx-vSBdL._SX342_.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Shadow Complex Remastered',
        altNames: [],
        image:
          'https://4images.cgames.de/images/gsgp/212/shadow-complex-remastered_2724923.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'Shadwen',
        altNames: [],
        image:
          'https://2images.cgames.de/images/gsgp/4/shadwen_2753531.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'TT Isle of Man — Ride on the Edge 2',
        altNames: [],
        image:
          'https://de.gamesplanet.com/acache/44/46/1/de/packshot-46372026d1f3237e6076ba5f6ec102d0.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
    games.push(
      new models.Game({
        name: 'We Sing',
        altNames: [],
        image:
          'https://images-na.ssl-images-amazon.com/images/I/91JpA%2BxFkGL._SX342_.jpg',
        positiveVotes: 0,
        negativeVotes: 1,
        comments: [],
        locked: true,
        accepted: true
      })
    );
  }
  return Promise.all([...games.map(game => game.save())]);
};
