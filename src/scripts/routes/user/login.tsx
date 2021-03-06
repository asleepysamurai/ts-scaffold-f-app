/**
 * User login page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/user/login';
import { apiClient } from 'utils/apiClient';
import validator from 'validator';
import { ActionResponse } from 'utils/types';
import { env } from 'utils/environment';

async function onSubmit(
  context: Context<Mixins>,
  email: string,
  password: string,
): Promise<ActionResponse> {
  if (!validator.isEmail(email)) {
    return {
      success: false,
      text: `Please provide a valid email address to login to your ${env.get('APP_NAME')} account.`,
    };
  }

  if (!password) {
    return {
      success: false,
      text: `You need to provide a password to login to your ${env.get('APP_NAME')} account.`,
    };
  }

  try {
    await apiClient.login(email, password);

    const redirectTo = context.data.to;
    context.data = redirectTo?.data;
    context.redirectTo(redirectTo?.route || '/', true);

    return {
      success: true,
      text: `Login Okay!`,
    };
  } catch (err) {
    if (err.code === 'EBADCREDENTIALS') {
      return {
        success: false,
        text: `The email or password you entered is incorrect. Please double check and try again.`,
      };
    }

    return {
      success: false,
      text: `An unexpected error occurred while trying to login to your account. Please try again, and if the issue persists, contact ${env.get(
        'APP_NAME',
      )} Support.`,
    };
  }
}

export const handle = async (context: Context<Mixins>) => {
  context.title = 'User Login';
  context.addComponent(Component, {
    key: 'login',
    onSubmit: onSubmit.bind(null, context),
  });
};
