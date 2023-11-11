import { config } from 'dotenv';
config();

const envs = {
  PORT: 4000,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
}

export { envs };
