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

/**
 * Regular expression that matches ISO date strings
 */
export const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

/**
 * Reviver function to parse date string to Date objects
 * @param key 
 * @param value 
 */
export const reviver = (key: string, value: unknown) =>
  typeof value === 'string' && dateRegex.test(value) ? new Date(value) : value;
