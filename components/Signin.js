import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="sign-in">
      <h2 className="goal">GOOOOOAAAALLLL!!</h2>
      <h1>You made it to Team Roster!</h1>
      <h6>Click the button below to get started</h6>
      <Button type="button" variant="success" size="lg" className="sign-in-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
