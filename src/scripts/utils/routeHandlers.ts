/**
 * Route handler util to check if user is authenticated
 * If yes redirect user to dashboard
 */

import { Context } from 'bluejacket';
import { Mixins } from './mixins';
import { apiClient } from './apiClient';

export async function redirectLoggedInUserToDashboard(
  routeHandler: (context: Context<Mixins>) => any,
  context: Context<Mixins>,
) {
  if (apiClient.hasAuthToken) {
    context.redirectTo('/user/dashboard');
  } else {
    await Promise.resolve(routeHandler(context));
  }
}

export async function redirectLoggedOutUserToLogin(
  routeHandler: (context: Context<Mixins>) => any,
  context: Context<Mixins>,
) {
  if (apiClient.hasAuthToken) {
    await Promise.resolve(routeHandler(context));
  } else {
    context.data = {
      to: { route: context.route, data: context.data },
    };
    context.redirectTo('/user/login');
  }
}
