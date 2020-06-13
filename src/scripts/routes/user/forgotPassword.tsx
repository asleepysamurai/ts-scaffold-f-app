/**
 * User forgotPassword page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/user/forgotPassword';

export const handle = (isActivation: boolean = false) => {
  return async (context: Context<Mixins>) => {
    context.title = isActivation ? 'Resend Account Activation Email' : 'Forgot Account Password';
    context.addComponent(Component, { key: 'setPassword', isActivation });
  };
};
