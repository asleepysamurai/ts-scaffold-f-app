/**
 * Root App Component
 */

import React from 'react';
import PropTypes from 'prop-types';
import 'styles/custom.scss';
import 'styles/flex.scss';
import 'styles/app.scss';

export const AppRoot: React.FunctionComponent = ({ children }) => {
  return <div className="root-container flex-container column h-100 w-100">{children}</div>;
};

AppRoot.propTypes = {
  children: PropTypes.array.isRequired,
};
