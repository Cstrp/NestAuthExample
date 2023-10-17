import { compareSync } from 'bcrypt';

export const compare = (data: string, encrypted: string) =>
  compareSync(data, encrypted);
