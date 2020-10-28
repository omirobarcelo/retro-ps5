import { model, Schema } from 'mongoose';

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    altNames: [String]
  },
  { timestamps: true }
);

const Game = model('Game', gameSchema);

export default Game;
