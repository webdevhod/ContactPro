import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IContact } from 'app/shared/model/contact.model';

export interface ICategory {
  id?: number;
  name?: string;
  created?: string;
  appUser?: IUser;
  contacts?: IContact[] | null;
}

export const defaultValue: Readonly<ICategory> = {};
