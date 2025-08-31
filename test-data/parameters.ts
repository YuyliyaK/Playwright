import 'dotenv/config';

export const validCredential  = {
  username: process.env.TEST_USER ?? 'wrondUser',
  password: process.env.TEST_PASS ?? 'wrongPass',
};