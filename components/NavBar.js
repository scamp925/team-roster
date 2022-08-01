/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <p className="display-name">Ciao, {user.displayName}!</p>
      <Container className="navbar-container">
        <Link passHref href="/">
          <Navbar.Brand>HOME</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/team">
              <Nav.Link>TEAM</Nav.Link>
            </Link>
            <Link passHref href="/new">
              <Nav.Link>ADD A PLAYER</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button variant="danger" className="sign-out-btn" onClick={signOut}>
        Sign Out
      </Button>
    </Navbar>
  );
}
