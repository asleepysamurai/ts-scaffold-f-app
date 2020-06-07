/**
 * App Header component
 */

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export const Header: React.FunctionComponent = () => {
  return (
    <div className="header">
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand href="/">F-App</NavbarBrand>
          <Nav className="ml-auto text-right" navbar>
            <NavItem>
              <NavLink href="/user/signup">Signup</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user/login">Login</NavLink>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};
