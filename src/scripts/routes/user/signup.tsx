/**
 * User signup page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/user/signup';

export const handle = async (context: Context<Mixins>) => {
  context.title = 'User Signup';
  context.addComponent(Component, 'signup');
};
