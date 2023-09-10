export type Reward = {
  id: number;
  name: string;
  progress: {
    achieved: number;
    total: number;
  };
};

export type Xp = {
  achieved: number;
  nextLevel: number;
};
