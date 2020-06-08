/**
 * App Footer component
 */

import React from 'react';

export const Footer: React.FunctionComponent = () => {
  return (
    <div className="footer text-center container">
      <p>
        <em>
          <strong>F-App</strong> - The Frontend App by{' '}
          <a href="https://asleepysamurai.com">Balaganesh Damodaran (bgdam)</a>
        </em>
      </p>
    </div>
  );
};
