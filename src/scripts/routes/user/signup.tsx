/**
 * User signup page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Signup } from 'views/user/signup';
import React from 'react';

export const handle = async (context: Context<Mixins>) => {
  context.addComponent(<Signup />);
};
