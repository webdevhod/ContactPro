import { IUser } from 'app/shared/model/user.model';

export interface ICategory {
  id?: number;
  name?: string;
  appUser?: IUser;
}

export const defaultValue: Readonly<ICategory> = {};
