/**
 * User login page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { apiClient } from 'utils/apiClient';
import { Component as Modal } from 'components/modal';

const logout = async (context: Context<Mixins>) => {
  try {
    await apiClient.post('/user/logout');
    apiClient.unsetAuthToken();

    context.addComponent(Modal, {
      key: 'logoutModal',
      body:
        'You have been logged out of your F-App account. You will now be redirected to the login page',
      onClosed: () => {
        return context.redirectTo('/user/login')(context);
      },
      footer: {
        cancelButton: { hide: true },
      },
    });
  } catch (err) {
    context.addComponent(Modal, {
      key: 'logoutModal',
      body:
        'An error occurred while attempting to log you out of your F-App account. Please try again later, and if the issue persists, contact F-App Support',
      onClosed: () => {
        return context.redirectTo('/')(context);
      },
      footer: { cancelButton: { hide: true } },
    });
  }
};

export const handle = async (context: Context<Mixins>) => {
  context.title = 'User Logout';
  await logout(context);
};
