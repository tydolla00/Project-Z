// Keep in sync with .env
interface Config {
  DATABASE_URL: string | undefined;
  DIRECT_URL: string | undefined;
}

const getConfig = (): Config => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
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
