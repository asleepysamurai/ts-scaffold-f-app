/**
 * User signup page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Signup } from 'views/user/signup';

export const handle = async (context: Context<Mixins>) => {
  context.title = 'User Signup';
  context.addComponent(Signup, 'signup');
};
