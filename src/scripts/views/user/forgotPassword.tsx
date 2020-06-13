/**
 * User Forgot Password View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import validator from 'validator';
import { apiClient } from 'utils/apiClient';
import PropTypes from 'prop-types';

async function onSubmit(email: string, isActivation: boolean = false) {
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

export const Component: React.FunctionComponent<{
  isActivation?: boolean;
}> = function ForgotPassword({ isActivation = false }) {
  const [email, setEmail] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '' });

  const actionText = isActivation ? 'Account Activation' : 'Password Reset';
  return (
    <div className="container flex-container column center text-center">
      <h3 className="font-weight-light">
        {message.success ? `You're almost there!` : `Request ${actionText} Email`}
      </h3>
      {message.text ? (
        <Alert color={message.success ? 'success' : 'danger'} className="mt-5">
          {message.text}
        </Alert>
      ) : null}
      {message.success ? null : (
        <Form
          className="offset-md-4 col-md-4 py-5"
          onSubmit={async (ev) => {
            ev.preventDefault();
            setFormDisabled(true);

            const actionMessage = await onSubmit(email);
            setFormDisabled(false);
            setMessage(actionMessage);
          }}
        >
          <fieldset disabled={formDisabled}>
            <FormGroup>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(ev) => {
                  return setEmail(ev.currentTarget.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary">Request {actionText} Link</Button>
            </FormGroup>
          </fieldset>
        </Form>
      )}
      <p>
        <em>
          <small>
            <a href="/user/login" className="text-secondary">
              {isActivation ? 'Already activated your account' : 'Remembered your password'}? Click
              here to login to your account.
            </a>
          </small>
        </em>
      </p>
    </div>
  );
};

Component.propTypes = {
  isActivation: PropTypes.bool,
};
