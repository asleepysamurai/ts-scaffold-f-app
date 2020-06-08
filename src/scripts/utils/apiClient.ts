/**
 * API Client Utility
 */

import superagent from 'superagent';
import { env } from './environment';
import { ObjectWithDynamicKeys } from 'bluejacket';

class APIError extends Error {
  constructor(message: string, public readonly httpStatusCode: number) {
    super(message);
  }
}

class APIClient {
  private host: string = '';
  private port: string = '';
  private routePrefix: string = '';

  constructor({ host, port, routePrefix }: { host: string; port: string; routePrefix: string }) {
    this.host = host;
    this.port = port;
    this.routePrefix = routePrefix;
  }

  private buildURL(route: string) {
    return [[this.host, this.port].filter(Boolean).join(':'), this.routePrefix, route]
      .filter(Boolean)
      .join();
  }

  private async request(
    method: 'GET' | 'POST',
    route: string,
    data: ObjectWithDynamicKeys,
  ): Promise<ObjectWithDynamicKeys> {
    try {
      const url = this.buildURL(route);
      const request = superagent(method, url);

      if (method === 'GET') {
        request.query(data);
      } else {
        request.send(data);
      }

      const response: {
        success: boolean;
        data: ObjectWithDynamicKeys;
        error: {
          message: string;
        };
      } = (await request)?.body;

      if (response.success) {
        return response?.data || {};
      } else {
        throw new APIError(response?.error?.message || 'Unknown server error', 500);
      }
    } catch (err) {
      if (err.status) {
        throw new APIError(
          err.response?.body?.error?.message || 'Unknown server error',
          err.status,
        );
      }

      throw new APIError(err.message, -1);
    }
  }

  get(route: string, query: ObjectWithDynamicKeys): Promise<ObjectWithDynamicKeys> {
    return this.request('GET', route, query);
  }

  post(route: string, body: ObjectWithDynamicKeys): Promise<ObjectWithDynamicKeys> {
    return this.request('POST', route, body);
  }
}

export const apiClient = new APIClient({
  host: env.get('API_SERVER_HOST'),
  port: env.get('API_SERVER_PORT'),
  routePrefix: `/v${env.get('API_SERVER_VERSION')}`,
});
