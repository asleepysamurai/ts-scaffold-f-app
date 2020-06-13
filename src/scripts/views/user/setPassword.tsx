/**
 * User Set Password View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { apiClient } from 'utils/apiClient';

async function onSetPassword(
  setMessage: React.Dispatch<
    React.SetStateAction<{ success: boolean; text: string; preventRetry: boolean }>
  >,
  code: string,
  password: string,
) {
  if (!password) {
    setMessage({
      success: false,
      text: 'You need to set a non-empty password, so you can login to your account.',
      preventRetry: false,
    });
    return;
  }

  const setBadCodeErrorMessage = () => {
    setMessage({
      success: false,
      text:
        'Uh-oh! Looks like there was something wrong with the link you used to get here. Please make sure you copy-paste the entire link from the email we sent you.',
      preventRetry: true,
    });
  };

  if (!code) {
    setBadCodeErrorMessage();
    return;
  }

  try {
    await apiClient.post('/user/reset-password', { code, password });
    setMessage({
      success: true,
      text: `Your password has been set successfully. You can now use this password to login to your F-App account!`,
      preventRetry: false,
    });
    return;
  } catch (err) {
    if (err.code === 'EINVALIDCODE') {
      setBadCodeErrorMessage();
      return;
    }

    setMessage({
      success: false,
      text: `An unexpected error occurred while trying to set your account password. Please try again, and if the issue persists, contact F-App Support.`,
      preventRetry: false,
    });
  }
}

type SetPasswordProps = {
  code: string;
};

export const SetPassword: React.FunctionComponent<SetPasswordProps> = function SetPassword(props) {
  const [password, setPassword] = useState('');
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
          onSubmit={(ev) => {
            ev.preventDefault();
            return onSetPassword(setMessage, props.code, password);
          }}
        >
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
            <Button color="primary">Set Password</Button>
          </FormGroup>
        </Form>
      )}
      <p>
        <em>
          <small>
            {message.success ? (
              <a href="/user/login" className="text-secondary">
                Click here to login to your account.
              </a>
            ) : (
              <a href="/user/forgot-password" className="text-secondary">
                Click here to resend the password reset/account activation code.
              </a>
            )}
          </small>
        </em>
      </p>
    </div>
  );
};
