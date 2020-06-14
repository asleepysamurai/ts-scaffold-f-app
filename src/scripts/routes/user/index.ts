/**
 * User management pages
 */

import { BlueJacket, Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';

import { handle as login } from './login';
import { handle as logout } from './logout';
import { handle as signup } from './signup';
import { handle as setPassword } from './setPassword';
import { handle as forgotPassword } from './forgotPassword';

export const setup = (router: BlueJacket<Mixins>) => {
  router.handle('/user', (context: Context<Mixins>) => {
    return context.redirectTo('/user/signup');
  });
  router.handle('/user/signup', signup);

  router.handle('/user/reset-password', setPassword(false));
  router.handle('/user/verify', setPassword(true));

  router.handle('/user/forgot-password', forgotPassword(false));
  router.handle('/user/resend-activation', forgotPassword(true));

  router.handle('/user/login', login);
  router.handle('/user/logout', logout);
};
