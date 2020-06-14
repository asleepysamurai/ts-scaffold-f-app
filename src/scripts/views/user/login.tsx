/**
 * User Login View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { ActionResponse } from 'utils/types';

type Props = {
  onSubmit: (email: string, password: string) => Promise<ActionResponse>;
};

export const Component: React.FunctionComponent<Props> = function Login({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '' } as ActionResponse);

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

            const actionMessage = await onSubmit(email, password);
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
  onSubmit: PropTypes.func.isRequired,
};
