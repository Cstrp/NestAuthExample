import { ROLES } from '../../utils';

export class User {
  id?: string;

  username?: string;
  email: string;
  password: string;
  refreshToken?: string;

  role?: ROLES;
  createdAt?: Date;
  updatedAt?: Date;
}
