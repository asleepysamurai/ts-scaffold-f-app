/**
 * Root App Component
 */

import React from 'react';
import PropTypes from 'prop-types';
import 'styles/bootstrap.scss';

export const AppRoot: React.FunctionComponent = ({ children }) => {
  return <div className="root-container flex-container">{children}</div>;
};

AppRoot.propTypes = {
  children: PropTypes.array.isRequired,
};
