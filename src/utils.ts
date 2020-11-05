import type { GameListItem } from './data/interfaces/game-list-item.interface';

/**
 * Returns text percentage for positive or negative votes, with 2 decimals
 * @param game
 * @param type
 */
export const calcPercentage = (game: GameListItem, type: 'positive' | 'negative'): string => {
  const votes = type === 'positive' ? game.positiveVotes : game.negativeVotes;
  const perc = (votes * 100) / (game.positiveVotes + game.negativeVotes);
  return `${perc.toFixed(2)}%`;
};
