import type { Category } from '../types';
import { flagi } from './flagi';
import { flagiSwiata } from './flagi-swiata';
import { pokemon } from './pokemon';
import { psy } from './psy';
import { disney } from './disney';
import { harryPotter } from './harry-potter';
import { superbohaterowie } from './superbohaterowie';
import { popDivy } from './pop-divy';
import { gryPlanszowe } from './gry-planszowe';
import { aplikacje } from './aplikacje';
import { postacieZGier } from './postacie-z-gier';
import { filmy } from './filmy';
import { panoramy } from './panoramy';
import { markiButow } from './marki-butow';

export const categories: Category[] = [
  { id: 'flagi-europy', name: 'Flagi Europy', items: flagi },
  { id: 'flagi-swiata', name: 'Flagi Świata', items: flagiSwiata },
  { id: 'pokemon', name: 'Pokémon', items: pokemon },
  { id: 'psy', name: 'Rasy psów', items: psy },
  { id: 'disney', name: 'Postacie Disneya', items: disney },
  { id: 'harry-potter', name: 'Harry Potter', items: harryPotter },
  { id: 'superbohaterowie', name: 'Superbohaterowie', items: superbohaterowie },
  { id: 'pop-divy', name: 'Pop divy', items: popDivy },
  { id: 'gry-planszowe', name: 'Gry planszowe', items: gryPlanszowe },
  { id: 'aplikacje', name: 'Aplikacje', items: aplikacje },
  { id: 'postacie-z-gier', name: 'Postacie z gier', items: postacieZGier },
  { id: 'filmy', name: 'Filmy', items: filmy },
  { id: 'panoramy', name: 'Panoramy miast', items: panoramy },
  { id: 'marki-butow', name: 'Marki butów', items: markiButow },
];
