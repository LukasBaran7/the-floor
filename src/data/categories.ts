import type { Category } from '../types';
import { flagi } from './flagi';
import { flagiSwiata } from './flagi-swiata';

export const categories: Category[] = [
  { id: 'flagi-europy', name: 'Flagi Europy', items: flagi },
  { id: 'flagi-swiata', name: 'Flagi Świata', items: flagiSwiata },
];
