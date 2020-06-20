/**
 * User login page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { apiClient } from 'utils/apiClient';
import { Component as Modal } from 'components/modal';
import { env } from 'utils/environment';

const logout = async (context: Context<Mixins>) => {
  try {
    await apiClient.post('/user/logout');
    apiClient.unsetAuthToken();

    context.addComponent(Modal, {
      key: 'logoutModal',
      body: `You have been logged out of your ${env.get(
        'APP_NAME',
      )} account. You will now be redirected to the login page`,
      onClosed: () => {
        return context.redirectTo('/user/login');
      },
      footer: {
        cancelButton: { hide: true },
      },
    });
  } catch (err) {
    context.addComponent(Modal, {
      key: 'logoutModal',
      body: `An error occurred while attempting to log you out of your ${env.get(
        'APP_NAME',
      )} account. Please try again later, and if the issue persists, contact ${env.get(
        'APP_NAME',
      )} Support`,
      onClosed: () => {
        return context.redirectTo('/');
      },
      footer: { cancelButton: { hide: true } },
    });
  }
};

export const handle = async (context: Context<Mixins>) => {
  context.title = 'User Logout';
  await logout(context);
};
