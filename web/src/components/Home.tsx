import { LinkContainer } from 'react-router-bootstrap';
import { Button }  from 'react-bootstrap';
import { HomeLayout } from './HomeLayout';

export function Home() {
  return (
    <HomeLayout>
      <h1>Welcome to Check Wallet</h1>
      <p>
        Check old and new wallets and see how much money they have in different currencies!
      </p>
      <div className="d-flex flex-row gap-3">
        <LinkContainer to="/sign-in">
          <Button>Sign-in</Button>
        </LinkContainer>
        <LinkContainer to="/sign-up">
          <Button>Sign-up</Button>
        </LinkContainer>
      </div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        <a href="https://github.com/betula/resume">
          Slava Bereza CV
        </a>
      </footer>
    </HomeLayout>
  );
}
