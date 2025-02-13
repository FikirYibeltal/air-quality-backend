import { config } from 'dotenv';

config();
const { env } = process;
export default {
  port: env.PORT,
  pgDatabase: env.PG_DATABASE,
  pgUsername: env.PG_USERNAME,
  pgPassword: env.PG_PASSWORD,
  pgHost: env.PG_HOST,
  pgPort: env.PG_PORT,
};
