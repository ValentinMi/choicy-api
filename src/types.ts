export type IProposal = {
  title: string;
  imageUrl: string;
  choicePercent: number;
};

export type IChoice = {
  category: string;
  title: string;
  proposals: IProposal[];
};

export type ICategory = {
  title: string;
  choices: IChoice[];
};
