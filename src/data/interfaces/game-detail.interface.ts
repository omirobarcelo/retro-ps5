import type { CommentKind } from '../types/comment-kind.type';
import type { GameListItem } from './game-list-item.interface';

export interface GameDetail extends GameListItem {
  comments: { kind: CommentKind; text: string; date: Date }[];
  locked: boolean;
  accepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
