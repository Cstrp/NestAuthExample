import { genSaltSync, hashSync } from 'bcrypt';

const salt = genSaltSync(+process.env.SALT_ROUNDS! || 10);

export const encrypt = (data: string) => hashSync(data, salt);
