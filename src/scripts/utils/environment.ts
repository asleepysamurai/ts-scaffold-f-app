/**
 * Environment util
 *
 * Uses dotenv to parse different env files based on process.env.NODE_ENV
 * Also parses a default.env file and merges it to the <env>.env
 */

import { EnvVarKey } from 'codegen/env.types';

class Environment {
  get(key: EnvVarKey): any {
    //eslint-disable-next-line
    if (process.env[key] === undefined) {
      throw new Error(`Env var not configure for ${key}`);
    }

    //eslint-disable-next-line
    return process.env[key];
  }

  getAsInt(key: EnvVarKey): number {
    const value = parseInt(this.get(key));

    if (isNaN(value)) {
      throw new Error(`Cannot cast ${key} value to int`);
    }

    return value;
  }

  getAsBool(key: EnvVarKey): boolean {
    return (this.get(key) || '').toLowerCase() === 'true';
  }
}

export const env = new Environment();
