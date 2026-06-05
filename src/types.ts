export type Flag = {
  img: string;
  answer: string;
};

export type Category = {
  id: string;
  name: string;
  items: Flag[];
};

export type Screen = 'start' | 'categories' | 'game' | 'result';
