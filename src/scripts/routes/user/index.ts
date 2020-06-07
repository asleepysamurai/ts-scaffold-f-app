/**
 * User management pages
 */

import { BlueJacket } from 'bluejacket';
import { mixins, Mixins } from 'utils/mixins';

import { handle as signup } from './signup';

export const setup = (router: BlueJacket<Mixins>) => {
  router.handle('/user', mixins.redirectTo('/user/signup'));
  router.handle('/user/signup', signup);
};
