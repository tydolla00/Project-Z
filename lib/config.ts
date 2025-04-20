// Keep in sync with .env
interface Config {
  DATABASE_URL: string | undefined;
  DIRECT_URL: string | undefined;
  AUTH_SECRET: string | undefined;
  AUTH_GITHUB_ID: string | undefined;
  AUTH_GITHUB_SECRET: string | undefined;
  AUTH_GOOGLE_ID: string | undefined;
  AUTH_GOOGLE_SECRET: string | undefined;
}

const getConfig = (): Config => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  };
};

const getSanitizedConfig = (
  config: Config,
): { [key in keyof typeof config]: string } => {
  for (const [key, val] of Object.entries(config)) {
    if (val === undefined && window === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  const c = { ...config } as unknown;
  return c as { [key in keyof typeof config]: string };
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
