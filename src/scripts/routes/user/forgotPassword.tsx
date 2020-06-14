/**
 * User forgotPassword page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/user/forgotPassword';
import validator from 'validator';
import { apiClient } from 'utils/apiClient';
import { ActionResponse } from 'utils/types';

async function onSubmit(email: string, isActivation: boolean = false): Promise<ActionResponse> {
  if (!validator.isEmail(email)) {
    return {
      success: false,
      text: 'The email address you entered is invalid. Please provide a valid email address.',
    };
  }

  const actionText = isActivation ? 'activate your account' : 'reset your password';

  try {
    await apiClient.post('/user/forgot-password', { email, isActivation }, { noAuth: true });
    return {
      success: true,
      text: `We have sent an email to ${email} with instructions on how to ${actionText}. Please follow the steps in the email to complete the process.`,
    };
  } catch (err) {
    return {
      success: false,
      text: `An unexpected error occurred while trying to ${actionText}. Please try again, and if the issue persists, contact F-App Support.`,
    };
  }
}

export const handle = (isActivation: boolean = false) => {
  return async (context: Context<Mixins>) => {
    context.title = isActivation ? 'Resend Account Activation Email' : 'Forgot Account Password';
    context.addComponent(Component, { key: 'setPassword', isActivation, onSubmit });
  };
};
