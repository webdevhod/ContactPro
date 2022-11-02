export interface IEmailData {
  id?: number;
  emailAddress?: string;
  subject?: string;
  body?: string;
  firstName?: string;
  lastName?: string;
  groupName?: string;
}

export const defaultValue: Readonly<IEmailData> = {};
