
const { env } = process;

const config = {
  host: env.SQL_HOST,
  user: env.SQL_USER_NAME,
  password: env.SQL_PASS_WORD,
  database: env.SQL_DATA_BASE,
  JWTSECRET: env.JWTSECRET
}

module.exports = config;
