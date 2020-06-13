/**
 * User management pages
 */

import { BlueJacket } from 'bluejacket';
import { mixins, Mixins } from 'utils/mixins';

import { handle as signup } from './signup';
import { handle as setPassword } from './setPassword';
import { handle as forgotPassword } from './forgotPassword';

export const setup = (router: BlueJacket<Mixins>) => {
  router.handle('/user', mixins.redirectTo('/user/signup'));
  router.handle('/user/signup', signup);

  router.handle('/user/reset-password', setPassword(false));
  router.handle('/user/verify', setPassword(true));
  router.handle('/user/forgot-password', forgotPassword(false));
  router.handle('/user/resend-activation', forgotPassword(true));
};
