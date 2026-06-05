export type Item = {
  img?: string;
  answer: string;
};

export type Category = {
  id: string;
  name: string;
  items: Item[];
};

export type Screen = 'start' | 'categories' | 'session-setup' | 'game' | 'result';
