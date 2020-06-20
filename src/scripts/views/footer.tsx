/**
 * App Footer component
 */

import React from 'react';
import { env } from 'utils/environment';

export const Component: React.FunctionComponent = function Footer() {
  return (
    <div className="footer text-center container">
      <p>
        <em>
          <strong>{env.get('APP_NAME')}</strong> - The Frontend App by{' '}
          <a href="https://asleepysamurai.com">Balaganesh Damodaran (bgdam)</a>
        </em>
      </p>
    </div>
  );
};
