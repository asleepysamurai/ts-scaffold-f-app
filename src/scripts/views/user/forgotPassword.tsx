/**
 * User Forgot Password View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { ActionResponse } from 'utils/types';

type Props = {
  onSubmit: (email: string, isActivation?: boolean) => Promise<ActionResponse>;
  isActivation?: boolean;
};

export const Component: React.FunctionComponent<Props> = function ForgotPassword({
  onSubmit,
  isActivation = false,
}) {
  const [email, setEmail] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '' } as ActionResponse);

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
  onSubmit: PropTypes.func.isRequired,
  isActivation: PropTypes.bool,
};
