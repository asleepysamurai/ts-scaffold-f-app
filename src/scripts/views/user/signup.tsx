/**
 * Signup View
 */

import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export const Signup: React.FunctionComponent = () => {
  return (
    <div className="container">
      <Form className="offset-md-4 col-md-4">
        <FormGroup>
          <Label for="email">Email</Label>
          <Input />
        </FormGroup>
        <FormGroup>
          <Button color="primary">Signup Now!</Button>
        </FormGroup>
      </Form>
    </div>
  );
};
