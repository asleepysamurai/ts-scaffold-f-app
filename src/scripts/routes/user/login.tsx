/**
 * User login page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/user/login';
import { apiClient } from 'utils/apiClient';

export const handle = async (context: Context<Mixins>) => {
  context.title = 'User Login';
  context.addComponent(Component, {
    key: 'login',
    onLogin: (token: string) => {
      apiClient.setAuthToken(token);
      alert('Logged in');
    },
  });
};
