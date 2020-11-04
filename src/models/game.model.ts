import { Document, model, Model, QueryFindOptions, Schema } from 'mongoose';
import type { CommentKind } from '../data/types/comment-kind.type';

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    altNames: [String],
    image: { type: String },
    positiveVotes: {
      type: Number,
      min: 0,
      default: 0,
      required: true
    },
    negativeVotes: {
      type: Number,
      min: 0,
      default: 0,
      required: true
    },
    comments: [
      {
        kind: { type: String, enum: ['positive', 'negative'] },
        text: { type: String },
        date: { type: Date, default: Date.now }
      }
    ],
    locked: { type: Boolean, default: false },
    accepted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

gameSchema.statics.findByNameOrAlt = async function (
  query: string,
  projection?: any | null,
  options?: QueryFindOptions
): Promise<IGameDocument[]> {
  const containsQuery = new RegExp(query, 'i');
  return (this as IGameModel)
    .find({ accepted: true }, projection, options)
    .or([{ name: containsQuery }, { altNames: containsQuery }]);
};

interface IGameDocument extends Document {
  // Fields
  name: string;
  altNames: string[];
  image: string;
  positiveVotes: number;
  negativeVotes: number;
  comments: { kind: CommentKind; text: string; date: Date };
  locked: boolean;
  accepted: boolean;

  // Methods
}

interface IGameModel extends Model<IGameDocument> {
  // Statics
  findByNameOrAlt(query: string, projection?: any | null, options?: QueryFindOptions): Promise<IGameDocument[]>;
}

const Game = model<IGameDocument, IGameModel>('Game', gameSchema);

export default Game;
