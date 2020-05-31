/**
 * User management pages
 */

import { BlueJacket } from 'bluejacket';
import { redirectTo } from 'utils/url';

import { handle as signup } from './signup';

export const user = (router: BlueJacket) => {
  router.handle('/user', redirectTo('/user/signup'));
  router.handle('/user/signup', signup);
};
