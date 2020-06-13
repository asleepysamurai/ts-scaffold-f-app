/**
 * User Login View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { apiClient } from 'utils/apiClient';
import validator from 'validator';
import PropTypes from 'prop-types';

type ActionMessage = {
  success: boolean;
  text: string;
};

async function onSubmit(
  email: string,
  password: string,
  onLogin: (token: string) => void,
): Promise<ActionMessage> {
  if (!validator.isEmail(email)) {
    return {
      success: false,
      text: 'Please provide a valid email address to login to your F-App account.',
    };
  }

  if (!password) {
    return {
      success: false,
      text: 'You need to provide a password to login to your F-App account.',
    };
  }

  try {
    const data = await apiClient.post('/user/login', { email, password }, { noAuth: true });
    onLogin(data.user?.token);
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
      text: `An unexpected error occurred while trying to login to your account. Please try again, and if the issue persists, contact F-App Support.`,
    };
  }
}

export const Component: React.FunctionComponent<{
  onLogin: (token: string) => void;
}> = function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '' });

  return (
    <div className="container flex-container column center text-center">
      <h3 className="font-weight-light">Open Sesame!</h3>
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

            const actionMessage = await onSubmit(email, password, onLogin);
            if (actionMessage.success) {
              return;
            }

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
                Login
              </Button>
            </FormGroup>
          </fieldset>
        </Form>
      )}
      <p>
        <em>
          <small>
            <a href="/user/forgot-password" className="text-secondary">
              Forgot your password? Click here to reset it.
            </a>
          </small>
        </em>
      </p>
    </div>
  );
};

Component.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
