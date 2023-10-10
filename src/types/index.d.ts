import "./plugins";
import "./services";

export interface EnvVariables {
  ALLOWED_ORIGINS: string;
  NODE_ENV: string;
  PORT: string | number;
  POSTGRES_HOST: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
}

export type AppOptions = EnvVariables;
