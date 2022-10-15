import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { States } from 'app/shared/model/enumerations/states.model';

export interface IContact {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullName?: string | null;
  address1?: string;
  address2?: string | null;
  city?: string;
  state?: States;
  zipCode?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string | null;
  created?: string;
  updated?: string;
  imageContentType?: string | null;
  image?: string | null;
  appUser?: IUser;
}

export const defaultValue: Readonly<IContact> = {};
