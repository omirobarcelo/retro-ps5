import { connect } from 'mongoose';
import Contact from './contact.model';
import Game from './game.model';

const connectDb = (db: string) => {
  return connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
};

const models = { Game, Contact };

export { connectDb };

export default models;
