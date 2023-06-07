import { signal }  from '@preact/signals-react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

const show$ = signal(true);

export function Main() {
  return (
    <>
      <LinkContainer to="/about">
        <Button>About</Button>
      </LinkContainer>

      <h1>Main</h1>

      <Alert show={show$.value} variant="success">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => (show$.value = false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>

      {!show$.value && <Button onClick={() => (show$.value = true)}>Show Alert</Button>}
    </>
  );
}
