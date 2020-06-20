/**
 * User setPassword page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/user/setPassword';
import { apiClient } from 'utils/apiClient';
import { ActionResponse } from 'utils/types';
import { env } from 'utils/environment';

async function onSubmit(
  code: string,
  password: string,
  isActivation: boolean = false,
): Promise<ActionResponse> {
  if (!password) {
    return {
      success: false,
      text: 'You need to set a non-empty password, so you can login to your account.',
      preventRetry: false,
    };
  }

  const setBadCodeErrorMessage = () => {
    return {
      success: false,
      text:
        'Uh-oh! Looks like there was something wrong with the link you used to get here. Please make sure you copy-paste the entire link from the email we sent you.',
      preventRetry: true,
    };
  };

  if (!code) {
    return setBadCodeErrorMessage();
  }

  try {
    await apiClient.post('/user/reset-password', { code, password }, { noAuth: true });
    return {
      success: true,
      text: `Your password has been set successfully. You can now use this password to login to your ${env.get(
        'APP_NAME',
      )} account!`,
      preventRetry: false,
    };
  } catch (err) {
    if (err.code === 'EINVALIDCODE') {
      return setBadCodeErrorMessage();
    }

    if (err.code === 'EEXPIREDCODE') {
      return {
        success: false,
        text: `Unfortunately the link you used has expired. ${
          isActivation ? 'Account activation' : 'Password reset'
        } links are only valid for 2 days.`,
        preventRetry: true,
      };
    }

    return {
      success: false,
      text: `An unexpected error occurred while trying to set your account password. Please try again, and if the issue persists, contact ${env.get(
        'APP_NAME',
      )} Support.`,
      preventRetry: false,
    };
  }
}

export const handle = (isActivation: boolean = false) => {
  return async (context: Context<Mixins>) => {
    context.title = isActivation ? 'Activate Your Account' : 'Set Account Password';
    context.addComponent(Component, {
      key: 'setPassword',
      code: context.data.code,
      isActivation,
      onSubmit,
    });
  };
};
