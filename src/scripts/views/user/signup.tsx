/**
 * Signup View
 */

import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { ActionResponse } from 'utils/types';
import PropTypes from 'prop-types';

type Props = {
  onSubmit: (email: string) => Promise<ActionResponse>;
};

export const Component: React.FunctionComponent<Props> = function Signup({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [message, setMessage] = useState({ success: false, text: '' } as ActionResponse);

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

Component.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
