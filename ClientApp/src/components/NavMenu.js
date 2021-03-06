﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>UniMicroTimeTracker</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/login'}>
          <NavItem>
            <Glyphicon glyph='folder-open' /> Login
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/timetracker'}>
          <NavItem>
            <Glyphicon glyph='list' /> Time Tracker
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/contactpersons'}>
            <NavItem>
                <Glyphicon glyph='list' /> Contact persons
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);


{/* <LinkContainer to={'/counter'}>
<NavItem>
  <Glyphicon glyph='education' /> Counter
</NavItem>
</LinkContainer>
<LinkContainer to={'/fetchdata'}>
<NavItem>
  <Glyphicon glyph='th-list' /> Fetch data
</NavItem>
</LinkContainer> */}