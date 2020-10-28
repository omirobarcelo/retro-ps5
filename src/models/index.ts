import { connect } from 'mongoose';
import Game from './game.model';

const connectDb = (db: string) => {
  return connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
};

const models = { Game };

export { connectDb };

export default models;
