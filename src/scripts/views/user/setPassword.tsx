/**
 * User Set Password View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { ActionResponse } from 'utils/types';

type Props = {
  onSubmit: (code: string, password: string, isActivation: boolean) => Promise<ActionResponse>;
  code: string;
  isActivation?: boolean;
};

export const Component: React.FunctionComponent<Props> = function SetPassword({
  onSubmit,
  code,
  isActivation = false,
}) {
  const [password, setPassword] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [message, setMessage] = useState({
    success: false,
    text: '',
    preventRetry: false,
  } as ActionResponse);

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
  onSubmit: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  isActivation: PropTypes.bool,
};
