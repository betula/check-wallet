import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

export function About() {
  return (
    <>
      <LinkContainer to="/">
        <Button>Main</Button>
      </LinkContainer>

      <h1>About</h1>
    </>
  );
}
