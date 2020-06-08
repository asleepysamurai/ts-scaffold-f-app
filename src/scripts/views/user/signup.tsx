/**
 * Signup View
 */

import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

export const Signup: React.FunctionComponent = () => {
  return (
    <div className="container flex-container column center text-center">
      <h3 className="font-weight-light">Come, Join the Dark Side!</h3>
      <Form className="offset-md-4 col-md-4 py-5">
        <FormGroup>
          <Input placeholder="Enter your email" />
        </FormGroup>
        <FormGroup>
          <Button color="primary">Signup Now!</Button>
        </FormGroup>
      </Form>
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
