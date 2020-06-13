/**
 * User setPassword page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/user/setPassword';

export const handle = (isActivation: boolean = false) => {
  return async (context: Context<Mixins>) => {
    context.title = isActivation ? 'Activate Your Account' : 'Set Account Password';
    context.addComponent(Component, { key: 'setPassword', code: context.data.code, isActivation });
  };
};
