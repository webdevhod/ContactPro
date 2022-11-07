import { ICategory } from 'app/shared/model/category.model';
import { IEmailData } from './email-data.model';

export interface IEmailCategoryViewModel {
  id?: number | string;
  emailData?: IEmailData;
  category?: ICategory;
}

export const defaultValue: Readonly<IEmailCategoryViewModel> = {};
