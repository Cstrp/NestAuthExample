import { genSaltSync, hashSync } from 'bcrypt';

const salt = genSaltSync(15);

export const encrypt = (data: string) => hashSync(data, salt);
