/**
 * URL helpers
 */

import { Context } from 'bluejacket';

export function getRouteFromLocation(location: Location): string {
  return location.href.replace(new RegExp(`^${location.origin}`), '');
}

export function getURLFromRouteAndCurrentLocation(route: string, location: Location): string {
  return `${location.origin}${route[0] === '/' ? '' : '/'}${route}`;
}

export function redirectTo(route: string): (context: Context) => void {
  return (context: Context) => {
    context.router.resolve(route, context.data);
    throw 'route';
  };
}
