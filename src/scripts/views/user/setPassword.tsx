/**
 * User Set Password View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { apiClient } from 'utils/apiClient';
import PropTypes from 'prop-types';

type ActionMessage = {
  success: boolean;
  text: string;
  preventRetry: boolean;
};

async function onSubmit(
  code: string,
  password: string,
  isActivation: boolean = false,
): Promise<ActionMessage> {
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
    await apiClient.post('/user/reset-password', { code, password });
    return {
      success: true,
      text: `Your password has been set successfully. You can now use this password to login to your F-App account!`,
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
      text: `An unexpected error occurred while trying to set your account password. Please try again, and if the issue persists, contact F-App Support.`,
      preventRetry: false,
    };
  }
}

type SetPasswordProps = {
  code: string;
  isActivation?: boolean;
};

export const Component: React.FunctionComponent<SetPasswordProps> = function SetPassword({
  code,
  isActivation = false,
}) {
  const [password, setPassword] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '', preventRetry: false });

  return (
    <div className="container flex-container column center text-center">
      <h3 className="font-weight-light">Set Your Account Password</h3>
      {message.text ? (
        <Alert color={message.success ? 'success' : 'danger'} className="mt-5">
          {message.text}
        </Alert>
      ) : null}
      {message.success || message.preventRetry ? null : (
        <Form
          className="offset-md-4 col-md-4 py-5"
          onSubmit={async (ev) => {
            ev.preventDefault();
            setFormDisabled(true);

            const actionMessage = await onSubmit(code, password, isActivation);
            if (!actionMessage.preventRetry) {
              setFormDisabled(false);
            }
            setMessage(actionMessage);
          }}
        >
          <fieldset disabled={formDisabled}>
            <FormGroup>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(ev) => {
                  return setPassword(ev.currentTarget.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="primary">
                Set Password
              </Button>
            </FormGroup>
          </fieldset>
        </Form>
      )}
      <p>
        <em>
          <small>
            {message.success ? (
              <a href="/user/login" className="text-secondary">
                Click here to login to your account.
              </a>
            ) : isActivation ? (
              <a href="/user/resend-activation" className="text-secondary">
                Click here to resend the account activation code.
              </a>
            ) : (
              <a href="/user/forgot-password" className="text-secondary">
                Click here to resend the password reset code.
              </a>
            )}
          </small>
        </em>
      </p>
    </div>
  );
};

Component.propTypes = {
  code: PropTypes.string.isRequired,
  isActivation: PropTypes.bool,
};
