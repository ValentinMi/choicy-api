export type IProposal = {
  title: string;
  imageUrl: string;
  chosen: number;
};

export type IChoice = {
  _id?: string;
  category: ICategory;
  title: string;
  proposals: IProposal[];
  vote: number;
};

export type ICategory = {
  _id?: string;
  title: string;
};

export type IUser = {
  _id?: string;
  username: string;
  password?: string;
  registerDate?: Date;
  isAdmin: boolean;
};

export type RequestWithUser = any;
