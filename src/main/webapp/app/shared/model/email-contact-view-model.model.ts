import { IContact } from './contact.model';
import { IEmailData } from './email-data.model';

export interface IEmailContactViewModel {
  id?: number;
  contact?: IContact;
  emailData?: IEmailData;
}

export const defaultValue: Readonly<IEmailContactViewModel> = {};
