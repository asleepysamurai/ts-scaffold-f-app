/**
 * User signup page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/user/signup';
import validator from 'validator';
import { apiClient } from 'utils/apiClient';
import { ActionResponse } from 'utils/types';
import { env } from 'utils/environment';

async function onSubmit(email: string): Promise<ActionResponse> {
  if (!validator.isEmail(email)) {
    return {
      success: false,
      text: `The email address you entered is invalid. Please provide a valid email address, in order to get an ${env.get(
        'APP_NAME',
      )} account.`,
    };
  }

  try {
    await apiClient.post('/user', { email }, { noAuth: true });
    return {
      success: true,
      text: `An account has been created for you. However, before you can start using it, you need to verify your email address. We have sent an email to ${email} with instructions on how to verify your email address. Please click the link in the email, to verify your email and start using your account.`,
    };
  } catch (err) {
    return {
      success: false,
      text: `An unexpected error occurred while trying to create an account for you. Please try again, and if the issue persists, contact ${env.get(
        'APP_NAME',
      )} Support.`,
    };
  }
}

export const handle = async (context: Context<Mixins>) => {
  context.title = 'User Signup';
  context.addComponent(Component, { key: 'signup', onSubmit });
};
