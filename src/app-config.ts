import { config } from 'dotenv';
config();

const envs = {
  PORT: 4000,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_USER_TO_SCAN: process.env.GITHUB_USER_TO_SCAN,
}

export { envs };
