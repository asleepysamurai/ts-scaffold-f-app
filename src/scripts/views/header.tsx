/**
 * App Header component
 */

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

type Props = {
  userLoggedIn: boolean;
};

export const Component: React.FunctionComponent<Props> = function Header({ userLoggedIn }) {
  return (
    <div className="header">
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand href="/">F-App</NavbarBrand>
          <Nav className="ml-auto text-right" navbar>
            {userLoggedIn ? (
              <NavItem key="logout">
                <NavLink href="/user/logout">Logout</NavLink>
              </NavItem>
            ) : (
              [
                <NavItem key="signup">
                  <NavLink href="/user/signup">Signup</NavLink>
                </NavItem>,
                <NavItem key="login">
                  <NavLink href="/user/login">Login</NavLink>
                </NavItem>,
              ]
            )}
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};

Component.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};
