/**
 * User management pages
 */

import { BlueJacket, Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { redirectLoggedInUserToDashboard, redirectLoggedOutUserToLogin } from 'utils/routeHandlers';

import { handle as login } from './login';
import { handle as logout } from './logout';
import { handle as signup } from './signup';
import { handle as setPassword } from './setPassword';
import { handle as forgotPassword } from './forgotPassword';

export const setup = (router: BlueJacket<Mixins>) => {
  router.handle('/user', (context: Context<Mixins>) => {
    return context.redirectTo('/user/signup');
  });
  router.handle('/user/signup', redirectLoggedInUserToDashboard.bind(null, signup));

  router.handle('/user/reset-password', setPassword(false));
  router.handle('/user/verify', setPassword(true));

  router.handle(
    '/user/forgot-password',
    redirectLoggedInUserToDashboard.bind(null, forgotPassword(false)),
  );
  router.handle(
    '/user/resend-activation',
    redirectLoggedInUserToDashboard.bind(null, forgotPassword(true)),
  );

  router.handle('/user/login', redirectLoggedInUserToDashboard.bind(null, login));
  router.handle('/user/logout', redirectLoggedOutUserToLogin.bind(null, logout));
};
