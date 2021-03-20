import { Document } from "mongoose";

export type IProposal = {
  title: string;
  imageUrl: string;
  chosen: number;
};

export interface IChoice extends Document {
  _id?: string;
  category: ICategory;
  title: string;
  proposals: IProposal[];
  vote: number;
}

export interface ICategory extends Document {
  _id?: string;
  title: string;
}

export interface IUser extends Document {
  _id?: string;
  username: string;
  password?: string;
  registerDate?: Date;
  isAdmin: boolean;
  generateAuthToken: Function;
}

export interface IImage extends Document {
  for: {
    choiceId: string;
    proposalIsx: 0 | 1 | 2 | 3;
  };
  img: {
    data: Buffer;
    contentType: string;
  };
}

export type RequestWithUser = any;
