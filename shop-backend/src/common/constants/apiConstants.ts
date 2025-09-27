import config from 'config';
/**
 * Object map for API methods, fully typed.
 */
export type HapiRouteMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';

export const API_METHODS: Record<HapiRouteMethod, HapiRouteMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
};

/**
 * Object map for auth strategies.
 */
export const STRATEGY = {
  SIMPLE: 'simple',
};

/**
 * Base API identifier string.
 */
export const API: string = 'api';

/**
 * API path constructed using version from app config.
 */
export const API_PATH: string = `/api/${config.get<string>('version')}`;
