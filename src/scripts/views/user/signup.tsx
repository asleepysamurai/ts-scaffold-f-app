/**
 * Signup View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import validator from 'validator';
import { apiClient } from 'utils/apiClient';

async function onSignup(email: string) {
  if (!validator.isEmail(email)) {
    return {
      success: false,
      text:
        'The email address you entered is invalid. Please provide a valid email address, in order to get an F-App account.',
    };
  }

  try {
    await apiClient.post('/user', { email });
    return {
      success: true,
      text: `An account has been created for you. However, before you can start using it, you need to verify your email address. We have sent an email to ${email} with instructions on how to verify your email address. Please click the link in the email, to verify your email and start using your account.`,
    };
  } catch (err) {
    return {
      success: false,
      text: `An unexpected error occurred while trying to create an account for you. Please try again, and if the issue persists, contact F-App Support.`,
    };
  }
}

export const Signup: React.FunctionComponent = function Signup() {
  const [email, setEmail] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '' });

  return (
    <div className="container flex-container column center text-center">
      <h3 className="font-weight-light">
        {message.success ? `You're almost there!` : 'Come, Join the Dark Side!'}
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

            const actionMessage = await onSignup(email);
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
              <Button color="primary">Signup Now!</Button>
            </FormGroup>
          </fieldset>
        </Form>
      )}
      <p>
        <em>
          <small>
            <a href="/user/login" className="text-secondary">
              Already have an F-App account? Click here to login to your account instead.
            </a>
          </small>
        </em>
      </p>
    </div>
  );
};
